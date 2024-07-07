import React from 'react';
import Image from 'next/image';
import Agree from './agree';

const Hero = () => {
  return (
    <main className="flex items-center justify-center min-h-screen">
      <div className="text-white py-20 mx-auto flex flex-col justify-center items-center w-full max-w-screen-xl px-4">
        <a href="/services">
          <button className="relative max-w-sm w-full text-white p-3 shadow-lg transform hover:scale-105 transition-transform duration-300 border-gradient bg-opacity-50 mt-20 mb-5 backdrop-filter backdrop-blur-lg flex items-center justify-center overflow-clip">
            <span className="flex items-center">Launch Custos Dapp</span>
            <img src="/star.png" className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 z-20" alt="Star Icon" />
          </button>
        </a>

        <p className="text-4xl font-bold mb-2 bg-gradient-to-r from-[#EAF9FF] to-[#8E9A9A] bg-clip-text text-transparent text-center w-full p-3">
          The new blockchain safe
        </p>
        <p className="text-lg mb-10 bg-gradient-to-r from-[#EAF9FF] to-[#8E9A9A] bg-clip-text text-transparent text-center">
          Custos will secure your evidence and legal agreements
        </p>

        <div className="flex flex-wrap justify-center space-x-0 space-y-4 sm:space-x-4 sm:space-y-0">
          <div className="max-w-sm w-full sm:w-auto rounded overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300 border-gradient bg-opacity-50 backdrop-filter backdrop-blur-lg flex flex-col items-center relative m-2">
            <div className="px-6 py-4 text-center">
              <div className="font-bold text-xl mb-2 bg-gradient-to-r from-[#0094FF] to-[#A02294] bg-clip-text text-transparent">
                Crime scene recorder
              </div>
              <p className="text-gray-700 text-base bg-gradient-to-r from-[#EAF9FF] to-[#8E9A9A] bg-clip-text text-transparent">
                We are providing a decentralized crime recorder. Videos on Custos are transparent
              </p>
            </div>
            <Image
              src="/ime.png"
              alt="Card Image"
              width={200}
              height={100}
              className="w-full h-auto"
            />
          </div>

          <div className="max-w-sm w-full sm:w-auto rounded overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300 border-gradient bg-opacity-50 backdrop-filter backdrop-blur-lg flex flex-col items-center relative m-2">
            <div className="px-6 py-4 text-center">
              <div className="font-bold text-xl mb-2 bg-gradient-to-r from-[#0094FF] to-[#A02294] bg-clip-text text-transparent">
                A very secure blockchain safe
              </div>
              <p className="text-gray-700 text-base bg-gradient-to-r from-[#EAF9FF] to-[#8E9A9A] bg-clip-text text-transparent">
                Leveraging on Starknet’s advanced technology for unparalleled security and efficiency, we have built a safe for your agreement and videos
              </p>
            </div>
            <Image
              src="/img.png"
              alt="Card Image"
              width={200}
              height={100}
              className="w-full h-auto"
            />
          </div>

          <div className="max-w-sm w-full sm:w-auto rounded overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300 border-gradient bg-opacity-50 backdrop-filter backdrop-blur-lg flex flex-col items-center relative m-2">
            <div className="px-6 py-4 text-center">
              <div className="font-bold text-xl mb-2 bg-gradient-to-r from-[#0094FF] to-[#A02294] bg-clip-text text-transparent">
                Agreement documentation
              </div>
              <p className="text-gray-700 text-base bg-gradient-to-r from-[#EAF9FF] to-[#8E9A9A] bg-clip-text text-transparent">
                Custos’ smart agreement management will secure your signed documents transparently
              </p>
            </div>
            <Image
              src="/ima.png"
              alt="Card Image"
              width={200}
              height={100}
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Hero;
