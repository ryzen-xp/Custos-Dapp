import Image from 'next/image';
import { FaTimes } from 'react-icons/fa';

const SuccessScreen = ({ onClose }) => {
  return (
    <div className="border rounded-xl bg-[#04080C] p-8 border-[#19B1D2] h-fit w-fit shadow-2xl items-center justify-center flex flex-col m-auto">
      <div className="w-full flex justify-between gap-x-16 flex-row-reverse " >
      <button className="text-white" onClick={onClose}>
        <FaTimes size={20} />
      </button>
      <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-[#EAF9FF] to-[#8E9A9A]">Agreement creation Successful</h1>
      </div>
        <div className="h-full flex items-center justify-center m-auto align-middle w-full text-center ">
            
      <Image src={"/success.svg"} width={150} height={150} alt='success' />
        </div>

    </div>
  );
};

export default SuccessScreen;
