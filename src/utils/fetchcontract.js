import crimeAbi from "./coverCrimeAbi.json";
import agreementAbi from "./agreementAbi.json";
import { Contract, RpcProvider } from "starknet";

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

// Utility function to get a contract
const getContractByType = (type) => {
  const config = contractConfigs[type];
  if (config) {
    return {
      abi: config.abi,
      address: config.address,
    };
  } else {
    throw new Error(`Unknown contract type: ${type}`);
  }
};

// Hook to read data from a contract
export const useReadContractData = (contractType) => {
  const contract = getContractByType(contractType);
  const readData = new Contract(contract.abi, contract.address, provider);
  return readData;
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
