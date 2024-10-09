import React, { useState } from 'react';

const FileUploadModal = ({ isOpen, onClose, onSubmit }) => {
  const [fileName, setFileName] = useState("");

  const handleSubmit = () => {
    if (fileName.trim()) {
      onSubmit(fileName);
    } else {
      alert("Please enter a valid file name.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md">
        <h2 className="text-lg font-semibold mb-4">Enter File Name</h2>
        <input
          type="text"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          className="border p-2 w-full mb-4"
          placeholder="Enter a file name"
        />
        <div className="flex justify-end space-x-4">
          <button onClick={onClose} className="bg-gray-400 px-4 py-2 rounded">
            Cancel
          </button>
          <button onClick={handleSubmit} className="bg-blue-500 px-4 py-2 rounded text-white">
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileUploadModal;
