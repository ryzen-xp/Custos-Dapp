/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { useEffect, useState } from "react";
import Modal from 'react-modal';
import AgreementCard from "./components/agreementcard";
import NoAgreementscreen from "./components/noAgreementscreen";
import { useReadContractData } from "@/utils/fetchcontract";
import { Header } from "./components/AgreementNav";
import SignAgreementModal from "./components/signagreementmodal";

function AgreementList() {
  const [loading, setLoading] = useState(false);
  const [showAgreementModal, setShowAgreementModal] = useState(false);
  const [agreements, setAgreements] = useState([]);
  const [totalAgreements, setTotalAgreements] = useState([]);
  const [selectedAgreement, setSelectedAgreement] = useState(null);


  useEffect(() => {
    const FetchAgreements = async () => {
      setLoading(true);
      try {
        const res = await useReadContractData("agreement", "getAllAgreements", []);
        console.log('response::', res);
        const totalAgreements = res.map(agreement => agreement.toString());
        setTotalAgreements(totalAgreements);
      } catch (error) {
        console.error("Error fetching agreements:", error);
      } finally {
        setLoading(false);
      }
    };

    FetchAgreements();
  }, []);

  useEffect(() => {
    const GetTotalAgreements = async () => {
      if (totalAgreements.length === 0) return;

      setLoading(true);
      try {
        const agreementsDetails = await Promise.all(
          totalAgreements.map(id => useReadContractData("agreement", "getAgreementDetails", [id]))
        );
        setAgreements(agreementsDetails);
        console.log("agreements are", agreementsDetails);
      } catch (error) {
        console.error("Error fetching agreement details:", error);
      } finally {
        setLoading(false);
      }
    };

    GetTotalAgreements();
  }, [totalAgreements]);

  const printAgreement = (agreement) => {
    const printContent = `
      <h1>${agreement.title}</h1>
      <p>Second Party Address: ${agreement.secondPartyAddress}</p>
      <p>Created by  : ${agreement.creatorName}</p>
      <p>${agreement.content}</p>
    `;
    const printWindow = window.open('', '', 'width=800,height=600');
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
  };
  const toggleSignModal = (agreement) => {
    setSelectedAgreement(agreement);
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
            {agreements?.map((agreement, index) => (
              <div key={index} className="">
                <AgreementCard agreement={agreement} printAgreement={printAgreement} toggleSignModal={toggleSignModal} />
              </div>
            ))}
          </div>
        )}
      </div>
      <Modal
        isOpen={showAgreementModal}
        onRequestClose={toggleSignModal}
        contentLabel="Sign Agreement Modal"
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <SignAgreementModal agreement={selectedAgreement} toggleSignModal={toggleSignModal} />
      </Modal>
    </div>
  );
}

export default AgreementList;
