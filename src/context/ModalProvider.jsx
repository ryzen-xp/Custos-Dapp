// ModalContext.js
"use client";
import React, { createContext, useContext, useState } from "react";
import { useRouter } from "next/navigation";
import SuccessScreen from "@/app/crimerecorder/components/Success";
import ErrorScreen from "@/app/crimerecorder/components/error";

// Create the context
const ModalContext = createContext();

// Provider component
export const ModalProvider = ({ children }) => {
  const route = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(null);
  const openModal = (type) => {
    setIsModalOpen(type);
  };
  const [message, setMessage] = useState("");

  const closeModal = () => {
    if (isModalOpen === "success") {
      setIsModalOpen(null);
      route.push("/crimerecorder/uploads");
    } else {
      setIsModalOpen(null);
    }
  };

  return (
    <ModalContext.Provider
      value={{ isModalOpen, openModal, closeModal, message, setMessage }}>
      {children}
      {isModalOpen === "success" && <SuccessScreen />}
      {isModalOpen === "error" && <ErrorScreen />}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
