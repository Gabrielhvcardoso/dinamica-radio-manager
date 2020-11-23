  
import { useState, useEffect } from 'react';

interface WindowSizeProps {
  width: number,
  height: number
}

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState<WindowSizeProps>({} as WindowSizeProps);

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    
    window.addEventListener("resize", handleResize);
  
    handleResize();
    
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}
