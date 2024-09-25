"use client"
import React, { useContext } from 'react';
import icon3 from "../../../../public/record.png";
import { Recording } from "../components/Recording";
import { Header } from "../components/Header";

const TakePicture = () => {
  const text = {
    text2: `Take a picture to keep on the blockchain`,
  };

  return (
    <div className="h-screen w-full m-10">
      <Header />
      <div className="flex justify-center mt-40" id="take-picture">
        <Recording
          text={text.text2}
          icon1={icon3}
          imgText={`Click to Take a Picture`}
          category={`image`}
        />
      </div>
    </div>
  );
};

export default TakePicture;
