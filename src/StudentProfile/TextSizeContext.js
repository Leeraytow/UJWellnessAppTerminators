

import React, { createContext, useState } from 'react';

const TextSizeContext = createContext();

const TextSizeProvider = ({ children }) => {
 const [textSize, setTextSize] = useState(14);
  const [highContrast, setHighContrast] = useState(false); 

  return (
    <TextSizeContext.Provider value={{ textSize, setTextSize, highContrast, setHighContrast }}>
      {children}
    </TextSizeContext.Provider>
  );
};

export { TextSizeContext, TextSizeProvider };
