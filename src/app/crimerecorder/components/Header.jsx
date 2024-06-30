import Image from "next/image";
import React from "react";
import logo from "../../../../public/CustosLogo.png";
import icon from "../../../../public/cameraicon.png";
import bg from "../../../../public/Rectangle.png";
import Link from "next/link";
import ConnectButtoncomponent from "@/components/connect";

export const Header = () => {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex justify-between items-center w-[100%]">
        <div className="w-[100%]">
          <Image src={logo} alt="logo" width={232.7} height={22} />
        </div>
        <div className="flex justify-evenly items-center w-[100%]">
          <button className="bg-[#0094FF] rounded-full p-[0.2rem]">
            <span
              className="flex justify-between items-center gap-2 rounded-full shadow-[#A02294_2px_1px_2px_0.2px] w-full h-full py-4 px-10"
              style={{
                backgroundColor: "#1e2f37",
                backgroundImage: `url(${bg.src})`,
                backgroundSize: "contain",
              }}
            >
              <Link
                href={`/crimerecorder/video`}
                className="text-white text-base"
              >
                Record a Video
              </Link>
              <Image src={icon} alt="logo" width={24} height={24} />
            </span>
          </button>

          <ConnectButtoncomponent />
        </div>
      </div>
      <div className="text-white text-2xl">Crime Recorder</div>
    </div>
  );
};
