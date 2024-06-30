"use client";
import { useEffect, useState } from "react";
import AgreementCard from "./components/agreementcard";
import NoAgreementscreen from "./components/noAgreementscreen";
import { useReadContractData } from "@/utils/fetchcontract";
import { mockagreementdata } from "@/utils/mockdata";
import { Header } from "./components/AgreementNav";
import { client } from "@/utils/thirdwebclient";
import { getAllAgreements } from "@/thirdweb/84532/0x71b7d170e025cedaed65d5579330c865fe3633ca";
import SignAgreementModal from "./components/signagreementmodal";

function AgreementList() {
  const [loading, setloading] = useState(false);
  const [showAgreementModal, setShowAgreementModal] = useState(false);
  const [agreements, setAgreements] = useState([]);

  const res = useReadContractData("agreement", "getAllAgreements", []);

  const totalAgreements = [];

  const getTotalAgreements = () => {
    for (let index = 0; index <= res; index++) {
      const response = useReadContractData("agreement", "getAgreementDetails", [
        index,
      ]);
      console.log("data is::", response);
      return totalAgreements.push(response);
    }
  };
  getTotalAgreements();

  useEffect(() => {
    setloading(true);
    setAgreements(totalAgreements);
    setloading(false);
  }, []);

  const toggleSignModal = () => {
    setShowAgreementModal(!showAgreementModal);
  };

  return (
    <div className="w-full px-4 flex flex-col gap-8">
      <Header />
      <div className="w-full">
        {loading ? (
          // Show loading indicator if agreements are loading
          <div className="text-center py-8">
            <div className="loader ease-linear rounded-full border-8 border-t-8 bg-[#130316] border-gray-200 h-16 w-16 mx-auto"></div>
            <p className="mt-2 text-white">Loading agreements...</p>
          </div>
        ) : (agreements === null) | undefined || agreements.length === 0 ? (
          <div className="w-full m-auto p-4 text-[#EAFBFF]">
            <NoAgreementscreen />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto w-[90%] mb-8">
            {agreements?.map((agreement) => (
              <div key={agreement.id} className="">
                <AgreementCard agreement={agreement} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AgreementList;
