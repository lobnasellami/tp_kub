import React, { useState, useEffect } from 'react';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import { useContext } from 'react';
import { LanguageContext } from '../../LanguageContext';

export default function Age({ articles, setAge, fromSideMenu }) {
  const { language } = useContext(LanguageContext);
  const [isActive, setIsActive] = useState(true);
  const [selectedAges, setSelectedAges] = useState([]);
  const [ageTable, setAgeTable] = useState([]);
  const [ageFilteringTable, setAgeFilteringTable] = useState([]);

  useEffect(() => {
    if (articles === "Ovin Engraissement" && language === "fr") {
      setAgeTable([
        "0 - 1 ans",
        "1 - 2 ans",
        "2 - 3 ans",
        "3 - 4 ans",
        "4 - 5 ans"
      ],
      );
      setAgeFilteringTable([
        "0 - 1 ans",
        "1 - 2 ans",
        "2 - 3 ans",
        "3 - 4 ans",
        "4 - 5 ans"
      ],
      );
    }
    else if (articles === "Ovin Engraissement" && language === "ar") {
      setAgeTable([
        "علوش",
        "ثني",
        "رباع",
        "سداس",
        "جامع"
      ],
      );
      setAgeFilteringTable([
        "0 - 1 ans",
        "1 - 2 ans",
        "2 - 3 ans",
        "3 - 4 ans",
        "4 - 5 ans"
      ],
      );
    }
    else if (articles === "Brebis" && language === "fr") {
      setAgeTable([
        "0 - 1 ans",
        "1 - 2 ans",
        "2 - 3 ans",
        "3 - 4 ans",
        "4 - 5 ans"
      ],
      );
      setAgeFilteringTable([
        "0 - 1 ans",
        "1 - 2 ans",
        "2 - 3 ans",
        "3 - 4 ans",
        "4 - 5 ans"
      ],
      );
    }
    else if (articles === "Brebis" && language === "ar") {
      setAgeTable([
        "فطيمة",
        "حولية",
        "ربعة",
        "سدسة",
        "جامعة"
      ],
      );
      setAgeFilteringTable([
        "0 - 1 ans",
        "1 - 2 ans",
        "2 - 3 ans",
        "3 - 4 ans",
        "4 - 5 ans"
      ],
      );
    }
    else if (articles === "Poulailler Engraissement" && language === "fr") {
      setAgeTable([
        "0 - 1 mois",
        "1 mois - 3 mois",
        "3 mois - 6 mois",
        "6 mois - 1 ans"
      ]
      );
      setAgeFilteringTable([
        "0 - 1 mois",
        "1 mois - 3 mois",
        "3 mois - 6 mois",
        "6 mois - 1 ans"
      ]
      );
    }
    else if (articles === "Poulailler Engraissement" && language === "ar") {
      setAgeTable([
        "شهر",
        "من شهر الى 3 شهور",
        "من 3 شهور الى 6 شهور",
        "من 6 شهور الى سنة"
      ]
      );
      setAgeFilteringTable([
        "0 - 1 mois",
        "1 mois - 3 mois",
        "3 mois - 6 mois",
        "6 mois - 1 ans"
      ]
      );
    }
    else if (articles === "Agnelles" && language === "fr") {
      setAgeTable([
        "0 - 1 mois",
        "1 mois - 3 mois",
        "3 mois - 6 mois",
        "6 mois - 1 ans"
      ]
      );
      setAgeFilteringTable([
        "0 - 1 mois",
        "1 mois - 3 mois",
        "3 mois - 6 mois",
        "6 mois - 1 ans"
      ]
      );
    }
    else if (articles === "Agnelles" && language === "ar") {
      setAgeTable([
        "شهر",
        "من شهر الى 3 شهور",
        "من 3 شهور الى 6 شهور",
        "من 6 شهور الى سنة"
      ]
      );
      setAgeFilteringTable([
        "0 - 1 mois",
        "1 mois - 3 mois",
        "3 mois - 6 mois",
        "6 mois - 1 ans"
      ]
      );
    }
    else {
      if (language === "fr") {
        setAgeTable([
          "0 - 1 mois",
          "1 mois - 3 mois",
          "3 mois - 6 mois",
          "6 mois - 1 ans"
        ]
        );
      }
      else {
        setAgeTable([
          "شهر",
          "من شهر الى 3 شهور",
          "من 3 شهور الى 6 شهور",
          "من 6 شهور الى سنة"
        ]
        );
      }
      setAgeFilteringTable([
        "0 - 1 mois",
        "1 mois - 3 mois",
        "3 mois - 6 mois",
        "6 mois - 1 ans"
      ]
      );
    }
  }, [articles, language])

  const toggle = () => {
    setIsActive(!isActive);
  };

  const toggleAge = (age) => {
    if (selectedAges.some((selectedAge) => selectedAge[0] === age[0] && selectedAge[1] === age[1])) {
      setSelectedAges(selectedAges.filter((selectedAge) => selectedAge[0] !== age[0] || selectedAge[1] !== age[1]));
    } else {
      setSelectedAges([...selectedAges, age]);
    }
  };

  useEffect(() => {
    setAge(selectedAges);
  }, [selectedAges, setAge]);

  const isActiveAge = (age) => {
    return selectedAges.some((selectedAge) => selectedAge[0] === age[0] && selectedAge[1] === age[1]);
  };

  return (
    <div className={fromSideMenu? "": `card ${isActive ? 'active' : ''}`}>
      <div className="card-heading">
        <a onClick={toggle} className={`accordion-toggle ${isActive ? 'active' : ''}`}>
          {language === 'fr' ? 'Age' : 'العمر'}
          {isActive ? <ExpandLess /> : <ExpandMore />}
        </a>
      </div>
      <div className={`collapse ${isActive ? 'show' : ''}`} id="collapseThree">
        <div className="card-body">
          <div className="shop__sidebar__price">
            <ul>
              <li>
                <a
                  className={`clickable-element ${isActiveAge(articles === 'Ovin Engraissement' || articles === 'Brebis' ? [0, 1] : [0, 0.083]) ? 'active' : ''}`}
                  onClick={() => toggleAge(articles === 'Ovin Engraissement' || articles === 'Brebis' ? [0, 1] : [0, 0.083])}
                  style={{
                    fontWeight:"bold",
                    backgroundColor: isActiveAge(articles === 'Ovin Engraissement' || articles === 'Brebis' ? [0, 1] : [0, 0.083]) ? '#E5F9DB' : '',
                    color: isActiveAge(articles === 'Ovin Engraissement' || articles === 'Brebis' ? [0, 1] : [0, 0.083]) ? '#FFF' : '',
                  }}
                >
                  {ageTable[0]}
                </a>
              </li>
              <li>
                <a
                  className={`clickable-element ${isActiveAge(articles === 'Ovin Engraissement' || articles === 'Brebis' ? [1, 2] : [0.0830001, 0.25]) ? 'active' : ''}`}
                  onClick={() => toggleAge(articles === 'Ovin Engraissement' || articles === 'Brebis' ? [1, 2] : [0.0830001, 0.25])}
                  style={{
                    backgroundColor: isActiveAge(articles === 'Ovin Engraissement' || articles === 'Brebis' ? [1, 2] : [0.0830001, 0.25]) ? '#E5F9DB' : '',
                    color: isActiveAge(articles === 'Ovin Engraissement' || articles === 'Brebis' ? [1, 2] : [0.0830001, 0.25]) ? '#333' : '',
                  }}
                >
                  {ageTable[1]}
                </a>
              </li>
              <li>
                <a
                  className={`clickable-element ${isActiveAge(articles === 'Ovin Engraissement' || articles === 'Brebis' ? [2, 3] : [0.2500001, 0.5]) ? 'active' : ''}`}
                  onClick={() => toggleAge(articles === 'Ovin Engraissement' || articles === 'Brebis' ? [2, 3] : [0.2500001, 0.5])}
                  style={{
                    backgroundColor: isActiveAge(articles === 'Ovin Engraissement' || articles === 'Brebis' ? [2, 3] : [0.2500001, 0.5]) ? '#E5F9DB' : '',
                    color: isActiveAge(articles === 'Ovin Engraissement' || articles === 'Brebis' ? [2, 3] : [0.2500001, 0.5]) ? '#333' : '',
                  }}
                >
                  {ageTable[2]}
                </a>
              </li>
              <li>
                <a
                  className={`clickable-element ${isActiveAge(articles === 'Ovin Engraissement' || articles === 'Brebis' ? [3, 4] : [0.5000001, 1]) ? 'active' : ''}`}
                  onClick={() => toggleAge(articles === 'Ovin Engraissement' || articles === 'Brebis' ? [3, 4] : [0.5000001, 1])}
                  style={{
                    backgroundColor: isActiveAge(articles === 'Ovin Engraissement' || articles === 'Brebis' ? [3, 4] : [0.5000001, 1]) ? '#E5F9DB' : '',
                    color: isActiveAge(articles === 'Ovin Engraissement' || articles === 'Brebis' ? [3, 4] : [0.5000001, 1]) ? '#333' : '',
                  }}
                >
                  {ageTable[3]}
                </a>
              </li>
              {(articles === "Ovin Engraissement" || articles === "Brebis") &&
                <li>
                  <a
                    className={`clickable-element ${isActiveAge([4, 5]) ? 'active' : ''}`}
                    onClick={() => toggleAge([4, 5])}
                    style={{
                      backgroundColor: isActiveAge([4, 5]) ? '#E5F9DB' : '',
                      color: isActiveAge([4, 5]) ? '#333' : '',
                    }}
                  >
                    {ageTable[4]}
                  </a>
                </li>
              }
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}  