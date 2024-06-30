import React, { useState } from "react";
import bg from "../../../../public/Rectangle.png";
import Icons from "./Icons";
import { TransactionButton, darkTheme } from "thirdweb/react";
import { getContract, prepareContractCall } from "thirdweb";
import { useWriteToContract } from "@/utils/fetchcontract";

export const Recording = ({ text, icon1, imgText, uri }) => {
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
    <div className="flex flex-col mt-10 items-center gap-6 ">
      <p className="text-white text-xl">{text}</p>
      <div className="bg-gradient-to-r from-[#0094ff] to-[#A02294] w-[789px] h-[568px] p-[1px] rounded-xl">
        <div
          className="w-full h-full flex gap-[5rem] justify-center items-end rounded-xl"
          style={{
            backgroundColor: "#1e2f37",
            backgroundImage: `url(${bg.src})`,
            backgroundSize: "contain",
          }}
        >
          <TransactionButton
            transaction={() => {
              // Create a transaction object and return it
              console.log("somrthing");
              return transaction;
            }}
            onTransactionSent={(result) => {
              console.log("Transaction submitted", result.transactionHash);
              alert("Successfully Submitted");
            }}
            onTransactionConfirmed={(receipt) => {
              console.log("Transaction confirmed", receipt.transactionHash);
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
