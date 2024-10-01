"use client";
import { useState } from 'react'; // Import useState for managing sidepane visibility
import "../globals.css";
import Footer from "@/components/footer";
import Metadata from "../metadata";
import BackgroundWrapper from "@/components/backgroundwrapper";

import Sidepane from "@/components/dapps/sidepane";
import Header from "@/components/dapps/header";
import Image from 'next/image';

export default function RootLayout({ children }) {
  const [isSidepaneOpen, setSidepaneOpen] = useState(false); // State to toggle sidepane

  return (
<div className="flex min-[100vh] w-full">
  {/* Sidepane */}
  <div className={`w-fit hidden h-full z-10 bg-gray-800 sticky md:flex top-0 bottom-0`}>
    <Sidepane />
  </div>

  {/* Main content area */}
  <div className="flex flex-col w-full h-[100vh] overflow-y-scroll scrollbar-hide md:pl-0">
    {/* Header - Make sticky */}
    <div className="flex backdrop-filter backdrop-blur-[10px] w-full bg-[#ffffff0a] sticky top-0 ">
      <Header />
  <div className="md:hidden"><Sidepane /></div>
    </div>

    {/* Children Content */}
    <div className="flex flex-col px-3 w-full mt-[5%]">
      <div className="w-full px-8 flex flex-col">
        {children}
      </div>
    </div>
  </div>
</div>
  );
}
