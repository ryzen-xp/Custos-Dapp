import React from "react";
import icon4 from "../../../../public/pause.png";
import { Recording } from "../components/Recording";
import { Header } from "../components/Header";

const VideoRecorder = () => {
  const text = {
    text3: `Record a video to keep on the blockchain`,
  };

  return (
    <div className="h-screen w-full m-10">
      <Header />
      <div className="flex justify-center" id="stop-vid-recording">
        <Recording
          text={text.text3}
          icon1={icon4}
          imgText={`Stop Recording`}
          category={`video`}
        />
      </div>
    </div>
  );
};

export default VideoRecorder;
