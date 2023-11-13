import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Modal from '../../components/Modal';
import JsScripts from '../../components/JsScripts';
import { Carousel } from 'react-responsive-carousel';
import YouTube from 'react-youtube'
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Preloader from '../../components/Preloader';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import routes from '../../routes';
import './css/style.css'
import './css/bootstrap.min.css'
import './css/nice-select.css'
import './css/magnific-popup.css'
import './css/slicknav.min.css'
import './css/style.css.map'
import './css/elegant-icons.css'
import './css/font-awesome.min.css'
import Fab from '@mui/material/Fab';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { LanguageContext } from '../../LanguageContext';
import { CartContext } from '../../CartContext';
import { sortArticlesByPrice, articlesFetched } from '../../articles';
import { getAllArticles } from '../../admin/adminUtils';
import { ArticlesContext } from '../../articlesContext';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ShopDetails() {
    const navigate = useNavigate();
    const { cartItems, addToCart } = useContext(CartContext);
    const { language } = useContext(LanguageContext);
    let { id } = useParams();
    const [idP, setIdP] = useState(id);
    const [article, setArticle] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [open, setOpen] = React.useState(false);
    const [isArticleInCart, setIsArticleInCart] = useState(false);
    const { articles } = useContext(ArticlesContext);
    const data = sortArticlesByPrice(articles);

    const [articles1, setArticles] = useState(data);

    useEffect(() => {
        setIsArticleInCart(cartItems.some(item => item.id === article.id));
    }, [cartItems, article]);

    const handleClickCart = () => {
        setOpen(true);
        addToCart(article);
        setIsArticleInCart(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };


    const shopDetailsTranslations = {
        "en": {
            "addToWishlist": 'ADD TO WISHLIST',
            "addToCompare": 'ADD TO COMPARE',
            "safeCheckout": 'Guaranteed Safe Checkout',
            "category": 'Catégorie:',
            "ovinEngraissement": 'Ovin Engraissement',
            "age": 'Age:',
            "poids": 'Poids:',
            "relatedProducts": 'Related Products',
            "Entre 6mois et 9mois": "Entre 6mois et 9mois"
        },
        "fr": {
            "addToWishlist": 'AJOUTER AU PANIER',
            "addToCompare": 'RETOURNEZ A LA BOUTIQUE',
            "safeCheckout": 'La Qualité de nos Produits est une Garantie',
            "category": 'Catégorie :',
            "age": 'Âge :',
            "poids": 'Poids :',
            "mois": "mois",
            "ans": "ans",
            "relatedProducts": 'Produits Associés',
            "unitePoids": "Kg",
            "Ovin Engraissement": 'Ovin Engraissement',
            "Brebis": "Brebis",
            "Poulailler Engraissement": "Poulailler Engraissement",
            "Agnelles": "Agnelles",
            "Entre": "Entre 6 mois et 9 mois"
        },
        "ar": {
            "addToWishlist": 'إضافة إلى سلة المقتنيات',
            "addToCompare": 'الرجوع الى المتجر',
            "safeCheckout": 'جودة منتوجاتنا عهد و ضمان',
            "category": 'الفئة:',
            "age": 'العمر:',
            "poids": 'الوزن:',
            "mois": "شهور",
            "ans": "سنة",
            "unitePoids": "كغ",
            "relatedProducts": 'منتجات ذات صلة',
            "Ovin Engraissement": 'أغنام التسمين',
            "Brebis": "النعاج",
            "Poulailler Engraissement": "دواجن التسمين",
            "Agnelles": "فطيمة",
            "Entre": "بين 6 شهور و 9 شهور"
        },
    };
    const videoId1 = '0cV4f5VdC8o';
    const isMobileView = window.innerWidth < 768;

    const opts = {
        height: isMobileView ? '375' : '840',
        width: isMobileView ? '281' : '855',
        playerVars: {
            autoplay: 0,
        },
    };

    const getItemById = (articles, id) => {
        return articles.find((article) => Number(article.id) === Number(id));
    };

    function getRandomArticlesByCategory(articles, category) {
        // Filter articles with the specified category
        const filteredArticles = articles.filter(article => article.category === category);

        // Shuffle the filtered articles randomly
        const shuffledArticles = shuffleArray(filteredArticles);

        // Return up to 4 articles from the shuffled list
        return shuffledArticles.slice(0, 4);
    }

    // Function to shuffle an array using Fisher-Yates algorithm
    function shuffleArray(array) {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    }

    useEffect(() => {
        const newId = idP
        setArticle(articles.find((article) => Number(article.id) === Number(newId)));
        setIsLoading(false);
    }, [id, idP]);

    useEffect(() => {
        const selectedItemsIds = cartItems.map(item => item.id);
        localStorage.setItem('selectedItemsIds', JSON.stringify(selectedItemsIds));
    }, [cartItems]);

    const handleAddToCart = () => {
        addToCart(article);
    }

    const handlePhoneCall = () => {
        window.location.href = `tel:${50128000}`;
    };

    const randomArticles = getRandomArticlesByCategory(articles, article?.category);

    const handleNavigation = (productId) => {
        navigate(`/boutique/${productId}`);
        setIdP(productId);
    };

    const handleClick = (article) => {
        addToCart(article);
    }

    return (
        <div>
            {isLoading && <Preloader />}
            {!isLoading && <div> <Header />
                <section className="shop-details">
                    <div className="product__details__pic">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="product__details__breadcrumb">
                                        <Link to={routes.HOME}>
                                            {language === "fr" ? "Acceuil" : "الصفحة الرئيسية"}
                                        </Link>
                                        <Link to={routes.SHOP}>
                                            {language === "fr" ? "Boutique" : "المتجر"}
                                        </Link>
                                        <span>{language === "fr" ? 'Détails du produit' : 'تفاصيل المنتج'}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                            {article && article.image !== "" && (
                                <Carousel showArrows={true}>
                                        <div>
                                            <img src={article?.thumbnail} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Image 1" />
                                        </div>
                                            <div>
                                                <img src={article?.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Image 1" />
                                            </div>
                                    {article?.video !== null && article?.video !== "" ? (<YouTube videoId={article?.video} opts={opts} />) : <></>}
                                </Carousel>
                                )}
                                {article && article.image === "" && (
                                <Carousel showArrows={true}>
                                        <div>
                                            <img src={article?.thumbnail} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Image 1" />
                                        </div>
                                            <div>
                                                <img src={article?.thumbnail} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Image 1" />
                                            </div>
                                    {article?.video !== null && article?.video !== "" ? (<YouTube videoId={article?.video} opts={opts} />) : <></>}
                                </Carousel>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="product__details__content">
                        <div className="container">
                            <div className="row d-flex justify-content-center">
                                <div className="col-lg-8">
                                    <div className="product__details__text">
                                        <h1>
                                            {article?.vendu === true && (<>
                                                <Fab variant="extended">
                                                    <ShoppingCartCheckoutIcon sx={{ mr: 1 }} />
                                                    <h4> {language === 'fr' ? 'ARTICLE DEJA VENDU' : 'لقد تم بيع المنتج'} </h4>
                                                </Fab><br></br></>)}
                                        </h1>
                                        <h4>{article?.title}</h4>
                                        <h3>{article?.price}<span style={{ display: "none" }}>{article?.price * article?.discountPercentage + article?.price}</span></h3>
                                        <p>{article?.description}</p>
                                        <div className="product__details__option">

                                        </div>
                                        <div className="product__details__cart__option">
                                            {!article?.vendu && (
                                                <>
                                                    <div className="quantity">
                                                        <div className="pro-qty">
                                                            <input type="text" value="1" disabled />
                                                        </div>
                                                    </div>
                                                    {!isArticleInCart ? (
                                                        <a
                                                            className="primary-btn"
                                                            onClick={handleClickCart}
                                                            disabled={article?.vendu}
                                                        >
                                                            {shopDetailsTranslations[language]['addToWishlist']}
                                                        </a>
                                                    ) : (
                                                        <Link to={routes.CART}>
                                                            <a className="primary-btn" onClick={handleAddToCart}>
                                                                {language === 'fr'
                                                                    ? 'Article dans le panier - allez au Panier'
                                                                    : 'توجه نحو عربة المقتنيات '}
                                                            </a>
                                                        </Link>
                                                    )}
                                                </>
                                            )}


                                        </div>
                                        <div className="product__details__btns__option">
                                            <Link to={routes.SHOP}>
                                                {shopDetailsTranslations[language]["addToCompare"]}
                                            </Link>
                                            <br></br>
                                            <br></br>
                                            <br></br>
                                            <button type="submit" className="site-btn" onClick={handlePhoneCall}>{language === "fr" ? "Appelez Maintenant : 50 128 000" : "اتصل بنا الان : 000 128 50"}</button>
                                        </div>
                                        <div className="product__details__last__option">
                                            <h5><span>{shopDetailsTranslations[language]["safeCheckout"]}</span></h5>
                                            <img src="img/shop-details/details-payment.png" alt="" />
                                            <ul>
                                                <li><span>{shopDetailsTranslations[language]["category"]} </span>{shopDetailsTranslations[language][article?.category]}</li>
                                                <li><span>{shopDetailsTranslations[language]["age"]} </span>{(article?.age < 1 && article?.category === "Ovin Engraissement") ? shopDetailsTranslations[language]["Entre"] : article?.age} {article?.age < 1 ? "" : shopDetailsTranslations[language]["ans"]} </li>
                                                <li><span>{shopDetailsTranslations[language]["poids"]} </span>{article?.weight} {shopDetailsTranslations[language]["unitePoids"]}</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="related spad">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <h3 className="related-title">{shopDetailsTranslations[language]["relatedProducts"]}</h3>
                            </div>
                        </div>
                        <div className="row">
                            {randomArticles.map((article, index) => (
                                <div onClick={() => handleNavigation(article?.id)} className="col-lg-3 col-md-6 col-sm-6 col-sm-6" key={index} >
                                    <div className="product__item">
                                        <div className="product__item__pic set-bg" data-setbg={article.thumbnail}>
                                            <img src={article.thumbnail} alt="" />
                                            <ul className="product__hover">
                                                <li>
                                                    <Link onClick={() => handleClick(article)} to={routes.CART}>
                                                        <a>
                                                            <img src="https://scontent.ftun4-2.fna.fbcdn.net/v/t1.15752-9/334893072_159526017014858_6086972990484068810_n.png?stp=cp0_dst-png&_nc_cat=102&ccb=1-7&_nc_sid=ae9488&_nc_ohc=xnxic3Gk-3AAX-w5QBx&_nc_ht=scontent.ftun4-2.fna&oh=03_AdQyVl7vOqCZOxbbZajXbeQQ2xncvT2Ld4PQ5iWCFZ7z5A&oe=64B3695F" alt="" />
                                                        </a>
                                                        <span>{language === "fr" ? "Ajouter à la Carte" : "أضف الى عربة المقتنيات"}</span>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <a onClick={() => handleNavigation(article?.id)}>
                                                        <img src="https://scontent.ftun4-2.fna.fbcdn.net/v/t1.15752-9/336654487_900125547873341_6166048667323514090_n.png?stp=cp0_dst-png&_nc_cat=103&ccb=1-7&_nc_sid=ae9488&_nc_ohc=Mb4hbxlE8skAX_5qCm1&_nc_ht=scontent.ftun4-2.fna&oh=03_AdTI78i9uLmSmmwp6xychRTb4ztIgAZSCmRRaY82kZfPPA&oe=64B3C3D5" alt="" />
                                                    </a>
                                                    <span>{language === "fr" ? "Voir le Produit" : "النضر الى المنتج"}</span>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="product__item__text">
                                            <h6>{article.title}</h6>
                                            <Link onClick={() => handleClick(article)} to={routes.CART}>
                                                {language === "fr" ? "Ajouter à la Carte" : "أضف الى عربة المقتنيات"}
                                            </Link>
                                            <h5>{article.price} {language === "fr" ? "TND" : "دينار"}</h5>
                                            <div className="product__color__select">
                                                <label htmlFor={`pc-${index + 1}`}>
                                                    <input type="radio" id={`pc-${index + 1}`} />
                                                </label>
                                                <label className="active black" htmlFor={`pc-${index + 2}`}>
                                                    <input type="radio" id={`pc-${index + 2}`} />
                                                </label>
                                                <label className="grey" htmlFor={`pc-${index + 3}`}>
                                                    <input type="radio" id={`pc-${index + 3}`} />
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                            {language === "fr" ? "Article ajouté avec succès!" : "تمت اضافة المنتج بنجاح!"}
                        </Alert>
                    </Snackbar>
                </section>
                <Footer />
                <Modal />
                <JsScripts />
            </div>}
        </div>
    )
}
