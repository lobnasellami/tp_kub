import React from 'react';
import "./Search.css" ;
import { useContext } from 'react';
import { LanguageContext } from '../../LanguageContext';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

export default function Search({setEnteredWord, enteredWord}) {
 const { language } = useContext(LanguageContext);

  const placeholder = {
    "fr": {
      "Search": "Search..."
    },
    "ar": {
      "Search": "ابحث..."
    }
  }
  const setSearch = (event) => {
    const searchWord = event.target.value;
    setEnteredWord(searchWord.toLowerCase());
  };

  const clearInput = () => {
    setEnteredWord("");
  };
  return (
    <div className="shop__sidebar__search">
        <div className="searchInputs">
        <input
          type="text"
          placeholder={placeholder[language]["Search"]}
          value={enteredWord}
          onChange={setSearch}
        />
        <div className="searchIcon">
          {enteredWord?.length === 0 ? (
            <SearchIcon />
          ) : (
            <CloseIcon id="clearBtn" onClick={clearInput} />
          )}
        </div>
      </div>
    </div>
  );
}
