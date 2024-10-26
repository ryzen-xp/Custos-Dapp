'use client';
import { useState } from "react";
import { FaTimes } from "react-icons/fa";

const Filename = ({ open, onClose, onSubmit }) => {
  const [fileName, setFileName] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  if (!open) return null;

  const handleClose = () => {
    //setIsSuccess(true);
    setFileName("");
    setError(null);
    onClose();
  };

  const handleSubmit = async () => {
    if (!fileName.trim()) {
      alert("Please enter a valid file name.");
      return;
    }
    try {
      setIsSubmitting(true);
      setError(null);
      
      await onSubmit(fileName);
      setIsSuccess(true);
    } catch (error) {
      console.error('Submission error:', error);
      setError(error.message || "Error submitting evidence");
      setIsSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 overflow-hidden"
        onClick={handleClose}
      />
        <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 border rounded-xl bg-[#04080C] p-4 border-[#19B1D2] h-fit w-[40%] shadow-2xl items-center justify-center flex flex-col overflow-hidden">
          <div className="w-full flex justify-between gap-x-32 flex-row-reverse mb-4">
            <button className="text-white" onClick={handleClose}>
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
            className="border bg-[#04080C] text-white p-2 w-full mb-4 rounded"
            placeholder="Give Your Evidence a Name"
            disabled={isSubmitting}
          />

          {error && (
            <p className="text-red-500 mb-4">{error}</p>
          )}

          <div className="flex justify-end space-x-4">
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`inline-block mt-5 py-2 px-4 rounded-[2em] mb-5 ${
                isSubmitting 
                  ? 'bg-gray-500 cursor-not-allowed' 
                  : 'bg-[#0094FF] hover:bg-[#0077CC]'
              } text-white`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </div>
      
    </>
  );
};

export default Filename;