"use client";

import React, { useContext } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { WalletContext } from "./walletprovider";

function ConnectButtoncomponent() {
  const { address, connection, connectWallet, disconnectWallet } =
    useContext(WalletContext);

  const handleConnect = async () => {
    console.log("Attempting to connect wallet...");
    await connectWallet();
  };

  return (
    <div className="justify-end flex max-w-[13em] overflow-hidden w-fit items-end">
      {connection ? (
        <div
          className="cursor-pointer border-gradient w-full rounded-full text-[#ededef]  p-[1px]"
          onClick={disconnectWallet}
        >
          <div className="bg-[#121212] rounded-full py-1 px-3">
            <button
              onClick={disconnectWallet}
              className="w-full bg-transparent rounded-full overflow-hidden text-sm"
            >
              {address}
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full backdrop-blur-[10px] border-gradient cursor-pointer p-[2px] rounded-[100px]" onClick={handleConnect}> 
          <div className="bg-[#121212] rounded-[100px]">
            <button
              onClick={handleConnect}
              className="flex items-center text-white text-sm py-3 px-6 rounded-[100px] hover:bg-gradient-to-r from-[#19B1D2] to-[#0094FF] hover:bg-[#209af1] transition-colors duration-300 ease-in-out"
            >
              <span>Connect Wallet</span>
              <FaLongArrowAltRight className="ml-2" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ConnectButtoncomponent;
