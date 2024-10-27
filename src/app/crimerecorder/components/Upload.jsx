import React from "react";
import NFTImageTemplate from "./NFTImage";

export const Upload = ({ uri }) => {
  return (
    <div className="w-full max-w-[300px] min-w-[250px] rounded-lg border-[0.1px] border-[rgba(0,149,255,0.39)] p-3 sm:p-4 mx-auto my-6 sm:my-10">
      <div className="rounded-lg w-full h-full flex flex-col gap-2 items-start">
        <div className="w-full rounded-lg h-[120px] sm:h-[150px] bg-[rgba(131,106,106,0.29)]">
          <NFTImageTemplate imageURI={uri} />
        </div>
        
        <div className="flex flex-wrap gap-2 w-full items-center justify-between">
          <div className="rounded-full py-1.5 sm:py-2 px-3 sm:px-4 text-[#0094ff] text-[10px] sm:text-xs border-[0.1px] border-[rgba(0,149,255,0.39)]">
            Record
          </div>
          
          <p className="text-[#0094ff] text-[10px] sm:text-xs">
            <span className="text-white">Timestamp: </span>
            {Date()}
          </p>
        </div>
        
        <div className="w-full flex justify-center mt-2">
          <button className="rounded-full text-white text-[10px] sm:text-xs bg-[#0094ff] py-2 sm:py-3 px-6 sm:px-8 hover:bg-[#0077CC] transition-colors duration-200">
            Download Video
          </button>
        </div>
      </div>
    </div>
  );
};