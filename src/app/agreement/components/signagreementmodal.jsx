/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { useWriteToContract } from "@/utils/fetchcontract";
import { useState } from "react";

const SignAgreementModal = ({ agreementid }) => {
  const [secondPartyValidId, setSecondPartyValidId] = useState("");

  const {
    sendTransaction,
    transaction,
    isPending,
    isLoading,
    error,
    data,
    isSuccess,
  } = useWriteToContract(
    client,
    "agreement",
    `function signAgreement(
        uint256 _agreementId,
        string memory _fullname,
        string memory _validId
    ) external`,
    [agreementid, secondPartyValidId]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    sendTransaction(transaction);
    isSuccess && console.log("Successfully signed");
  };

  return (
    <div className="bg-[#130316] w-full h-full py-4">
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label
            htmlFor="firstPartyValidId"
            className="block text-sm font-medium text-[#c92eff]"
          >
            Signer&apos;s Valid ID
          </label>
          <input
            type="text"
            id="firstPartyValidId"
            name="firstPartyValidId"
            value={secondPartyValidId}
            onChange={(e) => setSecondPartyValidId(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#c92eff] text-[#090909] focus:border-[#c92eff] sm:text-sm p-3"
          />
        </div>
        <button
          type="submit"
          className="bg-[#c92eff] w-fit rounded-lg hover:bg-[#090909] text-white font-bold py-2 px-4 border-2 border-[#c92eff] font-san hover:border-[#c92eff] inline-flex justify-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#c92eff]"
        >
          {isPending ? "Signing" : "Sign Agreement"}
        </button>
      </form>
    </div>
  );
};

export default SignAgreementModal;
