"use client";
import { useState, useEffect, useContext } from 'react'; // Import useContext to access WalletContext
import { FiX } from 'react-icons/fi'; // Import only the close icon
import "../globals.css";
import Footer from "@/components/footer";
import Metadata from "../metadata";
import BackgroundWrapper from "@/components/backgroundwrapper";

import Sidepane from "@/components/dapps/sidepane";
import Header from "@/components/dapps/header";
import Image from 'next/image';
import { WalletContext } from "@/components/walletprovider"; // Import WalletContext

export default function RootLayout({ children }) {
  const [isSidepaneOpen, setSidepaneOpen] = useState(false); // State to toggle sidepane
  const { address, signMessage } = useContext(WalletContext); // Access address and signMessage from WalletContext

  // Function to toggle sidepane visibility
  const toggleSidepane = (e) => {
    e.stopPropagation(); // Stop event propagation
    setSidepaneOpen(!isSidepaneOpen);
  };

  // Effect to disable scrolling when sidepane is open
  useEffect(() => {
    if (isSidepaneOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isSidepaneOpen]);

  // Function to close sidepane if clicked outside
  const handleOutsideClick = (e) => {
    console.log('triggered')
    if (!e.target.closest('.sidepane')) {
      setSidepaneOpen(false);
    }
  };

  useEffect(() => {
    const handleSignMessage = async () => {
      try {
        if (!signMessage) {
          throw new Error("signMessage function is not available");
        }
        const message = "Your message to sign";
        const signedMessage = await signMessage(message);
        console.log("Signed message:", signedMessage);
      } catch (err) {
        console.error("Error signing message:", err);
      }
    };

    if (address) {
      handleSignMessage();
    }
  }, [address, signMessage]); // Effect runs when address or signMessage changes

  return (
<div className={`flex min-h-[100vh] w-full ${isSidepaneOpen ? 'sidepane-open backdrop-blur-lg' : ''}`} onClick={handleOutsideClick}>
  {/* Sidepane */}
  <div className={`w-fit ${isSidepaneOpen ? 'absolute' : 'hidden'} h-full z-20 md:flex top-0 left-0 sidepane`}>
    <Sidepane />
  </div>

  {/* Main content area */}
  <div className={`flex flex-col w-full  h-[100vh] overflow-y-scroll scrollbar-hide md:pl-0 ${isSidepaneOpen ? 'backdrop-blur-lg' : ''}`}>
    {/* Header */}
    <div className="flex backdrop-filter backdrop-blur-[10px] w-full bg-[#ffffff0a] sticky top-0 z-[400]">
      <Header />
      <button className="md:hidden z-30" onClick={(e) => toggleSidepane(e)}>
        {isSidepaneOpen ? <FiX size={40} className="text-[#afb9c0e1]" /> : <img src="/hamburger.svg" alt="Menu" width={50} height={20} />}
      </button>
    </div>

    {/* Children Content */}
    <div className="flex flex-col p-3 w-full mb-10">
      {children}
    </div>
  </div>
</div>
  );
}
