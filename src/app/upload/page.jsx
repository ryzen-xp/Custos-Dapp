"use client";
import Sidepane from "@/components/dapps/sidepane";
import Navbar from "@/components/navbar";
import React, { useContext, useEffect, useState } from "react";
import { WalletContext } from "@/components/walletprovider"; // Assuming this is where your WalletContext is defined
import NoRecordScreen from "../crimerecorder/components/NoRecordScreen";

const UploadsPage = () => {
  const { account } = useContext(WalletContext); // Using WalletContext to get connected account
  const [uploadedFiles, setUploadedFiles] = useState([]);

  useEffect(() => {
    // Retrieve the uploaded files from localStorage
    const fetchUploadedFiles = () => {
      const files = JSON.parse(localStorage.getItem("user_files")) || [];
      // Filter files by the connected wallet address
      const userFiles = files.filter(file => file.walletAddress === account?.address);
      setUploadedFiles(userFiles);
    };

    if (account?.address) {
      fetchUploadedFiles();
    }
  }, [account?.address]); // Re-run the effect when the wallet address changes

  // Function to check if a file is an image or video
  const isImageFile = (fileName) => {
    return /\.(jpg|jpeg|png|gif|bmp)$/i.test(fileName);
  };

  const isVideoFile = (fileName) => {
    return /\.(mp4|webm|ogg|mov)$/i.test(fileName);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="p-6">
        {/* Check if there are uploaded files */}
        {!uploadedFiles.length ? (
          <NoRecordScreen/>
        ) : (
          <div className="grid grid-cols-3 gap-4 text-white">
            {uploadedFiles.map((file, index) => (
              <div key={index} className=" text-[2em] whitespace-nowrap mb-2 sm:mb-0 bg-gradient-to-r from-[#0094FF] to-[#A02294] bg-clip-text text-transparent ">
                {/* Display image or video based on file type */}
                {isImageFile(file.fileName) ? (
                  <img
                    src={`https://gateway.pinata.cloud/ipfs/${file.ipfsHash}`}
                    alt={file.fileName}
                    className="w-full h-auto mt-2"
                  />
                ) : isVideoFile(file.fileName) ? (
                  <video
                    src={`https://gateway.pinata.cloud/ipfs/${file.ipfsHash}`}
                    controls
                    className="w-full h-auto mt-2"
                  />
                ) : (
                  <p className="text-red-500 mt-2">Unsupported file type</p>
                )}
                <h3 className="font-bold text-lg">{file.fileName}</h3>
                <p className="text-sm text-gray-600">
                  Uploaded on: {new Date(file.timestamp).toLocaleString()}
                </p>
                <a
                  href={`https://gateway.pinata.cloud/ipfs/${file.ipfsHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline mt-2 block"
                >
                  View File
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadsPage;
