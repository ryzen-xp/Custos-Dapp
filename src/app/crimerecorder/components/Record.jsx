import React from "react";
import Icons from "./Icons";
import Link from "next/link";
import bg from "../../../../public/Rectangle.png";

export const Record = ({ text, icon1, icon2 }) => {
  return (
    <div className="w-full flex flex-col mt-10 items-center gap-6 ">
      <p className="text-white text-xl">{text}</p>
      <div className="bg-gradient-to-r from-[#0094ff] to-[#A02294] w-[50%] h-[400px] p-[1px] rounded-xl">
        <div
          className="w-full h-full flex gap-[5rem] justify-center items-end rounded-xl"
          style={{
            backgroundColor: "#1e2f37",
            backgroundImage: `url(${bg.src})`,
            backgroundSize: "contain",
          }}
        >
          <Link href={`/crimerecorder/video`}>
            <Icons icon={icon1} text={`Record a Video`} />
          </Link>
          <Link href={`/crimerecorder/photo`}>
            <Icons icon={icon2} text={`Take a Picture`} />
          </Link>
        </div>
      </div>
    </div>
  );
};
