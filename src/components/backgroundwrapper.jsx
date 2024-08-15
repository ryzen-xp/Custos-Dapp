/* eslint-disable @next/next/no-img-element */
import React from 'react';

const BackgroundWrapper = ({ children }) => {
  return (
    <div className="relative w-full  overflow-hidden">
      {/* Noise background */}
      <img
        src="/Rectangle.png"  // Assuming Rectangle.png is your noise background
        alt="Noise Background"
        className=" fixed w-full bg-[#1e2f37] inset-0 h-full object-cover"
        style={{
          zIndex: -1,
          mixBlendMode: 'overlay', 
          filter: 'brightness(0.8)' // Adjust brightness for blending
        }}
      />
      {/* Left background */}
      <img
        src="/leftbg.svg"
        alt="Left Background"
        className="absolute left-0 top-0 h-fit object-cover w-[15%] z-0"
        style={{ zIndex: -1 }}
      />
      {/* Right background */}
      <img
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
