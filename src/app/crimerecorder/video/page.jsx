"use client";
import React from "react";
import icon4 from "../../../../public/pause.png";
import { Recording } from "../components/Recording";
import { Header } from "../components/Header";

const VideoRecorder = ({ uri }) => {
  const text = {
    text3: `Record a video to keep on the blockchain`,
  };

  return (
    <div className="h-screen w-full m-10">
      <Header />
      <div className="flex justify-center">
        <Recording
          text={text.text3}
          icon1={icon4}
          imgText={`Stop Recording`}
          uri={uri}
        />
      </div>
    </div>
  );
};

export default VideoRecorder;
