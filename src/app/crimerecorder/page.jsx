'use client'
import React, { useContext, useEffect, useState } from "react";
import { WalletContext } from "@/components/walletprovider";
import NoRecordScreen from "./components/NoRecordScreen";
import AgreementNav from "../agreement/components/AgreementNav";

const Uploads = () => {
  const { account } = useContext(WalletContext);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  useEffect(() => {
    const fetchUploadedFiles = () => {
      const files = JSON.parse(localStorage.getItem("user_files")) || [];
      const userFiles = files.filter(file => file.walletAddress === account?.address);
      setUploadedFiles(userFiles);
    };

    if (account?.address) {
      fetchUploadedFiles();
    }
  }, [account?.address]);

  const isImageFile = (fileName) => /\.(jpg|jpeg|png|gif|bmp)$/i.test(fileName);
  const isVideoFile = (fileName) => /\.(mp4|webm|ogg|mov)$/i.test(fileName);

  const handleDownload = async (file) => {
    try {
      const response = await fetch(`https://gateway.pinata.cloud/ipfs/${file.ipfsHash}`);
      const blob = await response.blob();
      saveToDevice(blob, file.fileName); // Save with the correct filename
    } catch (error) {
      console.error("Error downloading the file:", error);
    }
  };

  const saveToDevice = (blob, fileName) => {
    const uniqueFileName = `${Date.now()}-${fileName}`;
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = uniqueFileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }) + ' ' + date.toLocaleTimeString("en-US", {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

 // Function to download the file (image or video) by fetching the file as a blob first
// const handleDownload = async (file) => {
//   try {
//     const response = await fetch(`https://gateway.pinata.cloud/ipfs/${file.ipfsHash}`);
//     const blob = await response.blob(); // Convert the file into a blob
//     saveToDevice(blob, file.fileName); // Call saveToDevice with the blob and file name
//   } catch (error) {
//     console.error("Error downloading the file:", error);
//   }
// };

return (
   <div className="min-h-screen">
    <AgreementNav activeTab={'activeTab'} setActiveTab={'setActiveTab'} text={'Video Recorder'} mode={"video"}/>
      <div className="p-6">
        {!uploadedFiles.length ? (
          <NoRecordScreen />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-white">
            {uploadedFiles.map((file, index) => (
              <div key={index} className="relative text-sm whitespace-nowrap mb-2 sm:mb-0 bg-transparent rounded-lg backdrop-blur-lg p-10 shadow-lg">
                {isImageFile(file.fileName) ? (
                  // Load the image from IPFS using the IPFS hash
                  <img
                    src={`https://gateway.pinata.cloud/ipfs/${file.ipfsHash}`}
                    alt={file.fileName}
                    className="w-full h-auto rounded"
                  />
                ) : isVideoFile(file.fileName) ? (
                  // Load the video from IPFS using the IPFS hash
                  <video
                    src={`https://gateway.pinata.cloud/ipfs/${file.ipfsHash}`}
                    className="w-full h-auto rounded"
                    controls
                  />
                ) : (
                  <p className="text-red-500">Unsupported file type: {file.fileName}</p>
                )}

                <p
                  className="w-full px-2 py-2 text-[#0094FF] rounded-[2em] border-slate-800 shadow-lg
                  transform hover:scale-105 transition-transform duration-300 border-gradient2 bg-opacity-50
                  backdrop-filter backdrop-blur-lg flex items-center text-left relative text-[0.8em]
                  overflow-hidden text-ellipsis whitespace-nowrap max-w-full mt-4"
                  style={{ maxWidth: '250px' }}
                >
                  {file.fileName}
                </p>

                <p className="text-sm flex mt-4">
                  <span className="text-[#EAFBFF]">Time Stamp: </span>
                  <span className="text-[#19B1D2] ml-1">{formatDate(file.timestamp)}</span>
                </p>

                <button
                  onClick={() => handleDownload(file)}
                  className="inline-block mt-5 bg-[#0094FF] text-white py-2 px-4 rounded-[2em] mb-5"
                >
                  {isVideoFile(file.fileName) ? "Download Video" : "Download Image"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Uploads;
