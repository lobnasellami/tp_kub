// LanguageContext.js
import React, { createContext, useState } from 'react';

// Create the LanguageContext
export const LanguageContext = createContext();

// Create the LanguageProvider component
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const selectedLanguage = localStorage.getItem('selectedLanguage');
    return selectedLanguage ? selectedLanguage : 'fr';
  });

  // Update the language value and notify subscribers
  const updateLanguage = (newLanguage) => {
    setLanguage(newLanguage);
  };

  // Provide the language value and update function to descendant components
  return (
    <LanguageContext.Provider value={{ language, updateLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
