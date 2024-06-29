import { useActiveAccount, useReadContract, useSendTransaction } from "thirdweb/react";
import { prepareContractCall, getContract } from "thirdweb";
import { baseSepolia } from "thirdweb/chains";
import crimeAbi from "./coverCrimeAbi.json";
import agreementAbi from "./agreementAbi.json";

// Predefined contract configurations
const contractConfigs = {
  crime: {
    address: "0x08224d5346fe0f05dad0b3eed040b5c0f0da6d6d",
    abi: crimeAbi,
  },
  agreement: {
    address: "0x71B7d170E025CEDaeD65d5579330C865fe3633Ca",
    abi: agreementAbi,
  },
};

// Utility function to get a contract
const getContractByType = (client, type) => {
  const config = contractConfigs[type];
  if (!config) throw new Error(`Unknown contract type: ${type}`);

  return getContract({
    client,
    chain: baseSepolia,
    contract: config,
  });
};

// Hook to read data from a contract
export const useReadContractData = (client, contractType, method, args = []) => {
  const contract = getContractByType(client, contractType);
  const response = useReadContract({
    contract,
    method: method,
    params: args,
  })
  return response;
};

// Hook to write data to a contract
export const useWriteToContract = (client, contractType, method, args = []) => {
  const contract = getContractByType(client, contractType);
  const { config } = prepareContractCall({
    contract,
    method,
    args,
  });
  const { mutate, isLoading, error, data } = useSendTransaction(config);
  return { mutate, isLoading, error, data };
};

// Custom hook to get the active account
export const useAccount = () => useActiveAccount();
  // Example usage in a component
/*****
 * 
 * 
* const { data: crimeData, isLoading: crimeLoading } = useReadContractData(client, "crime", "methodName", ["arg1", "arg2"]);
* const { data: agreementData, isLoading: agreementLoading } = useReadContractData(client, "agreement", "methodName", ["arg1", "arg2"]);
 * 
 */


