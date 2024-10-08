import React from "react";
import bg from "../../../../public/Rectangle.png";
// import { useReadContractData, useWriteToContract } from "@/utils/fetchcontract";
// import { useActiveAccount } from "thirdweb/react";

export const Upload = () => {
  //   const account = useActiveAccount();

  return (
    <div className="w-[300px] rounded-lg border-[0.1px] border-[rgba(0,149,255,0.39)] p-4 my-10">
      <div className="rounded-lg w-full h-full flex flex-col gap-2 items-start">
        <div className="w-full rounded-lg h-[150px] bg-[rgba(131,106,106,0.29)]"></div>
        <div className="rounded-full py-2 px-4 text-[#0094ff] text-xs border-[0.1px] border-[rgba(0,149,255,0.39)]">
          Topic
        </div>
        <p className="text-[#0094ff] text-xs">
          <span className="text-white">Timestamp: </span>
          {Date()}
        </p>
        <button className="rounded-full text-white text-xs bg-[#0094ff] py-3 px-8">
          Download Video
        </button>
      </div>
    </div>
  );
};
