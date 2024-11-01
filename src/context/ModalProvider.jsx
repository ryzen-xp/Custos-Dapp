// ModalContext.js
import React, { createContext, useContext, useState } from "react";
import SuccessScreen from "@/app/crimerecorder/components/Success";

// Create the context
const ModalContext = createContext();

// Provider component
export const ModalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const toggleModal = () => setIsModalOpen((prev) => !prev);

  return (
    <ModalContext.Provider
      value={{ isModalOpen, openModal, closeModal, toggleModal }}>
      {children}
      {isModalOpen && <SuccessScreen />}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
