"use client";
import React, { useContext } from "react";
import { FaArrowRight } from "react-icons/fa";
import { WalletContext } from "./walletprovider";

function ConnectButtoncomponent() {
  const { address, connection, connectWallet, disconnectWallet } =
    useContext(WalletContext);

  const handleConnect = async () => {
    console.log("Attempting to connect wallet...");
    await connectWallet();
  };

  return (
    <div className="hover:cursor-pointer p-[1px] rounded-full ">
      {connection ? (
        <button
          onClick={disconnectWallet}
          className="max-w-[30%] py-2 px-4 rounded-full bg-gradient-to-r from-[#0094ff] overflow-clip to-[#A02294] text-[#ededef]"
        >
          {address}
        </button>
      ) : (
        <button
          onClick={handleConnect} // make sure this is triggered
          // className="w-full flex items-center bg-black py-2 px-4 rounded-full"
        >
          <div className="launch-pad-button-container">
            <img src="./connectButton.png" alt="Connect Wallet" />
          </div>
          {/* <span className="mr-2">Connect Wallet</span>
          <FaArrowRight /> */}
        </button>
      )}
    </div>
  );
}

export default ConnectButtoncomponent;
