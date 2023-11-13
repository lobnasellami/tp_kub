import React from 'react'
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Modal from '../../components/Modal';
import JsScripts from '../../components/JsScripts';
import Preloader from '../../components/Preloader';
import { CartContext } from '../../CartContext';
import { useContext, useState } from 'react';
import { LanguageContext } from '../../LanguageContext';
import { Link } from 'react-router-dom';
import routes from '../../routes';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import ShareIcon from '@mui/icons-material/Share';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import GTranslateIcon from '@mui/icons-material/GTranslate';
import SettingsIcon from '@mui/icons-material/Settings';
import SimpleDialog from "../../components/SimpleDialog"


export default function Checkout() {
    const { cartItems } = useContext(CartContext);
    const { language, updateLanguage } = useContext(LanguageContext);

    const translation = {
        "fr": {
            "contact1": "Riadh Madani",
            "contact2": "Mohamed Ali Trabelsi",
            "country": "Tunisie",
            "address": "Ferme Dmen, Ariana 2021",
            "city": "Ariana",
            "state": "Ariana",
            "postcode": "2080",
            "phone": "50 128 000",
            "email": "falleh.tn@gmail.com",
            "langue": "Choisir une langue",
            "copier": "Copier le Lien",
            "partager": "Partager le Site"
        },
        "ar": {
            "contact1": "رياض المدني",
            "contact2": "محمد علي الطرابلسي",
            "country": "تونس",
            "address": "2021 ضيعة دمان بأريانة",
            "city": "أريانة",
            "state": "أريانة",
            "postcode": "2080",
            "phone": "50 128 000",
            "email": "falleh.tn@gmail.com",
            "langue": "اختر لغة",
            "copier": "أنقل رابط الموقع",
            "partager": "شارك الموقع مع صديق"
        }
    }
    const translations = translation[language];

    const handlePhoneCall = () => {
        window.location.href = `tel:${50128000}`;
    };

    //Logic for mobile view begins ends here

    const [open, setOpen] = useState(false);
    const actions = [
        { icon: <GTranslateIcon />, key: 1, name: translations["langue"] },
        { icon: <FileCopyIcon />, key: 2, name: translations["copier"] },
        { icon: <ShareIcon />, key: 3, name: translations["partager"] },
    ];

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleAction = (key) => {
        if (key === 2) {
            const handleCopyLink = async () => {
                try {
                    await navigator.clipboard.writeText("www.allouchi.net");
                    console.log('Link copied to clipboard!');
                } catch (error) {
                    console.error('Failed to copy link to clipboard:', error);
                }
            };
        }
        else if (key === 3) {
            const handleShare = async () => {
                if (navigator.share) {
                    try {
                        const url = "www.allouchi.net"
                        const title = "Allouchi"
                        await navigator.share({ url, title });
                        console.log('Website shared successfully!');
                    } catch (error) {
                        console.error('Failed to share website:', error);
                    }
                } else {
                    console.log('Web Share API not supported');
                    // Provide fallback behavior for browsers that do not support Web Share API
                }
            };
        }
        else {
            handleClickOpen();
        }
    }

    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = React.useState(language);

    const handleClickOpen = () => {
        setIsOpen(true);
    };

    const handleClickClose = (value) => {
        updateLanguage(value === "فرنسية" ? "fr" : value === "عربية" ? "ar" : value === "Français" ? "fr" : "ar");
        setIsOpen(false);
        setSelectedValue(value);
    };

    //Logic for mobile view changes ends here

    return (
        <div>
            <Preloader />
            <Header />
            <section className="breadcrumb-option">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="breadcrumb__text">
                                <h4>{language === "fr" ? 'Passer Une Commande' : 'أتمم الطلب'}</h4>
                                <div className="breadcrumb__links">
                                    <Link to={routes.HOME}>
                                        {language === "fr" ? "Acceuil" : "الصفحة الرئيسية"}
                                    </Link>
                                    <Link to={routes.SHOP}>
                                        {language === "fr" ? "Boutique" : "المتجر"}
                                    </Link>
                                    <span>{language === "fr" ? 'Passer Une Commande' : 'أتمم الطلب'}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="checkout spad">
                <div className="container">
                <SimpleDialog
                    selectedValue={selectedValue}
                    open={isOpen}
                    onClose={handleClickClose}
                    />
                <AppBar position="fixed" sx={{ top: 'auto', bottom: 0 }}>
                    <Toolbar>
                        <SpeedDial
                            ariaLabel="Settings"
                            sx={{ position: 'absolute', bottom: 16, right: 16 }}
                            icon={<SettingsIcon />}
                            onClose={handleClose}
                            onOpen={handleOpen}
                            open={open}
                        >
                            {actions.map((action) => (
                                <SpeedDialAction
                                    key={action.key}
                                    icon={action.icon}
                                    tooltipTitle={action.name}
                                    onClick={() => handleAction(action.key)}
                                />
                            ))}
                        </SpeedDial>
                    </Toolbar>
                </AppBar>
                    <div className="checkout__form">
                        <form action="">
                            <div className="row">
                                <div className="col-lg-8 col-md-6">
                                    <h6 className="coupon__code"><span className="icon_tag_alt"></span> {language === "fr" ? "Voulez vous continuer vos achats?" : "هل تريدون مواصلة التسوق؟"} <Link to={routes.SHOP}><a>{language === "fr" ? "Cliquez Ici" : "اضغط هنا"}</a></Link> {language === "fr" ? "pour retourner à la boutique" : "من أجل الرجوع الى المتجر"}</h6>
                                    <h6 className="checkout__title">{language === 'fr' ? 'Détails de contact' : 'تفاصيل التواصل'}</h6>
                                    <div className="row">
                                    <div className="col-lg-8">
                                    <p>{language === 'fr' ? 'Géolocalisation:' : ':احداثياتنا الجغرافية'}</p>   
                                    </div>
                                        <div className="col-lg-6">
                                            <div className="checkout__input">
                                                <p>{language === 'fr' ? 'Contact 1:' : ' :المتواصل 1'}</p>
                                                <input type="text" readOnly value={translations.contact1} />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="checkout__input">
                                                <p>{language === 'fr' ? 'Contact 2:' : ' :المتواصل 2'}</p>
                                                <input type="text" readOnly value={translations.contact2} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="checkout__input">
                                        <p>{language === 'fr' ? 'Ville:' : ':المدينة'}</p>
                                        <input type="text" readOnly value={translations.city} />
                                    </div>
                                    <div className="checkout__input">
                                        <p>{language === 'fr' ? 'Adresse:' : ':العنوان'}</p>
                                        <input type="text" readOnly value={translations.address} placeholder={language === 'fr' ? 'Adresse de rue' : 'عنوان الشارع'} className="checkout__input__add" />
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="checkout__input">
                                                <p>{language === 'fr' ? 'Téléphone:' : ':الهاتف'}</p>
                                                <input type="text" readOnly value={translations.phone} />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="checkout__input">
                                                <p>{language === 'fr' ? 'Email:' : ':البريد الإلكتروني'}</p>
                                                <input type="text" readOnly value={translations.email} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6">
                                    <div className="checkout__order">
                                        <h4 className="order__title">{language === "fr" ? "Votre Ordre" : "محتوى طلبكم"}</h4>
                                        <div className="checkout__order__products">
                                            {language === "fr" ? "Produit" : "المنتج"} <span>{language === "fr" ? "Total" : "الثمن"}</span>
                                        </div>
                                        <ul className="checkout__total__products">
                                            {cartItems.map((item, index) => (
                                                <li key={index}>
                                                    {`${index + 1}. ${item.title}`} <span>{item.price} {language === "fr" ? "Dinars" : "دينار"}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <ul className="checkout__total__all">
                                            <li>
                                                {language === "fr" ? "Prix Total" : "الثمن الجملي"} <span>{}{cartItems.reduce((total, item) => total + item.price, 0)} {language === "fr" ? "Dinars" : "دينار"}</span>
                                            </li>
                                        </ul>
                                        <button className="site-btn" onClick={handlePhoneCall} disabled={cartItems.length === 0}>{language === "fr" ? "Appelez Maintenant : 50 128 000" : "اتصل بنا الان : 000 128 50"}</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
            <Footer />
            <Modal />
            <JsScripts />
        </div>
    )
}
