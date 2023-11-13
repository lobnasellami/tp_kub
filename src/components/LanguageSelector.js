import React, { useEffect } from 'react';
import { useContext } from 'react';
import { LanguageContext } from '../LanguageContext';
import './LanguageSelector.css'; // Import the CSS file for styling

const translations = {
    'ar': {
        'question':' اختر لغة التصفح'
    },
    'fr': {
        'question':'Choisir une langue'
    }
}

function LanguageSelector() {
  const { language, updateLanguage } = useContext(LanguageContext);

  const handleLanguageChange = (event) => {
    const newLanguage = event.target.value;
    updateLanguage(newLanguage);
    // Save the selected language to local storage
    localStorage.setItem('selectedLanguage', newLanguage);
  };

  return (
    <div className="language-selector" style={{marginBottom:"20px"}}>
      <label htmlFor="language"></label>
      <select id="language" value={language} onChange={handleLanguageChange}>
        {/* <option value="" disabled>-- {language ==='fr' ? translations['fr']['question'] : translations['ar']['question']} --</option> */}
        <option value="ar" className='ar'>
          <span className="flag-icon flag-icon-tn"></span> {language === "fr" ? "Arabe" : "العربية"}
        </option>
        <option value="fr" className='fr'>
          <span className="flag-icon flag-icon-fr"></span> {language === "fr" ? "Français" : "الفرنسية"}
        </option>
      </select>
    </div>
  );
}

export default LanguageSelector;
