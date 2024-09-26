"use client";
import { useContext, useEffect, useState } from "react";
import { Header } from "./components/Header";
import { Record } from "./components/Record";
import icon1 from "../../../public/record2.png";
import icon2 from "../../../public/picture.png";
import crimeAbi from "../../utils/coverCrimeAbi.json";
// import Uploads from "./components/Uploads";
import { UseReadContractData } from "../../utils/fetchcontract";
import { Contract, RpcProvider } from "starknet";
import { WalletContext } from "@/components/walletprovider";

const Recorder = () => {
  const text = {
    text1: `You can record a video, or take a picture to keep on the blockchain`,
  };
  const { account } = useContext(WalletContext);
  const {
    data: readData,
    error,
    loading,
  } = UseReadContractData("crime", "name", []);

  console.log(readData);

  return (
    <div className="min-h-screen w-full p-4 md:p-10">
      
      <div className="flex flex-col items-center md:mt-10 mt-4">
        {readData ? readData?.name() : "undefined"}
        {/* {writeData ? writeData?.crime_record("International", "0") : "0x0"} */}
        <Record text={text.text1} icon1={icon1} icon2={icon2} />
      </div>
    </div>
  );
};

export default Recorder;
