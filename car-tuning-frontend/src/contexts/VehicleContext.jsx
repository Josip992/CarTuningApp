import { createContext, useState, useContext } from 'react';

const VehicleContext = createContext();

export const useVehicleContext = () => useContext(VehicleContext);

export const VehicleProvider = ({ children }) => {
    const [selectedMake, setSelectedMake] = useState("");
    const [selectedModel, setSelectedModel] = useState("");
    const [selectedType, setSelectedType] = useState("");
    const [selectedEngine, setSelectedEngine] = useState("");
    
  const value = {
    selectedMake,
    setSelectedMake,
    selectedModel,
    setSelectedModel,
    selectedType,
    setSelectedType,
    selectedEngine,
    setSelectedEngine
  };
    
  return <VehicleContext.Provider value= {value}>
    {children}
  </VehicleContext.Provider>
};