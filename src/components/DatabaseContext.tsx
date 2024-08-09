import React, { createContext, FC, ReactNode, useContext } from 'react';
import database from './Database';
import { Database } from '@nozbe/watermelondb';

const DatabaseContext = createContext<Database | null>(null);

interface OverlayProviderProps {
    children: ReactNode;
}

export const DatabaseProvider: FC<OverlayProviderProps> = ({ children }) => (
    <DatabaseContext.Provider value={database}>
      {children}
    </DatabaseContext.Provider>
);

export const useDatabase = () => useContext(DatabaseContext);