import React, { useEffect, useState,useContext } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Modal from '../../components/Modal';
import JsScripts from '../../components/JsScripts';
import Preloader from '../../components/Preloader';
import MyContext from '../../context';
import ActiveTabs from '../../components/ActiveTabs';
import InfoBar from '../../components/InfoBar';
import Poulailler from '../../components/Poulailler';
import Ovin from '../../components/Ovin';
import Brebis from '../../components/Brebis';
import PoulesPondeuses from '../../components/PoulesPondeuses';
import { getObjectsByCategory } from '../../methods';
import { sortArticlesByPrice, articlesFetched } from '../../articles';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import ShareIcon from '@mui/icons-material/Share';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import GTranslateIcon from '@mui/icons-material/GTranslate';
import SettingsIcon from '@mui/icons-material/Settings';
import SimpleDialog from "../../components/SimpleDialog"
import { LanguageContext } from '../../LanguageContext';
import { getAllArticles } from '../../admin/adminUtils';
import { ArticlesContext } from '../../articlesContext';

export default function Shop() {
    const { language, updateLanguage } = useContext(LanguageContext);
    const myTabs = ["Ovin Engraissement", "Brebis", "Poulailler Engraissement", "Agnelles"];
    const [activeFilter, setActiveFilter] = useState(myTabs[0]); // State to keep track of active filter
    const [isLoading, setIsLoading] = useState(false);
    const handleFilterClick = (filter) => {
        setActiveFilter(filter); // Update the active filter state when a filter is clicked
    };
    const { articles } = useContext(ArticlesContext);
    const data = sortArticlesByPrice(articles);
    const [ovinData, setOvinData] = useState([]);
    const [BrebisData, setBrebisData] = useState([]);
    const [PoulaillerData, setPoulaillerData] = useState([]);
    const [PoulesPondeusesData, setPoulesPondeusesData] = useState([]);

    useEffect(() => {
        let filteredData = getObjectsByCategory(data, "Ovin Engraissement");
        setOvinData(filteredData);
        filteredData = getObjectsByCategory(data, "Brebis")
        setBrebisData(filteredData);
        filteredData = getObjectsByCategory(data, "Poulailler Engraissement")
        setPoulaillerData(filteredData);
        filteredData = getObjectsByCategory(data, "Agnelles");
        setPoulesPondeusesData(filteredData);
        setIsLoading(false);
    }, [data])
    
    let oData = getObjectsByCategory(data, "Ovin Engraissement");

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
            {isLoading && <Preloader />}
            <Header />
            <InfoBar />
            <section className="shop spad">
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
                        <MyContext.Provider value={{ activeFilter, handleFilterClick }}>
                            <ActiveTabs
                                myTabs={myTabs}
                            >
                            </ActiveTabs>
                        </MyContext.Provider>
                    </div>
                    {activeFilter === 'Ovin Engraissement' && <Ovin data={ovinData} />}
                    {activeFilter === 'Brebis' && <Brebis data={BrebisData} />}
                    {activeFilter === 'Poulailler Engraissement' && <Poulailler data={PoulaillerData} />}
                    {activeFilter === 'Agnelles' && <PoulesPondeuses data={PoulesPondeusesData} />}
                </div>
            </section>
            <Footer />
            <Modal />
            <JsScripts />
        </div>
    )
}
