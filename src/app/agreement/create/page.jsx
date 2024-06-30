/* eslint-disable react/no-unescaped-entities */
"use client";
import { useWriteToContract } from "@/utils/fetchcontract";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";

const AgreementModal = () => {
  const [modalStep, setModalStep] = useState(1);

  const [agreementType, setAgreementType] = useState("");
  const [content, setContent] = useState("");
  const [country, setCountry] = useState("");
  const [idType, setIdType] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [secondPartyAddress, setSecondPartyAddress] = useState("");
  console.log(modalStep);

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
    `function createAgreement(
        string memory _content,
        address _secondPartyAddress,
        string memory _firstPartyName,
        string memory _firstPartyValidId
    ) external returns (uint256)`,
    [content, secondPartyAddress]
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
    sendTransaction(transaction);
    console.log("Form submitted:", {
      agreementType,
      content,
      country,
      idType,
      idNumber,
      secondPartyAddress,
    });
  };

  const renderStep = () => {
    switch (modalStep) {
      case 1:
        return (
          <div className="text-white flex flex-col items-center justify-center space-y-6 mb-8">
            <label
              htmlFor="agreementType"
              className="font-[500] text-[1.2em] text-white"
            >
              Select the type of agreement you want to create
            </label>
            <select
              id="agreementType"
              name="agreementType"
              value={agreementType}
              onChange={(e) => setAgreementType(e.target.value)}
              className="mt-1 focus:outline-none w-full border-[#BEBDBD] focus-visible:top-10 focus:border-[#19B1D2] active:border-[#0094FF] px-2 py-3 rounded-md bg-transparent border shadow-sm text-white sm:text-sm"
            >
              <option className="bg-options-custom text-white" value="">
                Select an option
              </option>
              <option className="bg-options-custom text-white" value="opt1">
                Option 1
              </option>
              <option className="bg-options-custom text-white" value="opt2">
                Option 2
              </option>
              <option className="bg-options-custom text-white" value="opt3">
                Option 3
              </option>
            </select>
          </div>
        );
      case 2:
        return (
          <div className="text-white flex flex-col items-center justify-center space-y-6 mb-8">
            <label
              htmlFor="content"
              className="font-[500] text-[1.2em] text-white"
            >
              Draft/paste the content of your agreement here
            </label>
            <textarea
              id="content"
              name="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="mt-1 focus:outline-none w-full border-[#BEBDBD] focus-visible:top-10 focus:border-[#19B1D2] active:border-[#0094FF] px-2 py-3 rounded-md bg-transparent border shadow-sm text-white sm:text-sm"
              rows="10"
              cols="50"
            />
          </div>
        );
      case 3:
        return (
          <>
            <div className="text-white flex flex-col">
              <label
                htmlFor="country"
                className="font-[500] text-[1.2em] text-white"
              >
                Country
              </label>
              <input
                type="text"
                id="country"
                name="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="mt-1 focus:outline-none w-full border-[#BEBDBD] focus-visible:top-10 focus:border-[#19B1D2] active:border-[#0094FF] px-2 py-3 rounded-md bg-transparent border shadow-sm text-white sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="idType"
                className="font-[500] text-[1.2em] text-white"
              >
                ID Type
              </label>
              <input
                type="text"
                id="idType"
                name="idType"
                value={idType}
                onChange={(e) => setIdType(e.target.value)}
                className="mt-1 focus:outline-none w-full border-[#BEBDBD] focus-visible:top-10 focus:border-[#19B1D2] active:border-[#0094FF] px-2 py-3 rounded-md bg-transparent border shadow-sm text-white sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="idNumber"
                className="font-[500] text-[1.2em] text-white"
              >
                ID Number
              </label>
              <input
                type="text"
                id="idNumber"
                name="idNumber"
                value={idNumber}
                onChange={(e) => setIdNumber(e.target.value)}
                className="mt-1 focus:outline-none w-full border-[#BEBDBD] focus-visible:top-10 focus:border-[#19B1D2] active:border-[#0094FF] px-2 py-3 rounded-md bg-transparent border shadow-sm text-white sm:text-sm"
              />
            </div>
          </>
        );
      case 4:
        return (
          <div className="mb-4">
            <label
              htmlFor="secondPartyAddress"
              className="font-[500] text-[1.2em] text-white"
            >
              Second Party's Wallet Address
            </label>
            <input
              type="text"
              id="secondPartyAddress"
              name="secondPartyAddress"
              value={secondPartyAddress}
              onChange={(e) => setSecondPartyAddress(e.target.value)}
              className="mt-1 focus:outline-none w-full border-[#BEBDBD] focus-visible:top-10 focus:border-[#19B1D2] active:border-[#0094FF] px-2 py-3 rounded-md bg-transparent border shadow-sm text-white sm:text-sm"
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="rounded-2xl relative border-gradient w-fit m-auto p-6">
      <form
        className="max-w-md mx-auto relative w-full space-y-5"
        onSubmit={handleSubmit}
      >
        {modalStep > 1 && (
          <button
            type="button"
            onClick={() => setModalStep(modalStep - 1)}
            className="w-fit rounded-[2em] hover:text-[#A02294] items-center text-white font-bold justify-center flex"
            disabled={modalStep === 1}
          >
            <FaArrowLeft className="mr-2" /> <p className="">Previous</p>
          </button>
        )}
        {renderStep()}
        <div className="flex justify-between">
          {modalStep !== 4 && (
            <button
              type="button"
              onClick={() => setModalStep(modalStep + 1)}
              className="bg-gradient-to-r from-[#19B1D2] to-[#0094FF] w-fit rounded-[2em] hover:bg-[#090909] text-white font-bold py-2 px-4 border-gradient"
            >
              Continue
            </button>
          )}

          {modalStep == 4 && (
            <button
              type="submit"
              className="bg-gradient-to-r from-[#19B1D2] to-[#0094FF] w-fit rounded-[2em] hover:bg-[#090909] text-white font-bold py-2 px-4 border-gradient"
            >
              Create
            </button>
          )}
          <button
            type="button"
            onClick={() => window.history.back()}
            className="bg- w-fit rounded-[2em] hover:bg-[#090909] text-white font-bold py-2 px-4 border-gradient"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AgreementModal;
