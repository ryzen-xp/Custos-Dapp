"use client";
import React, { useContext, useEffect, useState, useCallback } from "react";
import bg from "../../../../public/Rectangle.png";
import icon3 from "../../../../public/rotate.png";
import Icons from "./Icons";
import { provider, useWriteToContract } from "@/utils/fetchcontract";
import { useRouter } from "next/navigation";
import { NFTStorage } from "nft.storage";
import { WalletContext, WalletProvider } from "@/components/walletprovider";
import crimeContractAbi from "../../../utils/coverCrimeAbi.json";
import {
  executeCalls,
  fetchAccountCompatibility,
  fetchAccountsRewards,
  fetchGasTokenPrices,
  GasTokenPrice,
  getGasFeesInGasToken,
  SEPOLIA_BASE_URL,
} from "@avnu/gasless-sdk";
import { Contract, byteArray } from "starknet";

const NFT_STORAGE_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJmZGNiMzgxZS1iNDYxLTQ0ODAtYWQ5Zi0wZTAxN2QwMjgwMWYiLCJlbWFpbCI6ImplcnlkYW4xNDhAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjYyOTg0ZTY1NTY4ZGUxYjk5MDNiIiwic2NvcGVkS2V5U2VjcmV0IjoiMjdlMjg1YTA0MmVlOGMyMTQ5MzQ1ZjA1ZjhlYTYyMzRkM2I2MWZiYjU3M2ZmNzIxMzU1OWMwNGIxOGE3NzJhYSIsImlhdCI6MTcyNDE2MzU3Mn0.2PAyS8Y_NX17idFPsk6-_b0kg5vGfr0TOlqla49iNKA";

export const Recording = ({ text, icon1, imgText, uri, category }) => {
  const { account } = useContext(WalletContext);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [chunks, setChunks] = useState([]);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [mediaStream, setMediaStream] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [facingMode, setFacingMode] = useState("user"); // "user" for front camera, "environment" for back camera
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
    const calls = [
      {
        entrypoint: "approve",
        contractAddress:
          "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
        calldata: [
          "0x0498E484Da80A8895c77DcaD5362aE483758050F22a92aF29A385459b0365BFE",
          "0xf",
          "0x0",
        ],
      },
    ]; // Add your specific transaction calls here.
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

  const startRecording = () => {
    const constraints = {
      video: { facingMode: facingMode },
      audio: true,
    };
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((mediaStream) => {
        const video = document.getElementById("web-cam-container");
        video.srcObject = mediaStream;
        setMediaStream(mediaStream);

        document.getElementById("vid-recorder").style.display = "block";

        const mediaRecorder = new MediaRecorder(mediaStream);
        setMediaRecorder(mediaRecorder);

        mediaRecorder.start();

        mediaRecorder.onstop = () => {
          const videoBlob = new Blob(chunks, { type: "video/webm" });
          const videoUrl = URL.createObjectURL(videoBlob);
          setVideoUrl(videoUrl);
        };

        mediaRecorder.ondataavailable = (event) => {
          setChunks((prevChunks) => [...prevChunks, event.data]);
        };
      })
      .catch((err) => {
        console.error("Error accessing camera:", err);
      });
  };

  const stopRecording = async () => {
    if (mediaRecorder && mediaRecorder.state === "recording") {
      mediaRecorder.stop();
      document.getElementById("vid-recorder").style.display = "none";

      // Stop all media tracks
      mediaStream.getTracks().forEach((track) => track.stop());

      try {
        const videoBlob = new Blob(chunks, { type: "video/webm" });

        const formData = new FormData();
        formData.append("file", videoBlob, "recorded-video.webm");

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
          const IpfsHash = data.IpfsHash;
          console.log(IpfsHash);
          localStorage.setItem("video_uri", IpfsHash);
          alert("File uploaded successfully!");
        } else {
          console.error("Failed to upload video");
        }
      } catch (error) {
        console.error("Error uploading video:", error);
      }
    }
  };

  const startCamera = () => {
    const constraints = { video: true, audio: false };
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((mediaStream) => {
        const video = document.getElementById("web-cam-container");
        video.srcObject = mediaStream;
        setMediaStream(mediaStream);
      })
      .catch((err) => {
        console.error("Error accessing camera:", err);
      });
  };

  const takePicture = async () => {
    const video = document.getElementById("web-cam-container");
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageDataUrl = canvas.toDataURL();
    setImageUrl(imageDataUrl);

    // Display the download button if it exists
    const downloadButton = document.getElementById("download-image");
    if (downloadButton) {
      downloadButton.style.display = "block";
    }

    try {
      // Convert the captured image to a Blob
      const blob = await fetch(imageDataUrl).then((res) => res.blob());

      // Create FormData object and append the image blob to it
      const formData = new FormData();
      formData.append("file", blob, "captured-image.png"); // 'file' should match the key expected by the backend

      // Send FormData to IPFS using fetch
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

  const crimeContractAddress =
    "0x03cbefe95450dddc88638f7b23f34d83fc48b570e476d87a608c07724aaaa342";

  const contract = new Contract(
    crimeContractAbi,
    crimeContractAddress,
    account
  );
  console.log(account);
  const handleStopMedia = async () => {
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

    const call = contract.populate("crime_record", [
      ["uri"],
      ["hgfssdffghhhf"],
    ]);

    const b = byteArrayFromString(uri);
    const result = await contract.crime_record(b);
    console.log(result);
    await provider.waitForTransaction(result.transaction_hash);

    // Execute the transaction with gasless option
    try {
      const transactionResponse = await executeCalls(
        account,
        JSON.stringify(call),
        {},
        { apiKey: "" }
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
    if (videoUrl) {
      const downloadLink = document.createElement("a");
      downloadLink.href = videoUrl;
      downloadLink.download = "recorded-video.webm";
      document.body.appendChild(downloadLink);
      downloadLink.id = "download-video";
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  }, [videoUrl]);

  useEffect(() => {
    if (imageUrl) {
      const downloadLink = document.createElement("a");
      downloadLink.href = imageUrl;
      downloadLink.download = "captured-image.png";
      document.body.appendChild(downloadLink);
      downloadLink.id = "download-image";
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  }, [imageUrl]);

  useEffect(() => {
    if (category === "video") {
      startRecording();
    } else if (category === "image") {
      startCamera();
    }
  }, []);

  const route = useRouter();

  // Function to switch the camera from front to back and vice versa
  const switchCamera = () => {
    setFacingMode((prevMode) => {
      const newMode = prevMode === "user" ? "environment" : "user";
      alert(`Switched to ${newMode === "user" ? "front" : "back"} camera.`);

      // Stop the current media stream
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => track.stop());
      }

      // Restart the camera with the new facing mode
      const constraints = {
        video: { facingMode: newMode },
        audio: true,
      };

      navigator.mediaDevices
        .getUserMedia(constraints)
        .then((stream) => {
          const video = document.getElementById("web-cam-container");
          video.srcObject = stream;
          setMediaStream(stream);
        })
        .catch((err) => {
          console.error("Error switching camera:", err);
        });

      return newMode;
    });

    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => track.stop());
      startCamera();
    }
  };

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
              autoPlay
              muted
              id="web-cam-container"
              className="rounded-xl mb-6 w-full"
            >
              Your browser doesn&apos;t support the video tag
            </video>
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
