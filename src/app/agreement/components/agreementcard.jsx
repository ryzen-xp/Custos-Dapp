import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { format } from 'date-fns';

export const AgreementCard = ({ agreement, printAgreement, toggleSignModal }) => {
  const router = useRouter();
  // const formattedDate = format(new Date(agreement[3]), "EEEE, do MMMM yyyy. hh:mm:ss aaaa");

  const handleCardClick = () => {
    router.push(`/agreement/${agreement[0]}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="p-3 text-base space-y-[1em] flex flex-col bg-gradient-to-r border-gradient h-fit backdrop-blur-2xl from-[#19B1D2] to-[#0094FF] bg-clip-text text-transparent rounded-lg relative w-full cursor-pointer"
    >
      <div className="relative border-[#4404245e] h-[220px] overflow-clip flex flex-col gap-4 backdrop-blur-sm shadow-2xl border-[0.01px] rounded-lg p-2 items-start w-full">
        <div className="w-full flex justify-between">
          <h2 className="text-[0.8em] w-fit flex text-wrap font-bold bg-gradient-to-r br border-slate-800 px-2 py-[0.8] border from-[#19B1D2] to-[#0094FF] bg-clip-text text-transparent">
            {agreement[1]}
          </h2>
        </div>
        <div className="br w-[96%] overflow-hidden flex border-slate-800 px-2 py-[0.8] border text-[0.7em] text-[#9B9292] whitespace-nowrap overflow-ellipsis">
          {`Second Party Address: ${agreement[2]}`}
        </div>
        <div className='w-fit flex items-center justify-start space-x-14 text-[1.2em] text-white'>
          Time Stamp: <span className="text-[1em] font-bold bg-gradient-to-r from-[#19B1D2] to-[#0094FF] bg-clip-text text-transparent">{agreement[3]}</span>
        </div>
        <div className="text-wrap w-fit text-white">
          <p className='max-h text-[0.7em]'>{agreement[1]}</p>
        </div>
      </div>
      <div className="mt-4 flex justify-between items-center w-full m-auto">
        <button
          onClick={(e) => { e.stopPropagation(); printAgreement(agreement); }}
          className="w-fit px-2 py-2 text-white rounded-[2em] shadow-lg transform hover:scale-105 transition-transform duration-300 border-gradient bg-[#0094FF] flex items-center justify-center relative text-[0.8em]"
        >
          Print Agreement
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); toggleSignModal(); }}
          className="w-fit px-2 py-2 text-white rounded-[2em] border-slate-800 shadow-lg transform hover:scale-105 transition-transform duration-300 border-gradient2 bg-opacity-50 backdrop-filter backdrop-blur-lg flex items-center justify-center relative text-[0.8em]"
        >
          Validate Agreement
        </button>
      </div>
    </div>
  );
};

export const PendingAgreementCard = ({ agreement, printAgreement, toggleSignModal }) => {
  const router = useRouter();
  const formattedDate = format(new Date(agreement.created_at), "EEEE, do MMMM yyyy. hh:mm:ss aaaa");

  const handleCardClick = () => {
    if (agreement.access_token) {
      router.push(`/agreement/access_token/${agreement.access_token}`);
    } else {
      router.push(`/agreement/id/${agreement.id}`);
    }
  };

  const handleEditClick = (e) => {
    e.stopPropagation();
    if (agreement.access_token) {
      router.push(`/agreement/access_token/${agreement.access_token}/edit`);
    } else {
      router.push(`/agreement/${agreement.id}/edit`);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="p-3 text-base space-y-[1em] flex flex-col bg-gradient-to-r border-gradient h-fit backdrop-blur-2xl from-[#19B1D2] to-[#0094FF] bg-clip-text text-transparent rounded-lg relative w-full cursor-pointer"
    >
      <div className="relative border-[#4404245e] h-[220px] overflow-clip flex flex-col gap-4 backdrop-blur-sm shadow-2xl border-[0.01px] rounded-lg p-2 items-start w-full">
        <div className="w-full flex justify-between">
          <h2 className="text-[0.8em] w-fit flex text-wrap font-bold bg-gradient-to-r br border-slate-800 px-2 py-[0.8] border from-[#19B1D2] to-[#0094FF] bg-clip-text text-transparent">
            {agreement.agreementType}
          </h2>
          {agreement.access_token && (
            <Image
              src={"/pencil-edit.svg"}
              height={20}
              width={20}
              alt='edit'
              onClick={handleEditClick}
              className="cursor-pointer"
            />
          )}
        </div>
        <div className="br w-[96%] overflow-hidden flex border-slate-800 px-2 py-[0.8] border text-[0.7em] text-[#9B9292] whitespace-nowrap overflow-ellipsis">
          {`Second Party Address: ${agreement.second_party_address}`}
        </div>
        <div className='w-fit flex items-center justify-start text-center space-x-14 text-[0.8em] text-white'>
          Time Stamp: <span className="text-[0.7em] text-center align-middle font-bold bg-gradient-to-r from-[#19B1D2] to-[#0094FF] bg-clip-text text-transparent">{" "}{formattedDate}</span>
        </div>
        <div className="text-wrap w-fit text-white">
          <p className='max-h text-[0.7em]'>{agreement.content}</p>
        </div>
      </div>
      <div className="mt-4 flex justify-between items-center w-full m-auto">
      <button
          onClick={(e) => { e.stopPropagation(); printAgreement(agreement); }}
          className="w-fit px-2 py-2 text-white rounded-[2em] shadow-lg transform hover:scale-105 transition-transform duration-300 border-gradient bg-[#0094FF] flex items-center justify-center relative text-[0.8em]"
        >
          Print Agreement
        </button>
      {agreement.access_token ? (
          <button
            onClick={(e) => { e.stopPropagation(); toggleSignModal(); }}
            disabled={!agreement.second_party_signature}
            className={`w-fit px-2 py-2 text-white rounded-[2em] border-slate-800 shadow-lg transform hover:scale-105 transition-transform duration-300 border-gradient2 bg-opacity-50 backdrop-filter backdrop-blur-lg flex items-center justify-center relative text-[0.8em] ${!agreement.second_party_signature ? 'cursor-not-allowed opacity-50' : ''}`}
          >
            Validate Agreement
          </button>
        ) : (
          <button
            onClick={(e) => { e.stopPropagation(); toggleSignModal(); }}
            disabled={!agreement.second_party_signature}
            className={`w-fit px-2 py-2 text-white rounded-[2em] border-slate-800 shadow-lg transform hover:scale-105 transition-transform duration-300 border-gradient2 bg-opacity-50 backdrop-filter backdrop-blur-lg flex items-center justify-center relative text-[0.8em] ${!agreement.second_party_signature ? 'cursor-not-allowed opacity-50' : ''}`}
          >
            Sign Agreement
          </button>
        )}
      </div>
    </div>
  );
};
