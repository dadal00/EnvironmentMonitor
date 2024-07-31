// OverlayContext.js
import React, { createContext, FC, ReactNode, useState } from 'react';

interface OverlayContextType {
    currentOverlayScreen: string;
    setCurrentOverlayScreen: React.Dispatch<React.SetStateAction<string>>;
}
  
const defaultValue: OverlayContextType = {
    currentOverlayScreen: 'Groups',
    setCurrentOverlayScreen: () => {},
};

export const OverlayContext = createContext(defaultValue);

interface OverlayProviderProps {
    children: ReactNode;
  }

export const OverlayProvider: FC<OverlayProviderProps> = ({ children }) => {
    const [currentOverlayScreen, setCurrentOverlayScreen] = useState('Groups');

  return (
    <OverlayContext.Provider value={{ currentOverlayScreen, setCurrentOverlayScreen }}>
      {children}
    </OverlayContext.Provider>
  );
};
