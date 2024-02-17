import React, { createContext, useContext, useState } from "react";

const AddressesContext = createContext();

export const AddressesProvider = ({ children }) => {
  const [couriersAddresses, setCouriersAddresses] = useState([]);

  const addAddress = (newAddress) => {
    setCouriersAddresses((prevAddresses) => [...prevAddresses, newAddress]);
  };

  return (
    <AddressesContext.Provider value={{ couriersAddresses, addAddress }}>
      {children}
    </AddressesContext.Provider>
  );
};

export const useAddresses = () => {
  const context = useContext(AddressesContext);
  if (!context) {
    throw new Error("useAddresses must be used within an AddressesProvider");
  }
  return context;
};
