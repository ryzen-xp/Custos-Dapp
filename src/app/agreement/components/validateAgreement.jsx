"use client";
import { useContext, useEffect, useState } from "react";
import useIdentityVerification from "@/utils/verification";
import { GlobalStateContext } from "@/context/GlobalStateProvider";
import { useRouter } from "next/navigation";

const ValidateAgreementModal = ({
  fullname,
  agreementId,
  agreementToken,
  onClose,
  // setFinalValidate,
}) => {
  const { verifyIdentity, loading, result, error } = useIdentityVerification();
  const [isPending, setIsPending] = useState(true);
  const [currentStep, setCurrentStep] = useState(1); // State for tracking the current step
  const { globalState, setGlobalState } = useContext(GlobalStateContext);
  const router = useRouter();
  useEffect(() => {
    const validateAgreement = async () => {
      await verifyIdentity(fullname, { agreementId });
      setIsPending(false);
    };
    validateAgreement();
  }, [fullname, agreementId]);

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
                  {fullname}
                </p>
                <strong>Second Party's ID Number:</strong>
                <p className="py-2 text-[#9B9292] px-4  border border-[#ffffff46]  rounded-lg">
                  {agreementId || "ID"}{" "}
                </p>
                <strong>Second Party's Wallet Address:</strong>
                <p className="py-2 text-[#9B9292] px-4  border border-[#ffffff46]  rounded-lg">
                  0x2437357910yw63uj9dok6
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
                    onClick={() => {
                      // setGlobalState(agreementToken);
                       if (agreementToken) {
                         router.push(
                           `/agreement/access_token/${agreementToken}`
                         );
                       } else {
                         router.push(`/agreement/id/${agreementId}`);
                       }
                      onClose();
                    }} // Move to next step on click
                  />
                </div>
              ) : (
                <div className="button-transition">
                  <img
                    src="./ContinueAgreement.png"
                    alt="Continue Agreement"
                    onClick={handleContinue} // Move to next step on click
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
