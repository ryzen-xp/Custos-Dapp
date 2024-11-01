  'use client'
  import { useState } from "react";
  import { FaTimes } from "react-icons/fa";

  const Filename = ({ open, onClose, onSubmit }) => {
    if (!open) {
      return null;
    }
    const [fileName, setFileName] = useState("");

    const handleSubmit = () => {
      if (fileName.trim()) {
        // Call the onSubmit prop with the filename
        onSubmit(fileName);
        onClose(); // Close the modal after submission
      } else {
        openNotification("error", "", "Please enter a valid file name");
      }
    };


    return (
      <div className="fixed top-80 z-50 border rounded-xl bg-[#04080C] p-4 border-[#19B1D2] h-fit w-[40%] shadow-2xl items-center justify-center flex flex-col m-auto">
        <div className="w-full flex justify-between gap-x-32 flex-row-reverse mb-4">
          <button className="text-white" onClick={onClose}>
            <FaTimes size={20} />
          </button>
          <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-[#EAF9FF] to-[#8E9A9A]">
          Would you like to name your evidence?
          </h1>
        </div>
      
          <input
            type="text"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            className="border bg-[#04080C] text-white p-2 w-full mb-4 rounded" placeholder="Give Your Evidence a Name"/>
          <div className="flex justify-end space-x-4">
            
            <button
              onClick={handleSubmit}
              className="inline-block mt-5 bg-[#0094FF] text-white py-2 px-4 rounded-[2em]  mb-5">
              Submit
            </button>
          </div>
        </div>
    );
  };

  export default Filename;
