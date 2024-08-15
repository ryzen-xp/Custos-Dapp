import Image from "next/image";
import React from "react";

const Icons = ({ icon, text }) => {
  return (
    <div className="flex flex-col items-center mb-6 gap-2">
      <div className="w-12 h-12 md:w-16 md:h-16">
        <Image src={icon} alt="icon" layout="responsive" width={24} height={24} />
      </div>
      <span className="text-white text-sm md:text-base">{text}</span>
    </div>
  );
};

export default Icons;
