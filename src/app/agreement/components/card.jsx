import React, { useState, useEffect } from "react";
import { getContract } from "thirdweb";
import SignAgreementModal from "./signagreementmodal";
import { useActiveWallet } from "thirdweb/react";
import { client } from "@/utils/thirdwebclient";
import abi from "@/utils/agreementAbi.json";
import { baseSepolia } from "thirdweb/chains";

export default function CustomCard({ agreement }) {
  const [showSignModal, setshowSignModal] = useState(false);
  const [isSigner, setIsSigner] = useState(false);
  const [isValidator, setIsValidator] = useState(false);

  const contract = getContract({
    client,
    chain: baseSepolia,
    address: "0x726c51fcAC027fF7C9eAaF830f88daF12199ddC5",
    abi: abi,
  });

  const toggleSignModal = () => {
    setshowSignModal(!showSignModal);
  };

  const wallet = useActiveWallet();

  useEffect(() => {
    validateCheck();
  }, []);

  const validateCheck = () => {
    if (agreement.firstParty === wallet.getAccount().address) {
      setIsSigner(false);
      setIsValidator(true);
    } else if (agreement.secondParty === wallet.getAccount().address) {
      setIsValidator(false);
      setIsSigner(true);
    } else {
      setIsSigner(false);
      setIsValidator(false);
    }
  };

  const handleValidate = () => {};

  return (
    <div className="border-2 border-[#20071c] bg-[#130316] transition-transform duration-400 rounded-lg hover:border-purple-500 hover:bg-[#130319] p-4 m-4">
      {showSignModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg relative">
            <button
              className="absolute top-2 right-2 text-2xl font-bold"
              onClick={() => setshowSignModal(false)}
            >
              &times;
            </button>
            <SignAgreementModal agreementid={agreement.id} />
          </div>
        </div>
      )}
      <div className="space-y-2">
        <h5 className="text-white text-xl font-bold">Agreement ID: {agreement.id}</h5>
        <p className="text-white">Creator: {agreement.creator}</p>
        <p className="text-white">Content: {agreement.content}</p>
        <p className="text-white">Second Party Address: {agreement.secondPartyAddress}</p>
      </div>
      <div className="flex justify-center gap-2 mt-4">
        <button
          onClick={isSigner ? toggleSignModal : isValidator ? handleValidate : null}
          className={`bg-[#461853] hover:bg-[#1c0624] text-white font-bold py-2 px-4 rounded border-[#c92eff] border ${
            isSigner || isValidator ? "hover:border-none" : "opacity-50 cursor-not-allowed"
          }`}
          disabled={!isSigner && !isValidator}
        >
          {isSigner ? "Sign Agreement" : isValidator ? "Validate" : "Disabled"}
        </button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Print
        </button>
      </div>
    </div>
  );
}
