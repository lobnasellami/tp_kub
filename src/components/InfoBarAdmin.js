import React from 'react'
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import routes from '../routes';
import { LanguageContext } from '../LanguageContext';

export default function InfoBar() {
    const { language } = useContext(LanguageContext);
  return (
    <section className="breadcrumb-option">
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="breadcrumb__text">
                        <h4>{language==="fr" ? "Administration" : "الادارة"}</h4>
                        <div className="breadcrumb__links">
                            <Link to={routes.HOME}>
                            {language==="fr" ? "Acceuil" : "الصفحة الرئيسية"}
                            </Link>
                            <span>{language==="fr" ? "Page d'Administrateur" : "صفحة المدير"}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}
