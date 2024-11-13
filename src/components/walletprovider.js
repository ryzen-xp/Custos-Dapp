"use client";
import React, { createContext, useState, useEffect } from "react";
import { connect, disconnect } from "get-starknet";
import { useNotification } from "@/context/NotificationProvider";
import { padAddress } from "@/utils/serializer";

export const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const {
    openNotification,
  } = useNotification();
  const [connection, setConnection] = useState(null);
  const [account, setAccount] = useState("");
  const [address, setAddress] = useState("");



  const connectWallet = async () => {
    const connection = await connect({ modalMode: "alwaysAsk" });
    // await starknet?.enable({ starknetVersion: "v4" })
    if (connection && connection.isConnected) {
      setConnection(connection);
      setAccount(connection.account);
      openNotification("success", "Wallet Connected", "Your wallet has been connected successfully!");
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
