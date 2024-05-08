import Image from 'next/image';
import React from 'react';

const Hero = () => {
  return (
    <div className="bg-[#090909] text-white py-20 px-20 flex flex-row">
      <div className="flex-1 max-w-4xl mx-auto px-20 bg-[#090909]">
        <h1 className="font-bold mb-4 text-[#7611f7] text-xl">WELCOME TO CUSTOS</h1>
        <p className="font-bold text-6xl mb-8 w-full">Secure your <span className="text-[#7611f7]">Cyberspace </span>, secure your <span className="text-[#7611f7]">Digital Life </span></p>
        <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi beatae 
            voluptatum neque architecto, iure incidunt recusandae voluptas non vero minus tenetur earum ratione distinctio labore dolorem soluta, laudantium perferendis saepe.</span>
            <button className="bg-[#7611f7] hover:bg-[#090909] text-white font-bold py-2 px-4 rounded">Get Started</button>
      </div>
      <div className="flex-1 max-w-4xl mx-auto mt-8">
        <Image
          src="/Mockup.png" 
          alt=""
          width={600}
          height={300} 
          className="rounded-lg hover:transition-transform duration-300"
        />
      </div>
    </div>
  );
};

export default Hero;
