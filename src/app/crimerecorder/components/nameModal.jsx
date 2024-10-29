'use client';
import { useState, useEffect, useRef } from "react";
import { FaTimes } from "react-icons/fa";

const Filename = ({ open, onClose, onSubmit }) => {
  const [fileName, setFileName] = useState("");
  const [countdown, setCountdown] = useState(5); // Start with 5 seconds
  const countdownRef = useRef(null);

  // Function to generate a unique file name based on the current timestamp
  const generateUniqueFileName = () => {
    const currentTime = new Date().toISOString();
    return `file_${currentTime}`;
  };

  // Effect to handle the countdown and generate a name if no input is detected
  useEffect(() => {
    if (open && fileName.trim() === "") {
      // Only start countdown if the modal is open and no file name is provided
      countdownRef.current = setTimeout(() => {
        if (countdown === 1) {
          // Automatically generate a name and submit it when countdown ends
          const generatedName = generateUniqueFileName();
          setFileName(generatedName);
          onSubmit(generatedName);
          setFileName(""); // Clear file name after submission
          onClose(); // Close modal after submission
        } else {
          setCountdown(countdown - 1); // Decrease countdown by 1 each second
        }
      }, 1000);

      return () => clearTimeout(countdownRef.current); // Cleanup on unmount or input
    }
  }, [countdown, fileName, open, onSubmit, onClose]);

  // Reset countdown when user types
  const handleInputChange = (e) => {
    setFileName(e.target.value);
    setCountdown(5); // Reset countdown to 5 seconds when user starts typing
    clearTimeout(countdownRef.current); // Clear any ongoing countdown
  };

  const handleSubmit = () => {
    if (fileName.trim()) {
      onSubmit(fileName);
      setFileName(""); // Clear file name after submission
      setCountdown(5);
      onClose();
    } else {
      alert("Please enter a valid file name.");
    }
  };

  if (!open) {
    return null;
  }

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
        onChange={handleInputChange}
        className="border bg-[#04080C] text-white p-2 w-full mb-4 rounded"
        placeholder="Give Your Evidence a Name"
      />
      <div className="flex justify-end space-x-4">
      {fileName ? <button
          onClick={handleSubmit}
          className="inline-block mt-5 bg-[#0094FF] text-white py-2 px-4 rounded-[2em] mb-5"
        >
          Submit
        </button> :<button
          onClick={handleSubmit}
          className="inline-block text-6xl mt-5 text-[#0094FF] py-2 px-4 rounded-[2em] mb-5"
        >
           {`${countdown} Seconds `}
        </button>}
        
      </div>
     
    </div>
  );
};

export default Filename;
