"use client";
import React, { useContext } from "react";
import { FaArrowRight, FaLongArrowAltRight } from "react-icons/fa";
import { WalletContext } from "./walletprovider";

function ConnectButtoncomponent() {
  const { address, connection, connectWallet, disconnectWallet } =
    useContext(WalletContext);

  const handleConnect = async () => {
    console.log("Attempting to connect wallet...");
    await connectWallet();
  };

  return (
    <div className=" justify-end flex max-w-[13em] overflow-clip w-fit items-end">
      {connection ? (
        <div
          className=" cursor-auto  border-gradient py-2 px-4 w-full rounded-full  text-[#ededef]"
          onClick={disconnectWallet}
        >
          <button
            onClick={disconnectWallet}
            className="w-full bg-transparent rounded-full overflow-clip"
          >
            {address}
          </button>
        </div>
      ) : (
        <div className=" w-full">
          <button
            onClick={handleConnect}
            className=" flex box items-center text-white text-sm py-4 px-8 rounded-[100] bg-[#ffffff0a] backdrop-filter backdrop-blur-[10px]  hover:bg-[#209af1]"
          >
            <div className="sh-btn"></div>
            Connect Wallet
            <FaLongArrowAltRight className="ml-2" />
            {/* <span className="mr-2">Connect Wallet</span>
          <FaArrowRight /> */}
          </button>
          {/* <img
            src="/connectButton.png"
            alt="Connect Wallet"
            className=" h-[3em]"
            ,,,
          /> */}
        </div>
      )}
    </div>
  );
}

export default ConnectButtoncomponent;
