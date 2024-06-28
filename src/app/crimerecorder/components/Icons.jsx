import Image from "next/image";
import React from "react";

const Icons = ({ icon, text }) => {
  return (
    <div className="flex flex-col items-center mb-6 gap-2">
      <Image src={icon} alt="icon" width={48} height={48} />
      <span className="text-white text-base">{text}</span>
    </div>
  );
};

export default Icons;
