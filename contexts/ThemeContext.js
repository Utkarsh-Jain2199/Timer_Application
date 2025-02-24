import React, { createContext, useState, useContext } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const theme = {
    isDarkMode,
    colors: isDarkMode ? darkTheme : lightTheme,
    toggleTheme: () => setIsDarkMode(!isDarkMode),
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

const lightTheme = {
  background: '#FFFFFF',
  text: '#000000',
  primary: '#007AFF',
  secondary: '#5856D6',
  border: '#E5E5EA',
};

const darkTheme = {
  background: '#000000',
  text: '#FFFFFF',
  primary: '#0A84FF',
  secondary: '#5E5CE6',
  border: '#38383A',
};