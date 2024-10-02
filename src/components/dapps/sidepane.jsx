import Image from "next/image";
import Link from "next/link";
import React from "react"; // useState and Fa icons removed

const Sidepane = () => {
  // Removed state and toggle function

  return (
    <div className="relative w-fit">
      {/* Removed Toggle button for mobile */}

      {/* Sidebar */}
      <div className="translate-x-0 bg-gradient-to-r from-[#04080C] to-[#09131A] top-0 left-0 h-screen w-fit p-8 flex flex-col items-center gap-16 transition-transform duration-300 ease-in-out z-40">
        {/* Logo */}
        <div className="w-full">
          <a href="/" className="w-auto">
            <Image src="/logo.png" alt="logo" width={232.7} height={22} />
          </a>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col gap-16 w-full p-2">
          <Link href={`/crimerecorder`} className="text-[#EAFBFF]">
            <div className="flex gap-4 w-full items-center">
              <p className="text-[1.3em] text-[#EAFBFF]">Videos</p>
              <Image src="/cameraicon.svg" alt="icon" width={25} height={20} />
            </div>
          </Link>
          <Link href={`/agreement/create`} className="text-[#EAFBFF]">
            <div className="flex gap-4 w-full items-center">
              <p className="text-[1.3em] text-[#EAFBFF]">Agreement</p>
              <Image src="/Plus.svg" alt="icon" width={25} height={20} />
            </div>
          </Link>
        </div>
      </div>

      {/* Main content */}
      <div className="ml-0 md:ml-[300px] transition-all duration-300 ease-in-out">
        {/* Rest of the content */}
      </div>
    </div>
  );
};

export default Sidepane;
