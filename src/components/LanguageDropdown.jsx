import React, { useState } from 'react';

const languages = [
  { id: 1, name: 'Chinese', code: 'zh' },
  { id: 2, name: 'Spanish', code: 'es' },
  { id: 3, name: 'English', code: 'en' },
  { id: 4, name: 'Hindi', code: 'hi' },
  { id: 5, name: 'Arabic', code: 'ar' },
  { id: 6, name: 'Portuguese', code: 'pt' },
  { id: 7, name: 'Bengali', code: 'bn' },
  { id: 8, name: 'Russian', code: 'ru' },
  { id: 9, name: 'Japanese', code: 'ja' },
  { id: 10, name: 'Punjabi', code: 'pa' },
  { id: 11, name: 'German', code: 'de' },
  { id: 12, name: 'Javanese', code: 'jv' },
  { id: 13, name: 'Indonesian', code: 'id' },
  { id: 14, name: 'Telugu', code: 'te' },
  { id: 15, name: 'Vietnamese', code: 'vi' },
  { id: 16, name: 'Korean', code: 'ko' },
  { id: 17, name: 'French', code: 'fr' },
  { id: 18, name: 'Marathi', code: 'mr' },
  { id: 19, name: 'Tamil', code: 'ta' },
  { id: 20, name: 'Turkish', code: 'tr' },
  { id: 21, name: 'Italian', code: 'it' },
  { id: 22, name: 'Persian', code: 'fa' },
  { id: 23, name: 'Urdu', code: 'ur' },
  { id: 24, name: 'Ukrainian', code: 'uk' },
  { id: 25, name: 'Gujarati', code: 'gu' },
  { id: 26, name: 'Polish', code: 'pl' },
  { id: 27, name: 'Romanian', code: 'ro' },
  { id: 28, name: 'Dutch', code: 'nl' },
  { id: 29, name: 'Greek', code: 'el' },
  { id: 30, name: 'Swedish', code: 'sv' },
  { id: 31, name: 'Hungarian', code: 'hu' },
  { id: 32, name: 'Finnish', code: 'fi' },
  { id: 33, name: 'Burmese', code: 'my' },
  { id: 34, name: 'Thai', code: 'th' },
  { id: 35, name: 'Catalan', code: 'ca' },
  { id: 36, name: 'Hebrew', code: 'he' },
  { id: 37, name: 'Amharic', code: 'am' },
  { id: 38, name: 'Lithuanian', code: 'lt' },
  { id: 39, name: 'Slovak', code: 'sk' },
];

const LanguageDropdown = ({ onSelectLanguage }) => {
  const [selectedLanguage, setSelectedLanguage] = useState(languages[2].code);

  const handleLanguageChange = (event) => {
    const selectedLanguageCode = event.target.value;
    setSelectedLanguage(selectedLanguageCode);
    onSelectLanguage(selectedLanguageCode); // Call the callback function with the selected language code
  };

  return (
    <div className='dropdown-container'>
  <label className='dropdown-label' htmlFor="languages">Select a language: </label>
  <select className='dropdown-select' id="languages" value={selectedLanguage} onChange={handleLanguageChange}>
    {languages.map((language) => (
      <option key={language.id} value={language.code}>
        {language.name}
      </option>
    ))}
  </select>
  {/* <p>Selected language code: {selectedLanguage}</p> */}
</div>

  );
};

export default LanguageDropdown;
