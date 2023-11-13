import React, { useContext, useState, useEffect } from 'react'
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Modal from '../../components/Modal';
import JsScripts from '../../components/JsScripts';
import { Link } from 'react-router-dom';
import routes from '../../routes';
import { LanguageContext } from '../../LanguageContext';
import YouTube from 'react-youtube';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import ShareIcon from '@mui/icons-material/Share';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import GTranslateIcon from '@mui/icons-material/GTranslate';
import SettingsIcon from '@mui/icons-material/Settings';
import SimpleDialog from "../../components/SimpleDialog"
import Alert from '@mui/material/Alert';
import Login from '../../components/Login';

export default function AboutUs() {
    const { language, updateLanguage } = useContext(LanguageContext);
    const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);
    const videoId3 = 'Z-DF8L_gwHw';
    const videoId2 = "BIDDOO6wo_Y";
    const videoId1 = "IwSnen4ojMg";
    const opts = {
        height: isMobileView ? '360' : '360',
        width: isMobileView ? '340' : '340',
        playerVars: {
            autoplay: 0,
        },
    };

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

    const mapWidth = isMobileView ? '300px' : '400px';
    const mapHeight = isMobileView ? '240px' : '300px';

    const handlePhoneCall = () => {
        window.location.href = `tel:${50128000}`;
    };
    return (
        <div>
            <Header />
            <section className="breadcrumb-option">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="breadcrumb__text">
                                <h4>{language === "fr" ? "Contactez Nous" : "اتصل بنا"}</h4>
                                <div className="breadcrumb__links">
                                    <Link to={routes.HOME}>
                                        {language === "fr" ? "Acceuil" : "الصفحة الرئيسية"}
                                    </Link>
                                    <span>{language === "fr" ? "Contactez Nous" : "اتصل بنا"}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="about spad">
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
                    <div className="col-lg-12">
                        <div className="about__pic">
                            <img src="https://scontent.ftun4-2.fna.fbcdn.net/v/t1.15752-9/256779859_213304307500755_4805841473852462713_n.jpg?stp=dst-jpg_p1080x2048&_nc_cat=101&ccb=1-7&_nc_sid=ae9488&_nc_ohc=PwGwkKQlBzQAX8PcMS1&_nc_ht=scontent.ftun4-2.fna&oh=03_AdTey-4_3YWe_8inhAV6glbteLoxJc0jlW09YIkwEVziqw&oe=64B37421" alt="" />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-4 col-md-4 col-sm-6 text-center">
                        <div className="about__item">
                            <h4>{language === "fr" ? "Aalfa - Aalouche Eid 2023" : "علفة علوش العيد 2023"}</h4>
                            <YouTube videoId={videoId1} opts={opts} />
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-6 text-center">
                        <div className="about__item">
                            <h4>{language === "fr" ? "Aalfa Djej" : "علفة الدجاج"}</h4>
                            <YouTube videoId={videoId2} opts={opts} />
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-6 text-center">
                        <div className="about__item">
                            <h4>{language === "fr" ? "Prix Aalfa 2023" : "كلفة علفة علوش العيد 2023"}</h4>
                            <YouTube videoId={videoId3} opts={opts} />
                        </div>
                    </div>
                </div>


        </div>
            </section >

            <section className="testimonial">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-1">
                        </div>
                        <div className="col-lg-4">
                            <div className="logo-middle">
                                <Link to={routes.HOME}>
                                    <img src="https://scontent.ftun4-2.fna.fbcdn.net/v/t1.15752-9/354489994_258818066739367_6080175949998551953_n.png?_nc_cat=106&ccb=1-7&_nc_sid=ae9488&_nc_ohc=UEjHlc23qeoAX8FectC&_nc_ht=scontent.ftun4-2.fna&oh=03_AdTIL1OR_JFRMcq2hfu7_zVlSTVHGI6b7qbNlb2ZYuf0TQ&oe=64B37E9D" alt="Your Image" />
                                </Link>
                            </div>
                        </div>
                        <div className="col-lg-1">
                        </div>
                        <div className="col-lg-4" style={{ display: 'inline-grid', marginBottom: '15px' }}>
                            <div className="footer__widget">
                                <div className="footer__newslatter">
                                    <form action="#">
                                        <input type="text" placeholder="Your email" readOnly value="falleh.tn@gmail.com" />
                                        <button type="submit"><span class="icon_mail_alt"></span></button>
                                    </form>
                                </div>
                            </div>
                            <button type="submit" className="site-btn" onClick={handlePhoneCall}><div className="site-text">{language === "fr" ? "Appelez Maintenant : 50 128 000" : "اتصل بنا الان : 000 128 50"}</div></button>
                        </div>
                        <div className="col-lg-1">
                        </div>
                    </div>
                </div>
            </section>

            <section className="counter spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-6 col-sm-3">
                            <div className="counter__item">
                                <div className="counter__item__number">
                                    <h2 className="cn_num">102</h2>
                                </div>
                                <span>{language === "fr" ? "Nos" : ""} <br />{language === "fr" ? "Clients" : "حرفاءنا"}</span>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-3">
                            <div className="counter__item">
                                <div className="counter__item__number">
                                    <h2 className="cn_num">4+</h2>
                                </div>
                                <span>{language === "fr" ? "Nos" : "كل"} <br />{language === "fr" ? "Nos Catégories" : "الفئات"}</span>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-3">
                            <div className="counter__item">
                                <div className="counter__item__number">
                                    <h2 className="cn_num">6+</h2>
                                </div>
                                <span>{language === "fr" ? "Presence" : "حضور"} <br />{language === "fr" ? "gouvernemental" : "عبر الولايات"}</span>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-3">
                            <div className="counter__item">
                                <div className="counter__item__number">
                                    <h2 className="cn_num">98</h2>
                                    <strong>%</strong>
                                </div>
                                <span>{language === "fr" ? "Client" : "حريف"}<br />{language === "fr" ? "Heureux" : "سعيد"}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="team spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section-title">
                                <span>{language === 'fr' ? 'Géolocalisation:' : ':احداثياتنا الجغرافية'}</span>
                                <h2 className="maps-text">{language === 'fr' ? 'Trouvez Nous Sur Google Maps:' : ':توصل الينا عن طريق جوجل مابس'}</h2>
                            </div>
                            <Alert severity="info">{language==="fr"? "Ferme Dmen, Ariana 2021" : "2021 ضيعة دمان بأريانة"}</Alert>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-4"></div>
                    <div className="col-lg-4 d-flex justify-content-center">
                        <div className="col-lg-12">
                        </div>
                    </div>
                    <div className="col-lg-4"></div>
                </div>
            </section>
            <section className="clients spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4"></div>
                        <div className="col-lg-4 d-flex align-items-center justify-content-center text-center">
                            <div className="section-title">
                                <span>{language === "fr" ? "Nos Valeurs & Nos Priorités" : "قيمنا و أولوياتنا"}</span>
                            </div>
                        </div>
                        <div className="col-lg-4"></div>
                    </div>
                    <div className="row">
                        <div className="col-lg-4 d-flex align-items-start justify-content-center text-center">
                            <div className="box">
                                <img style={{ width: "50px", marginBottom: "5px" }} src="https://scontent.ftun1-2.fna.fbcdn.net/v/t1.15752-9/354936145_6453540241371626_3275048458992088152_n.png?_nc_cat=109&ccb=1-7&_nc_sid=ae9488&_nc_ohc=kmZ0S5o7EDsAX-1Jt_h&_nc_ht=scontent.ftun1-2.fna&oh=03_AdQ7h59OWKFx23tnhJT4BvU4fE4BMQjODOzGmNA6XfMPWg&oe=64B3E1E1" alt="" />
                                <h4 className="title">{language === "fr" ? "Qualité Garantie" : "جودة مضمونة"}</h4>
                                <p className="description">{
                                    language === "fr" ? "La Qualité Garantie est une valeur essentielle pour notre entreprise. Nous nous engageons à offrir des produits et services d'une qualité exceptionnelle à nos clients. Grâce à notre engagement envers la qualité, nous veillons à ce que chaque produit réponde aux normes les plus élevées et à ce que chaque service soit fourni avec professionnalisme et excellence. Notre objectif est de satisfaire pleinement nos clients et de dépasser leurs attentes en matière de qualité." : "الجودة المضمونة هي قيمة أساسية لشركتنا. نحن ملتزمون بتقديم منتجات وخدمات عالية الجودة لعملائنا. من خلال التزامنا بالجودة، نضمن أن كل منتج يلبي أعلى المعايير وأن كل خدمة تُقدم بمهنية وتفوق. هدفنا هو تحقيق رضا العملاء بشكل كامل وتجاوز توقعاتهم في مجال الجودة."
                                }</p>
                            </div>
                        </div>
                        <div className="col-lg-4 d-flex align-items-start justify-content-center text-center">
                            <div className="box">
                                <img style={{ width: "50px", marginBottom: "5px" }} src="https://scontent.ftun1-2.fna.fbcdn.net/v/t1.15752-9/354824959_2390517837794238_3470227392106577514_n.png?_nc_cat=107&ccb=1-7&_nc_sid=ae9488&_nc_ohc=G1IipEC7HuoAX9LXzg6&_nc_ht=scontent.ftun1-2.fna&oh=03_AdS-a_nx48SH2elVN4VUJhn11I4W3jMrRkE1DztL_1H2PQ&oe=64B3C860" alt="" />
                                <h4 className="title">{language === "fr" ? "Service Clientèle" : "العناية بالعملاء"}</h4>
                                <p className="description">{
                                    language === "fr" ? "Notre Service Clientèle est au cœur de notre entreprise. Nous mettons un point d'honneur à offrir un service exceptionnel à nos clients, en veillant à leur satisfaction et à leur bien-être. Notre équipe de professionnels dévoués est là pour répondre à toutes les questions, résoudre les problèmes et fournir une assistance personnalisée. Nous sommes fiers de notre service clientèle réactif, amical et efficace, et nous nous efforçons constamment de dépasser les attentes de nos clients." : "خدمة العملاء لدينا هي في صميم عملنا. نسعى جاهدين لتقديم خدمة استثنائية لعملائنا، وضمان رضاهم ورفاهيتهم. فريقنا المكرس من المتخصصين هنا للإجابة على جميع الاستفسارات، وحل المشكلات، وتوفير المساعدة الشخصية. نفتخر بخدمة عملاءنا الاستجابة، ودية وفعالة، ونسعى باستمرار لتجاوز توقعات عملائنا."
                                }</p>
                            </div>
                        </div>
                        <div className="col-lg-4 d-flex align-items-start justify-content-center text-center">
                            <div className="box">
                                <img style={{ width: "50px", marginBottom: "5px" }} src="https://scontent.ftun1-2.fna.fbcdn.net/v/t1.15752-9/354472375_6650616785025405_7818891988188777947_n.png?_nc_cat=105&ccb=1-7&_nc_sid=ae9488&_nc_ohc=ixXcUG0ZPN0AX_EyTnh&_nc_ht=scontent.ftun1-2.fna&oh=03_AdRzE5P5tGa55KYB9hYLDzejcT3YyiRLFQxHusMfsoIbqQ&oe=64B3CEBF" alt="" />
                                <h4 className="title">{language === "fr" ? "Fiabilité" : "الموثوقية"}</h4>
                                <p className="description">{language === "fr" ? "La fiabilité est une valeur fondamentale pour notre entreprise. Nous nous engageons à tenir nos promesses envers nos clients et à être un partenaire de confiance. En étant fiables, nous assurons la satisfaction et la fidélité de nos clients, car ils savent qu'ils peuvent compter sur nous pour des produits et services de haute qualité, livrés dans les délais convenus." : "الموثوقية هي قيمة أساسية لشركتنا. نحن نلتزم بأن نكون شريكًا موثوقًا لعملائنا ونضمن توفير منتجات وخدمات عالية الجودة وفقًا للجداول الزمنية المتفق عليها، مما يضمن رضا وولاء عملائنا."}</p>
                            </div>
                        </div>
                    </div>

                </div>

            </section>

            <Footer />
            <Modal />
            <JsScripts />
        </div >
    )
}
