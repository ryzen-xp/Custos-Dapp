import React, { useState } from "react";
import bg from "../../../../public/Rectangle.png";
import Icons from "./Icons";
import { TransactionButton, darkTheme } from "thirdweb/react";
import { getContract, prepareContractCall } from "thirdweb";
import { useWriteToContract } from "@/utils/fetchcontract";
import { useRouter } from "next/navigation";

export const Recording = ({ text, icon1, imgText, uri }) => {
  const route = useRouter();
  const {
    sendTransaction,
    transaction,
    isPending,
    isLoading,
    error,
    data,
    isSuccess,
  } = useWriteToContract("crime", "function coverCrime(string uri)", [uri]);

  return (
    <div className="w-full flex flex-col mt-10 items-center gap-6 ">
      <p className="text-white text-xl">{text}</p>
      <div className="bg-gradient-to-r from-[#0094ff] to-[#A02294] w-[50%] p-[1px] rounded-xl">
        <div
          className="w-full h-full flex flex-col justify-center rounded-xl p-10"
          style={{
            backgroundColor: "#1e2f37",
            backgroundImage: `url(${bg.src})`,
            backgroundSize: "contain",
          }}
        >
          <video
            autoPlay
            id="web-cam-container"
            className=" border-white border-2 rounded-xl mb-6"
          >
            Your browser doesn't support the video tag
          </video>
          <TransactionButton
            // unstyled
            theme={"light"}
            className=""
            transaction={() => {
              // Create a transaction object and return it
              console.log("somrthing");
              return transaction;
            }}
            onTransactionSent={(result) => {
              console.log("Transaction submitted", result.transactionHash);
            }}
            onTransactionConfirmed={(receipt) => {
              console.log("Transaction confirmed", receipt.transactionHash);
              route.push("/crimerecorder");
            }}
            onError={(error) => {
              console.error("Transaction error", error);
            }}
          >
            <Icons icon={icon1} text={imgText} />
          </TransactionButton>
        </div>
      </div>
    </div>
  );
};
