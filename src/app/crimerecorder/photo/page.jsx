"use client";
import React from "react";
import icon3 from "../../../../public/record.png";
import { Recording } from "../components/Recording";
import { Header } from "../components/Header";
import { useWriteToContract } from "@/utils/fetchcontract";
import { createThirdwebClient } from "thirdweb";

const client_id = process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID;
export const client = createThirdwebClient({
  clientId: client_id,
});

const TakePicture = () => {
  const { sendTransaction, transaction } = useWriteToContract(
    client,
    "crime",
    "function coverCrime(string uri)",
    ["jfhfgfhfdjdkdkdkdd"]
  );

  const handleSubmit = () => {
    sendTransaction(transaction);
  };

  const text = {
    text2: `Take a picture to keep on the blockchain`,
  };

  return (
    <div className="h-screen w-full m-10">
      <Header />
      <div onClick={handleSubmit} className="flex justify-center">
        <Recording
          text={text.text2}
          icon1={icon3}
          imgText={`Click to Take a Picture`}
        />
      </div>
    </div>
  );
};

export default TakePicture;
