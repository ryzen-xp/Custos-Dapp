// GlobalStateProvider.js
"use client";
import React, { createContext, useState } from "react";

// Create the context
export const GlobalStateContext = createContext();

// Create a provider component
export const GlobalStateProvider = ({ children }) => {
  // Define your state here
  const [globalState, setGlobalState] = useState("Initial Value");

  return (
    <GlobalStateContext.Provider value={{ globalState, setGlobalState }}>
      {children}
    </GlobalStateContext.Provider>
  );
};
