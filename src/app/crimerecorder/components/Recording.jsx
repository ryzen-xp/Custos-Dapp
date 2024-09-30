"use client";
import React, {
  useContext,
  useEffect,
  useState,
  useRef,
  useCallback,
} from "react";
import bg from "../../../../public/Rectangle.png";
import icon3 from "../../../../public/rotate.png";
import Icons from "./Icons";
import { useRouter } from "next/navigation";
import { WalletContext } from "@/components/walletprovider";
import { provider } from "../../../utils/fetchcontract";
import abi from "../../../utils/coverCrimeAbi";
import {
  executeCalls,
  fetchAccountCompatibility,
  fetchAccountsRewards,
  fetchGasTokenPrices,
  GasTokenPrice,
  getGasFeesInGasToken,
  SEPOLIA_BASE_URL,
} from "@avnu/gasless-sdk";
import { Contract } from "starknet";

const NFT_STORAGE_TOKEN = process.env.NFT_STORAGE_TOKEN;
export const Recording = ({ text, icon1, imgText, uri, category }) => {
  const options = { baseUrl: SEPOLIA_BASE_URL };

  const calls = [
    {
      entrypoint: "crime_record",
      contractAddress:
        "0x03cbefe95450dddc88638f7b23f34d83fc48b570e476d87a608c07724aaaa342",
      calldata: [
        "0x0498E484Da80A8895c77DcaD5362aE483758050F22a92aF29A385459b0365BFE",
        "0xf",
        "0x0",
      ],
    },
  ];

  const { account } = useContext(WalletContext);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [mediaStream, setMediaStream] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [currentFacingMode, setCurrentFacingMode] = useState("environment");
  const [isRecording, setIsRecording] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tx, setTx] = useState();
  const [paymasterRewards, setPaymasterRewards] = useState([]);
  const [gasTokenPrices, setGasTokenPrices] = useState([]);
  const [gasTokenPrice, setGasTokenPrice] = useState();
  const [maxGasTokenAmount, setMaxGasTokenAmount] = useState();
  const [gaslessCompatibility, setGaslessCompatibility] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [call, setCalls] = useState(JSON.stringify(calls, null, 2));

  useEffect(() => {
    if (!account) return;
    fetchAccountCompatibility(account.address, {
      baseUrl: SEPOLIA_BASE_URL,
    }).then(setGaslessCompatibility);
    fetchAccountsRewards(account.address, {
      baseUrl: SEPOLIA_BASE_URL,
      protocol: "gasless-sdk",
    }).then(setPaymasterRewards);
  }, [account]);

  useEffect(() => {
    fetchGasTokenPrices({ baseUrl: SEPOLIA_BASE_URL }).then(setGasTokenPrices);
  }, []);

  const estimateCalls = useCallback(
    async (account, calls) => {
      const contractVersion = await provider.getContractVersion(
        account.address
      );
      const nonce = await provider.getNonceForAddress(account.address);
      const details = stark.v3Details({ skipValidate: true });
      const invocation = {
        ...details,
        contractAddress: account.address,
        calldata: transaction.getExecuteCalldata(calls, contractVersion.cairo),
        signature: [],
      };
      return provider.getInvokeEstimateFee(
        { ...invocation },
        { ...details, nonce },
        "pending",
        true
      );
    },
    [provider]
  );

  useEffect(() => {
    if (!account || !gasTokenPrice || !gaslessCompatibility) return;
    setErrorMessage(undefined);

    // Add your specific transaction calls here.
    estimateCalls(account, JSON.parse(calls)).then((fees) => {
      const estimatedGasFeesInGasToken = getGasFeesInGasToken(
        BigInt(fees.overall_fee),
        gasTokenPrice,
        BigInt(fees.gas_price || null),
        BigInt(fees.data_gas_price ?? "0x1"),
        gaslessCompatibility.gasConsumedOverhead,
        gaslessCompatibility.dataGasConsumedOverhead
      );
      setMaxGasTokenAmount(estimatedGasFeesInGasToken * BigInt(2));
    });
  }, [account, gasTokenPrice, gaslessCompatibility, estimateCalls]);

  const otherRecorder = (selectedMedia) => {
    return selectedMedia === "vid" ? "aud" : "vid";
  };

  useEffect(() => {
    return () => {
      // Clean up camera stream on unmount
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [mediaStream]);

  const startCamera = async () => {
    if (typeof window !== "undefined" && navigator?.mediaDevices) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: currentFacingMode },
          audio: true,
        });
        videoRef.current.srcObject = stream;
        videoRef.current.muted = true; // Mute video element
        setMediaStream(stream);
      } catch (error) {
        console.error("Error accessing the camera", error);
        alert("Error accessing the camera: " + error.message);
      }
    }
  };

  const stopCamera = () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
      setMediaStream(null);
    }
  };

  const startRecording = async () => {
    await startCamera(); // Ensure the camera starts
    const recorder = new MediaRecorder(mediaStream);

    recorder.ondataavailable = (event) =>
      setRecordedChunks((prev) => [...prev, event.data]);

    recorder.onstop = () => {
      // Create a blob from the recorded chunks
      const blob = new Blob(recordedChunks, { type: "video/webm" });

      // Check if the blob size is valid and proceed with saving/downloading
      console.log(blob.size); // This should give a size greater than 0

      if (blob.size > 0) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = "video.webm"; // The file name for the download
        document.body.appendChild(a);
        a.click();
        URL.revokeObjectURL(url); // Clean up the URL reference after download
      }

      // Optionally, you can upload the blob to IPFS
      uploadToIPFS(blob, "video.webm");

      // Stop the camera after recording finishes
      stopCamera();

      // Reset recorded chunks
      setRecordedChunks([]);
    };

    // Start recording
    recorder.start();
    setMediaRecorder(recorder);
    setIsRecording(true);
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
    mediaRecorder.onstop = () => {
      const blob = new Blob(recordedChunks, { type: "video/webm" }); // Correct type

      // Check if the blob size is valid
      console.log(blob.size); // This should give a size greater than 0

      if (blob.size > 0) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = "video.webm";
        document.body.appendChild(a);
        a.click();
        URL.revokeObjectURL(url); // Clean up URL reference
      }
    };
  };
  //   await startCamera();
  //   const recorder = new MediaRecorder(mediaStream);

  //   recorder.ondataavailable = event => {
  //     console.log('Data available:', event.data);
  //     setRecordedChunks(prev => [...prev, event.data]);
  //   };

  //   recorder.onstop = async () => {
  //     console.log('Recording stopped. Recorded chunks:', recordedChunks);
  //     const blob = new Blob(recordedChunks, { type: 'video/webm' });

  //     // Check if blob size is greater than 0
  //     console.log('Blob size:', blob.size);

  //     if (blob.size > 0) {
  //       saveToDevice(blob, 'video.webm');
  //       await uploadToIPFS(blob, 'video.webm');
  //     }

  //     stopCamera();
  //     setRecordedChunks([]);
  //   };

  //   recorder.start();
  //   setMediaRecorder(recorder);
  //   setIsRecording(true);
  // };

  const takePicture = async () => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.error("Canvas element not available");
      return;
    }
    const context = canvas.getContext("2d");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    const dataURL = canvas.toDataURL("image/png");
    const blob = await fetch(dataURL).then((res) => res.blob());
    await uploadToIPFS(blob, "image.png");
    saveToDevice(blob, "photo.png");
  };

  const switchCamera = async () => {
    setCurrentFacingMode((prev) => (prev === "user" ? "environment" : "user"));
    if (isRecording) {
      mediaRecorder.pause();
    }
    stopCamera();
    await startCamera();
    if (isRecording) {
      mediaRecorder.resume();
    }
  };

  // Upload to IPFS using Pinata
  async function uploadToIPFS(fileBlob, fileName) {
    const formData = new FormData();
    formData.append("file", fileBlob, fileName);

    try {
      const response = await fetch(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${NFT_STORAGE_TOKEN}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        const IpfsHash = data.IpfsHash; // Corrected the path to access IpfsHash
        console.log(IpfsHash);
        localStorage.setItem("image_uri", IpfsHash);
        console.log("Image uploaded successfully!");
      } else {
        console.error("Failed to upload image");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  }

  const saveToDevice = (blob, fileName) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleStopMedia = async () => {
    if (category === "video") {
      if (isRecording) {
        stopRecording(); // Stop the recording if it's ongoing
      } else {
        startRecording(); // Start recording if it hasn't started yet
      }
    } else if (category === "image") {
      takePicture();
    }

    // Check if the account is available
    if (!account) {
      console.error("Account not connected");
      return;
    }

    // Handle the media action (image or video)
    if (category === "image") {
      takePicture();
    } else if (category === "video") {
      stopRecording();
    }

    const contract = new Contract(
      abi,
      "0x03cbefe95450dddc88638f7b23f34d83fc48b570e476d87a608c07724aaaa342",
      account
    );

    // const call = contract.populate("crime_record", [["uri"], ["hhffffj"]]);

    // const b = byteArrayFromString(uri);
    // const result = await contract.crime_record(b);
    // console.log(result);
    // await provider.waitForTransaction(result.transaction_hash);

    // Execute the transaction with gasless option
    try {
      const transactionResponse = await executeCalls(
        account,
        JSON.parse(call),
        // { gasTokenAddress: gasTokenPrice?.tokenAddress, maxGasTokenAmount },
        {},
        options
      );
      console.log("Transaction successful:", transactionResponse);
    } catch (error) {
      console.error("Transaction failed:", error);
    }

    // console.log(transactionResponse);
    // return transactionResponse;
  };

  useEffect(() => {
    if (category === "video") {
      startRecording();
    } else if (category === "image") {
      startCamera();
    }
  }, []);

  const route = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined" && navigator?.mediaDevices) {
      navigator.mediaDevices.enumerateDevices().then((devices) => {
        devices.forEach((device) => {
          console.log(
            device.kind + ": " + device.label + " id = " + device.deviceId
          );
        });
      });
    }
  }, []);

  return (
    <div className="w-full flex flex-col mt-10 items-center gap-6 ">
      <p className="text-white text-xl">{text}</p>
      <div className="bg-gradient-to-r from-[#0094ff] to-[#A02294] w-[50%] p-[1px] rounded-xl">
        <div
          className="w-full h-full flex flex-col justify-center items-center rounded-xl p-10"
          style={{
            backgroundColor: "#1e2f37",
            backgroundImage: `url(${bg.src})`,
            backgroundSize: "contain",
          }}
        >
          <div id="vid-recorder" className="w-full">
            <video
              ref={videoRef}
              autoPlay
              muted
              id="web-cam-container"
              className="rounded-xl mb-6 w-full"
            >
              Your browser doesn&apos;t support the video tag
            </video>
            <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
          </div>
          <div className="flex items-center space-x-4">
            <button onClick={switchCamera}>
              <Icons icon={icon3} text={`Switch Camera`} />
            </button>
            <button
              onClick={handleStopMedia}
              // disabled={
              //   loading || (!gasTokenPrice && paymasterRewards.length == 0)
              // }
            >
              <Icons icon={icon1} text={imgText} />
            </button>
          </div>
          {loading ? "Processing..." : "Stop Media"}
        </div>
      </div>
    </div>
  );
};
