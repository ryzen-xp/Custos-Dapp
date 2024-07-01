"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Modal from "react-modal";
import {
  FaChevronDown,
  FaArrowRight,
  FaPlus,
  FaVideo,
  FaUser,
  FaUserPlus,
  FaPhone,
} from "react-icons/fa";
import ConnectButtoncomponent from "./connect";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [modal, setModal] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const openModal = (type) => () => setModal(type);
  const closeModal = ()=>{
    setModal(null);}

  return (
    <nav
      className={`py-4 fixed top-0 w-full transition-opacity duration-300 ${
        scrolled ? "bg-opacity-70" : "bg-opacity-0"
      } bg-blue-950`}
    >
      <div className="w-full mx-auto">
        <div className="flex justify-between items-center">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Logo"
              width={200}
              height={50}
              className="rounded-lg"
            />
          </Link>
          <ul className="flex space-x-4 items-center">
            <li>
              <button
                onClick={openModal("launchDapps")}
                className="text-white hover:text-[#c92eff] flex items-center"
              >
                Launch Dapps
                <FaChevronDown className="w-5 h-5 ml-1" />
              </button>
            </li>
            <li>
              <button
                onClick={openModal("company")}
                className="text-white hover:text-[#c92eff] flex items-center"
              >
                Company
              </button>
            </li>
          </ul>
          <ConnectButtoncomponent />
        </div>
      </div>

      <Modal
        isOpen={modal === "launchDapps"}
        onRequestClose={closeModal}
        className="fixed inset-0 flex w-1/2 items-center justify-center z-[500] bg-black bg-opacity-50"
      >
        <div className="bg-black p-6 rounded-lg shadow-lg border-gradient">
          <div className="flex flex-col sm:flex-row justify-center items-center text-white space-y-6 sm:space-y-0 sm:space-x-6">
            <div className="flex-1 flex flex-col justify-between">
              <a href="/services">
                <p className="text-[1.2em]">Launch Dapps</p>
              </a>
                <p className="mt-4 text-gray-300">
                  Decentralized apps help you leverage blockchain technology to secure your evidence and legal agreements.
                </p>
              <Image
                src="/group.png"
                alt="Group"
                width={200}
                height={50}
                className="rounded-lg mt-20"
              />
            </div>
            <div className="flex-1 border-gradient p-5 rounded-lg">
              <div className="mb-20">
                <a href="/agrreement" className="cursor-pointer">
                <p className="flex items-center text-xl font-semibold">
                  <FaPlus className="mr-2" />
                  <span href="/agreement" className="text-white">Create Agreement
                  </span>
                </p>
                <p className="text-gray-300 mt-1">
                  Custos ensures that agreements are securely stored.
                </p>
              </a>
              </div>
              <a href="/crimerecorder">
                <p className="flex items-center text-xl font-semibold">
                  <FaVideo className="mr-2" />
                  <Link href="/crimerecorder" className="text-white">Record Video
                  </Link>
                </p>
                <p className="text-gray-300 mt-1">
                  Custos ensures that agreements are securely stored.
                </p>
              </a>
            </div>
          </div>
          <button
            onClick={closeModal}
            className="mt-4 text-white border border-gray-300 rounded-lg px-4 py-2"
          >
            Close
          </button>
        </div>
      </Modal>

      <Modal
        isOpen={modal === "company"}
        onRequestClose={closeModal}
        className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
      >
        <div className="bg-black p-6 rounded-lg shadow-lg border-gradient">
          <div className="flex flex-col sm:flex-row justify-center items-center text-white space-y-6 sm:space-y-0 sm:space-x-6">
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <p className="text-3xl">Invulnerable</p>
                <p className="my-4 text-gray-300">
                  Custos Diretriz is mastering the art of preservation and shielding on the blockchain.
                </p>
                <Link href="/learn-more" className="mt-4 text-gray-300 flex items-center">
                    Learn More
                    <FaArrowRight className="ml-2" />
                  
                </Link>
              </div>
              <Image
                src="/secu.png"
                alt="Secu"
                width={200}
                height={50}
                className="rounded-lg mt-20"
              />
            </div>
            <div className="flex-1 border-gradient p-5 rounded-lg">
              <div className="mb-20">
                <p className="flex items-center text-xl font-semibold">
                  <FaUser className="mr-2" />
                  <Link href="/about-us" className="text-white">About Us
                  </Link>
                </p>
                <p className="text-gray-300 mt-1">
                  Meet the developer team and read our story
                </p>
              </div>
              <div className="mb-20">
                <p className="flex items-center text-xl font-semibold">
                  <FaUserPlus className="mr-2" />
                  <Link href="/careers" className="text-white">Career
                  </Link>
                </p>
                <p className="text-gray-300 mt-1">
                  Find your dream role
                </p>
              </div>
              <div>
                <p className="flex items-center text-xl font-semibold">
                  <FaPhone className="mr-2" />
                  <Link href="/contact-us" className="text-white">Contact Us
                  </Link>
                </p>
                <p className="text-gray-300 mt-1">
                  Reach out to us for questions and clarifications
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={closeModal}
            className="mt-4 text-white border border-gray-300 rounded-lg px-4 py-2"
          >
            Close
          </button>
        </div>
      </Modal>
    </nav>
  );
};

export default Navbar;
