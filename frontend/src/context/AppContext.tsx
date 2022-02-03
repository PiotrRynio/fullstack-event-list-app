import React, { createContext, useContext, useState } from 'react';
import { RegisteredEvent } from './RegisteredEvent';

type AppContextType = {
  registeredEvents: RegisteredEvent[];
  setRegisteredEvents: (newRegisteredEvents: RegisteredEvent[]) => void;
};

const appContextDefaultValue = {
  registeredEvents: [],
  setRegisteredEvents: (newRegisteredEvents: RegisteredEvent[]) => {},
};

const AppContext = createContext<AppContextType>(appContextDefaultValue);

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [registeredEvents, setRegisteredEvents] = useState<RegisteredEvent[]>(appContextDefaultValue.registeredEvents);

  return (
    <AppContext.Provider
      value={{
        registeredEvents,
        setRegisteredEvents,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
