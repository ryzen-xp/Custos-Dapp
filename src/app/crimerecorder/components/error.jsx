import Image from "next/image";
import { FaTimes } from "react-icons/fa";

const ErrorScreen = ({ open, onClose }) => {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed top-80 border rounded-xl bg-[#04080C] p-4 border-[#19B1D2] h-fit w-[40%] shadow-2xl items-center justify-center flex flex-col m-auto">
      <div className="w-full flex justify-between gap-x-32 flex-row-reverse mb-4">
        <button className="text-white" onClick={onClose}>
          <FaTimes size={20} />
        </button>
        <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-[#EAF9FF] to-[#8E9A9A]">
          You Encounter an error, File not save onchain
        </h1>
      </div>
      <div className="h-full flex items-center justify-center m-6 align-middle w-full text-center ">
        <Image src={"/error.png"} width={150} height={150} alt="error" />
      </div>
    </div>
  );
};

export default ErrorScreen;
