import React, { useEffect, useState } from 'react';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { useContext } from 'react';
import { LanguageContext } from '../../LanguageContext';


export default function State({ setStat,fromSideMenu }) {
  const { language } = useContext(LanguageContext);
  const [quantities, setQuantities] = useState({});
  const [selectedStates, setSelectedStates] = useState([]);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    setQuantities({
      WeldaQuantity: 12,
      OochraQuantity: 15,
      FerghaQuantity: 13,
    });
  }, []);

  const toggleState = (state) => {
    if (selectedStates.includes(state)) {
      setSelectedStates(selectedStates.filter((selectedState) => selectedState !== state));
    } else {
      setSelectedStates([...selectedStates, state]);
    }
  };

  useEffect(() => {
    setStat(selectedStates);
  }, [selectedStates, setStat]);

  return (
    <div className={fromSideMenu? "": `card ${isActive ? 'active' : ''}`}>
      <div className="card-heading">
        <a onClick={() => setIsActive(!isActive)} className={`accordion-toggle ${isActive ? 'active' : ''}`}>
          {language==="fr" ? "Etat" : "الحالة"}
          {isActive ? <ExpandLess /> : <ExpandMore />}
        </a>
      </div>
      <div className={`collapse ${isActive ? 'show' : ''}`} id="collapseThree">
        <div className="card-body">
          <div className="shop__sidebar__brand">
            <ul>
              <li>
                <a
                  className={`clickable-element ${selectedStates.includes('Welda') ? 'active' : ''}`}
                  onClick={() => toggleState('Welda')}
                  style={{
                    backgroundColor: selectedStates.includes('Welda') ? '#E5F9DB' : '',
                    color: selectedStates.includes('Welda') ? '#333' : '',
                  }}
                >
                  {language==="fr" ? "Welda" : "والدة"}
                </a>
              </li>
              <li>
                <a
                  className={`clickable-element ${selectedStates.includes('Oochra') ? 'active' : ''}`}
                  onClick={() => toggleState('Oochra')}
                  style={{
                    backgroundColor: selectedStates.includes('Oochra') ? '#E5F9DB' : '',
                    color: selectedStates.includes('Oochra') ? '#333' : '',
                  }}
                >
                  {language==="fr" ? "Oochra" : "عشرة"}
                </a>
              </li>
              <li>
                <a
                  className={`clickable-element ${selectedStates.includes('Fergha') ? 'active' : ''}`}
                  onClick={() => toggleState('Fergha')}
                  style={{
                    backgroundColor: selectedStates.includes('Fergha') ? '#E5F9DB' : '',
                    color: selectedStates.includes('Fergha') ? '#333' : '',
                  }}
                >
                  {language==="fr" ? "Chkaf" : "شقف"}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
