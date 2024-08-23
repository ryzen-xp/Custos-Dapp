"use client"
import { useContext, useEffect, useState } from "react";
import { Header } from "./components/Header";
import { Record } from "./components/Record";
import icon1 from "../../../public/record2.png";
import icon2 from "../../../public/picture.png";
import crimeAbi from "../../utils/coverCrimeAbi.json";
// import Uploads from "./components/Uploads";
import { useReadContractData } from "../../utils/fetchcontract";
import { Contract, RpcProvider } from "starknet";
import { WalletContext } from "@/components/walletprovider";

const Recorder = () => {
  const text = {
    text1: `You can record a video, or take a picture to keep on the blockchain`,
  };
const { account } = useContext(WalletContext);
  // const {
  //   data: readData,
  //   error,
  //   loading,
  // } = useReadContractData("crime", "name", []);

  // console.log(readData);

  const provider = new RpcProvider({
    nodeUrl: "https://starknet-sepolia.infura.io/v3/eef769b164304dd796259eb3836f295a",
  });
  const readData = new Contract(
    crimeAbi,
    "0x03cbefe95450dddc88638f7b23f34d83fc48b570e476d87a608c07724aaaa342",
    provider
  );

  const writeData = new Contract(
    crimeAbi,
    "0x03cbefe95450dddc88638f7b23f34d83fc48b570e476d87a608c07724aaaa342",
    account
  );

  return (
    <div className="min-h-screen w-full p-4 md:p-10">
      <Header />
      <div className="flex flex-col items-center mt-4 md:mt-10">
        {readData ? readData?.name() : "undefined"}
        {/* {writeData ? writeData?.crime_record("International", "0") : "0x0"} */}
        <Record text={text.text1} icon1={icon1} icon2={icon2} />
      </div>
    </div>
  );
};

export default Recorder;
