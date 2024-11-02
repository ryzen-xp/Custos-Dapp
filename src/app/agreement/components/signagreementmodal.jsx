/* eslint-disable react/no-unescaped-entities */
"use client";
import { useContext, useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { GlobalStateContext } from "@/context/GlobalStateProvider";
import SignaturePad from "react-signature-canvas";
import useIdentityVerification from "@/utils/verification";

const SignAgreementModal = ({
  fullname,
  agreementId,
  agreementToken,
  onClose,
}) => {
  const { verifyIdentity, loading, result, error } = useIdentityVerification();
  const [currentStep, setCurrentStep] = useState(1);
  const [signatureType, setSignatureType] = useState("");
  const [idType, setIdType] = useState("");
  const [country, setCountry] = useState("");
  const [uploadedSignature, setUploadedSignature] = useState(null);
  const [uploadedId, setUploadedId] = useState(null); // New state for uploaded ID
  const signaturePadRef = useRef(null);
  const { globalState } = useContext(GlobalStateContext);
  const router = useRouter();

  // Function to handle continue button click
  const handleContinue = () => {
    setCurrentStep((prevStep) => prevStep + 1); // Go to next step
  };

  // Function to handle signature upload
  const handleSignatureUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedSignature(file); // Store the uploaded signature image
    }
  };

  // Function to handle ID upload
  const handleIdUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedId(file); // Store the uploaded ID image
    }
  };

  // Function to convert base64 to a File object
  const base64ToFile = (base64String, fileName) => {
    const arr = base64String.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], fileName, { type: mime });
  };


  const handleSignAgreement = async () => {
    let signatureData = null;


    if (signatureType === "draw" && signaturePadRef.current) {
      const base64Signature = signaturePadRef.current.toDataURL();
      signatureData = base64ToFile(base64Signature, "signature.png");
    }

    if (signatureType === "upload" && uploadedSignature) {
      signatureData = uploadedSignature;
    }

    if (signatureData && uploadedId) {
      const formData = new FormData();
      formData.append("second_party_signature", signatureData);
      formData.append("second_party_valid_id", uploadedId);
      formData.append("second_party_id_type", idType);
      formData.append("second_party_country", country);

      await fetch(
        `https://custosbackend.onrender.com/agreement/agreement/${agreementId}/sign/`,
        {
          method: "POST",
          body: formData,
        }
      );

      onClose();
    }
  };


  return (
    <div className="p-3 h-screen bg-[#00000095] w-full flex items-center justify-center text-white rounded-lg absolute left-0 z-50 top-0">
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500">Error: {error}</div>
      ) : (
        <div className="box w-[30%]">
          <div className="p-4 h-fit rounded-[23px] validate-gradient flex flex-col gap-4">
            <h3 className="text-lg font-bold mb-4">Sign the Agreement</h3>

            {currentStep === 1 && (
              <>
                <strong>Country</strong>
                <input
                  type="text"
                  onChange={(e) => setCountry(e.target.value)}
                  className="py-2 text-[#9B9292] px-4 border border-[#ffffff46] rounded-lg bg-transparent"
                />
                <strong>Identity Type</strong>
                <select
                  onChange={(e) => setIdType(e.target.value)}
                  placeholder="Select ID Type"
                  className="mt-1 w-full border-[#BEBDBD] px-2 py-3 rounded-md bg-transparent border shadow-sm text-[#9B9292] sm:text-sm"
                >
                  <option value="" className="bg-[#04080C] text-[#9B9292]">
                    {" "}
                    Select ID type{" "}
                  </option>
                  <option
                    value="International Passport"
                    className="bg-[#04080C] text-[#9B9292]"
                  >
                    {" "}
                    International Passport{" "}
                  </option>
                  <option
                    value="National Identification"
                    className="bg-[#04080C] text-[#9B9292]"
                  >
                    {" "}
                    National Identification{" "}
                  </option>
                  <option
                    value="Work Id card"
                    className="bg-[#04080C] text-[#9B9292]"
                  >
                    {" "}
                    Work Identity{" "}
                  </option>
                </select>
                {/* <strong>Identity Number</strong>
                <input
                  type="text"
                  placeholder="Enter Your Id number"
                  className="py-2 text-[#9B9292] px-4 border border-[#ffffff46] rounded-lg bg-transparent"
                /> */}
                <strong>Upload Id</strong>
                <input
                  type="file"
                  onChange={handleIdUpload}
                  className="py-2 px-4 border border-[#ffffff46] rounded-lg bg-transparent"
                />{" "}
                {/* Add onChange to capture uploaded ID */}
              </>
            )}

            {currentStep === 2 && (
              <>
                <strong>Terms and Conditions</strong>
                <textarea
                  className="w-full p-4 text-[#9B9292] bg-transparent border border-[#ffffff46] rounded-lg"
                  rows="6"
                  readOnly
                  value="Sample terms and policy content..."
                />

                <strong>Signature Type</strong>
                <select
                  value={signatureType}
                  onChange={(e) => setSignatureType(e.target.value)}
                  className="mt-1 w-full border-[#BEBDBD] px-2 py-3 rounded-md bg-transparent border shadow-sm text-[#9B9292] sm:text-sm"
                >
                  <option value="">Select Signature Type</option>
                  <option value="draw">Draw Signature</option>
                  <option value="upload">Upload Signature</option>
                </select>

                {signatureType === "draw" && (
                  <div className="signature-draw-container my-4 border border-[#ffffff46] rounded-lg p-4">
                    <SignaturePad
                      ref={signaturePadRef}
                      canvasProps={{
                        className: "signature-pad w-full h-32 bg-white",
                      }}
                    />
                    <button
                      className="text-red-500 mt-2"
                      onClick={() => signaturePadRef.current.clear()}
                    >
                      Clear Signature
                    </button>
                  </div>
                )}

                {signatureType === "upload" && (
                  <div className="upload-signature-container my-4">
                    <input type="file" onChange={handleSignatureUpload} />
                  </div>
                )}
              </>
            )}

            <div className="flex justify-between">
              <div className="button-transition">
                <img
                  src="/cancleAgreement.png"
                  alt="Cancel Agreement"
                  onClick={onClose}
                />
              </div>
              {currentStep === 2 ? (
                <div className="button-transition">
                  <img
                    src="/SignAgreement.png"
                    alt="Validate Agreement"
                    onClick={handleSignAgreement}
                  />
                </div>
              ) : (
                <div className="button-transition">
                  <img
                    src="/ContinueAgreement.png"
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

export default SignAgreementModal;
