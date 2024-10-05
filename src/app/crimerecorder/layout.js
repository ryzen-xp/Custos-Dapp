"use client"; // Ensure this file is a client component
import React, { useState } from "react"; // Import useState
import "../globals.css";
import Footer from "@/components/footer";
import Sidepane from "@/components/dapps/sidepane";
import Header from "@/components/dapps/header";
import { FaArrowLeft } from "react-icons/fa";

export default function RootLayout({ children }) {
  const [headerOpen, setHeaderOpen] = useState(false); // Track header state

  const handleToggleHeader = (isOpen) => {
    setHeaderOpen(isOpen);
  };

  return (
    <div className="flex min-h-screen w-full">
      {/* Sidepane (Left Sidebar) - Visible only on medium screens and up */}
      <div className="hidden md:block w-fit h-full z-50 bg-gray-800 sticky top-0">
        <Sidepane />
      </div>

      {/* Main Content Area */}
      <div className="w-full min-h-screen flex flex-col">
        {/* Fixed Header */}
        <div className="fixed left-0 right-0 z-10">
          <Header />
          <div className="ml-[20rem] rounded-2xl flex-col w-full flex gap-2 h-fit px-6 py-3 shadow-2xl bg-gradient-to-t from-[#04080C] to-[#09131A]">
            <button
              className="w-full text-[#EAFBFF] flex justify-start items-center  align-middle"
              onClick={() => window.history.back()}
            >
              <FaArrowLeft className="mr-2 text-[#EAFBFF]" />{" "}
              <p className="text-[#EAFBFF]">Back</p>
            </button>

            <div className="mt-4 flex justify-end items-center w-full m-auto">
              <div className="w-full flex text-[#EAFBFF] text-[1.3em] justify-start">
                Video Recorder
              </div>
              <div className="w-full md:flex justify-end items-center gap-4 hidden"></div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div
          className={`flex flex-col w-full transition-all mt-40 md:my-5 duration-300 ${
            headerOpen ? "pt-40" : "pt-16 md:pt-0"
          }`} // Adjust padding-top dynamically based on header state
        >
          <div className="w-full px-8 flex flex-col">{children}</div>
        </div>
      </div>
    </div>
  );
}
