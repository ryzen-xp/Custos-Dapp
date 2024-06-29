import crimeAbi from "./coverCrimeAbi.json";
import agreementAbi from "./agreementAbi.json";
import { useActiveAccount } from "thirdweb/react";
import { useReadContract } from "thirdweb/react";
import { getContract } from "thirdweb";
import { baseSepolia } from "thirdweb/chains";

const record = {
  address: "0x08224d5346fe0f05dad0b3eed040b5c0f0da6d6d",
  abi: crimeAbi,
};

const legal = {
  address: "0x71B7d170E025CEDaeD65d5579330C865fe3633Ca",
  abi: agreementAbi,
};

// get wallet address
export const account = useActiveAccount();

export const crimeContract = getContract({
  client,
  chain: baseSepolia,
  record,
});

export const agreementContract = getContract({
  client,
  chain: baseSepolia,
  legal,
});

export const { data: crimeData, isLoading: crimeLoading } = useReadContract({
  crimeContract,
  method: "",
});

export const { data: agreeData, isLoading: agreeLoading } = useReadContract({
  agreementContract,
  method: "",
});
