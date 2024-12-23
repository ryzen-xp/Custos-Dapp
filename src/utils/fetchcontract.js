"use client";
import crimeAbi from "./coverCrimeAbi.json";
import agreementAbi from "./agreementAbi.json";
import { Contract, RpcProvider } from "starknet";
import { useContext, useEffect, useState } from "react";
import { WalletContext } from "@/components/walletprovider";
import { useNotification } from "@/context/NotificationProvider";

export const provider = new RpcProvider({
  nodeUrl: process.env.NEXT_PUBLIC_SEPOLIA_BASE_URL,
});

const contractConfigs = {
  crime: {
    abi: crimeAbi,
    address:
      "0x03cbefe95450dddc88638f7b23f34d83fc48b570e476d87a608c07724aaaa342",
  },
  agreement: {
    abi: agreementAbi,
    address:
      "0x01cc2cb390086c3b98ee3a6d0afe3c6d44fd2f78956bda342f52715735dbfb25",
  },
};

// Hook to read data from a contract
export const UseReadContractData = () => {

  const { openNotification } = useNotification();
  const fetchData = async (contractName, methodName, params = []) => {
    try {
      const contractConfig = contractConfigs[contractName];
      if (!contractConfig) {
        openNotification(
          "error",
          "",
          `Contract "${contractName}" not found in configurations.`
        );
        throw new Error(
          `Contract "${contractName}" not found in configurations.`
        );
      }

      // console.log('called', contractConfig)
      const contract = new Contract(
        contractConfig.abi,
        contractConfig.address,
        provider
      );

      // console.log('calling result')
      const result =
        params.length > 0
          ? await contract[methodName](...params)
          : await contract[methodName]();
      console.log("result", result);
      return result;

      // setData(result);
    } catch (err) {
      // setError(err);
      console.log(err);
    } finally {
      // setLoading(false);
    }
    // return result;
  };

  return { fetchData };
};

// Hook to write data to a contract
export const UseWriteToContract = () => {
  const account = useContext(WalletContext);
  const { openNotification } = useNotification();

  
  const writeToContract = async (contractName, methodName, params = []) => {
    try {
      if (!account || !account.account) {
        openNotification("error", "", "Wallet not connected");
        throw new Error("Wallet not connected");
      }

      const contractConfig = contractConfigs[contractName];
      if (!contractConfig) {
        openNotification(
          "error",
          "",
          `Contract "${contractName}" not found in configurations.`
        );
        throw new Error(
          `Contract "${contractName}" not found in configurations.`
        );
      }

      const contract = new Contract(
        contractConfig.abi,
        contractConfig.address,
        account.account
      );

      const result =
        params.length > 0
          ? await contract[methodName](...params)
          : await contract[methodName]();

      return result;
    } catch (err) {
      openNotification("error", "", "Contract interaction failed");
      console.error("Contract interaction failed", err);
      throw err;
    }
  };

  return { writeToContract };
};

// Hook to sign a message using the wallet extension
export const UseSignMessage = () => {
  const account = useContext(WalletContext);

  const signMessage = async (message) => {
    try {
      if (!account || !account.account) {
        openNotification("error", "", "Wallet not connected");
        throw new Error("Wallet not connected");
      }

      const signature = await account.account.signMessage(message);
      console.log("Signature:", signature);
      return signature;
    } catch (err) {
      openNotification("error", "", "Message signing failed");
      console.error("Message signing failed", err);
      throw err;
    }
  };

  return { signMessage };
};
