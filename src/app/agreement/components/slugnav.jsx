import React, { useEffect, useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import ValidateAgreementModal from './validateAgreement';
import SignAgreementModal from './signagreementmodal';

const Slugnav = ({ agreement }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSignModalOpen, setIsSignModalOpen] = useState(false);
  const handleValidateClick = (e) => {
    console.log('handleValidateClick', isModalOpen);
    e.stopPropagation();
    setIsModalOpen(true);
  };

  const handleSignClick = (e) => {
    console.log('handleSignClick', isSignModalOpen);
    e.stopPropagation();
    setIsSignModalOpen(true);
  };

  return (
    <div className='rounded-2xl flex-col w-full flex gap-2 h-fit px-6 py-3 shadow-2xl bg-gradient-to-t from-[#04080C] to-[#09131A]'>
      <button className="w-full text-[#EAFBFF] flex justify-start items-center  align-middle" onClick={() => window.history.back()}>
        <FaArrowLeft className="mr-2 text-[#EAFBFF]" /> <p className="text-[#EAFBFF]">Back</p>
      </button>

      <div className="mt-4 flex justify-end items-center w-full m-auto">
        <div className="w-full flex text-[#EAFBFF] text-[1.3em] justify-start">Agreement</div>
        <div className="w-full md:flex justify-end items-center gap-4 hidden">

          <button
            onClick={(e) => { e.stopPropagation(); printAgreement(agreement); }}
            className="w-fit px-2 py-2 hidden text-white rounded-[2em] border-slate-800 shadow-lg transform hover:scale-105 transition-transform duration-300 border-gradient2 bg-opacity-50 backdrop-filter backdrop-blur-lg md:flex items-center justify-center relative text-[0.8em]"
          >
            Print Agreement
          </button>
          {agreement.access_token ? (
            <button
              onClick={handleValidateClick}
              disabled={!agreement.second_party_signature || agreement.validate_signature}
              className={`className="w-fit px-2 py-2 text-white rounded-[2em] shadow-lg transform hover:scale-105 transition-transform duration-300 border-gradient bg-[#0094FF] disabled:bg-transparent disabled:border disabled:text-gray-500 disabled:hover:scale-100 disabled:hover:cursor-none flex items-center justify-center relative text-[0.8em] cursor-pointer ${!agreement.second_party_signature ? '' : ''}`}
            >
              {agreement.validate_signature || (agreement.access_token && agreement.second_party_signature)? 'Validate Agreement': 'Validated'}
            </button>
          ) : (
            <button
              onClick={handleSignClick}
              disabled={agreement.second_party_signature || agreement.validate_signature}
              className={`className="w-fit px-2 py-2 text-white rounded-[2em] shadow-lg transform hover:scale-105 transition-transform duration-300 border-gradient bg-[#0094FF] disabled:bg-transparent disabled:border disabled:text-gray-500 disabled:hover:scale-100 disabled:hover:cursor-none flex items-center justify-center relative text-[0.8em] cursor-pointer ${!agreement.second_party_signature ? '' : ''}`}
            >
              Sign Agreement
            </button>
          )}
        </div>
      </div>

      {isModalOpen && (
        <ValidateAgreementModal
          fullname={agreement.second_party_fullname}
          agreementId={agreement.id}
          agreementToken={agreement.access_token}
          onClose={() => setIsModalOpen(false)}
          agreement={agreement}
        />
      )}

      {isSignModalOpen && (
        <SignAgreementModal
          fullname={agreement.second_party_fullname}
          agreementId={agreement.id}
          onClose={() => setIsSignModalOpen(false)}
        />
      )}

    </div>
  )
}

export default Slugnav