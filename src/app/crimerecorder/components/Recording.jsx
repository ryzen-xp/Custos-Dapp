// "use client";
// import React, { useEffect, useState } from "react";
// import bg from "../../../../public/Rectangle.png";
// import Icons from "./Icons";
// import { TransactionButton } from "thirdweb/react";
// // import { useWriteToContract } from "@/utils/fetchcontract";
// import { useRouter } from "next/navigation";
// import { NFTStorage } from "nft.storage";

// const NFT_STORAGE_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJmZGNiMzgxZS1iNDYxLTQ0ODAtYWQ5Zi0wZTAxN2QwMjgwMWYiLCJlbWFpbCI6ImplcnlkYW4xNDhAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjYyOTg0ZTY1NTY4ZGUxYjk5MDNiIiwic2NvcGVkS2V5U2VjcmV0IjoiMjdlMjg1YTA0MmVlOGMyMTQ5MzQ1ZjA1ZjhlYTYyMzRkM2I2MWZiYjU3M2ZmNzIxMzU1OWMwNGIxOGE3NzJhYSIsImlhdCI6MTcyNDE2MzU3Mn0.2PAyS8Y_NX17idFPsk6-_b0kg5vGfr0TOlqla49iNKA";

export const Recording = ({ text, icon1, imgText, uri, category }) => {
//   const [selectedMedia, setSelectedMedia] = useState(null);
//   const [chunks, setChunks] = useState([]);
//   const [mediaRecorder, setMediaRecorder] = useState(null);
//   const [mediaStream, setMediaStream] = useState(null);
//   const [videoUrl, setVideoUrl] = useState(null);
//   const [imageUrl, setImageUrl] = useState(null);
//   const [facingMode, setFacingMode] = useState("user"); // "user" for front camera, "environment" for back camera

//   const clients = new NFTStorage({ token: NFT_STORAGE_TOKEN });

//   const otherRecorder = (selectedMedia) => {
//     return selectedMedia === "vid" ? "aud" : "vid";
//   };

//   const handleMediaChange = (e) => {
//     const selectedMedia = e.target.value;
//     setSelectedMedia(selectedMedia);
//     document.getElementById(`${selectedMedia}-recorder`).style.display =
//       "block";
//     document.getElementById(
//       `${otherRecorder(selectedMedia)}-recorder`
//     ).style.display = "none";
//   };

//   const startRecording = (thisButton, otherButton) => {
//     const constraints = {
//       video: { facingMode: facingMode },
//       audio: true,
//     };
//     navigator.mediaDevices
//       .getUserMedia(constraints)
//       .then((mediaStream) => {
//         const video = document.getElementById("web-cam-container");
//         video.srcObject = mediaStream;
//         setMediaStream(mediaStream);

//         document.getElementById("vid-recorder").style.display = "block";
//         // document.getElementById("vid-record-status").innerText =
//         //   'Click the "Stop" button to stop recording';

//         // thisButton.disabled = true;
//         // otherButton.disabled = false;

//         const mediaRecorder = new MediaRecorder(mediaStream);
//         setMediaRecorder(mediaRecorder);

//         mediaRecorder.start();

//         mediaRecorder.onstop = () => {
//           const videoBlob = new Blob(chunks, { type: "video/webm" });
//           const videoUrl = URL.createObjectURL(videoBlob);
//           setVideoUrl(videoUrl);
//         };

//         mediaRecorder.ondataavailable = (event) => {
//           setChunks((prevChunks) => [...prevChunks, event.data]);
//         };
//       })
//       .catch((err) => {
//         console.error("Error accessing camera:", err);
//       });
//   };

//   const stopRecording = async () => {
//     if (mediaRecorder && mediaRecorder.state === "recording") {
//       mediaRecorder.stop();
//       document.getElementById("vid-recorder").style.display = "none";
//       // document.getElementById("vid-record-status").innerText =
//       //   'Click the "Start" button to start recording';

//       try {
//         // Convert recorded chunks to a single Blob
//         const videoBlob = new Blob(chunks, { type: "video/webm" });

//         // Create FormData object and append the video Blob to it
//         const formData = new FormData();
//         formData.append("file", videoBlob, "recorded-video.webm"); // Ensure correct field name ('file')

//         // Send FormData to the backend using fetch or Axios
//         const response = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${NFT_STORAGE_TOKEN}`,
//           },
//           body: formData,
//         });

//         if (response.ok) {
//           const data = await response.json();
//           const cid = data.value.cid;
//           console.log(cid);
//           localStorage.setItem("video_uri", cid);
//           alert("File uploaded successfully!");
//         } else {
//           // Handle upload failure
//           console.error("Failed to upload video");
//         }
//       } catch (error) {
//         console.error("Error uploading video:", error);
//       }
//       // window.location.reload();
//     }
//   };

//   const startCamera = () => {
//     const constraints = { video: true, audio: false };
//     navigator.mediaDevices
//       .getUserMedia(constraints)
//       .then((mediaStream) => {
//         const video = document.getElementById("web-cam-container");
//         video.srcObject = mediaStream;
//         setMediaStream(mediaStream);
//       })
//       .catch((err) => {
//         console.error("Error accessing camera:", err);
//       });
//   };

//   const takePicture = async () => {
//     const video = document.getElementById("web-cam-container");
//     const canvas = document.createElement("canvas");
//     canvas.width = video.videoWidth;
//     canvas.height = video.videoHeight;
//     canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
//     const imageDataUrl = canvas.toDataURL();
//     setImageUrl(imageDataUrl);
//     document.getElementById("download-image") != null
//       ? (document.getElementById("download-image").style.display = "block")
//       : null;

//     try {
//       // Convert the captured image to a Blob
//       const blob = await fetch(imageDataUrl).then((res) => res.blob());

//       // Create FormData object and append the image blob to it
//       const formData = new FormData();
//       formData.append("file", blob, "captured-image.png"); // 'file' should match the key expected by the backend

//       // Send FormData to IPFS using fetch
//       const response = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${NFT_STORAGE_TOKEN}`,
//         },
//         body: formData,
//       });

//       if (response.ok) {
//         const data = await response.json();
//         const cid = data.value.cid;
//         console.log(cid);
//         localStorage.setItem("image_uri", cid);
//         console.log("Image uploaded successfully!");
//       } else {
//         console.error("Failed to upload image");
//       }
//     } catch (error) {
//       console.error("Error uploading image:", error);
//     }
//   };

//   const handleStopMedia = () => {
//     if (category === "image") {
//       takePicture();
//     } else if (category === "video") {
//       stopRecording();
//     }
//   };

//   useEffect(() => {
//     if (videoUrl) {
//       const downloadLink = document.createElement("a");
//       downloadLink.href = videoUrl;
//       downloadLink.download = "recorded-video.webm";
//       document.body.appendChild(downloadLink);
//       downloadLink.id = "download-video";
//       downloadLink.click();
//       document.body.removeChild(downloadLink);
//     }
//   }, [videoUrl]);

//   useEffect(() => {
//     if (imageUrl) {
//       const downloadLink = document.createElement("a");
//       downloadLink.href = imageUrl;
//       downloadLink.download = "captured-image.png";
//       document.body.appendChild(downloadLink);
//       downloadLink.id = "download-image";
//       downloadLink.click();
//       document.body.removeChild(downloadLink);
//     }
//   }, [imageUrl]);

//   useEffect(() => {
//     if (category === "video") {
//       startRecording();
//     } else if (category === "image") {
//       startCamera();
//     }
//   }, []);

//   const route = useRouter();
//   const {
//     sendTransaction,
//     transaction,
//     isPending,
//     isLoading,
//     error,
//     data,
//     isSuccess,
//   } = useWriteToContract("crime", "function coverCrime(string uri)", [uri]);

//   const switchCamera = () => {
//     setFacingMode((prevMode) => (prevMode === "user" ? "environment" : "user"));
//   };

//   return (
//     <div className="w-full flex flex-col mt-10 items-center gap-6 ">
//       <p className="text-white text-xl">{text}</p>
//       <div className="bg-gradient-to-r from-[#0094ff] to-[#A02294] w-[50%] p-[1px] rounded-xl">
//         <div
//           className="w-full h-full flex flex-col justify-center items-center rounded-xl p-10"
//           style={{
//             backgroundColor: "#1e2f37",
//             backgroundImage: `url(${bg.src})`,
//             backgroundSize: "contain",
//           }}
//         >
//           <div id="vid-recorder" className="w-full">
//             <video
//               autoPlay
//               id="web-cam-container"
//               className="rounded-xl mb-6 w-full"
//             >
//               Your browser doesn&apos;t support the video tag
//             </video>
//           </div>
//           <button onClick={switchCamera} className="switch-camera-button">
//             Switch Camera
//           </button>
//           <TransactionButton
//             theme={"light"}
//             onClick={handleStopMedia}
//             transaction={() => {
//               return transaction;
//             }}
//             onTransactionSent={(result) => {
//               console.log("Transaction submitted", result.transactionHash);
//             }}
//             onTransactionConfirmed={(receipt) => {
//               console.log("Transaction confirmed", receipt.transactionHash);
//               route.push("/crimerecorder");
//             }}
//             onError={(error) => {
//               console.error("Transaction error", error);
//             }}
//           >
//             <Icons icon={icon1} text={imgText} />
//           </TransactionButton>
//         </div>
//       </div>
//     </div>
//   );
};
