import React from "react";
import NFTImageTemplate from "./NFTImage";

export const Upload = ({ uri }) => {
  // const formattedDate = format(new Date(agreement[3]), "EEEE, do MMMM yyyy. hh:mm:ss aaaa");

  return (
    <div className="w-[300px] rounded-lg border-[0.1px] border-[rgba(0,149,255,0.39)] p-4 my-10">
      <div className="rounded-lg w-full h-full flex flex-col gap-2 items-start">
        <div className="w-full rounded-lg h-[150px] bg-[rgba(131,106,106,0.29)]">
          <NFTImageTemplate imageURI={uri} />
        </div>
        <div className="rounded-full py-2 px-4 text-[#0094ff] text-xs border-[0.1px] border-[rgba(0,149,255,0.39)]">
          Record
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
