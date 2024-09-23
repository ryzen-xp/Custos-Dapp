"use client";
import React, { useContext, useEffect, useState, useRef , useCallback } from "react";
import bg from "../../../../public/Rectangle.png";
import icon3 from "../../../../public/rotate.png";
import Icons from "./Icons";
import { provider, useWriteToContract } from "@/utils/fetchcontract";
import { useRouter } from "next/navigation";
import { NFTStorage } from "nft.storage";
import { WalletContext, WalletProvider } from "@/components/walletprovider";
import {
  executeCalls,
  fetchAccountCompatibility,
  fetchAccountsRewards,
  fetchGasTokenPrices,
  GasTokenPrice,
  getGasFeesInGasToken,
  SEPOLIA_BASE_URL,
} from "@avnu/gasless-sdk";

const NFT_STORAGE_TOKEN = '';
export const Recording = ({ text, icon1, imgText, uri, category }) => {
  const { account } = useContext(WalletContext);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [mediaStream, setMediaStream] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [currentFacingMode, setCurrentFacingMode] = useState('environment');
  const [isRecording, setIsRecording] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tx, setTx] = useState();
  const [paymasterRewards, setPaymasterRewards] = useState([]);
  const [gasTokenPrices, setGasTokenPrices] = useState([]);
  const [gasTokenPrice, setGasTokenPrice] = useState();
  const [maxGasTokenAmount, setMaxGasTokenAmount] = useState();
  const [gaslessCompatibility, setGaslessCompatibility] = useState();
  const [errorMessage, setErrorMessage] = useState();

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
    const calls = []; // Add your specific transaction calls here.
    estimateCalls(account, calls).then((fees) => {
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
        mediaStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [mediaStream]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: currentFacingMode },
        audio: true
      });
      videoRef.current.srcObject = stream;
      videoRef.current.muted = true; // Mute video element
      setMediaStream(stream);
    } catch (error) {
      console.error('Error accessing the camera', error);
      alert('Error accessing the camera: ' + error.message);
    }
  };

  const stopCamera = () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setMediaStream(null);
    }
  };

  const startRecording = async () => {
    await startCamera();
    const recorder = new MediaRecorder(mediaStream);
    recorder.ondataavailable = event => setRecordedChunks(prev => [...prev, event.data]);
    recorder.onstop = async () => {
      const blob = new Blob(recordedChunks, { type: 'video/webm' });
      saveToDevice(blob, 'video.webm');
      await uploadToIPFS(blob, 'video.webm');
      stopCamera();
      setRecordedChunks([]);
      
    };
    recorder.start();
    setMediaRecorder(recorder);
    setIsRecording(true);
  };
  

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  const takePicture = async () => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.error("Canvas element not available");
      return;
    }
    const context = canvas.getContext('2d');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    const dataURL = canvas.toDataURL('image/png');
    const blob = await fetch(dataURL).then(res => res.blob());
    await uploadToIPFS(blob, 'image.png');
    saveToDevice(blob, 'photo.png');
  };


  const switchCamera = async () => {
    setCurrentFacingMode(prev => (prev === 'user' ? 'environment' : 'user'));
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
    formData.append('file', fileBlob, fileName);

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
  };

  const saveToDevice = (blob, fileName) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleStopMedia = async () => {
     if (category === "video") {
      startRecording();
    } else if (category === "image") {
      takePicture();
    }

    const { result } = useWriteToContract("crime", "cover_crime", [uri]);

    // Check if the account is available
    if (!account) {
      console.error("Account not connected");
      return;
    }

    // Handle the media action (image or video)
   
    // Execute the transaction with gasless option
    try {
      const transactionResponse = await executeCalls(
        account,
        result, // Assuming result is the call data
        {
          gasTokenAddress: gasTokenPrice?.tokenAddress,
          maxGasTokenAmount, // Pass the calculated max gas token amount if available
        },
        options // Your GaslessOptions object
      );

      // Log or handle the transaction response if needed
      console.log("Transaction successful:", transactionResponse);
    } catch (error) {
      console.error("Transaction failed:", error);
    }
    console.log(result);

    return result;
  };

  useEffect(() => {
    if (category === "video") {
      startRecording();
    } else if (category === "image") {
      startCamera();
    }
  }, []);

  const route = useRouter();

  navigator.mediaDevices.enumerateDevices().then(devices => {
    devices.forEach(device => {
      console.log(device.kind + ": " + device.label + " id = " + device.deviceId);
    });
  });
  

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
            <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
          </div>
          <div className="flex items-center space-x-4">
            <button onClick={switchCamera}>
              <Icons icon={icon3} text={`switch camera`} />
            </button>
            <button
              onClick={handleStopMedia}
              // disabled={
              //   loading || (!gasTokenPrice && paymasterRewards.length == 0)
              // }
            >
              <Icons icon={icon1} text={imgText} />
              {loading ? "Processing..." : ""}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
