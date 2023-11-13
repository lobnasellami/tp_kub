import React, { useEffect, useState } from 'react'
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Modal from '../../components/Modal';
import JsScripts from '../../components/JsScripts';
import Preloader from '../../components/Preloader';
import { CartContext } from '../../CartContext';
import { useContext } from 'react';
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

export default function BlogDetails() {
    const { cartItems, addToCart, removeFromCart } = useContext(CartContext);
    const { language, updateLanguage } = useContext(LanguageContext);

    const translationTable = {
        fr: {
            continueShopping: 'Continuer vos achats',
            checkout: "Finaliser vos achats",
            "Ovin Engraissement": 'Ovin Engraissement',
            "Brebis": "Brebis",
            "Poulailler Engraissement": "Poulailler Engraissement",
            "Agnelles": "Agnelles"
        },
        ar: {
            continueShopping: 'متابعة التسوق',
            checkout: "تواصل معنا",
            "Ovin Engraissement": 'أغنام التسمين',
            "Brebis": "النعاج",
            "Poulailler Engraissement": "دواجن التسمين",
            "Agnelles": "فطيمة"
        },
    };

    useEffect(() => {
        const selectedItemsIds = cartItems.map(item => item.id);
        localStorage.setItem('selectedItemsIds', JSON.stringify(selectedItemsIds));
    }, [cartItems]);

    //Logic for mobile view begins ends here

    const [open, setOpen] = useState(false);
    const translations = {
        "fr": {
            "langue": "Choisir une langue",
            "copier": "Copier le Lien",
            "partager": "Partager le Site"
        },
        "ar": {
            "langue": "اختر لغة",
            "copier": "أنقل رابط الموقع",
            "partager": "شارك الموقع مع صديق"
        }
    }
    const actions = [
        { icon: <GTranslateIcon />, key: 1, name: translations[language]["langue"] },
        { icon: <FileCopyIcon />, key: 2, name: translations[language]["copier"] },
        { icon: <ShareIcon />, key: 3, name: translations[language]["partager"] },
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
        updateLanguage(value === "فرنسية" ? "fr" : value === "Arabe" ? "ar" : value === "Français" ? "fr" : "ar");
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
                                <h4>{language === "fr" ? 'Panier' : 'عربة التسوق'}</h4>
                                <div className="breadcrumb__links">
                                    <Link to={routes.HOME}>
                                        {language === "fr" ? "Acceuil" : "الصفحة الرئيسية"}
                                    </Link>
                                    <Link to={routes.SHOP}>
                                        {language === "fr" ? "Boutique" : "المتجر"}
                                    </Link>
                                    <span>{language === "fr" ? 'Panier' : 'عربة التسوق'}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="shopping-cart spad">
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
                    <div className="row">
                        {cartItems.length !== 0 &&
                            <div className="col-lg-12">
                                <div className="shopping__cart__table">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th className='c1'>{language === "fr" ? "Réf" : "المعرف"}</th>
                                                <th className='c2'>{language === "fr" ? "Produit" : "المنتج"}</th>
                                                <th className='c3'>{language === "fr" ? "Titre" : "الاسم"}</th>
                                                <th className='c4'>{language === "fr" ? "Prix" : "الثمن"}</th>
                                                <th className='c5'>{language === "fr" ? "Catégorie" : "الفئة"}</th>
                                                <th className='c6'>{language === "fr" ? "Consulter" : "تفاصيل المنتج"}</th>
                                                <th className='c7'>{language === "fr" ? "Supprimer" : "فسخ المنتج"}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cartItems.map((item, index) => (
                                                <tr key={index}>
                                                    <td className='product__cart__id'> {item.id}</td>
                                                    <td>
                                                        <img src={item.thumbnail} alt={item.title} width="40" height="40" />
                                                    </td>
                                                    <td className="product__cart__item__text">
                                                        {item.title}
                                                    </td>
                                                    <td className="cart__price">
                                                        {item.price} {language === "fr" ? "Dt" : "دينار"}
                                                    </td>
                                                    <td className='product__cart__categ'>{translationTable[language][item.category]}</td>
                                                    <td className="cart__close">
                                                        <Link to={`${routes.SHOP}/${item.id}`} style={{ width: 1 }}><i className="fa fa-eye"></i></Link>
                                                    </td>
                                                    <td className="cart__close">
                                                        <i onClick={() => removeFromCart(item)} className="fa fa-close"></i>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="row">
                                    <div className="col-lg-6 col-md-6 col-sm-6">
                                        <div className="continue__btn">
                                            <Link to={routes.SHOP}>
                                                {translationTable[language].continueShopping}
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-6">
                                        <div className="continue__btn update__btn">
                                            <Link to={routes.CHECKOUT}>
                                                {translationTable[language].checkout}
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>}
                        <br></br>
                        <br></br>
                        <div className="col-lg-3" height="10px"></div>
                        <div className="col-lg-6">
                            <div className="cart__total">
                                <h6>{language === "fr" ? "Prix Total" : "الثمن الجملي"}</h6>
                                <ul>
                                    <li>{language === "fr" ? "Total" : "المجموع"} <span>
                                        {cartItems.reduce((total, item) => total + item.price, 0)} {language === "fr" ? "Dinars" : "دينار"}
                                    </span></li>
                                </ul>
                                <Link to={routes.CHECKOUT}>
                                    <a href="#" className="primary-btn"> {language === "fr" ? "Passer une commande - Contactez Nous" : "اتصل بنا - أتمم الطلب"}</a>
                                </Link>

                            </div>
                        </div>
                        <div className="col-lg-3"></div>
                    </div>
                </div>
            </section >
            <Footer />
            <Modal />
            <JsScripts />
        </div >
    )
}
