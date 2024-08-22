/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useEffect, useState, useContext } from "react";
import Modal from "react-modal";
import {
  AgreementCard,
  PendingAgreementCard,
} from "./components/agreementcard";
import NoAgreementscreen from "./components/noAgreementscreen";
import AgreementNav from "./components/AgreementNav";
import SignAgreementModal from "./components/signagreementmodal";
import { WalletContext } from "@/components/walletprovider";

function AgreementList() {
  const [loading, setLoading] = useState(false);
  const [showAgreementModal, setShowAgreementModal] = useState(false);
  const [pendingAgreements, setPendingAgreements] = useState([]);
  const [agreements, setAgreements] = useState([]);
  const [totalAgreements, setTotalAgreements] = useState([]);
  const [selectedAgreement, setSelectedAgreement] = useState(null);
  const { address } = useContext(WalletContext);

  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    const FetchAgreements = async () => {
      setLoading(true);
      try {
        const res = await useReadContractData(
          "agreement",
          "getAllAgreements",
          []
        );
        console.log("response::", res);
        const totalAgreements = res.map((agreement) => agreement.toString());
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
    const FetchPendingAgreements = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://custosbackend.onrender.com/agreement/agreement/by_party/?address=${address}`
        );
        const data = await res.json();
        console.log("response::", data);
        setPendingAgreements(data);
      } catch (error) {
        console.error("Error fetching agreements:", error);
      } finally {
        setLoading(false);
      }
    };

    if (address) {
      FetchPendingAgreements();
    }
  }, [address]);

  useEffect(() => {
    const GetTotalAgreements = async () => {
      if (totalAgreements.length === 0) return;

      setLoading(true);
      try {
        const agreementsDetails = await Promise.all(
          totalAgreements.map((id) =>
            useReadContractData("agreement", "getAgreementDetails", [id])
          )
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
    const printWindow = window.open("", "", "width=800,height=600");
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
  };

  const toggleSignModal = (agreement) => {
    setSelectedAgreement(agreement);
    setShowAgreementModal(!showAgreementModal);
  };

  const renderAgreements = () => {
    if (activeTab === "all") {
      return agreements.length > 0 || pendingAgreements.length > 0 ? (
        <div className="grid w-full gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {pendingAgreements.map((agreement, index) => (
            <PendingAgreementCard
              key={index}
              agreement={agreement}
              printAgreement={printAgreement}
              toggleSignModal={toggleSignModal}
            />
          ))}
          {agreements.map((agreement, index) => (
            <AgreementCard
              key={index}
              agreement={agreement}
              printAgreement={printAgreement}
              toggleSignModal={toggleSignModal}
            />
          ))}
        </div>
      ) : (
        <NoAgreementscreen />
      );
    }

    if (activeTab === "pending") {
      return pendingAgreements.length > 0 ? (
        <div className="grid w-full gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {pendingAgreements.map((agreement, index) => (
            <PendingAgreementCard
              key={index}
              agreement={agreement}
              printAgreement={printAgreement}
              toggleSignModal={toggleSignModal}
            />
          ))}
        </div>
      ) : (
        <NoAgreementscreen />
      );
    }

    if (activeTab === "signed") {
      return agreements.length > 0 ? (
        <div className="grid w-full gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {agreements.map((agreement, index) => (
            <AgreementCard
              key={index}
              agreement={agreement}
              printAgreement={printAgreement}
              toggleSignModal={toggleSignModal}
            />
          ))}
        </div>
      ) : (
        <NoAgreementscreen />
      );
    }

    if (activeTab === "validated") {
      // Add validation logic as needed
      return (
        <div className="w-full text-center text-white">
          No validated agreements yet.
        </div>
      );
    }
  };

  return (
    <div className="w-full flex flex-col">
      {/* Secondary Navbar */}
      <AgreementNav activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="w-full">
        {loading ? (
          <div className="text-center py-8">
            <div className="loader ease-linear rounded-full border-8 border-t-8 bg-[#130316] border-gray-200 h-16 w-16 mx-auto"></div>
            <p className="mt-2 text-white">Loading agreements...</p>
          </div>
        ) : (
          renderAgreements()
        )}
      </div>

      <Modal
        isOpen={showAgreementModal}
        onRequestClose={toggleSignModal}
        contentLabel="Sign Agreement Modal"
        className="modal-content bg-red-500"
        overlayClassName="modal-overlay"
      >
        <SignAgreementModal
          agreement={selectedAgreement}
          toggleSignModal={toggleSignModal}
        />
      </Modal>
    </div>
  );
}

export default AgreementList;
