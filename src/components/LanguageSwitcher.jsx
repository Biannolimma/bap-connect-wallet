import React, { useState, useEffect } from 'react';
import '../styles/LanguageSwitcher.css';

/**
 * LanguageSwitcher Component
 * Allows users to switch between supported languages
 */
const LanguageSwitcher = ({ currentLanguage, onLanguageChange, i18n }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(currentLanguage || 'pt');

  // Available languages
  const languages = [
    { code: 'pt', name: 'Português', flag: '🇧🇷' },
    { code: 'en', name: 'English', flag: '🇺🇸' }
  ];

  useEffect(() => {
    setSelectedLanguage(currentLanguage);
  }, [currentLanguage]);

  // Toggle dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Handle language selection
  const handleLanguageSelect = (languageCode) => {
    setSelectedLanguage(languageCode);
    setIsOpen(false);
    onLanguageChange?.(languageCode);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const dropdown = document.querySelector('.language-switcher');
      if (dropdown && !dropdown.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Get current language details
  const currentLang = languages.find(lang => lang.code === selectedLanguage) || languages[0];

  return (
    <div className="language-switcher">
      <button 
        className="language-button"
        onClick={toggleDropdown}
        aria-label={i18n?.language?.title || 'Select Language'}
      >
        <span className="language-flag">{currentLang.flag}</span>
        <span className="language-name">{currentLang.name}</span>
        <span className={`dropdown-arrow ${isOpen ? 'open' : ''}`}>▼</span>
      </button>

      {isOpen && (
        <div className="language-dropdown">
          <div className="dropdown-header">
            {i18n?.language?.title || 'Select Language'}
          </div>
          {languages.map((language) => (
            <button
              key={language.code}
              className={`language-option ${selectedLanguage === language.code ? 'selected' : ''}`}
              onClick={() => handleLanguageSelect(language.code)}
            >
              <span className="language-flag">{language.flag}</span>
              <span className="language-name">{language.name}</span>
              {selectedLanguage === language.code && (
                <span className="checkmark">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
