import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // The new cosmic theme is always dark
  const [theme] = useState('dark');

  useEffect(() => {
    // Force dark class so any lingering Tailwind dark: utilities still apply
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
  }, []);

  // Keep toggleTheme as a no-op for backwards compatibility
  const toggleTheme = () => { };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
