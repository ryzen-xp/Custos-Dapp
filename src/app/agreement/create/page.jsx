/* eslint-disable react/no-unescaped-entities */
// /* eslint-disable react/no-unescaped-entities */
"use client";
// import { useWriteToContract } from "@/utils/fetchcontract";
import { useState, useContext } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Header } from "../components/AgreementNav";
import { redirect } from "next/navigation";
import { WalletContext } from "@/components/walletprovider";
import Modal from "react-modal";
import SuccessScreen from "../components/Success";

const AgreementModal = () => {
  const [modalStep, setModalStep] = useState(1);

  const [agreementType, setAgreementType] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [content, setContent] = useState("");
  const [initCreationLoad, setInitCreationLoad] = useState(false);
  const [country, setCountry] = useState("");
  const [idType, setIdType] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [agreementTitle, setAgreementTitle] = useState("");
  const [secondPartyAddress, setSecondPartyAddress] = useState("");
  const [errors, setErrors] = useState({});
  const { address } = useContext(WalletContext);


  // const {
  //   sendTransaction,
  //   transaction,
  //   isPending,
  //   isLoading,
  //   error,
  //   data,
  //   isSuccess,
  // } = useWriteToContract("agreement", "createAgreement", [
  //   content,
  //   secondPartyAddress,
  //   "firstPartyName",
  //   idNumber,
  // ]);

  // const creatoraddress = useAccount()?.address;
  const handleSubmit = async (event) => {
    event.preventDefault();
    const agreementData = {
      agreementType,
      content,
      country,
      first_party_address: address,
      first_party_id_type: idType,
      first_party_valid_id: idNumber,
      second_party_address: secondPartyAddress,
    };

    try {
      setInitCreationLoad(true);
      const res = await fetch(
        "https://custosbackend.onrender.com/agreement/agreement/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(agreementData),
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        setErrors(errorData);
        setInitCreationLoad(false);
        return;
      }

      const data = await res.json();
      setInitCreationLoad(false);
      setIsModalOpen(true); // Open the success modal
      setTimeout(() => {
        setIsModalOpen(false);
        window.location.href = "/agreement";
      }, 4000);
    } catch (err) {
      console.error(err.message);
      setInitCreationLoad(false);
      setErrors({ general: err.message });
    }
  };
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   // Handle form submission here
  //   sendTransaction(transaction);
  //   console.log("Form submitted:", {
  //     agreementType,
  //     content,
  //     country,
  //     idType,
  //     idNumber,
  //     secondPartyAddress,
  //   });
  // };

  const renderStep = () => {
    switch (modalStep) {
      case 1:
        return (
          <div className="text-white flex flex-col items-center justify-center space-y-6 mb-8">
            <label
              htmlFor="agreementType"
              className="font-[500] text-[1em] text-white"
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
              <option className="bg-[#04080C] text-white" value="">
                Select an option
              </option>
              <option
                className="bg-[#04080C] text-white"
                value="Non-Disclosure Agreement"
              >
                Non-Disclosure Agreement
              </option>
              <option
                className="bg-[#04080C] text-white"
                value="Allocation of Rights"
              >
                Allocation of Rights
              </option>
              <option
                className="bg-[#04080C] text-white"
                value="Material Transfer Agreement"
              >
                Material Transfer Agreement
              </option>
              <option
                className="bg-[#04080C] text-white"
                value="Data Use Agreement"
              >
                Data Use Agreement
              </option>
              <option
                className="bg-[#04080C] text-white"
                value="Consortium Agreement"
              >
                Consortium Agreement
              </option>
              <option
                className="bg-[#04080C] text-white"
                value="Memorandum of Understanding"
              >
                Memorandum of Understanding
              </option>
              <option
                className="bg-[#04080C] text-white"
                value="Sponsored Research Agreement"
              >
                Sponsored Research Agreement
              </option>
              <option
                className="bg-[#04080C] text-white"
                value="Teaming Agreement"
              >
                Teaming Agreement
              </option>
            </select>
      
          </div>
        );
      case 2:
        return (
          <>
            <h1 className="text-white text-[1.2em]">Agreement Content</h1>
            <div className="text-white flex flex-col">
              <label
                htmlFor="country"
                className="font-[500] text-[0.8em] text-white"
              >
                Agreement Title
              </label>
              <input
                type="text"
                id="agreementTitle"
                name="agreementTitle"
                value={agreementTitle}
                placeholder="Enter The Title of Your Agreement Here"
                onChange={(e) => setAgreementTitle(e.target.value)}
                className="mt-1 focus:outline-none w-full border-[#BEBDBD] focus-visible:top-10 focus:border-[#19B1D2] active:border-[#0094FF] px-2 py-3 rounded-md bg-transparent border shadow-sm text-white sm:text-sm"
              />
         
            </div>
            <div className="text-white flex flex-col">
              <label
                htmlFor="content"
                className="font-[500] text-[0.8em] text-white"
              >
                Agreement Content
              </label>
              <textarea
                id="content"
                name="content"
                placeholder="Write or Paste the Content of Your Agreement Here"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="mt-1 focus:outline-none w-full border-[#BEBDBD] focus-visible:top-10 focus:border-[#19B1D2] active:border-[#0094FF] px-2 py-3 rounded-md bg-transparent border shadow-sm text-white sm:text-sm"
                rows="10"
                cols="50"
              />
       
            </div>
          </>
        );
      case 3:
        return (
          <>
            <div className="text-white flex flex-col">
              <label
                htmlFor="country"
                className="font-[500] text-[1em] text-white"
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
                className="font-[500] text-[1em] text-white"
              >
                Identity Type
              </label>
              <select
                placeholder="Select ID Type"
                id="idType"
                name="idType"
                value={idType}
                onChange={(e) => setIdType(e.target.value)}
                className="mt-1 focus:outline-none w-full border-[#BEBDBD] focus-visible:top-10 focus:border-[#19B1D2] active:border-[#0094FF] px-2 py-3 rounded-md bg-transparent border shadow-sm text-white sm:text-sm"
              >
                <option value="" className="bg-[#04080C] text-white">
                  Select Your ID type
                </option>
                <option
                  className="bg-[#04080C] text-white"
                  value="International Passport"
                >
                  International Passport
                </option>
                <option
                  className="bg-[#04080C] text-white"
                  value="National Identification"
                >
                  National Identification
                </option>
              </select>
             
            </div>
            <div className="mb-4">
              <label
                htmlFor="idNumber"
                className="font-[500] text-[1em] text-white"
              >
                Identity Number
              </label>
              <input
                type="text"
                id="idNumber"
                placeholder="Enter Your ID Number"
                name="idNumber"
                value={idNumber}
                onChange={(e) => setIdNumber(e.target.value)}
                className="mt-1 focus:outline-none w-full border-[#BEBDBD] focus-visible:top-10 focus:border-[#19B1D2] active:border-[#0094FF] px-2 py-3 rounded-md bg-transparent border shadow-sm text-white sm:text-sm"
              />
            </div>
            {/* <div className="mb-4">
              <label
                htmlFor="fullname"
                className="font-[500] text-[1em] text-white"
              >
                First Party FulNname
              </label>
              <input
                type="text"
                id="fullname"
                name="fullname"
                value={firstPartyName}
                onChange={(e) => setFirstPartyName(e.target.value)}
                className="mt-1 focus:outline-none w-full border-[#BEBDBD] focus-visible:top-10 focus:border-[#19B1D2] active:border-[#0094FF] px-2 py-3 rounded-md bg-transparent border shadow-sm text-white sm:text-sm"
              />
            </div> */}
          </>
        );
      case 4:
        return (
          <>
            {/* <div className="mb-4">
              <label
                htmlFor="secondPartyName"
                className="font-[500] text-[1em] text-white"
              >
                Second Party's FullName
              </label>
              <input
                type="text"
                id="secondPartyName"
                name="secondPartyName"
                value={secondPartyName}
                onChange={(e) => setSecondPartyName(e.target.value)}
                className="mt-1 focus:outline-none w-full border-[#BEBDBD] focus-visible:top-10 focus:border-[#19B1D2] active:border-[#0094FF] px-2 py-3 rounded-md bg-transparent border shadow-sm text-white sm:text-sm"
              />
            </div> */}
            <div className="mb-4">
              <label
                htmlFor="secondPartyAddress"
                className="font-[500] text-[1em] text-white"
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
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full px-4 flex flex-col gap-8 overflow-clip">
      <Header />
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
        <div className="w-full flex-col flex gap-4">

        {errors.general && (
          <span className="text-red-500">{errors.general}</span>
        )}
         {errors.second_party_address && (
                <span className="text-red-500">
                  {"second_party_address: "+ errors.second_party_address[0]}
                </span>
              )}
               {errors.first_party_id_type && (
                <span className="text-red-500">
                  {"first_party_id_type: " +errors.first_party_id_type[0]}
                </span>
              )}
                 {errors.country && (
                <span className="text-red-500">{"country: " + errors.country[0]}</span>
              )}
                     {errors.content && (
                <span className="text-red-500">{"content: "+errors.content[0]}</span>
              )}
                   {errors.agreementTitle && (
                <span className="text-red-500">{"agreement Title: "+errors.agreementTitle[0]}</span>
              )}
                    {errors.agreementType && (
              <span className="text-red-500">{"Agreement Type: "+errors.agreementType[0]}</span>
            )}
        </div>
          {renderStep()}
          <div className="flex justify-between flex-row-reverse gap-8">
            {modalStep !== 4 && (
              <button
                type="button"
                onClick={() => setModalStep(modalStep + 1)}
                className="bg-gradient-to-r from-[#19B1D2] to-[#0094FF] sm:w-[156px] w-full rounded-[2em] text-white font-bold py-2 px-4 border-gradient shadow-[0_0_0_1px_#0094FF,0_0_0_3px_rgba(28,167,214,0.41)] transition-transform transform hover:scale-105 active:shadow-none border-gradient"
              >
                Continue
              </button>
            )}

            {modalStep == 4 && (
              <button
                type="submit"
                className="bg-gradient-to-r from-[#19B1D2] to-[#0094FF] sm:w-[156px] w-full rounded-[2em] text-white font-bold py-2 px-4 border-gradient shadow-[0_0_0_1px_#0094FF,0_0_0_3px_rgba(28,167,214,0.41)] transition-transform transform hover:scale-105 active:shadow-none border-gradient"
              >
                {initCreationLoad ? "Creating" : "Create"}
              </button>
            )}
            <button
              type="button"
              onClick={() => window.history.back()}
              className="w-full rounded-[2em] sm:w-[156px] text-white font-bold py-2 px-6 border-[#9B9292] border bg-gradient-to-b from-[#04080C] to-[#09131A] shadow-[0_0_6px_1px_rgba(132,129,129,0.21),0_0_0_2px_rgba(132,129,129,0.16)] transition-transform transform hover:scale-105"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className="flex items-center justify-center"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <SuccessScreen onClose={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default AgreementModal;
