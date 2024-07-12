import React from 'react';

export const AgreementCard = ({ agreement, printAgreement, toggleSignModal }) => {
  return (
    <div className="p-3 text-base space-y-[1em] flex flex-col bg-gradient-to-r border-gradient h-fit backdrop-blur-2xl from-[#19B1D2] to-[#0094FF] bg-clip-text text-transparent rounded-lg relative w-full">
      <div className="relative border-[#4404245e] flex flex-col gap-4 backdrop-blur-sm shadow-2xl border-[0.01px] rounded-lg p-2 items-start w-full">
        <h2 className="text-[0.8em] w-fit flex text-wrap font-bold bg-gradient-to-r br border-slate-800 px-2 py-[0.8] border from-[#19B1D2] to-[#0094FF] bg-clip-text text-transparent">{agreement[1]}</h2>
        <div 
  className="br w-[96%] overflow-hidden flex border-slate-800 px-2 py-[0.8] border text-[0.7em] text-[#9B9292] whitespace-nowrap overflow-ellipsis"
>
{`Second Party Address: ${agreement[2]}`}</div>
        <div className='w-fit flex items-center justify-start space-x-14 text-[1.2em] text-white'>
          Created by: <span className="text-[1em] font-bold bg-gradient-to-r from-[#19B1D2] to-[#0094FF] bg-clip-text text-transparent">{agreement[3]}</span>
        </div>
        <div className="text-wrap w-fit text-white">
          <p className='max-h text-[0.7em]'>{agreement[1]}</p>
        </div> 
      </div>
      <div className="mt-4 flex justify-between items-center w-full m-auto">
        <button
          onClick={() => printAgreement(agreement)}
          className="w-fit px-2 py-2 text-white rounded-[2em] shadow-lg transform hover:scale-105 transition-transform duration-300 border-gradient bg-[#0094FF] flex items-center justify-center relative text-[0.8em]"
        >
          Print Agreement
        </button>
        <button
          onClick={() => toggleSignModal()}
          className="w-fit px-2 py-2 text-white rounded-[2em] border-slate-800 shadow-lg transform hover:scale-105 transition-transform duration-300 border-gradient2 bg-opacity-50 backdrop-filter backdrop-blur-lg flex items-center justify-center relative text-[0.8em]"
        >
          Validate Agreement
        </button>
      </div>
    </div>
  );
};

export const PendingAgreementCard = ({ agreement, printAgreement, toggleSignModal }) => {
  return (
    <div className="p-3 text-base space-y-[1em] flex flex-col bg-gradient-to-r border-gradient h-fit backdrop-blur-2xl from-[#19B1D2] to-[#0094FF] bg-clip-text text-transparent rounded-lg relative w-full">
      <div className="relative border-[#4404245e] flex flex-col gap-4 backdrop-blur-sm shadow-2xl border-[0.01px] rounded-lg p-2 items-start w-full">
        <h2 className="text-[0.8em] w-fit flex text-wrap font-bold bg-gradient-to-r br border-slate-800 px-2 py-[0.8] border from-[#19B1D2] to-[#0094FF] bg-clip-text text-transparent">{agreement.agreementType}</h2>
        <div 
  className="br w-[96%] overflow-hidden flex border-slate-800 px-2 py-[0.8] border text-[0.7em] text-[#9B9292] whitespace-nowrap overflow-ellipsis"
>
{`Second Party Address: ${agreement.second_party_address}`}</div>
        <div className='w-fit flex items-center justify-start space-x-14 text-[1.2em] text-white'>
          Created by: <span className="text-[1em] font-bold bg-gradient-to-r from-[#19B1D2] to-[#0094FF] bg-clip-text text-transparent">{agreement.first_party_name}</span>
        </div>
        <div className="text-wrap w-fit text-white">
          <p className='max-h text-[0.7em]'>{agreement.content}</p>
        </div> 
      </div>
      <div className="mt-4 flex justify-between items-center w-full m-auto">
        <button
          onClick={() => printAgreement(agreement)}
          className="w-fit px-2 py-2 text-white rounded-[2em] shadow-lg transform hover:scale-105 transition-transform duration-300 border-gradient bg-[#0094FF] flex items-center justify-center relative text-[0.8em]"
        >
          Print Agreement
        </button>
        <button
          onClick={() => toggleSignModal()}
          className="w-fit px-2 py-2 text-white rounded-[2em] border-slate-800 shadow-lg transform hover:scale-105 transition-transform duration-300 border-gradient2 bg-opacity-50 backdrop-filter backdrop-blur-lg flex items-center justify-center relative text-[0.8em]"
        >
          Validate Agreement
        </button>
      </div>
    </div>
  );
};
