import Image from 'next/image';
import React from 'react';

const Hero = () => {
  return (
    <div className="bg-[#090909] text-white py-20 flex flex-row">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4">Welcome to Our Custos</h1>
        <p className="text-lg mb-8 w-full">Secure your Cyberspace, secure your Digital Life</p>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Get Started</button>
      </div>
      <div className="max-w-4xl mx-auto mt-8">
        <Image
          src="/Mockup.png" 
          alt=""
          width={600}
          height={300} 
          className="rounded-lg"
        />
      </div>
    </div>
  );
};

export default Hero;
