"use client";
import React, { createContext, useState } from "react";

export const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {
  const [globalState, setGlobalState] = useState("");
  const [showModal, setShowModal] = useState(true);
  const closeSuccessModal = () => {
    setShowModal(false);
    route.push("/crimerecorder/uploads");
  };
  return (
    <GlobalStateContext.Provider
      value={{ globalState, setGlobalState, showModal, closeSuccessModal, setShowModal }}>
      {children}
    </GlobalStateContext.Provider>
  );
};
