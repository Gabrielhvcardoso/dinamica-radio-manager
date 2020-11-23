import React, { createContext, useMemo } from 'react';
import { useWindowSize } from '../hooks';

interface MobileContextProps {
  isMobile: boolean
}

const MobileContext = createContext<MobileContextProps>({} as MobileContextProps)

export const MobileContextProvider: React.FC = ({ children }) => {
  const { width } = useWindowSize();
  const isMobile = useMemo(() => width < 768, [width]);
  
  return (
    <MobileContext.Provider value={{ isMobile }}>
      { children }
    </MobileContext.Provider>
  );
}

export default MobileContext;
