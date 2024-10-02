/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
"use client";
import { useContext, useEffect, useState } from "react";
import useIdentityVerification from "@/utils/verification";
import { GlobalStateContext } from "@/context/GlobalStateProvider";
import { useRouter } from "next/navigation";
import { UseWriteToContract } from "@/utils/fetchcontract";
import { stringToFelt } from "@/utils/serializer";

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

  const { writeToContract, isLoading, isError } = UseWriteToContract();

  const handleValidate = async () => {
    try {
      if (!writeToContract) {
        throw new Error("writeToContract function is not available");
      }

      const params = [
        stringToFelt(agreement.content),
        agreement.second_party_address,
        stringToFelt('test'),
        stringToFelt("test"),
      ];

      // Log the parameters to check if any of them are null or undefined
      console.log("Parameters for createAgreement:", params);

      // Check if any parameter is null or undefined
      if (params.some(param => param == null)) {
        throw new Error("One or more parameters are null or undefined");
      }

      const result = await writeToContract("agreement", "createAgreement", params);
      console.log("result", result);
      // Handle successful validation here
    } catch (err) {
      console.error("Contract interaction failed", err);
      // Handle the error, maybe show an error message to the user
    }
  };

  // Function to handle continue button click
  const handleContinue = () => {
    setCurrentStep((prevStep) => prevStep + 1); // Go to the next step
  };

  return (
    <div className="p-3 h-screen bg-[#00000095] w-full flex items-center justify-center text-white text-transparent rounded-lg absolute left-0 z-50 top-0">
      {loading ? (
        <div className="text-center">Loading...</div>
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
    </div>
  );
};

export default ValidateAgreementModal;
