"use client";
import { RpcProvider } from "starknet";
import { connect, disconnect } from "get-starknet";
import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";

const providerSepoliaTestnetNethermindPublic = new RpcProvider({
  nodeUrl: "https://free-rpc.nethermind.io/sepolia-juno/v0_7",
});

function ConnectButtoncomponent() {
  const [connection, setConnection] = useState("");
  const [account, setAccount] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const starknetConnect = async () => {
      const connection = await connect({
        modalMode: "neverAsk",
      });
      if (connection && connection.isConnected) {
        setConnection(connection);
        setAccount(connection.account);
        setAddress(connection.selectedAddress);
      }
    };
    starknetConnect();
  }, []);

  const connectWallet = async () => {
    const connection = await connect();

    if (connection && connection.isConnected) {
      setConnection(connection);
      setAccount(connection.account);
      setAddress(connection.selectedAddress);
    }
  };

  const disconnectWallet = async () => {
    await disconnect();
    setConnection(undefined);
    setAccount(undefined);
    setAddress("");
  };

  return (
    <div className="hover:cursor-pointer p-[1px] rounded-full bg-gradient-to-r from-[#0094ff] to-[#A02294] text-[#ededef]">
      {connection ? (
        <button
          onClick={disconnectWallet}
          className="w-full bg-black py-2 px-4 rounded-full"
        >
          Disconnect
        </button>
      ) : (
        <button
          onClick={connectWallet}
          className="w-full flex items-center bg-black py-2 px-4 rounded-full"
        >
          <span className="mr-2">Connect Wallet</span>
          <FaArrowRight />
        </button>
      )}
    </div>
  );
}

export default ConnectButtoncomponent;
