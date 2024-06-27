import React from "react";
import Icons from "./Icons";

export const Recording = ({ text }) => {
  return (
    <div className="flex flex-col mt-10 items-center gap-6 ">
      <p className="text-white text-xl">{text}</p>
      <div className="bg-gradient-to-r from-[#0094ff] to-[#A02294] w-[789px] h-[568px] p-[1px] rounded-xl">
        <div className="w-full h-full bg-gray-800 flex gap-[5rem] justify-center items-end rounded-xl">
          <Icons icon={icon1} text={`Record a Video`} />
        </div>
      </div>
    </div>
  );
};
