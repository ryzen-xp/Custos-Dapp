"use client";
import React, { useContext, useEffect, useState, useRef, useMemo } from "react";
import bg from "../../../../public/Rectangle.png";
import icon3 from "../../../../public/rotate.png";
import Icons from "./Icons";
import { useRouter } from "next/navigation";
import { WalletContext } from "@/components/walletprovider";
import {
  executeCalls,
  fetchAccountCompatibility,
  fetchAccountsRewards,
  fetchGasTokenPrices,
  SEPOLIA_BASE_URL,
} from "@avnu/gasless-sdk";
import { byteArray, CallData } from "starknet";
import SuccessScreen from "./Success";

const NFT_STORAGE_TOKEN = process.env.NEXT_PUBLIC_IPFS_KEY;

export const Recording = ({ text, icon1, imgText, category }) => {
  const [uri, setUri] = useState("");

  const options = { baseUrl: SEPOLIA_BASE_URL };
  const calls = [
    {
      entrypoint: "crime_record",
      contractAddress:
        "0x03cbefe95450dddc88638f7b23f34d83fc48b570e476d87a608c07724aaaa342",
      calldata: CallData.compile([
        byteArray?.byteArrayFromString(String(uri)),
        0,
      ]),
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
  const [paymasterRewards, setPaymasterRewards] = useState([]);
  const [gasTokenPrices, setGasTokenPrices] = useState([]);
  const [gasTokenPrice, setGasTokenPrice] = useState();
  const [gaslessCompatibility, setGaslessCompatibility] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const callRef = useRef(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const route = useRouter();
  const closeModal = () => {
    setModalOpen(false);
    route.push("/crimerecorder/uploads");
  };

  useEffect(() => {
    if (uri !== "") {
      const calls = [
        {
          entrypoint: "crime_record",
          contractAddress:
            "0x03cbefe95450dddc88638f7b23f34d83fc48b570e476d87a608c07724aaaa342",
          calldata: CallData.compile([
            byteArray?.byteArrayFromString(String(uri)),
            0,
          ]),
        },
      ];
      callRef.current = JSON.stringify(calls, null, 2);
    }

    // Execute the transaction with gasless option
    const triggerWallet = async () => {
      if (uri) {
        try {
          if (uri !== "") {
            const transactionResponse = await executeCalls(
              account,
              JSON.parse(callRef.current),
              {},
              { ...options, apiKey: process.env.NEXT_PUBLIC_AVNU_KEY }
            );
            console.log("Transaction successful:", transactionResponse);
            setModalOpen(true);
          }
        } catch (error) {
          console.error("Transaction failed:", error);
        }
      }
    };

    if (uri !== "") triggerWallet();
  }, [uri]);

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

  useEffect(() => {
    if (!account || !gasTokenPrice || !gaslessCompatibility) return;
    setErrorMessage(undefined);
  }, [account, gasTokenPrice, gaslessCompatibility]);

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
        setUri(IpfsHash);
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
  };

  useEffect(() => {
    if (category === "video") {
      startRecording();
    } else if (category === "image") {
      startCamera();
    }
  }, []);

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
    <div className="w-full flex flex-col mt-10 items-center gap-6">
      <SuccessScreen open={isModalOpen} onClose={closeModal} />
      <p className="text-white text-xl">{text}</p>
      <div className="bg-gradient-to-r from-[#0094ff] to-[#A02294] w-[50%] p-[1px] rounded-xl md:mb-5">
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
            <button onClick={handleStopMedia}>
              <Icons icon={icon1} text={imgText} />
            </button>
          </div>
          {loading ? "Processing..." : "Stop Media"}
        </div>
      </div>
    </div>
  );
};
