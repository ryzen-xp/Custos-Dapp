/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { useEffect, useState } from "react";
import Modal from 'react-modal';
import {AgreementCard, PendingAgreementCard} from "./components/agreementcard";
import NoAgreementscreen from "./components/noAgreementscreen";
import { useAccount, useReadContractData } from "@/utils/fetchcontract";
import { Header } from "./components/AgreementNav";
import SignAgreementModal from "./components/signagreementmodal";
import SuccessScreen from "./components/Success";

function AgreementList() {
  const [loading, setLoading] = useState(false);
  const [showAgreementModal, setShowAgreementModal] = useState(false);
  const [pendingAgreements, setPendingAgreements] = useState([]);
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

  const calleraddress = useAccount()?.address;

  useEffect(() => {
    const FetchPendingAgreements = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://custosbackend.onrender.com/agreement/agreement/by_party/?address=${calleraddress}`);
        const data = await res.json();  
        console.log('response::', data);
        setPendingAgreements(data);
      } catch (error) {
        console.error("Error fetching agreements:", error);
      } finally {
        setLoading(false);
      }
    };

    if (calleraddress) {
      FetchPendingAgreements();
    }
  }, [calleraddress]);

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
          <div className="text-center py-8">
            <div className="loader ease-linear rounded-full border-8 border-t-8 bg-[#130316] border-gray-200 h-16 w-16 mx-auto"></div>
            <p className="mt-2 text-white">Loading agreements...</p>
          </div>
        ) : (agreements === null) || (agreements.length === 0) ? (
          <div className="w-full m-auto p-4 text-[#EAFBFF]">
            <NoAgreementscreen />
          </div>
        ) : (
          <div className="w-full flex flex-col gap-4">
            <div className="w-full flex flex-col px-4">

              <h1 className="text-3xl text-[#fff] mb-4">Pending Agreements</h1>
              <div className="grid w-full gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {Array.isArray(pendingAgreements) ? (
                pendingAgreements.map((agreement, index) => (
                  <div key={index} className="w-full">
                    <PendingAgreementCard agreement={agreement} printAgreement={printAgreement} toggleSignModal={toggleSignModal} />
                  </div>
                ))
              ) : (
                <p className="text-[#0094FF]">No pending agreements found.</p>
              )}
            </div>
            </div>
            <div className="w-full flex flex-col px-4">

              <h1 className="text-3xl text-[#fff] mb-4 ">Signed Agreements</h1>
              <div className="grid w-full gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {agreements.map((agreement, index) => (
                <div key={index} className="w-full">
                  <AgreementCard agreement={agreement} printAgreement={printAgreement} toggleSignModal={toggleSignModal} />
                </div>
              ))}
            </div>
            </div>
          </div>
        )}
      </div>

      <Modal
        isOpen={showAgreementModal}
        onRequestClose={toggleSignModal}
        contentLabel="Sign Agreement Modal"
        className="modal-content bg-red-500"
        overlayClassName="modal-overlay"
      >
        <SignAgreementModal agreement={selectedAgreement} toggleSignModal={toggleSignModal} />
      </Modal>
    </div>
  );
}

export default AgreementList;



