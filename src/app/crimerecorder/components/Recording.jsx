import React from "react";
import bg from "../../../../public/Rectangle.png";
import Icons from "./Icons";

export const Recording = ({ text, icon1, imgText }) => {
  return (
    <div className="flex flex-col mt-10 items-center gap-6 ">
      <p className="text-white text-xl">{text}</p>
      <div className="bg-gradient-to-r from-[#0094ff] to-[#A02294] w-[789px] h-[568px] p-[1px] rounded-xl">
        <div
          className="w-full h-full flex gap-[5rem] justify-center items-end rounded-xl"
          style={{
            backgroundColor: "#1e2f37",
            backgroundImage: `url(${bg.src})`,
            backgroundSize: "contain",
          }}
        >
          <Icons icon={icon1} text={imgText} />
        </div>
      </div>
    </div>
  );
};
