import React from 'react'
import { useContext } from 'react';
import { LanguageContext } from '../LanguageContext';
import routes from '../routes';
import { Link } from 'react-router-dom';

export default function Footer() {
    const { language } = useContext(LanguageContext);
    const FooterTranslations = {
        "fr": {
            "Acceuil": "Acceuil",
            "Boutique": "Boutique",
            "A Propos": "Contactez Nous",
            "cart":"Panier",
            "checkout":"Finalisation du Shopping"
        },
        "ar": {
            "Acceuil": "الصفحة الرئيسية",
            "Boutique": "المتجر",
            "A Propos": "اتصل بنا",
            "cart":"عربة المقتنيات",
            "checkout":"انهاء التسوق و التواصل معنا"
        }
    }

    const handlePhoneCall = () => {
        window.location.href = `tel:${50128000}`;
    };

    return (
        <footer className="footer">
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-md-6 col-sm-6">
                        <div className="footer__about">
                            <div className="footer__logo">

                                <a href="#"><img src="https://raw.githubusercontent.com/allouchii/allouchi/main/logoAllouchi.png" alt="" /></a>
                            </div>
                            <p>{language === "fr" ? "Découvrez notre boutique en ligne de vente de moutons et poulets! Nous proposons des produits de haute qualité et une expérience d'achat fluide. Trouvez tout ce dont vous avez besoin dans notre boutique. Contactez-nous maintenant!" : "اكتشف متجرنا الإلكتروني لبيع الأغنام والدجاج! هدفنا الرئيسي هو تقديم أفضل تجربة يمكن أن نقدمها للعملاء. نحن نقدم منتجات عالية الجودة وتجربة تسوق سلسة. ابحث عن كل ما تحتاجه في متجرنا. اتصل بنا الآن!"}</p>
                            <Link to={routes.CART}><img src="img/payment.png" alt="" /></Link>
                        </div>
                    </div>
                    <div className="col-lg-2 offset-lg-1 col-md-3 col-sm-6">
                        <div className="footer__widget">
                            <h6>{language === "fr" ? "Nos Pages" : "صفحاتنا"}</h6>
                            <ul>
                                <li>
                                    <Link to={routes.HOME}>
                                        {FooterTranslations[language]["Acceuil"]}
                                    </Link>
                                </li>
                                <li>
                                    <Link to={routes.SHOP}>
                                        {FooterTranslations[language]["Boutique"]}
                                    </Link>
                                </li>
                                <li>
                                    <Link to={routes.ABOUTUS}>
                                        {FooterTranslations[language]["A Propos"]}
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-2 col-md-3 col-sm-6">
                        <div className="footer__widget">
                            <h6>{language === "fr" ? "Shopping" : "التسوق"}</h6>
                            <ul>
                                <li>
                                    <Link to={routes.SHOP}>
                                        {FooterTranslations[language]["Boutique"]}
                                    </Link>
                                </li>
                                <li>
                                    <Link to={routes.CART}>
                                        {FooterTranslations[language]["cart"]}
                                    </Link>
                                </li>
                                <li>
                                    <Link to={routes.CHECKOUT}>
                                        {FooterTranslations[language]["checkout"]}
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-3 offset-lg-1 col-md-6 col-sm-6">
                        <div className="footer__widget">
                            <h6>{language==="fr"? "Contactez Nous" : "اتصل بنا"}</h6>
                            <div className="footer__newslatter">
                                <p> {language==="fr"? "Pour plus d'informations sur nos produits, ou pour installer une commande ou une enquête, veuillez nous contacter et communiquer avec nous sur notre e-mail ou via notre numéro de téléphone." : "لمزيد من المعلومات حول منتوجاتنا أو من أجل تثبيت طلب أو الاستفسار الرجاء الاتصال بنا و التواصل معنا على بريدنا الالكتروني أو عبر رقم الهاتف"}</p>
                                <form action="#">
                                <input type="text" placeholder="Your email" readOnly value="falleh.tn@gmail.com" />
                                    <button type="submit"><span class="icon_mail_alt"></span></button>
                                </form>
                            </div>
                        </div>
                        <button type="submit" className="site-btn" onClick={handlePhoneCall}>{language === "fr" ? "Appelez Maintenant : 50 128 000" : "اتصل بنا الان : 000 128 50"}</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 text-center">
                        <div className="footer__copyright__text">

                            {/* <p>Copyright ©
                                <script>
                                    document.write(new Date().getFullYear());
                                </script> 2023
                                {language==="fr" ? " Tous droits réservés | Ce site web est réalisé avec":"جميع الحقوق محفوظة | هذا الموقع تم إنشاؤه بكل"} <i class="fa fa-heart-o"
                                    aria-hidden="true"></i> {language==="fr" ? "par ":"من قبل"} <a href="" target="_blank">EaglesDevClub.tn</a>
                            </p> */}

                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
