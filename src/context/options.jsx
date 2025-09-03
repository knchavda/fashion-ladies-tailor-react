import React, { createContext, useContext, useState, useEffect } from "react";

// Context create
const OptionsContext = createContext();

// Provider
export const OptionsProvider = ({ children }) => {
  const [options, setOptions] = useState([]);

  return (
    <OptionsContext.Provider value={{ options, setOptions }}>
      {children}
    </OptionsContext.Provider>
  );
};
export const useOptions = () => useContext(OptionsContext);



