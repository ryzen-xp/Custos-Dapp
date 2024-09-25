"use client";
import React, { useState } from 'react';
import icon4 from "../../../../public/pause.png";
import { Recording } from "../components/Recording";
import { Header } from "../components/Header";

const VideoRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);

  const toggleRecording = () => {
    setIsRecording(prev => !prev);
  };

  const text = {
    text3: isRecording ? `Stop recording` : `Record a video to keep on the blockchain`,
  };

  return (
    <div className="h-screen w-full m-10">
      <Header />
      <div className="flex justify-center mt-40" id="stop-vid-recording">
        <Recording
          text={text.text3}
          icon1={icon4}
          imgText={isRecording ? `Stop Recording` : `Start Recording`}
          category={`video`}
          isRecording={isRecording}
          toggleRecording={toggleRecording}
        />
      </div>
    </div>
  );
};

export default VideoRecorder;
