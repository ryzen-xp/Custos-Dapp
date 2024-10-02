"use client";
import crimeAbi from "./coverCrimeAbi.json";
import agreementAbi from "./agreementAbi.json";
import { Contract, RpcProvider } from "starknet";
import { useContext, useEffect, useState } from "react";
import { WalletContext } from "@/components/walletprovider";

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
      "0x072b532064e037ebfa163d647ef9d73d1f00d5e6a6f67408cdd3e040d447c637",
  },
};

// Hook to read data from a contract
export const UseReadContractData = () => {
  // const [data, setData] = useState(null);
  // const [error, setError] = useState(null);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  const fetchData = async (contractName, methodName, params = []) => {
    try {
      const contractConfig = contractConfigs[contractName];
      if (!contractConfig) {
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

  const writeToContract = async (contractName, methodName, params = []) => {
    try {
      if (!account || !account.account) {
        throw new Error("Wallet not connected");
      }

      const contractConfig = contractConfigs[contractName];
      if (!contractConfig) {
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

      console.log("result", result);
      return result;
    } catch (err) {
      console.error("Contract interaction failed", err);
      throw err;
    }
  };

  return { writeToContract };
};
