"use client";
import React, { useContext } from "react";
import { FaArrowRight } from "react-icons/fa";
import { WalletContext } from "./walletprovider";

function ConnectButtoncomponent() {
  const { address, connection, connectWallet, disconnectWallet } =
    useContext(WalletContext);

  const addrDisplay = (address) => {
    let first = String(address).slice(0, 10);
    let last = String(address).slice(60);
    let combined = `${first}...${last}`;
    return <span>{combined}</span>;
  };

  return (
    <div className="hover:cursor-pointer p-[1px] rounded-full ">
      {connection ? (
        <button
          onClick={disconnectWallet}
          className="w-full py-2 px-4 rounded-full bg-gradient-to-r from-[#0094ff] to-[#A02294] text-[#ededef]"
        >
          {addrDisplay(address)}
        </button>
      ) : (
        <button
          onClick={connectWallet}
          // className="w-full flex items-center bg-black py-2 px-4 rounded-full"
        >
          <div class="launch-pad-button-container">
            <img src="./connectButton.png" alt="Zoom Image" />
          </div>
          {/* <span className="mr-2">Connect Wallet</span>
          <FaArrowRight /> */}
        </button>
      )}
    </div>
  );
}

export default ConnectButtoncomponent;
