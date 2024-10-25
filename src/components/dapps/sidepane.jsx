import Image from "next/image";
import Link from "next/link";
import React from "react"; // useState and Fa icons removed

const Sidepane = () => {
  // Removed state and toggle function

  return (
    <div className="flex flex-col min-h-screen ">
     <div className="flex flex-1">
      {/* Removed Toggle button for mobile */}

      {/* Sidebar */}
      

      
      <aside className="w-[250px] bg-gradient-to-r from-[#04080C] to-[#09131A] p-6 flex flex-col items-center gap-8 h-auto">
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
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
      </main>
        {/* Rest of the content */}
      </div>
    </div>
  );
};

export default Sidepane;
