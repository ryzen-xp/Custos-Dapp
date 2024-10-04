"use client";
import React, { createContext, useState, useEffect } from "react";
import { connect, disconnect } from "get-starknet";
import { padAddress } from "@/utils/serializer";

export const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [connection, setConnection] = useState(null);
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
    const connection = await connect({ modalMode: "alwaysAsk" });
    // await starknet?.enable({ starknetVersion: "v4" })
    if (connection && connection.isConnected) {
      setConnection(connection);
      setAccount(connection.account);

      const cleanedAddress = padAddress(connection.selectedAddress);
      setAddress(cleanedAddress);
    }
  };

  const disconnectWallet = async () => {
    await disconnect();
    setConnection(null);
    setAccount("");
    setAddress("");
  };

  return (
    <WalletContext.Provider
      value={{ connection, account, address, connectWallet, disconnectWallet }}
    >
      {children}
    </WalletContext.Provider>
  );
};
