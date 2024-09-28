'use client'
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/dapps/header";

const NoRecordingScreen = () => {
  
  // Callback function to handle header toggle
  

  return (
    <div>
      {/* Header */}
     

      {/* Main content of the page */}
      <div className={`m-auto w-full text-center items-center flex flex-col space-y-4 px-4 sm:px-8 md:px-16 lg:px-24 transition-all duration-300 `}>
        <Image
          src="/gifs/noagreement.gif"
          alt="norecording"
          width={200}
          height={200}
          className="w-[100px] sm:w-[150px] md:w-[200px]" // Responsive sizing for the image
        />
        <p className="text-[#EAFBFF] text-sm sm:text-base md:text-lg lg:text-xl">
          You have not saved any video or image on the blockchain yet. Launch your camera to record your evidence.
        </p>

        <Link href="/crimerecorder/record">
          <button className="launch-pad-button-container flex justify-center items-center p-4 rounded-md transition-all duration-300">
            <img
              src="./Button.png"
              alt="Zoom Image"
             // Responsive image size for the button
            />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NoRecordingScreen;
