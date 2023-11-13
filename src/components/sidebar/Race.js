import React, { useEffect, useState } from 'react';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { useContext } from 'react';
import { LanguageContext } from '../../LanguageContext';

export default function Race({ setRace, fromSideMenu }) {
  const { language } = useContext(LanguageContext);
  const [quantities, setQuantities] = useState({});
  const [selectedRaces, setSelectedRaces] = useState([]); // to store the selected races
  const [isActive, setIsActive] = useState(true); //determines whether the race filter is currently active or not.

  const RaceTranslations = {
    "fr": {
      "Arbi": "Arbi",
      "Gharbi": "Gharbi",
      "Tibar": "Tibar",
      "Houti": "Houti",
      "Dmen": "Dmen",
      "Sordi": "Sordi",
      "Lacaune": "Lacaune",
      "Race": "Race"
    },
    "ar": {
      "Arbi": "عربي",
      "Gharbi": "غربي",
      "Tibar": "تيبار",
      "Houti": "حوتي",
      "Dmen": "دمن",
      "Sordi": "صوردي",
      "Lacaune": "لكاون",
      "Race": "السلالة"
    }
  }

  useEffect(() => {
    setQuantities({
      TibarQuantity: 12,
      ArbiQuantity:19,
      GharbiQuantity: 15,
      HoutiQuantity: 13,
      DmenQuantity: 16,
      SordiQuantity: 18,
      LacauneQuantity: 4
    });
  }, []);

  const toggleRace = (race) => {
    if (selectedRaces.includes(race)) {
      setSelectedRaces(selectedRaces.filter((selectedRace) => selectedRace !== race));
    } else {
      setSelectedRaces([...selectedRaces, race]);
    }
  }; //if the clickd race is already selected remove it from selectedRaces 
  //sinon put it in selectedRaces

  useEffect(() => {
    setRace(selectedRaces);
  }, [selectedRaces, setRace]);

  return (
    <div className={fromSideMenu? "": `card ${isActive ? 'active' : ''}`}>
      <div className="card-heading">
        <a onClick={() => setIsActive(!isActive)} className={`accordion-toggle ${isActive ? 'active' : ''}`}>
          {RaceTranslations[language]["Race"]}
          {isActive ? <ExpandLess /> : <ExpandMore />}
        </a>
      </div>
      <div className={`collapse ${isActive ? 'show' : ''}`} id="collapseThree">
        <div className="card-body">
          <div className="shop__sidebar__brand">
            <ul>
              <li>
                <a
                  className={`clickable-element ${selectedRaces.includes('Tibar') ? 'active' : ''}`}
                  //if 'Tibar' is selected, it will have both 'clickable-element' and 'active' classes; otherwise, it will only have the 'clickable-element' class.
                  onClick={() => toggleRace('Tibar')}
                  style={{
                    backgroundColor: selectedRaces.includes('Tibar') ? '#E5F9DB' : '',
                    color: selectedRaces.includes('Tibar') ? '#333' : '',
                  }}
                >
                  {RaceTranslations[language]["Tibar"]}
                </a>
              </li>
              <li>
                <a
                  className={`clickable-element ${selectedRaces.includes('Arbi') ? 'active' : ''}`}
                  onClick={() => toggleRace('Arbi')}
                  style={{
                    backgroundColor: selectedRaces.includes('Arbi') ? '#E5F9DB' : '',
                    color: selectedRaces.includes('Arbi') ? '#333' : '',
                  }}
                >
                  {RaceTranslations[language]["Arbi"]}
                </a>
              </li>
              <li>
                <a
                  className={`clickable-element ${selectedRaces.includes('Gharbi') ? 'active' : ''}`}
                  onClick={() => toggleRace('Gharbi')}
                  style={{
                    backgroundColor: selectedRaces.includes('Gharbi') ? '#E5F9DB' : '',
                    color: selectedRaces.includes('Gharbi') ? '#333' : '',
                  }}
                >
                  {RaceTranslations[language]["Gharbi"]}
                </a>
              </li>
              <li>
                <a
                  className={`clickable-element ${selectedRaces.includes('Houti') ? 'active' : ''}`}
                  onClick={() => toggleRace('Houti')}
                  style={{
                    backgroundColor: selectedRaces.includes('Houti') ? '#E5F9DB' : '',
                    color: selectedRaces.includes('Houti') ? '#333' : '',
                  }}
                >
                  {RaceTranslations[language]["Houti"]}
                </a>
              </li>
              <li>
                <a
                  className={`clickable-element ${selectedRaces.includes('Dmen') ? 'active' : ''}`}
                  onClick={() => toggleRace('Dmen')}
                  style={{
                    backgroundColor: selectedRaces.includes('Dmen') ? '#E5F9DB' : '',
                    color: selectedRaces.includes('Dmen') ? '#333' : '',
                  }}
                >
                  {RaceTranslations[language]["Dmen"]}
                </a>
              </li>
              <li>
                <a
                  className={`clickable-element ${selectedRaces.includes('Sordi') ? 'active' : ''}`}
                  onClick={() => toggleRace('Sordi')}
                  style={{
                    backgroundColor: selectedRaces.includes('Sordi') ? '#E5F9DB' : '',
                    color: selectedRaces.includes('Sordi') ? '#333' : '',
                  }}
                >
                  {RaceTranslations[language]["Sordi"]}
                </a>
              </li>
              <li>
                <a
                  className={`clickable-element ${selectedRaces.includes('Lacaune') ? 'active' : ''}`}
                  onClick={() => toggleRace('Lacaune')}
                  style={{
                    backgroundColor: selectedRaces.includes('Lacaune') ? '#E5F9DB' : '',
                    color: selectedRaces.includes('Lacaune') ? '#333' : '',
                  }}
                >
                  {RaceTranslations[language]["Lacaune"]}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}