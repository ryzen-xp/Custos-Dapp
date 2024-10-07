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
const NFT_STORAGE_TOKEN = process.env.NEXT_PUBLIC_IPFS_KEY
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
  const recordedVideoRef = useRef(null);
  const photoRef = useRef(null); 


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

 

 
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: currentFacingMode },
        audio: true
      });
      setMediaStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.muted = true; // Mute to avoid feedback
        videoRef.current.style.display = 'block'; // Show the video feed when camera starts
      }
    } catch (error) {
      console.error('Error accessing the camera', error);
      alert('Error accessing the camera: ' + error.message);
    }
  };

  const stopCamera = () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach(track => track.stop());
      if (videoRef.current) {
        videoRef.current.srcObject = null;
        videoRef.current.style.display = 'none'; // Hide video feed when stopped
      }
      setMediaStream(null);
    }
  };

  const startRecording = async () => {
    await startCamera(); 
    if (!mediaStream) {
      console.error("Media stream not available");
      return;
    }
  
    const chunks = [];
    const recorder = new MediaRecorder(mediaStream); // Ensure mediaStream is not null
    recorder.ondataavailable = (event) => chunks.push(event.data);
    recorder.onstop = async () => {
      const blob = new Blob(chunks, { type: "video/webm" });
      saveToDevice(blob, `${Date.now()}-video.webm`); // Use unique name here
      await uploadToIPFS(blob, `${Date.now()}-video.webm`);
      stopCamera();
      if (recordedVideoRef.current) {
        recordedVideoRef.current.style.display = "none"; // Hide video on stop
      }
    };
  
    recorder.start();
    setIsRecording(true);
    setMediaRecorder(recorder);
    setRecordedChunks(chunks);
  };
  

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
    stopCamera();
  };

  const takePicture = async () => {
    const context = canvasRef.current.getContext('2d');
    canvasRef.current.width = videoRef.current.videoWidth;
    canvasRef.current.height = videoRef.current.videoHeight;
    context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);

    const dataURL = canvasRef.current.toDataURL('image/png');
    const blob = await fetch(dataURL).then(res => res.blob());
    await uploadToIPFS(blob, 'image.png');
    saveToDevice(blob, 'photo.png');
    photoRef.current.style.display = 'none'; // Hide photo after capture
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
    const uniqueFileName = `${Date.now()}-${fileName}`; // Add timestamp to create a unique filename
    const formData = new FormData();
    formData.append("file", fileBlob, uniqueFileName);
  
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
  
      if (!response.ok) {
        throw new Error("Failed to upload file to IPFS");
      }
  
      const data = await response.json();
      const ipfsHash = data.IpfsHash;
  
      console.log("IPFS Hash:", ipfsHash);
  
      // Store the IPFS hash locally for the current user
      localStorage.setItem("uri", ipfsHash);
      setUri(ipfsHash);
  
      if (!account) {
        console.error("Wallet not connected. Cannot associate file with account.");
        return;
      }
  
      // Additional logic to store IPFS hash and associate it with the wallet address
      const existingUserFiles = JSON.parse(localStorage.getItem("user_files")) || [];
  
      // Create an object for the current upload
      const newFileData = {
        walletAddress: account.address, // Ensure that account contains wallet details
        ipfsHash,
        fileName: uniqueFileName,
        timestamp: Date.now(),
      };
  
      // Update the array with the new file entry
      const updatedUserFiles = [...existingUserFiles, newFileData];
  
      // Save the updated array back to localStorage
      localStorage.setItem("user_files", JSON.stringify(updatedUserFiles));
  
      console.log("File uploaded successfully and data saved!");
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  }
  
  
  const saveToDevice = (blob, fileName) => {
    const uniqueFileName = `${Date.now()}-${fileName}`; // Add timestamp to create a unique filename
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = uniqueFileName;
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