/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { useEffect, useState } from "react";
import AgreementCard from "./components/agreementcard";
import NoAgreementscreen from "./components/noAgreementscreen";
import {useReadContractData}
// import { client } from "@/utils/thirdwebclient";
import SignAgreementModal from "./components/signagreementmodal";

function AgreementList() {
  const [loading, setLoading] = useState(true);
  const [agreements, setAgreements] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showagreementModal, setShowagreementModal] = useState(false);


  const toggleSignModal = () => {
    setshowSignModal(!showagreementModal);
  };

  useEffect(() => {

    setAgreements(null);
    setLoading(false);
    setIsAdmin(true);
  }, [agreements]);


  return (
    <div className="w-full px-4">
      

 

      <div className="w-full ">
        {loading ? (
          // Show loading indicator if agreements are loading
          <div className="text-center py-8">
            <div className="loader ease-linear rounded-full border-8 border-t-8 bg-[#130316] border-gray-200 h-16 w-16 mx-auto"></div>
            <p className="mt-2">Loading agreements...</p>
          </div>
        ) : agreements === null ? (
          <div className="w-full m-auto p-4 text-[#EAFBFF] ">
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
