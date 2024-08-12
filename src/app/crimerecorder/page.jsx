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
  ("b9d0c089.5d322cf006f543019dbac31208e4af82");

  return (
    <div className="min-h-screen w-full p-4 md:p-10">
      <Header />
      <div className="flex flex-col items-center mt-4 md:mt-10">
        <Record text={text.text1} icon1={icon1} icon2={icon2} />
        {/* <Uploads /> */}
      </div>
    </div>
  );
};

export default Recorder;
