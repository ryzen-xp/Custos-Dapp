"use client";
import crimeAbi from "./coverCrimeAbi.json";
import agreementAbi from "./agreementAbi.json";
import { Contract, RpcProvider } from "starknet";
import { useContext, useEffect, useState } from "react";
import { WalletContext } from "@/components/walletprovider";

const { account } = useContext(WalletContext);

const provider = new RpcProvider({
  nodeUrl: "https://free-rpc.nethermind.io/sepolia-juno/v0_7",
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
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const contractConfig = contractConfigs[contractName];
        if (!contractConfig) {
          throw new Error(
            `Contract "${contractName}" not found in configurations.`
          );
        }

        const contract = new Contract(
          contractConfig.abi,
          contractConfig.address,
          provider
        );

        const result =
          params.length > 0
            ? await contract[methodName](...params)
            : await contract[methodName]();
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [contractName, methodName, params]);

  return { data, error, loading };
};

// Hook to write data to a contract
// export const useWriteToContract = (contractType, method, args = []) => {
//   const contract = getContractByType(contractType);
//   const {
//     mutate: sendTransaction,
//     isPending,
//     isLoading,
//     error,
//     data,
//     isSuccess,
//   } = useSendTransaction();
//   const transaction = prepareContractCall({
//     contract,
//     method,
//     params: args,
//   });
//   return {
//     sendTransaction,
//     transaction,
//     isPending,
//     isLoading,
//     error,
//     data,
//     isSuccess,
//     contractType,
//     method,
//   };
// };
