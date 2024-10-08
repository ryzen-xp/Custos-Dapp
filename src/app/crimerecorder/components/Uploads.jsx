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

  return (
    <div className="min-h-screen">     
      <div className="p-6">
        {/* Check if there are uploaded files */}
        {!uploadedFiles.length ? (
          <NoRecordScreen/>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 text-white">
            {uploadedFiles.map((file, index) => (
             <div key={index} className=" text-[2em] whitespace-nowrap mb-2 sm:mb-0 bg-gradient-to-r from-[#0094FF] to-[#A02294] bg-clip-text text-transparent ">
               
                {/* Display image or video based on file type */}
                {isImageFile(file.fileName) ? (
                  <img
                    src={`https://gateway.pinata.cloud/ipfs/${file.ipfsHash}`}
                    alt={file.fileName}
                    className="w-full h-auto rounded-md"
                  />
                ) : isVideoFile(file.fileName) ? (
                  <video
                    src={`https://gateway.pinata.cloud/ipfs/${file.ipfsHash}`}
                    controls
                    className="w-full h-auto rounded-md"
                  />
                ) : (
                  <p className="text-red-500">Unsupported file type</p>
                )}
                <h3 className="font-bold text-lg mt-2">{file.fileName}</h3>
                <p className="text-sm text-gray-400">
                  Uploaded on: {new Date(file.timestamp).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Uploads;
