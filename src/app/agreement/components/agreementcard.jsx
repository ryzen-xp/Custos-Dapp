import React from 'react'

const AgreementCard = ({ agreement }) => {
    return (
      <div className="border p-4 text-base bg-gradient-to-r from-[#EAF9FF] to-[#8E9A9A] bg-clip-text text-transparent rounded-lg">
        <h2 className="text-xl font-bold bg-gradient-to-r br border-slate-800 p-2 border mb-2 from-[#19B1D2] to-[#0094FF] bg-clip-text text-transparent">{agreement.title}</h2>
        <p className="br border-slate-800 p-2 border text-xs">Second Party Address: {agreement.secondPartyAddress}</p>
        <p>Created by: <span className="text-sm font-bold bg-gradient-to-r from-[#19B1D2] to-[#0094FF] bg-clip-text text-transparent">{agreement.creatorName}</span></p>
        <p>{agreement.content}</p>
        <div className="mt-4 flex justify-between items-center">
          <button
            onClick={() => printAgreement(agreement)}
            className="max-w-sm br overflow-hidden text-white p-5 shadow-lg transform hover:scale-105 transition-transform duration-300 border-gradient bg-[#0094FF] mr-5 flex items-center justify-center relative"
          >
            Print Agreement
          </button>
          <button
            onClick={() => validateAgreement(agreement)}
            className="max-w-sm br overflow-hidden text-white p-5 shadow-lg transform hover:scale-105 transition-transform duration-300 border-gradient bg-opacity-50 backdrop-filter backdrop-blur-lg flex items-center justify-center relative"
          >
            Validate Agreement
          </button>
        </div>
      </div>
    );
  };
  

export default AgreementCard
