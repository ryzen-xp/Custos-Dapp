"use client";
import React from "react";
import icon4 from "../../../../public/pause.png";
import { Recording } from "../components/Recording";
import { Header } from "../components/Header";
import { client } from "@/utils/thirdwebclient";
import { useWriteToContract } from "@/utils/fetchcontract";

const VideoRecorder = () => {
  const {
    sendTransaction,
    transaction,
    isPending,
    isLoading,
    error,
    data,
    isSuccess,
  } = useWriteToContract(client, "crime", "function coverCrime(string uri)", [
    "bafybeigw4itap22hfpruchbtzmveyykeeaio3vw5ypjflgjyajf73h5qqe",
  ]);

  const handleSubmit = () => {
    sendTransaction(transaction);
    console.log("after send tx", isSuccess && transaction);
  };

  const text = {
    text3: `Record a video to keep on the blockchain`,
  };

  return (
    <div className="h-screen w-full m-10">
      <Header />
      <div onClick={handleSubmit} className="flex justify-center">
        <Recording text={text.text3} icon1={icon4} imgText={`Stop Recording`} />
      </div>
    </div>
  );
};

export default VideoRecorder;
