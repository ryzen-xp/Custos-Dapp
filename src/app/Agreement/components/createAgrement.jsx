"use client";
import { useState } from "react";
import { getContract, prepareContractCall } from "thirdweb";
import { baseSepolia } from "thirdweb/chains";
import abi from "@/utils/agreementAbi.json";
import { client } from "@/utils/thirdwebclient";
import { useSendTransaction } from "thirdweb/react";

const AgreementModal = () => {
  const contract = getContract({
    client,
    chain: baseSepolia,
    address: "0x726c51fcAC027fF7C9eAaF830f88daF12199ddC5",
    abi: abi,
  });

  const [content, setContent] = useState("");
  const [secondPartyAddress, setSecondPartyAddress] = useState("");
  const [firstPartyName, setFirstPartyName] = useState("");
  const [firstPartyValidId, setFirstPartyValidId] = useState("");

  const { mutate: sendTransaction, isPending } = useSendTransaction();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const createAgreement = await prepareContractCall({
      contract,
      method: "createAgreement",
      params: [content, secondPartyAddress, firstPartyName, firstPartyValidId],
    });

    sendTransaction(createAgreement);
  };

  return (
    <div className="bg-[#130316]">
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label
            htmlFor="content"
            className="block text-sm font-medium text-[#c92eff]"
          >
            Content
          </label>
          <textarea
            id="content"
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#c92eff] focus:border-[#c92eff] sm:text-sm text-[#090909]"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="secondPartyAddress"
            className="block text-sm font-medium text-[#c92eff]"
          >
            Second Party Address
          </label>
          <input
            type="text"
            id="secondPartyAddress"
            name="secondPartyAddress"
            value={secondPartyAddress}
            onChange={(e) => setSecondPartyAddress(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm text-[#090909] focus:ring-[#c92eff] focus:border-[#c92eff] sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="firstPartyName"
            className="block text-sm font-medium text-[#c92eff]"
          >
            First Party Name
          </label>
          <input
            type="text"
            id="firstPartyName"
            name="firstPartyName"
            value={firstPartyName}
            onChange={(e) => setFirstPartyName(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#c92eff] focus:border-[#c92eff] sm:text-sm text-[#090909]"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="firstPartyValidId"
            className="block text-sm font-medium text-[#c92eff]"
          >
            First Party Valid ID
          </label>
          <input
            type="text"
            id="firstPartyValidId"
            name="firstPartyValidId"
            value={firstPartyValidId}
            onChange={(e) => setFirstPartyValidId(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#c92eff] text-[#090909] focus:border-[#c92eff] sm:text-sm"
          />
        </div>
        <button
          type="submit"
          className="bg-[#c92eff] w-fit rounded-lg hover:bg-[#090909] text-white font-bold py-2 px-4 border-2 border-[#c92eff] font-san hover:border-[#c92eff] inline-flex justify-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#c92eff]"
        >
          {isPending ? "Submitting" : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default AgreementModal;
