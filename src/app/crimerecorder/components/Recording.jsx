"use client";
import React, { useContext, useEffect, useState } from "react";
import bg from "../../../../public/Rectangle.png";
import icon3 from "../../../../public/rotate.png";
import Icons from "./Icons";
import { useWriteToContract } from "@/utils/fetchcontract";
import { useRouter } from "next/navigation";
import { NFTStorage } from "nft.storage";
import { WalletContext } from "@/components/walletprovider";

const NFT_STORAGE_TOKEN = process.env.NEXT_IPFS_KEY;

export const Recording = ({ text, icon1, imgText, uri, category }) => {
  const { account } = useContext(WalletContext);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [chunks, setChunks] = useState([]);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [mediaStream, setMediaStream] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [facingMode, setFacingMode] = useState("user"); // "user" for front camera, "environment" for back camera

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
        // document.getElementById("vid-record-status").innerText =
        //   'Click the "Stop" button to stop recording';

        // thisButton.disabled = true;
        // otherButton.disabled = false;

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
      // document.getElementById("vid-record-status").innerText =
      //   'Click the "Start" button to start recording';

      try {
        // Convert recorded chunks to a single Blob
        const videoBlob = new Blob(chunks, { type: "video/webm" });

        // Create FormData object and append the video Blob to it
        const formData = new FormData();
        formData.append("file", videoBlob, "recorded-video.webm"); // Ensure correct field name ('file')

        // Send FormData to the backend using fetch or Axios
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
          // Handle upload failure
          console.error("Failed to upload video");
        }
      } catch (error) {
        console.error("Error uploading video:", error);
      }
      // window.location.reload();
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

  const { result } = useWriteToContract("crime", "cover_crime", [uri]);
  const handleStopMedia = () => {
    if (category === "image") {
      takePicture();
    } else if (category === "video") {
      stopRecording();
    }
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
  console.log(result);

  // Function to switch the camera from front to back and vice versa
  const switchCamera = () => {
    setFacingMode((prevMode) => {
      const newMode = prevMode === "user" ? "environment" : "user";
      alert(`Switched to ${newMode === "user" ? "front" : "back"} camera.`);
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
              id="web-cam-container"
              className="rounded-xl mb-6 w-full"
            >
              Your browser doesn&apos;t support the video tag
            </video>
          </div>
          <div className="flex items-center space-x-4">
  <button onClick={switchCamera}>
  <Icons icon={icon3} text={`switch camera`} />    
  </button>
  <button onClick={handleStopMedia}>
    <Icons icon={icon1} text={imgText} />
  </button>
</div>
        </div>
      </div>
    </div>
  );
};
