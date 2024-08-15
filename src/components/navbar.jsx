"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaChevronDown,
  FaArrowRight,
  FaPlus,
  FaVideo,
  FaUser,
  FaUserPlus,
  FaPhone,
} from "react-icons/fa";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import ConnectButtoncomponent from "./connect";

const Navbar = () => {
  const [showLaunchDapps, setShowLaunchDapps] = useState(false);
  const [showCompany, setShowCompany] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleLaunchDapps = () => {
    setShowLaunchDapps(!showLaunchDapps);
  };

  const toggleCompany = () => {
    setShowCompany(!showCompany);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeModal = () => {
    setShowLaunchDapps(false);
    setShowCompany(false);
  };

  return (
    <>
      <nav className="py-[2rem] pr-[4rem] pl-[1rem]  bg-transparent fixed top-0 w-full z-50">
        <div className="w-full mx-auto">
          <div className="flex justify-around items-center">
            <div className="">
              <Link href="/">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={250}
                  height={50}
                  className="rounded-lg"
                />
              </Link>
            </div>
            <div className="hidden lg:flex items-center">
              <ul className="flex gap-[3rem] items-center">
                <li>
                  <button
                    onClick={toggleLaunchDapps}
                    className="text-white hover:text-[#c92eff] flex items-center"
                  >
                    Launch Dapps
                    <FaChevronDown className="w-5 h-5 ml-1" />
                  </button>
                </li>

                <li>
                  <button
                    onClick={toggleCompany}
                    className="text-white hover:text-[#c92eff] flex items-center"
                  >
                    Company
                  </button>
                </li>
              </ul>
            </div>
            <div className="flex items-center space-x-4">
              <div className="lg:hidden flex items-center">
                <button onClick={toggleMenu}>
                  {isMenuOpen ? (
                    <AiOutlineClose className="text-white w-6 h-6" />
                  ) : (
                    <AiOutlineMenu className="text-white w-6 h-6" />
                  )}
                </button>
              </div>
              <div className="hidden lg:block">
                <ConnectButtoncomponent />
              </div>
            </div>
          </div>
          {isMenuOpen && (
            <div className="lg:hidden bg-black bg-opacity-80 p-4">
              <ul className="flex flex-col space-y-4 mt-4">
                <li>
                  <button
                    onClick={toggleLaunchDapps}
                    className="text-white hover:text-[#c92eff] flex items-center justify-between w-full"
                  >
                    Launch Dapps
                  </button>
                </li>
                <li>
                  <button
                    onClick={toggleCompany}
                    className="text-white hover:text-[#c92eff] flex items-center justify-between"
                  >
                    Company
                  </button>
                </li>
                <li className="self-center">
                  <ConnectButtoncomponent />
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>

      {showLaunchDapps && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
          <div className="bg-black rounded-lg shadow-lg p-8 border-gradient space-x-6 relative w-[90%] sm:w-[50%] md:w-[500px] lg:w-[1000px] flex flex-col md:flex-row h-full md:h-auto md:max-h-[90%]">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white"
            >
              &times;
            </button>
            <div className="flex-1 flex flex-col justify-between overflow-y-auto md:overflow-visible h-1/2 md:h-auto">
              <div>
                <p className="text-3xl text-white">Launch Dapps</p>
                <p className="mt-4 text-gray-300">
                  Decentralized apps help you leverage blockchain technology to
                  secure your evidence and legal agreements.
                </p>
              </div>
              <Image
                src="/group.png"
                alt="group"
                width={200}
                height={50}
                className="rounded-lg mt-20 hidden md:block"
              />
            </div>
            <div className="flex-1 border-gradient p-5 rounded-lg overflow-y-auto md:overflow-visible h-1/2 md:h-auto">
              <div className="mb-20">
                <p className="flex items-center text-xl font-semibold text-white">
                  <FaPlus className="mr-2" />
                  <Link href="/agreement" className="text-white">
                    Create Agreement
                  </Link>
                </p>
                <p className="text-gray-300 mt-1">
                  Custos ensures that agreements are securely stored.
                </p>
              </div>
              <div>
                <p className="flex items-center text-xl font-semibold text-white">
                  <FaVideo className="mr-2" />
                  <Link href="#" className="text-white">
                    Record Video
                  </Link>
                </p>
                <p className="text-gray-300 mt-1">
                  Custos ensures that agreements are securely stored.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {showCompany && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
          <div className="bg-black rounded-lg shadow-lg p-8 border-gradient space-x-6 relative w-[90%] sm:w-[50%] md:w-[500px] lg:w-[1000px] flex flex-col md:flex-row h-full md:h-auto md:max-h-[90%]">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white"
            >
              &times;
            </button>
            <div className="flex-1 flex flex-col justify-between overflow-y-auto md:overflow-visible h-1/2 md:h-auto">
              <div>
                <p className="text-3xl text-white">Invulnerable</p>
                <p className="my-4 text-gray-300">
                  Custos Diretriz is mastering the art of preservation and
                  shielding on the blockchain.
                </p>
                <Link
                  href="#"
                  className="mt-4 text-gray-300 hover:text-[#c92eff] flex items-center"
                >
                  Join the Community
                  <FaArrowRight className="ml-1" />
                </Link>
                <Link
                  href="#"
                  className="mt-2 text-gray-300 hover:text-[#c92eff] flex items-center"
                >
                  Learn More About Custos
                  <FaArrowRight className="ml-1" />
                </Link>
              </div>
              <Image
                src="/law.png"
                alt="Law"
                width={200}
                height={50}
                className="rounded-lg mt-20 hidden md:block"
              />
            </div>
            <div className="flex-1 border-gradient p-5 rounded-lg overflow-y-auto md:overflow-visible h-1/2 md:h-auto">
              <div className="mb-20">
                <p className="flex items-center text-xl font-semibold text-white">
                  <FaUser className="mr-2" />
                  <Link href="#" className="text-white">
                    About Us
                  </Link>
                </p>
                <p className="text-gray-300 mt-1">
                  Get to know the team behind Custos.
                </p>
              </div>
              <div>
                <p className="flex items-center text-xl font-semibold text-white">
                  <FaPhone className="mr-2" />
                  <Link href="#" className="text-white">
                    Contact Us
                  </Link>
                </p>
                <p className="text-gray-300 mt-1">
                  We would love to hear from you.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
