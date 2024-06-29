'use client'
import React from 'react';
import agreements from '../../..'; // Adjust the path based on your file structure
import Link from 'next/link';
import Image from 'next/image';
import AgreementCard from '../../app/agreement/components/agreementcard';
import Recorder from './crime';
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

const validateAgreement = (agreement) => {
  // Add validation logic here
  alert(`Validating agreement titled: ${agreement.title}`);
};

const Agree = () => {
  return (
    <main>
      <div className="flex items-center justify-center bg-gradient-to-r from-[#EAF9FF] to-[#8E9A9A] bg-clip-text  text-transparent">
        <div className="text-center p-8 bg-transparent rounded shadow-lg">
          <p className="text-[60px]  mb-4">Agreement documentation</p>
          <p className="text-[20px]  mb-4">
            Create new legal agreements by providing the agreement content, the <br />
            address of the second party, and details about the first party.
          </p>
        </div>
      </div>

      <div className="border border-slate-700  p-8 rounded-lg w-full">
        <div className="flex justify-between items-center mb-5">
          <Link href="/">
            <Image
              src="/custos.png"
              alt="Logo"
              width={100}
              height={50}
              className="rounded-lg"
            />
          </Link>
          <div className="flex ml-5">
            <button className="max-w-sm br overflow-hidden text-white p-5 shadow-lg transform hover:scale-105 transition-transform duration-300 border-gradient bg-[#0094FF] mr-5 flex items-center justify-center relative">
              <span className="flex items-center">
                Create Agreement
                <svg className="ml-2 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                </svg>
              </span>
            </button>
            <button className="max-w-sm br overflow-hidden text-white p-5 shadow-lg transform hover:scale-105 transition-transform duration-300 border-gradient bg-opacity-50 backdrop-filter backdrop-blur-lg flex items-center justify-center relative">
              <span className="flex items-center">
                0xder253777atwg7x...
              </span>
            </button>
          </div>
        </div>
        <h1 className="text-[30px]  mb-4 bg-gradient-to-r from-[#EAF9FF] to-[#8E9A9A] bg-clip-text text-transparent">My Agreements</h1>
        <div className="border border-slate-700 p-10 bg-opacity-50 backdrop-filter rounded-lg backdrop-blur-lg">
          <div className="container mx-auto py-3">
            <div className="flex flex-wrap -mx-4">
              {agreements.map((agreement, index) => (
                <div key={index} className="w-full sm:w-1/2 md:w-1/3 px-4 mb-8">
                  <AgreementCard agreement={agreement} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="justify-center items-center flex mb-20">
        <button className="relative max-w-sm br text-white p-3 shadow-lg transform hover:scale-105 transition-transform duration-300 border-gradient bg-opacity-50 mt-20 mb-5 backdrop-filter backdrop-blur-lg flex items-center justify-center overflow-clip">
          <span className="flex items-center">
            Launch Custos Dapp
          </span>
          <svg className="ml-2 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
          </svg>
        </button>
      </div>
      <div className="mx-5 transform hover:scale-105 transition-transform duration-300">
        <div className="flex flex-col md:flex-row justify-between items-center my-32">
          <div className=" text-[50px] mb-2 bg-gradient-to-r from-[#0094FF] to-[#A02294] bg-clip-text text-transparent ml-10">
            <p>We paid the gas fee.</p>
          </div>
          <div className="md:w-1/2 md:ml-4 text-[20px]  bg-gradient-to-r from-[#EAF9FF] to-[#8E9A9A] bg-clip-text text-transparent">
            <p>
              Custos lets you record your videos safely on the blockchain without paying a gas fee until you need your video back. Whether its a business contract, a rental agreement, or a partnership arrangement, Custos ensures that agreements are securely stored, easily accessible, and tamper-proof, fostering trust and accountability among parties.
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center bg-gradient-to-r from-[#EAF9FF] to-[#8E9A9A] bg-clip-text text-transparent">
        <div className="text-center p-8 bg-transparent rounded shadow-lg my-20">
          <p className="text-[50px]  mb-4">Crime recorder</p>
          <p className="text-[20px]  mb-4">
            The Crime Recording App transforms the way individuals contribute <br />
            to societal safety by providing an advanced platform for documenting <br />
            and sharing crime events securely and transparently.
          </p>
        </div>
      </div>
      <Recorder/>
      <div className="justify-center items-center flex mb-20">
        <button className="relative max-w-sm br text-white p-3 shadow-lg transform hover:scale-105 transition-transform duration-300 border-gradient bg-opacity-50 mt-20 mb-5 backdrop-filter backdrop-blur-lg flex items-center justify-center overflow-clip">
          <span className="flex items-center">
            Launch Custos Dapp
          </span>
          <svg className="ml-2 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
          </svg>
        </button>
      </div>  
      <div className="flex items-center justify-center bg-gradient-to-r from-[#EAF9FF] to-[#8E9A9A] bg-clip-text text-transparent">
        <div className="text-center p-8 bg-transparent rounded shadow-lg my-20">
          <p className="text-[50px]  mb-4">Our Pledge</p>
          <p className="text-[20px]  mb-4">
          We are dedicated to revolutionizing safety and security through innovative protocol <br />platforms. Our mission is to provide solutions that empower individuals and communities to <br /> effectively address crime scene witnessing and streamline agreement systems.
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center bg-gradient-to-r from-[#EAF9FF] to-[#8E9A9A] bg-clip-text text-transparent">
        <div className="text-center p-8 bg-transparent rounded shadow-lg mt-20">
          <p className=" text-[50px] mb-2 bg-gradient-to-r from-[#0094FF] to-[#A02294] bg-clip-text text-transparent ">Make better decision</p>
          <p className="text-[20px]  mb-4">
          We paid the price to keep your videos and legal agreements safe.
          </p>
        </div>
        
      </div>  
      <div className="justify-center items-center flex mb-20">
        <button className="relative max-w-sm br text-white p-3 shadow-lg transform hover:scale-105 transition-transform duration-300 border-gradient bg-opacity-50 mt-5 mb-5 backdrop-filter backdrop-blur-lg flex items-center justify-center overflow-clip">
          <span className="flex items-center">
            Get Started
          </span>
          <svg className="ml-2 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
          </svg>
        </button>
      </div>
    </main>
  );
};

export default Agree;
