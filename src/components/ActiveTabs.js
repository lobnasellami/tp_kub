import React , {Children, useState, useContext} from 'react'
import MyContext from '../context';
import AdviceAlfa from './AdviceAlfa';
import AdviceElevage from './AdviceElevage';
import AdviceVaccin from './AdviceVaccin';
import { LanguageContext } from '../LanguageContext';


export default function ActiveTabs(props) {
    const { language } = useContext(LanguageContext);
    const { activeFilter, handleFilterClick } = useContext(MyContext);
    const ActiveTabsTranslation = {
        "fr": {
          "advice_alfa": "Conseils Aalfa",
          "advice_elevage": "Conseils d'élevage",
          "advice_vaccin": "Conseils de vaccination",
          "Ovin Engraissement":"Ovin Engraissement",
          "Brebis":"Brebis",
          "Poulailler Engraissement":"Poulailler Engraissement",
          "Agnelles":"Agnelles"
        },
        "ar": {
          "advice_alfa": "نصائح العلفة",
          "advice_elevage": "نصائح التربية",
          "advice_vaccin": "نصائح التطعيم",
          "Ovin Engraissement":"أغنام التسمين",
          "Brebis":"النعاج",
          "Poulailler Engraissement":"دواجن التسمين",
          "Agnelles":"فطيمة"
        }
      };
    return (
                <div className="col-lg-12">
                    <ul className="filter__controls">
                        {props.myTabs.map(element => (
                            <li 
                            key={element}
                            className={activeFilter === element ? 'active' : ''}
                            onClick={() => handleFilterClick(element)}
                            >
                            {ActiveTabsTranslation[language][element]}
                            </li>
                        ))}
                    </ul>

                    {/* Render different views based on active filter */}
                {activeFilter === 'advice_alfa' && <AdviceAlfa />}
                {activeFilter === 'advice_elevage' && <AdviceElevage />}
                {activeFilter === 'advice_vaccin' && <AdviceVaccin />}
                </div>
           
  )
}

