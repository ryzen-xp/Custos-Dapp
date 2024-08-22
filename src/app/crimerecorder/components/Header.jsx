import Image from "next/image";
import React from "react";
import logo from "../../../../public/CustosLogo.png";
import icon from "../../../../public/cameraicon.svg";
import bg from "../../../../public/Rectangle.png";
import Link from "next/link";
import ConnectButtoncomponent from "@/components/connect";

export const Header = () => {
  return (
    <div className="flex flex-col gap-10 p-4">
      <div className="flex flex-col sm:flex-row justify-between items-center w-full gap-4">
        <Link href={`/`} className="w-full sm:w-auto">
          <Image src={logo} alt="logo" width={232.7} height={22} />
        </Link>
        <div className="flex flex-col sm:flex-row justify-evenly items-center w-full sm:w-auto gap-4">
          <button className="bg-[#0094FF] rounded-full p-[0.2rem]">
            <span
              className="flex justify-between items-center gap-2 rounded-full shadow-[#A02294_2px_1px_2px_0.2px] w-full h-full py-2 sm:py-4 px-6 sm:px-10"
              style={{
                backgroundColor: "#1e2f37",
                backgroundImage: `url(${bg.src})`,
                backgroundSize: "contain",
              }}
            >
              <Link
                href={`/crimerecorder/video`}
                className="text-white text-sm sm:text-base"
              >
                Record a Video
              </Link>
              <Image src={icon} alt="logo" width={24} height={24} />
            </span>
          </button>
          <ConnectButtoncomponent />
        </div>
      </div>
      <div className="text-white text-xl sm:text-2xl text-center sm:text-left">
        Crime Recorder
      </div>
    </div>
  );
};
