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
// import { UseReadContractData } from "@/utils/fetchcontract";
import agreementAbi from "../../utils/agreementAbi.json"

function AgreementList() {
  const [loading, setLoading] = useState(false);
  const [showAgreementModal, setShowAgreementModal] = useState(false);
  const [pendingAgreements, setPendingAgreements] = useState([]);
  const [agreements, setAgreements] = useState([]);
  const [totalAgreements, setTotalAgreements] = useState([]);
  const [selectedAgreement, setSelectedAgreement] = useState(null);
  const { address } = useContext(WalletContext);
  console.log('new address', address);

  const [activeTab, setActiveTab] = useState("all");

  
  // const provider = new RpcProvider({
  //   nodeUrl: "https://free-rpc.nethermind.io/sepolia-juno/v0_7",
  // });
  // const readData = new Contract(
  //   agreementAbi,
  //   "0x03cbefe95450dddc88638f7b23f34d83fc48b570e476d87a608c07724aaaa342",
  //   provider
  // );
  
  // console.log(getOnchainAgreement)
  
  // const getOnchainAgreement = UseReadContractData("agreement", "getUserAgreements", []);
  useEffect(() => {
    // if (!getOnchainAgreement) return;

    const fetchAgreements = async () => {
      setLoading(true);
      try {
        // Fetch agreement details
        // const agreementsDetails = await Promise.all(
        //   totalAgreements.map((id) =>
        //     useReadContractData("agreement", "getAgreementDetails", [id])
        //   )
        // );
        // setAgreements(agreementsDetails);
        // console.log("agreements are", agreementsDetails);
      } catch (error) {
        console.error("Error fetching agreement details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAgreements();
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
    else{
      setPendingAgreements(null);
    }
  }, [address]);

  useEffect(() => {
    const GetTotalAgreements = async () => {
      if (totalAgreements.length === 0) return;

      setLoading(true);
      try {
        // const agreementsDetails = await Promise.all(
        //   totalAgreements.map((id) =>
        //     useReadContractData("agreement", "getAgreementDetails", [id])
        //   )
        // );
        // setAgreements(agreementsDetails);
        // console.log("agreements are", agreementsDetails);
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
      return agreements.length > 0 || pendingAgreements?.length > 0 ? (
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
      const filteredPendingAgreements = pendingAgreements?.filter((agreement) => {
        if (agreement.first_party_address == address) {
          console.log(agreement.second_party_address)
          return agreement.second_party_signature !== null;
        }
        else if (agreement.second_party_address == address) {
          return agreement.second_party_signature == null;
        }
        return false;
      });
    
      return filteredPendingAgreements?.length > 0 ? (
        <div className="grid w-full gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {filteredPendingAgreements.map((agreement, index) => (
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
      const signedAgreements = pendingAgreements?.filter(
        (agreement) => agreement.second_party_signature !== null
      );
    
      return signedAgreements?.length > 0 ? (
        <div className="grid w-full gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {signedAgreements.map((agreement, index) => (
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
{/* 
      <div className="w-full">

      <Modal
        isOpen={true}
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

      </div> */}
    </div>
  );
}

export default AgreementList;
