// NotificationContext.js
"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import Notification from "@/components/notification";

// Create the context
const NotificationContext = createContext();

// Provider component
export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState({
    isOpen: false,
    type: "",
    headText: "",
    subText: "",
  });

  const openNotification = useCallback((type, headText, subText) => {
    setNotification({
      isOpen: true,
      type,
      headText: type === "error" ? "Oops!" : headText,
      subText,
    });
  }, []);

  const closeNotification = useCallback(() => {
    setNotification((prev) => ({ ...prev, isOpen: false }));
  }, []);

  useEffect(() => {
    if (notification.isOpen) {
      const timer = setTimeout(() => {
        setNotification((prev) => ({ ...prev, isOpen: false }));
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [notification.isOpen]);

  return (
    <NotificationContext.Provider
      value={{
        notification,
        openNotification,
        closeNotification,
      }}
    >
      {children}
      {notification.isOpen && (
        <Notification
          type={notification.type}
          headText={notification.headText}
          subText={notification.subText}
        />
      )}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
