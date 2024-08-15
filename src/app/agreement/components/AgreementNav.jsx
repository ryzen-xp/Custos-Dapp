import Image from "next/image";
import React from "react";
import logo from "../../../../public/CustosLogo.png";
import icon from "../../../../public/cameraicon.png";
import Link from "next/link";
import ConnectButtoncomponent from "@/components/connect";
import Button from "@/components/Button";

export const Header = () => {
  return (
    <div className="flex flex-col gap-4 w-full p-4">
      <div className="flex justify-between items-center w-full">
        <a href="/" className="w-auto">
          <Image src={logo} alt="logo" width={232.7} height={22} />
          </a>
        </div>
       
        <div className="flex justify-end  gap-20 items-center w-full">
            {/* <div className="hidden md:block">

            <Button text="Create Agreement" icon={<Image src="/Plus.svg" alt="plus" width={18} height={18}  />} link={"/agreement/create"} />
            </div> */}

          <ConnectButtoncomponent />
        </div>
      
      <div className="text-white text-center md:text-left text-xl md:text-2xl">
        Agreement
      </div>
    </div>
    
  );
};

export default Header;
