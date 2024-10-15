 "use client";
// import React, { useContext, useEffect, useState } from "react";
// import { Upload } from "./Upload";
// import { UseReadContractData } from "@/utils/fetchcontract";
// import { WalletContext } from "@/components/walletprovider";
// import NoRecordScreen from "./NoRecordScreen";

// const Uploads = () => {
//   const { address } = useContext(WalletContext);
//   const [readData, setReadData] = useState([]);
//   const [uri, setUri] = useState([]);

//   useEffect(() => {
//     const retrieve = async () => {
//       let { fetchData } = UseReadContractData();
//       let result = await fetchData("crime", "get_all_user_uploads", [address]);
//       let arr = Object.keys(result);
//       setReadData(arr);
//     };

//     retrieve();
//   }, [address]);

//   useEffect(() => {
//     const userUploads = async () => {
//       let items = await Promise.all(
//         readData.map(async (data) => {
//           let { fetchData } = UseReadContractData();
//           let uploads = await fetchData("crime", "get_token_uri", [data]);
//           return uploads;
//         })
//       );
//       setUri(items);
//     };

//     if (readData.length) userUploads();
//   }, [readData]);

//   if (!address || readData.length === 0) {
//     return <NoRecordScreen />;
//   }

//   return (
//     <div className="grid grid-cols-3 w-100">
//       {readData.map((data, index) => {
//         return <Upload key={index} uri={uri[index]} />;
//       })}
//     </div>
//   );
// };
import React, { useContext, useEffect, useState } from "react";
import { WalletContext } from "@/components/walletprovider"; 
import NoRecordScreen from "./NoRecordScreen";

const Uploads = () => {
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
  

  // Function to format date to show month, day name, and date
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      weekday: 'long', // e.g., Monday
      year: 'numeric',
      month: 'long',  // e.g., January
      day: 'numeric'  // e.g., 10
    });
  };

 // Function to download the file (image or video) by fetching the file as a blob first
const handleDownload = async (file) => {
  try {
    const response = await fetch(`https://gateway.pinata.cloud/ipfs/${file.ipfsHash}`);
    const blob = await response.blob(); // Convert the file into a blob
    saveToDevice(blob, file.fileName); // Call saveToDevice with the blob and file name
  } catch (error) {
    console.error("Error downloading the file:", error);
  }
};

return (
   <div className="min-h-screen">
      <div className="p-6">
        {/* Check if there are uploaded files */}
        {!uploadedFiles.length ? (
          <NoRecordScreen/>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-white">
            {uploadedFiles.map((file, index) => (
              <div key={index} className="relative text-sm whitespace-nowrap mb-2 sm:mb-0 bg-transparent rounded-lg backdrop-blur-lg p-10 shadow-lg ">
                
                {/* Display image or video based on file type */}
                {isImageFile(file.fileName) ? (
                  <img
                    src={`https://gateway.pinata.cloud/ipfs/${file.ipfsHash}`}
                    alt={file.fileName}
                    className="w-full h-auto rounded"
                  />
                ) : isVideoFile(file.fileName) ? (
                  <video
                    src={`https://gateway.pinata.cloud/ipfs/${file.ipfsHash}`}
                    className="w-full h-auto rounded"
                  />
                ) : (
                  <p className="text-red-500">Unsupported file type</p>
                )}

                {/* Space under filename */}
                <p
                  className="w-full px-2 py-2 text-[#0094FF] rounded-[2em] border-slate-800 shadow-lg 
                  transform hover:scale-105 transition-transform duration-300 border-gradient2 bg-opacity-50 
                  backdrop-filter backdrop-blur-lg flex items-center text-left relative text-[0.8em] 
                  overflow-hidden text-ellipsis whitespace-nowrap max-w-full mt-4"
                  style={{ maxWidth: '250px' }}  // Adjust the size of the file name box
                >
                  {file.fileName}
                </p>

                {/* Space under timestamp */}
                <p className="text-sm flex mt-4">
                  <span className="text-[#EAFBFF]">Time Stamp: </span>
                  <span className="text-[#19B1D2] ml-1">{formatDate(file.timestamp)}</span>
                </p>

                {/* Download Button */}
                <button
          onClick={() => handleDownload(file)} // Call handleDownload with the file object
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