import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Modal from '../../components/Modal';
import JsScripts from '../../components/JsScripts';
import Preloader from '../../components/Preloader';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { LanguageContext } from '../../LanguageContext';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import ShareIcon from '@mui/icons-material/Share';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import GTranslateIcon from '@mui/icons-material/GTranslate';
import SettingsIcon from '@mui/icons-material/Settings';
import SimpleDialog from "../../components/SimpleDialog"

export default function Blog({ filteredData }) {
    const { language, updateLanguage } = useContext(LanguageContext);
    const navigate = useNavigate();
    const [data, setData] = useState(filteredData);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    useEffect(() => {
        setData(filteredData);
        setCurrentPage(1);
    }, [filteredData]);

    const handleShopItemClick = (index) => {
        navigate(`/boutique/${index}`);
    };

    // Calculate the total number of pages based on the data length and items per page
    const totalPages = Math.ceil(data?.length / itemsPerPage);

    // Get the current page's items
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data?.slice(indexOfFirstItem, indexOfLastItem);

    // Handle pagination click
    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
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

    return (
        <body>
            {/* <!-- Header Section Begin --> */}
            <Header />
            {/* <!-- Header Section End --> */}

            {/* <!-- Breadcrumb Section Begin --> */}
            <section class="breadcrumb-blog set-bg" style={{ backgroundImage: 'url(img/breadcrumb-bg.jpg)' }}>
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <h2>Our Blog</h2>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- Breadcrumb Section End --> */}

            {/* <!-- Blog Section Begin --> */}
            <section class="blog spad">
                <div class="container">
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
                    <div class="row">
                        <div class="col-lg-4 col-md-6 col-sm-6">
                            <div class="blog__item">
                                <div class="blog__item__pic set-bg" data-setbg="img/blog/blog-1.jpg"></div>
                                <div class="blog__item__text">
                                    <span><img src="img/icon/calendar.png" alt="" /> 16 February 2020</span>
                                    <h5>What Curling Irons Are The Best Ones</h5>
                                    <a href="#">Read More</a>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-6 col-sm-6">
                            <div class="blog__item">
                                <div class="blog__item__pic set-bg" data-setbg="img/blog/blog-2.jpg"></div>
                                <div class="blog__item__text">
                                    <span><img src="img/icon/calendar.png" alt="" /> 21 February 2020</span>
                                    <h5>Eternity Bands Do Last Forever</h5>
                                    <a href="#">Read More</a>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-6 col-sm-6">
                            <div class="blog__item">
                                <div class="blog__item__pic set-bg" data-setbg="img/blog/blog-3.jpg"></div>
                                <div class="blog__item__text">
                                    <span><img src="img/icon/calendar.png" alt="" /> 28 February 2020</span>
                                    <h5>The Health Benefits Of Sunglasses</h5>
                                    <a href="#">Read More</a>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-6 col-sm-6">
                            <div class="blog__item">
                                <div class="blog__item__pic set-bg" data-setbg="img/blog/blog-4.jpg"></div>
                                <div class="blog__item__text">
                                    <span><img src="img/icon/calendar.png" alt="" /> 16 February 2020</span>
                                    <h5>Aiming For Higher The Mastopexy</h5>
                                    <a href="#">Read More</a>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-6 col-sm-6">
                            <div class="blog__item">
                                <div class="blog__item__pic set-bg" data-setbg="img/blog/blog-5.jpg"></div>
                                <div class="blog__item__text">
                                    <span><img src="img/icon/calendar.png" alt="" /> 21 February 2020</span>
                                    <h5>Wedding Rings A Gift For A Lifetime</h5>
                                    <a href="#">Read More</a>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-6 col-sm-6">
                            <div class="blog__item">
                                <div class="blog__item__pic set-bg" data-setbg="img/blog/blog-6.jpg"></div>
                                <div class="blog__item__text">
                                    <span><img src="img/icon/calendar.png" alt="" /> 28 February 2020</span>
                                    <h5>The Different Methods Of Hair Removal</h5>
                                    <a href="#">Read More</a>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-6 col-sm-6">
                            <div class="blog__item">
                                <div class="blog__item__pic set-bg" data-setbg="img/blog/blog-7.jpg"></div>
                                <div class="blog__item__text">
                                    <span><img src="img/icon/calendar.png" alt="" /> 16 February 2020</span>
                                    <h5>Hoop Earrings A Style From History</h5>
                                    <a href="#">Read More</a>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-6 col-sm-6">
                            <div class="blog__item">
                                <div class="blog__item__pic set-bg" data-setbg="img/blog/blog-8.jpg"></div>
                                <div class="blog__item__text">
                                    <span><img src="img/icon/calendar.png" alt="" /> 21 February 2020</span>
                                    <h5>Lasik Eye Surgery Are You Ready</h5>
                                    <a href="#">Read More</a>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-6 col-sm-6">
                            <div class="blog__item">
                                <div class="blog__item__pic set-bg" data-setbg="img/blog/blog-9.jpg"></div>
                                <div class="blog__item__text">
                                    <span><img src="img/icon/calendar.png" alt="" /> 28 February 2020</span>
                                    <h5>Lasik Eye Surgery Are You Ready</h5>
                                    <a href="#">Read More</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- Blog Section End --> */}

            {/* <!-- Footer Section Begin --> */}
            <Footer />
            {/* <!-- Footer Section End --> */}
        </body>

    );
}
