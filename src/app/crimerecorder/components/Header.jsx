import Image from "next/image";
import React from "react";
import logo from "../../../../public/CustosLogo.png";
import icon from "../../../../public/cameraicon.png";

export const Header = () => {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex justify-between items-center w-[100%]">
        <div className="w-[100%]">
          <Image src={logo} alt="logo" width={232.7} height={22} />
        </div>
        <div className="flex justify-evenly items-center w-[100%]">
          <button className="bg-[#0094FF] rounded-full p-[0.2rem]">
            <span className="flex justify-between items-center gap-2 rounded-full bg-gray-800 shadow-[#A02294_2px_1px_2px_0.2px] w-full h-full py-4 px-10">
              <span className="text-white">Record a Video</span>
              <Image src={icon} alt="logo" width={24} height={24} />
            </span>
          </button>

          <button className="bg-[#0094FF]/75 rounded-full p-[0.2rem] flex">
            <span
              className="text-white py-4 px-10 rounded-full w-full h-full shadow-[#A02294_0.5px_-0.05px_0.01px_0.6px]"
              style={{
                backgroundImage: "url('../../../../public/Rectangle.png')",
                backgroundColor: "#1e2f37",
                backgroundBlendMode: "multiply",
              }}
            >
              0xc34rtdh84mgjhist
            </span>
          </button>
        </div>
      </div>
      <div className="text-white">Crime Recorder</div>
    </div>
  );
};
