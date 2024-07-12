import Image from "next/image";
import React from "react";
import logo from "../../../../public/CustosLogo.png";
import icon from "../../../../public/cameraicon.png";
import bg from "../../../../public/Rectangle.png";
import Link from "next/link";
import ConnectButtoncomponent from "@/components/connect";
import Button from "@/components/Button";

export const Header = () => {
  return (
    <div className="flex flex-col gap-10 w-full justify-between">
      <div className="flex justify-between items-center w-full">
        <a href="/" className="w-full">


        <div className="w-[100%]">
          <Image src={logo} alt="logo" width={232.7} height={22} />
        </div>
        </a>
        <div className="flex justify-end  gap-20 items-center w-full">
            {/* <div className="hidden md:block">

            <Button text="Create Agreement" icon={<Image src="/Plus.svg" alt="plus" width={18} height={18}  />} link={"/agreement/create"} />
            </div> */}

          <ConnectButtoncomponent />
        </div>
      </div>
      <div className="text-white text-2xl">Agreement</div>
    </div>
  );
};
