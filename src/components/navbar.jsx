'use client'
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import ConnectButtoncomponent from "./connect";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="py-4 bg-transparent fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div>
            <Link href="/">
              <Image
                src="/logo.png"
                alt="Logo"
                width={200}
                height={50}
                className="rounded-lg"
              />
            </Link>
          </div>
          <ul className="hidden sm:flex space-x-4 items-center">
            <div className="flex space-x-4 items-center">
              <li className="relative">
                <button
                  onClick={toggleDropdown}
                  className="text-white hover:text-[#c92eff] flex items-center"
                >
                  Launch Dapps
                  <ChevronDownIcon className="w-5 h-5 ml-1" />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-opacity-30 border border-gray-200 rounded-lg shadow-lg z-10">
                    <Link href="/crimerecorder" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Crime Recording</Link>
                    <Link href="/agreement" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Legal Agreement</Link>
                  </div>
                )}
              </li>
              <li>
                <Link href="/about" className="text-white hover:text-[#c92eff]">About Us</Link>
              </li>
            </div>
          </ul>
          <div>
            <button className="max-w-sm br overflow-hidden text-white p-5 shadow-lg transform hover:scale-105 transition-transform duration-300 border-gradient bg-opacity-50 backdrop-filter backdrop-blur-lg flex items-center justify-center relative">
              <span className="flex items-center">
                Connect Wallet
                <svg className="ml-2 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                </svg>
              </span>
            </button>
          </div>
          {/* Mobile Menu */}
          <div className="sm:hidden">
            <button
              onClick={toggleDropdown}
              className="text-white hover:text-[#c92eff] flex items-center"
            >
              <ChevronDownIcon className="w-5 h-5" />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-opacity-30 border border-gray-200 rounded-lg shadow-lg z-10">
                <Link href="/crimerecorder" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Crime Recording</Link>
                <Link href="/agreement" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Legal Agreement</Link>
                <Link href="/about" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">About Us</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
