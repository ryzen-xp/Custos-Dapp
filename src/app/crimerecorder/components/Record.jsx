import React from "react";
import Icons from "./Icons";
import Link from "next/link";
import bg from "../../../../public/Rectangle.png";

export const Record = ({ text, icon1, icon2 }) => {
  return (
    <div className="w-full flex flex-col mt-10 items-center gap-6 px-4 md:px-0">
      <p className="text-white text-center text-lg md:text-xl">{text}</p>
      <div className="bg-gradient-to-r from-[#0094ff] to-[#A02294] w-full md:w-[50%] h-[300px] md:h-[400px] p-[1px] rounded-xl">
        <div
          className="w-full h-full flex flex-row gap-8 justify-center items-end rounded-xl pb-[5px]"
          style={{
            backgroundColor: "#1e2f37",
            backgroundImage: `url(${bg.src})`,
            backgroundSize: "contain",
          }}
        >
          <Link href={`/crimerecorder/video`} className="w-full md:w-auto">
            <Icons icon={icon1} text={`Record a Video`} />
          </Link>
          <Link href={`/crimerecorder/photo`} className="w-full md:w-auto">
            <Icons icon={icon2} text={`Take a Picture`} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Record;
