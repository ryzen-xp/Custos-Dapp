import React from "react";
import Image from "next/image";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const About = () => {
  return (
    <main className="items-center justify-center min-h-screen">
      <Navbar />
      <div className="text-white py-20 mx-auto flex flex-col justify-center items-center w-full max-w-screen-xl px-4">
        <a href="/services">
          <button className="relative max-w-sm w-full text-white p-3 shadow-lg transform hover:scale-105 transition-transform duration-300 border-gradient bg-opacity-50 mt-20 mb-5 backdrop-filter backdrop-blur-lg flex items-center justify-center overflow-clip">
            <span className="flex items-center">Launch Custos Dapp</span>
            <img
              src="/star.png"
              className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 z-20"
              alt="Star Icon"
            />
          </button>
        </a>

        <p className="text-4xl font-bold mb-2 bg-gradient-to-r from-[#EAF9FF] to-[#8E9A9A] bg-clip-text text-transparent text-center w-full p-3">
          We are building the safest <br /> blockchain for your Asset
        </p>

        <div className="flex flex-wrap justify-center space-x-0 space-y-4 sm:space-x-4 sm:space-y-0">
          <div className="max-w-sm w-full sm:w-auto rounded overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300 flex flex-col items-center relative m-2">
            <Image
              src="/assets.png"
              alt="Card Image"
              width={400}
              height={200}
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>

      <div className="mx-5 transform hover:scale-105 transition-transform duration-300">
        <div className="flex flex-col md:flex-row justify-between items-center my-32 ml-10">
          <div className=" mb-2 bg-gradient-to-r from-[#0094FF] to-[#A02294] bg-clip-text text-transparent md:text-[50px] text-[30px]">
            <p>About Custos Diretriz</p>
            <div className="flex justify-center">
              <Image
                src="/ElliH.png"
                alt="Image"
                width={200} // Keep the width smaller for desktop
                height={100} // Keep the height smaller for desktop
                className="w-48 h-auto md:w-32" // Adjust width for responsiveness
              />
            </div>
          </div>
          <div className="md:w-1/2 md:ml-4 text-[20px] bg-gradient-to-r from-[#EAF9FF] to-[#8E9A9A] bg-clip-text text-transparent">
            <p>
              At Custos Diretriz, we are dedicated to revolutionizing safety{" "}
              <br />
              and security through innovative protocol platforms.
            </p>
            <br />
            <p>
              Our mission is to empower individuals and communities to <br />
              effectively address crime scene witnessing and streamline <br />{" "}
              agreement systems.
            </p>
          </div>
        </div>
      </div>

      <div className="flex mt-8 items-center justify-center bg-gradient-to-r from-[#EAF9FF] to-[#8E9A9A] bg-clip-text text-transparent">
        <div className="text-center p-8 bg-transparent rounded shadow-lg">
          <div className="flex flex-col md:flex-row items-center justify-center">
            <p className="text-[1.5em] mb-4 md:mb-0">Our vision</p>
            <Image
              src="/ElliS.png"
              alt="Image"
              width={200}
              height={100}
              className="w-12 h-auto md:w-32 md:mr-4 mb-4 md:mb-0" // Adjust width for responsiveness
            />
          </div>

          <div className="text-left mt-4">
            {" "}
            {/* Adds some margin above the text paragraphs */}
            <p className="text-[20px] mb-4">
              By leveraging technology and collaboration, we strive to <br />
              build a world where everyone feels empowered to make a <br />{" "}
              difference in their communities.
            </p>
            <br />
            <p className="text-[1em] mb-4">
              We envision a safer and more transparent society where <br />
              individuals have the tools and resources they need to contribute
              to <br /> crime prevention and intervention efforts.
            </p>
          </div>
        </div>
      </div>

      <div className="text-center p-8 bg-transparent rounded shadow-lg mt-20 bg-gradient-to-r from-[#EAF9FF] to-[#8E9A9A] bg-clip-text text-transparent">
        <p className="mb-2 bg-gradient-to-r from-[#0094FF] to-[#A02294] bg-clip-text text-transparent md:text-[50px] text-[30px]">
          Meet the team
        </p>
        <p className="text-[20px] mb-4">
          We have an amazing developer team building Custos
        </p>
      </div>

      <div className="flex flex-wrap justify-center space-x-0 space-y-4 sm:space-x-4 sm:space-y-0 p-4">
        {/* Add padding to the outer div */}
        <div className="max-w-sm w-full sm:w-auto rounded overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300 border-gradient bg-opacity-50 backdrop-filter backdrop-blur-lg flex flex-col items-center relative m-2 h-72">
          <div className="px-6 py-4 text-center">
            <Image
              src="/jery.png"
              alt="Card Image"
              width={200}
              height={100}
              className="w-full h-40 object-cover"
            />
            <div className="font-bold text-xl mb-2 bg-gradient-to-r from-[#0094FF] to-[#A02294] bg-clip-text text-transparent">
              Jeremiah D. Oyeniran
            </div>
            <p className="text-gray-700 text-base bg-gradient-to-r from-[#EAF9FF] to-[#8E9A9A] bg-clip-text text-transparent">
              Smart Contract Developer
            </p>
          </div>
        </div>

        <div className="max-w-sm w-full sm:w-auto rounded overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300 border-gradient bg-opacity-50 backdrop-filter backdrop-blur-lg flex flex-col items-center relative m-2 h-72">
          <div className="px-6 py-4 text-center">
            <Image
              src="/goodness.png"
              alt="Card Image"
              width={200}
              height={100}
              className="w-full h-40 object-cover"
            />
            <div className="font-bold text-xl mb-2 bg-gradient-to-r from-[#0094FF] to-[#A02294] bg-clip-text text-transparent">
              Faith M. Robert
            </div>
            <p className="text-gray-700 text-base bg-gradient-to-r from-[#EAF9FF] to-[#8E9A9A] bg-clip-text text-transparent">
              Smart Contract Developer
            </p>
          </div>
        </div>

        <div className="max-w-sm w-full sm:w-auto rounded overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300 border-gradient bg-opacity-50 backdrop-filter backdrop-blur-lg flex flex-col items-center relative m-2 h-72">
          <div className="px-6 py-4 text-center">
            <Image
              src="/faith.png"
              alt="Card Image"
              width={200}
              height={100}
              className="w-full h-40 object-cover"
            />
            <div className="font-bold text-xl mb-2 bg-gradient-to-r from-[#0094FF] to-[#A02294] bg-clip-text text-transparent">
              Goodness T. Kolapo
            </div>
            <p className="text-gray-700 text-base bg-gradient-to-r from-[#EAF9FF] to-[#8E9A9A] bg-clip-text text-transparent">
              Smart Contract Developer
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center bg-gradient-to-r from-[#EAF9FF] to-[#8E9A9A] bg-clip-text text-transparent">
        <div className="text-center p-8 bg-transparent rounded shadow-lg mt-20">
          <p className="md:text-[50px] text-[30px] mb-2 bg-gradient-to-r from-[#0094FF] to-[#A02294] bg-clip-text text-transparent">
            Reach out to us
          </p>
          <p className="text-[20px] mb-4">
            We paid the price to keep your videos and legal agreements safe.
          </p>
        </div>
        <a href="/about">
          <button className="relative max-w-sm w-full text-white p-3 shadow-lg transform hover:scale-105 transition-transform duration-300 border-gradient bg-opacity-50 mt-20 mb-5 backdrop-filter backdrop-blur-lg flex items-center justify-center rounded-xl overflow-clip">
            <span className="flex items-center">
              Send Us a Message
              <svg
                className="ml-2 w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                ></path>
              </svg>
            </span>
          </button>
        </a>
      </div>
    </main>
  );
};

export default About;
