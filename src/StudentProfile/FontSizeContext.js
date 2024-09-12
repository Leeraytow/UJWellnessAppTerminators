import React, { createContext, useState } from 'react';

export const FontSizeContext = createContext();

export const FontSizeProvider = ({ children }) => {
  const [fontSize, setFontSize] = useState(16);

  const increaseFontSize = () => setFontSize((prev) => Math.min(prev + 1, 20));
  const decreaseFontSize = () => setFontSize((prev) => Math.max(prev - 1, 10));

  return (
    <FontSizeContext.Provider value={{ fontSize, increaseFontSize, decreaseFontSize }}>
      {children}
    </FontSizeContext.Provider>
  );
};
