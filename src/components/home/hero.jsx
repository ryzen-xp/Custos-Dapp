import Image from "next/image";
import Link from "next/link";
import React from "react";
const Hero = () => {
  return (
    <div className="bg-[#090909] text-white py-20 mx-auto flex flex-col">
      <div className="flex flex-row  w-full gap-6  px-8 justify-center items-center">
        <div className="flex flex-col w-fit mx-auto bg-[#090909]">
          <h1 className="font-bold mb-4 text-[#c92eff] text-xl">
            WELCOME TO CUSTOS
          </h1>
          <div className="flex flex-col gap-4 w-fit">
            <p className="font-bold text-6xl mb-8 w-fit">
              Secure your <span className="text-[#c92eff]">Cyberspace</span>,
              secure your <span className="text-[#c92eff]">Digital Life</span>
            </p>
            <span className="">
              With CUSTOS you can leverage on the power of decentralization to
              secure your legal agreements{" "}
            </span>
          

          
            <button className="bg-[#c92eff] w-fit rounded-lg hover:bg-[#090909] text-white font-bold py-2 px-4 border-2 border-[#c92eff] font-san hover:border-[#c92eff]">
              Lunch Dapp
            </button>
          </div>
        </div>

        <div className="w-fit">
          <Image
            src="/Mockup.jpeg"
            alt=""
            width={1000}
            height={300}
            className="rounded-lg  hover:transition-transform duration-300"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
