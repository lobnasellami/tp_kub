import React, { useEffect, useState, useRef } from 'react';
import './styles.css';
import State from './State';
import Price from './Price';
import Weight from './Weight';
import Type from './Type';
import Race from './Race';
import Age from './Age';
import Search from './Search';
import { useContext } from 'react';
import { LanguageContext } from '../../LanguageContext';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import Tooltip from '@mui/material/Tooltip';

export default function Sidebar({ setAllFilters, articles }) {
  const { language } = useContext(LanguageContext);
  const [type, setType] = useState([]);
  const [race, setRace] = useState([]);
  const [price, setPrice] = useState([0, 1750]);
  const [weight, setWeight] = useState([0, 80]);
  const [age, setAge] = useState([]);
  const [stat, setStat] = useState([]);
  const [filters, setFilters] = useState({});
  const [enteredWord, setEnteredWord] = useState("");
  const offcanvasMenuWrapperRef = useRef(null);
  const offcanvasMenuOverlayRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [resize, setResize] = useState(false);
  const[topVal, setTopVal] = useState("-7px")

  const sidebarRef = useRef(null); // Ref for the outermost div container
  const HeaderTranslations = {
    "fr": {
      "Acceuil": "Acceuil",
      "Boutique": "Boutique",
      "A Propos": "Contactez Nous"
    },
    "ar": {
      "Acceuil": "الصفحة الرئيسية",
      "Boutique": "المتجر",
      "A Propos": "اتصل بنا"
    }
  }
  useEffect(() => {
    if (articles === 'Ovin Engraissement') {
      setFilters({
        Race: true,
        Type: false,
        Prix: true,
        Poids: true,
        Age: true,
        State: false,
      });
    } else if (articles === 'Agnelles') {
      setFilters({
        Race: true,
        Type: false,
        Prix: true,
        Poids: true,
        Age: false,
        State: false,
      });
    } else if (articles === 'Brebis') {
      setFilters({
        Race: true,
        Type: false,
        Prix: true,
        Poids: false,
        Age: true,
        State: true,
      });
    } else {
      setFilters({
        Race: false,
        Type: true,
        Prix: true,
        Poids: true,
        Age: true,
        State: false,
      });
    }
  }, [articles]);

  useEffect(() => {
    setAllFilters({
      price: price,
      race: race,
      type: type,
      age: age,
      weight: weight,
      stat: stat,
      enteredWord: enteredWord
    });
  }, [price, race, type, age, weight, stat, enteredWord]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 992) {
        setResize(false);
      } else {
        setResize(true);
      }
      if(window.innerWidth>768){
        setTopVal("35px");
      }
      else{
        setTopVal("-5.1px")
      }
    };

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Check initial window width on component mount
    handleResize();

    // Clean up event listeners on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [window.innerWidth]);

  //sidebar responsive:
  const handleOpenClick = () => {
    setMenuOpen(true);
  };

  const handleOverlayClick = () => {
    setMenuOpen(false);
  };

  const handleClick=() => {
    setMenuOpen(false);
  }

  return (
    <div>
      <div ref={sidebarRef} className="shop__sidebar__accordion">
        <div id="accordionExample">
          {window.innerWidth < 992 && (
            <div className="teya">
              <Search setEnteredWord={setEnteredWord} enteredWord={enteredWord}></Search>
            </div>
          )}
          {(window.innerWidth >= 992) && (
            <div>
              <Search setEnteredWord={setEnteredWord} enteredWord={enteredWord}></Search>
              {filters.Prix && <Price articles={articles} setPrice={setPrice} fromSideMenu={false}/>}
              {filters.Race && <Race setRace={setRace} fromSideMenu={false}/>}
              {filters.Type && <Type setType={setType} fromSideMenu={false}/>}
              {filters.Age && <Age articles={articles} setAge={setAge} fromSideMenu={false}/>}
              {filters.Poids && (
                <Weight articles={articles} setWeight={setWeight} fromSideMenu={false}/>
              )}
              {filters.State && <State setStat={setStat} fromSideMenu={false}/>}
            </div>
          )}
        </div>
      </div>
      <div>
        <div
          className={`canvas__open ${menuOpen ? 'active' : ''}`}
          onClick={handleOpenClick}
          style={{ color: menuOpen ? 'red' : 'black', top: topVal }}
        >
          <i className="fa fa-filter"></i>
          <h6>{language==="fr"? "Filtrer" : "الفرز"}</h6>
        </div>
      </div>
      <div
        className={`offcanvas-menu-wrapper ${menuOpen ? 'active' : ''}`}
        ref={offcanvasMenuWrapperRef}
        style={{ backgroundColor: menuOpen ? '#F3F2EE' : 'transparent', top: '21.3%', width: 319, height:"79%" }}
      >
 <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
      <div>
        <div style={{ display: 'flex' }}>
          <Tooltip title={language === 'fr' ? "Chercher" : "ابحث"} arrow>
            <SearchIcon style={{ color: 'black', cursor: 'pointer', marginLeft: language==="fr"? "11px":"0px" }} onClick={handleClick} />
          </Tooltip>
        </div>
        <div style={{ display: 'flex' }}>
          <p>{language === 'fr' ? 'Chercher' : 'ابحث'}</p>
        </div>
      </div>
    </div>
    <div>
          {filters.Prix && <Price articles={articles} setPrice={setPrice} fromSideMenu={true}/>}
          {filters.Race && <Race setRace={setRace} fromSideMenu={true} />}
          {filters.Type && <Type setType={setType} fromSideMenu={true} />}
          {filters.Age && <Age articles={articles} setAge={setAge} fromSideMenu={true} />}
          {filters.Poids && (
            <Weight articles={articles} setWeight={setWeight} fromSideMenu={true} />
          )}
          {filters.State && <State setStat={setStat} fromSideMenu={true} />}
        </div>
      </div>
      <div
        className={`offcanvas-menu-overlay ${menuOpen ? 'active' : ''}`}
        ref={offcanvasMenuOverlayRef}
        onClick={handleOverlayClick}
      />
    </div>
  );
}
