/* eslint-disable @next/next/no-Image-element */
import Image from 'next/image';
import React from 'react';

const BackgroundWrapper = ({ children }) => {
  return (
    <div className="relative w-full  overflow-hidden">
      {/* Noise background */}
      <Image
        src="/Rectangle.png"  
        alt="Noise Background"
        className=" fixed w-full bg-[#1e2f37] inset-0 h-full object-cover"
        style={{
          zIndex: -1,
          mixBlendMode: 'overlay', 
          filter: 'brightness(2.8)'
        }}
      />
      {/* Left background */}
      <Image
        src="/leftbg.svg"
        alt="Left Background"
        className="absolute left-0 top-0 h-fit object-cover w-[15%] z-0"
        style={{ zIndex: -1 }}
      />
      {/* Right background */}
      <Image
        src="/rightbg.svg"
        alt="Right Background"
        className="absolute right-0 top-0 h-fit object-cover w-[15%] z-0"
        style={{ zIndex: -1 }}
      />
      {/* Main content */}
      {children}
    </div>
  );
};

export default BackgroundWrapper;
