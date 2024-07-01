"use client";

import React from "react";
import { Header } from "./components/Header";
import { Record } from "./components/Record";
import icon1 from "../../../public/record2.png";
import icon2 from "../../../public/picture.png";
import Uploads from "./components/Uploads";

const Recorder = () => {
  const text = {
    text1: `You can record a video, or take a picture to keep on the blockchain`,
  };
  ("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDAxMmMyMDQxOTMxZjBCMTk5MjRFNjk4NjcxMDE0YzJjYjY4RWNGNjMiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTcwNzc0NjU2NTkxMCwibmFtZSI6IkN5YmVyICJ9.AvvSAu9TIQV5uXXpWZ68c_0j0RGbNbc69aBjDzFDPIs");

  return (
    <div className="h-screen w-full m-10">
      <Header />
      <div className="flex flex-col items-center">
        <Record text={text.text1} icon1={icon1} icon2={icon2} />
        {/* <Uploads /> */}
      </div>
    </div>
  );
};

export default Recorder;

/* eslint-disable react/no-unescaped-entities */
// "use client";

// import React, { useState, useEffect } from "react";
// import { NFTStorage } from "nft.storage";
// import { Header } from "./components/Header";
// import { Record } from "./components/Record";
// import Uploads from "./components/Uploads";
// import icon1 from "../../../public/record2.png";
// import icon2 from "../../../public/picture.png";

// const NFT_STORAGE_TOKEN = process.env.NEXT_PUBLIC_TOKEN;
// Replace with your actual token

// const Recorder = () => {

//   return (
//     <div>
//       <Header />
//       <div className="flex flex-col items-center justify-center h-screen">
//         <div className="display-none" id="vid-recorder">
//           <h3>Record Video</h3>
//           <video
//             autoPlay
//             id="web-cam-container"
//             className="mb-4"
//             style={{ backgroundColor: "white" }}
//           >
//             Your browser doesn't support the video tag
//           </video>

//           <div className="recording mb-4" id="vid-record-status">
//             Click the "Start" button to start capturing
//           </div>

//           <button
//             type="button"
//             id="start-vid-recording"
//             onClick={(e) =>
//               startRecording(
//                 e.target,
//                 document.getElementById("stop-vid-recording")
//               )
//             }
//             className="bg-[#c92eff] w-fit rounded-lg hover:bg-[#090909] text-white font-bold py-2 px-4 border-2 border-[#c92eff] font-san hover:border-[#c92eff]"
//           >
//             Start
//           </button>

//           <button
//             type="button"
//             id="take-picture"
//             onClick={takePicture}
//             className="bg-[#c92eff] w-fit rounded-lg hover:bg-[#090909] text-white mx-3 font-bold py-2 px-4 border-2 border-[#c92eff] font-san hover:border-[#c92eff]"
//           >
//             Take Picture
//           </button>

//           <button
//             type="button"
//             id="stop-vid-recording"
//             onClick={stopRecording}
//             className="bg-[#c92eff] w-fit rounded-lg hover:bg-[#090909] text-white font-bold py-2 px-4 border-2 border-[#c92eff] font-san hover:border-[#c92eff]"
//           >
//             Stop
//           </button>
//           <a
//             id="download-video"
//             style={{ display: "none" }}
//             href={videoUrl}
//             download="recorded-video.webm"
//           >
//             Download Video
//           </a>
//           <a
//             id="download-image"
//             style={{ display: "none" }}
//             href={imageUrl}
//             download="captured-image.png"
//           >
//             Download Image
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Recorder;
