/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
"use client";
import { useContext, useEffect, useState } from "react";
import useIdentityVerification from "@/utils/verification";
import { GlobalStateContext } from "@/context/GlobalStateProvider";
import { useRouter } from "next/navigation";
import { provider, UseWriteToContract } from "@/utils/fetchcontract";
import { hexToNumber, stringToByteArray, stringToFelt } from "@/utils/serializer";
import SuccessScreen from "./Success";
import Loading from "@/components/loading";

const ValidateAgreementModal = ({
  fullname,
  agreementId,
  agreementToken,
  onClose,
  agreement,
}) => {
  const { verifyIdentity, loading, result, error } = useIdentityVerification();
  const [isPending, setIsPending] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const { globalState, setGlobalState } = useContext(GlobalStateContext);
  const router = useRouter();
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isValidating, setIsValidating] = useState(false);

  const { writeToContract, isLoading, isError } = UseWriteToContract();

  const EVENT_SELECTOR = '0x014c05f7f3f16c18069b3e5dfe85b725aad852e37813fa307559077b451d54d2';

  const handleValidate = async () => {
    setIsValidating(true);
    try {
      if (!writeToContract) {
        throw new Error("writeToContract function is not available");
      }
      
      const params = [
        `"${stringToByteArray(agreement.content)}"`,
        agreement.second_party_address,
        `"${stringToByteArray(agreement.first_party_valid_id)}"`,
        `"${stringToByteArray(agreement.second_party_valid_id)}"`,
      ];
      console.log("Parameters for createAgreement:", params);
      if (params.some(param => param == null)) {
        throw new Error("One or more parameters are null or undefined");
      }
      const result = await writeToContract("agreement", "create_agreement", params);
            
      const txReceipt = await provider.waitForTransaction(result.transaction_hash);
      let agreement_id;
      if (txReceipt.isSuccess()) {
        const events = txReceipt.events;
        console.log("All events:", events);

        agreement_id = events[0].keys[1]
        agreement_id = hexToNumber(agreement_id)
        console.log(agreement_id)
        console.log("agreement_id", agreement_id);
      }

      if (result && result.transaction_hash) {
        const formData = new FormData();
        formData.append('agreement_id', agreement_id);

        // Construct the URL with the access_token as a query parameter
        const url = `https://custosbackend.onrender.com/agreement/agreement/update_by_access_token/?access_token=${encodeURIComponent(agreement.access_token)}`;

        const response = await fetch(url, {
          method: 'PUT',
          body: formData,
        });

        if (response.ok) {
          setIsSuccess(true);
        } else {
          throw new Error('Failed to update agreement validation status');
        }
      } else {
        throw new Error('Transaction hash not received');
      }
    } catch (err) {
      console.error("Contract interaction failed", err);
      setIsSuccess(false);
    } finally {
      setIsValidating(false);
      setIsResultModalOpen(true);
    }
  };

  // Function to handle continue button click
  const handleContinue = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  return (
    <div className="p-3 h-screen bg-[#00000095] w-full flex items-center justify-center text-white text-transparent rounded-lg absolute left-0 z-50 top-0">
      {loading || isValidating ? (
        <div className="text-center">
         <Loading text="Agreement is being created onchain..... please Wait" />
        </div>
      ) : error ? (
        <div className="text-center text-red-500">Error: {error}</div>
      ) : (
        <div className="box w-[30%]">
          <div className="bo p-4 h-fit rounded-[23px] validate-gradient flex flex-col gap-4">
            <h3 className="text-lg font-bold mb-4">Validate Agreement</h3>

            {currentStep === 1 && (
              <>
                <strong>Second Party's Full Name:</strong>
                <p className="py-2 text-[#9B9292] px-4  border border-[#ffffff46]  rounded-lg">
                  {agreement.second_party_fullname}
                </p>
                <strong>Second Party's ID </strong>
                <p className="py-2 text-[#9B9292] px-4  border border-[#ffffff46]  rounded-lg">
                  <img src={agreement.second_party_valid_id} alt="ID" />
                </p>
                <strong>Second Party's Wallet Address:</strong>
                <p className="px-2 border border-[#ffffff46] rounded-lg">
                <p className="py-2 text-[#9B9292] border-none overflow-scroll scrollbar-hide rounded-lg"
                >

                  
                  {agreement.second_party_address}
                </p>
                  </p>
              </>
            )}

            {currentStep === 2 && (
              <>
                <strong>Terms and Conditions</strong>
                <textarea
                  className="w-full p-4 text-[#9B9292] bg-transparent border border-[#ffffff46] rounded-lg"
                  rows="6"
                  readOnly
                  value={`Sample Terms and Policy Content:\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt consectetur dolore aut ipsum pariatur nemo recusandae, a fugiat enim saepe magni iure maiores nihil beatae natus quia accusamus tenetur. Aliquam.`}
                />
              </>
            )}
            <div className="flex justify-between">
              <div className="button-transition">
                <img
                  src="./cancleAgreement.png"
                  alt="Cancel Agreement"
                  onClick={onClose}
                />
              </div>
              {currentStep === 2 ? (
                <div className="button-transition">
                  <img
                    src="./FinalValidateButton.png"
                    alt="Validate Agreement"
                    onClick={handleValidate} // Move to next step on click
                  />
                </div>
              ) : (
                <div className="button-transition">
                  <img
                    src="./ContinueAgreement.png"
                    alt="Continue Agreement"
                    onClick={handleContinue}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {isResultModalOpen && (
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">

        <SuccessScreen 
          onClose={() => {
            setIsResultModalOpen(false);
            onClose();
          }}
          isSuccess={isSuccess}
        />
      </div>
      
      )}
    </div>
  );
};

export default ValidateAgreementModal;
