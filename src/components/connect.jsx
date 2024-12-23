"use client";

import React, { useContext } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { WalletContext } from "./walletprovider";
import { generateAvatarURL } from '@cfx-kit/wallet-avatar';
import { truncAddress } from "@/utils/serializer";
import Image from "next/image";

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
          className="cursor-pointer border-gradient2 w-full rounded-full text-[#ededef]  p-[1px]"
          onClick={disconnectWallet}
        >
          <div className="bg-[#121212] border-gradient2 rounded-full py-2 px-3 flex gap-2">
            <Image className="rounded-full" src={generateAvatarURL(connection?.account)} alt="" width={24} height={24}/>
            <button
              onClick={disconnectWallet}
              className="w-full bg-transparent rounded-full overflow-hidden text-sm"
            >
              {truncAddress(address)}
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full backdrop-blur-[10px] border-gradient2 cursor-pointer p-[2px] rounded-[100px]" onClick={handleConnect}> 
          <div className="bg-[#121212] rounded-[100px]">
            <button
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
