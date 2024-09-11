"use client";
import React, { createContext, useState, useEffect } from "react";
import { connect, disconnect } from "get-starknet";

export const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [connection, setConnection] = useState(null);
  const [account, setAccount] = useState("");
  const [address, setAddress] = useState("");

  // useEffect(() => {
  //   const starknetConnect = async () => {
  //     const connection = await connect({
  //       modalMode: "neverAsk",
  //     });
  //     if (connection && connection.isConnected) {
  //       setConnection(connection);
  //       setAccount(connection.account);
  //       setAddress(connection.selectedAddress);
  //     }
  //   };
  //   starknetConnect();
  // }, []);

  const connectWallet = async () => {
    const connection = await connect({ modalMode: "neverAsk" });
    if (connection && connection.isConnected) {
      setConnection(connection);
      setAccount(connection.account);
      setAddress(connection.selectedAddress);
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
