import React, { useState } from "react";
import bg from "../../../../public/Rectangle.png";
import Icons from "./Icons";
import { TransactionButton, darkTheme } from "thirdweb/react";
import { getContract, prepareContractCall } from "thirdweb";
import crimeAbi from "@/utils/coverCrimeAbi.json";
import { baseSepolia } from "thirdweb/chains";
import { createThirdwebClient } from "thirdweb";
import { useWriteToContract } from "@/utils/fetchcontract";

const client_id = process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID;
export const client = createThirdwebClient({
  clientId: client_id,
});

export const Recording = ({ text, icon1, imgText }) => {
  const [uri, setUri] = useState("");

  const { sendTransaction, transaction } = useWriteToContract(
    client,
    "crime",
    "function coverCrime(string uri)",
    ["jfhfgfhfdjdkdkdkdd"]
  );

  const contract = getContract({
    client,
    chain: baseSepolia,
    address: "0x08224d5346fe0f05dad0b3eed040b5c0f0da6d6d",
    abi: crimeAbi,
  });

  return (
    <div className="flex flex-col mt-10 items-center gap-6 ">
      <p className="text-white text-xl">{text}</p>
      <div className="bg-gradient-to-r from-[#0094ff] to-[#A02294] w-[789px] h-[568px] p-[1px] rounded-xl">
        <div
          className="w-full h-full flex gap-[5rem] justify-center items-end rounded-xl"
          style={{
            backgroundColor: "#1e2f37",
            backgroundImage: `url(${bg.src})`,
            backgroundSize: "contain",
          }}
        >
          {/* <TransactionButton
            transaction={async () => {
              // Create a transaction object and return it
              console.log("somrthing");
              const tx = prepareContractCall({
                contract: contract,
                method: "function coverCrime(string uri)",
                params: [uri],
              });
              console.log("another");
              return tx;
            }}
            onTransactionSent={(result) =>
              console.log("Transaction submitted", result.transactionHash)
            }
            onTransactionConfirmed={(receipt) => {
              console.log("Transaction confirmed", receipt.transactionHash);
            }}
            onError={(error) => {
              console.error("Transaction error", error);
            }}
            gasless={{
              provider: "biconomy",
              apiId: process.env.NEXT_PUBLIC_BICONOMY_ID,
              apiKey: process.env.NEXT_PUBLIC_BICONOMY_API,
              relayerForwarderAddress: process.env.NEXT_PUBLIC_BICONOMY_ID,
            }}
          > */}
          <Icons icon={icon1} text={imgText} />
          {/* </TransactionButton> */}
        </div>
      </div>
    </div>
  );
};
