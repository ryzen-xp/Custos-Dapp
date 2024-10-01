import Image from "next/image";
import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import ConnectButtoncomponent from "@/components/connect";

export const Header = ({ onToggle }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleMenu = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    onToggle(newState); // Pass the new state to parent
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center w-full backdrop-filter backdrop-blur-[10px] bg-[#ffffff0a] p-2">
      {/* Logo on the left */}
      <div className="flex items-center flex-grow mb-2 sm:mb-0">
        <a href="/"><Image src="/logo.png" alt="Logo" width={100} height={40} /></a>
      </div>

      {/* Main Header Content */}
      <div className="flex items-center justify-between flex-grow w-full">
        {/* Search Input */}
        <div className="relative w-full sm:w-fit justify-end items-end m-auto mb-4 sm:mb-0">
          <input
            type="search"
            placeholder="Search"
            className="w-full pl-10 py-4 bg-[#3A3A3A] border rounded-[2em] focus:outline-none 
                       text-transparent bg-clip-text"
            style={{
              backgroundImage: "linear-gradient(to right, #EAF9FF, #8E9A9A)",
              WebkitBackgroundClip: "text",
              color: "contain",
            }}
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Image src="/search-normal.svg" alt="Search" width={20} height={20} />
          </div>
        </div>

        {/* Dark Mode Toggle */}
        <div className="flex items-center gap-4 sm:ml-4">
          <div onClick={toggleDarkMode} className="cursor-pointer">
            {darkMode ? (
              <Image src="/lightmode.svg" alt="Light Mode" width={30} height={20} />
            ) : (
              <Image src="/darkmodeicon.svg" alt="Dark Mode" width={30} height={20} />
            )}
          </div>

          {/* Notification Icon */}
          <div className="cursor-pointer">
            <Image src="/bell.svg" alt="Notifications" width={30} height={20} />
          </div>
        </div>
      </div>

      {/* Collapse Menu Toggle and Connect Wallet Button on the right */}
      <div className="flex items-center gap-4 sm:ml-auto">
        {/* Show Connect Button only when the menu is open */}
         <ConnectButtoncomponent />

        {/* Toggle Button for Mobile */}
        
      </div>
    </div>
  );
};

export default Header;
