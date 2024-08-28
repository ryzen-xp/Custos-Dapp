"use client";
import crimeAbi from "./coverCrimeAbi.json";
import agreementAbi from "./agreementAbi.json";
import { Contract, RpcProvider } from "starknet";
import { useContext, useEffect, useState } from "react";
import { WalletContext } from "@/components/walletprovider";

const provider = new RpcProvider({
  nodeUrl:
    "https://starknet-sepolia.infura.io/v3/eef769b164304dd796259eb3836f295a",
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
      "0x0478d4506cc35111aab21193341e53b9c2f9e3c284aff79b510234b670f7fb9c",
  },
};

// Hook to read data from a contract
export const useReadContractData = (contractName, methodName, params = []) => {
  // const [data, setData] = useState(null);
  // const [error, setError] = useState(null);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  const fetchData = async () => {
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
      // setData(result);
    } catch (err) {
      // setError(err);
      console.log(err);
    } finally {
      // setLoading(false);
    }
  };

  const result = fetchData();
  // }, [contractName, methodName, params]);

  return result;
};

// Hook to write data to a contract
export const useWriteToContract = (
  contractName,
  methodName,
  params = []
  // account
) => {
  let account = useContext(WalletContext);
  console.log(account);

  const fetchData = async () => {
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
        account
      );

      // console.log('calling result')
      const result =
        params.length > 0
          ? await contract[methodName](...params)
          : await contract[methodName]();
      console.log("result", result);
      // setData(result);
    } catch (err) {
      // setError(err);
      console.log(err);
    } finally {
      // setLoading(false);
    }
  };

  const result = fetchData();
  // }, [contractName, methodName, params]);

  return result;
};
