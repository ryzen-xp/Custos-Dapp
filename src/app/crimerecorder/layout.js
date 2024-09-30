"use client"; // Ensure this file is a client component
import React, { useState } from "react"; // Import useState
import "../globals.css";
import Footer from "@/components/footer";
import Sidepane from "@/components/dapps/sidepane";
import Header from "@/components/dapps/header";

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
      <div className="flex-1 min-h-screen flex flex-col">
        {/* Fixed Header */}
        <div className="fixed left-0 right-0 z-10">
          <Header  />
        </div>

        {/* Main Content */}
        <div
          className={`flex flex-col w-full transition-all mt-40 duration-300 ${
            headerOpen ? "pt-40" : "pt-16"
          }`} // Adjust padding-top dynamically based on header state
        >
          <div className="w-full px-8 flex flex-col">
            {children}
          </div>
        </div>

        {/* Optional Footer */}
        <Footer />
      </div>
    </div>
  );
}
