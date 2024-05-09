"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import CustomCard from "./components/card";
import Modal from "react-modal";
import AgreementModal from "./components/createAgrement";

function AgreementList() {
  const [loading, setLoading] = useState(true);
  const [agreements, setAgreements] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showagreementModal, setShowagreementModal] = useState(false);

  const toggleAgreementModal = () => {
    setShowagreementModal(!showagreementModal);
  };
  useEffect(() => {
    const mockAgreements = [
      {
        id: 1,
        creator: "Alice",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        secondPartyAddress: "0x123456789...",
      },
      {
        id: 2,
        creator: "Bob",
        content:
          "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        secondPartyAddress: "0x987654321...",
      },
      {
        id: 2,
        creator: "Bob",
        content:
          "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        secondPartyAddress: "0x987654321...",
      },
      {
        id: 2,
        creator: "Bob",
        content:
          "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        secondPartyAddress: "0x987654321...",
      },
    ];

    // Simulate loading delay
    setTimeout(() => {
      setAgreements(mockAgreements);
      setLoading(false);
    }, 1500); // Adjust delay time as needed
    setIsAdmin(true);
  }, []);

  return (
    <div className="w-full">
      <Navbar />

      <Modal
        isOpen={showagreementModal}
        onRequestClose={() => setShowagreementModal(false)}
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
        shouldReturnFocusAfterClose={true}
        contentLabel="Create New Agreement"
        style={{
          content: {
            width: "40%",
            height: "fit-content",
            margin: "auto",
            padding: "0px"
          },
        }}
      >
        <AgreementModal />
      </Modal>

      <h1 className="text-3xl text-center font-bold text-[#c92eff] my-4">
        My Agreements
      </h1>
      <div className="flex p-4 items-center justify-end gap-8">
        {isAdmin ? (
          <button className="bg-[#1c0624] border border-[#c92eff] hover:bg-[#461853] text-white font-bold py-2 px-4 rounded">
            Show All Agreements
          </button>
        ) : null}

        <button
          className="bg-[#461853] hover:bg-[#1c0624] text-white font-bold py-2 px-4 rounded border-[#c92eff] border hover:border-none"
          onClick={toggleAgreementModal}
        >
          Create New Agreement
        </button>
      </div>

      <div className="w-full">
        {loading ? (
          <div className="text-center py-8">
            <div className="loader ease-linear rounded-full border-8 border-t-8 bg-[#130316] border-gray-200 h-16 w-16 mx-auto"></div>
            <p className="mt-2">Loading agreements...</p>
          </div>
        ) : agreements.length === 0 ? (
          <div className="w-full">
            <p className="text-gray-600">No agreements found.</p>
            <button
              className="bg-[#461853] hover:bg-[#1c0624] text-white font-bold py-2 px-4 rounded border-[#c92eff] border hover:border-none"
              onClick={toggleAgreementModal}
            >
              Create New Agreement
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto w-[90%] mb-8">
            {agreements.map((agreement) => (
              <CustomCard key={agreement.id} agreement={agreement} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AgreementList;
