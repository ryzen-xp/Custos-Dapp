"use client";
import { useEffect, useState } from "react";
import useIdentityVerification from "@/utils/verification";

const ValidateAgreementModal = ({ fullname, agreementId }) => {
  const { verifyIdentity, loading, result, error } = useIdentityVerification();
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    const validateAgreement = async () => {
      await verifyIdentity(fullname, { agreementId });
      setIsPending(false);
    };
    validateAgreement();
  }, [fullname, agreementId]);

  return (
    <div className="p-3 text-base space-y-[1em] flex flex-col bg-gradient-to-r border-gradient h-fit backdrop-blur-2xl from-[#19B1D2] to-[#0094FF] bg-clip-text text-transparent rounded-lg relative">
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500">Error: {error}</div>
      ) : (
        <div className="max-w-md mx-auto">
          <h3 className="text-lg font-bold mb-4">Validation Result</h3>
          <p>
            <strong>Full Name:</strong> {fullname}
          </p>
          <p>
            <strong>Agreement ID:</strong> {agreementId}
          </p>
          <p>
            <strong>Validation Status:</strong> {result?.status || "N/A"}
          </p>
          <p>
            <strong>Validation Details:</strong> {result?.details || "N/A"}
          </p>
        </div>
      )}
    </div>
  );
};

export default ValidateAgreementModal;
