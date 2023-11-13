import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import LanguageSelector from './LanguageSelector';
import routes from '../routes';
import './styles.css';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LanguageContext } from '../LanguageContext';
import { CartContext } from '../CartContext'; import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import CallIcon from '@mui/icons-material/Call';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import { useLocation } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }));

const Header = () => {
    const { cartItems } = useContext(CartContext);
    const { language } = useContext(LanguageContext);
    const location = useLocation();
    const currentURL = location.pathname;
    const offcanvasMenuWrapperRef = useRef(null);
    const offcanvasMenuOverlayRef = useRef(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const [value, setValue] = React.useState(currentURL === routes.HOME ? 0 : currentURL === routes.SHOP ? 1 : currentURL === routes.ABOUTUS ? 2 : 3);
    const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);
    const navigate = useNavigate();


    const HeaderTranslations = {
        "fr": {
            "Acceuil": "Acceuil",
            "Boutique": "Boutique",
            "A Propos": "Contact",
            "Cart": "Panier"
        },
        "ar": {
            "Acceuil": "الصفحة الرئيسية",
            "Boutique": "المتجر",
            "A Propos": "اتصل بنا",
            "Cart": "عربة المقتنيات"
        }
    }

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) {
                setIsMobileView(false);
            }
            else {
                setIsMobileView(true);
            }

        }

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [window.innerWidth]);


    const handleOpenClick = () => {
        setMenuOpen(true);
    };

    const handleOverlayClick = () => {
        setMenuOpen(false);
    };

    const handleNavigation = (link) => {
        navigate(link);
    };


    return (
isMobileView ?  (
  <Box sx={{ width: "100%", maxWidth: "100vw", maxHeight:"100vh",overflowY:"hidden", overflowX: "hidden" }}>
    <div className="header__logo">
<Link to={routes.HOME}>

    <img src="https://raw.githubusercontent.com/allouchii/allouchi/main/logoAllouchi.png" alt="Your Image" />
</Link>
</div>
    <BottomNavigation
      showLabels
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
    >
      <BottomNavigationAction
        onClick={() => handleNavigation(routes.HOME)}
        label={HeaderTranslations[language]["Acceuil"]}
        icon={<HomeIcon />}
      />
      <BottomNavigationAction
        onClick={() => handleNavigation(routes.SHOP)}
        label={HeaderTranslations[language]["Boutique"]}
        icon={<ShoppingBagOutlinedIcon />}
      />
      <BottomNavigationAction
        onClick={() => handleNavigation(routes.ABOUTUS)}
        label={HeaderTranslations[language]["A Propos"]}
        icon={<CallIcon />}
      />
      <BottomNavigationAction
        onClick={() => handleNavigation(routes.CART)}
        label={HeaderTranslations[language]["Cart"]}
        icon={<IconButton aria-label="cart">
        <StyledBadge badgeContent={cartItems?.length} color="secondary">
          <ShoppingCartIcon />
        </StyledBadge>
      </IconButton>}
      />
    </BottomNavigation>
  </Box>
) : (
                <header className="header">
                    <div className="container">
                        <div className="houssam">
                            <div className="col-lg-3 col-md-3" style={{ display: "flex" }}>
                                <div className="header__logo">

                                    <Link to={routes.HOME}>
                                        <img src="https://raw.githubusercontent.com/allouchii/allouchi/main/logoAllouchi.png" alt="Your Image" />
                                    </Link>

                                </div>
                            </div>
                            <div className="col-lg-5 col-md-5" style={{ display: "flex" }}>
                                <nav className="header__menu mobile-menu">
                                    <ul style={{ padding: "16px 0" }}>
                                        <li>
                                            <Link to={routes.HOME}>
                                                {HeaderTranslations[language]["Acceuil"]}
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to={routes.SHOP}>
                                                {HeaderTranslations[language]["Boutique"]}
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to={routes.ABOUTUS}>
                                                {HeaderTranslations[language]["A Propos"]}
                                            </Link>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                            <div className="col-lg-4 col-md-4" style={{ display: "flex" }}>
                                <div className="header__nav__option" style={{ display: "flex" }}>
                                    <LanguageSelector />
                                    <Link to={routes.CART}>
                                        <img src="https://scontent.ftun4-2.fna.fbcdn.net/v/t1.15752-9/334893072_159526017014858_6086972990484068810_n.png?stp=cp0_dst-png&_nc_cat=102&ccb=1-7&_nc_sid=ae9488&_nc_ohc=xnxic3Gk-3AAX-w5QBx&_nc_ht=scontent.ftun4-2.fna&oh=03_AdQyVl7vOqCZOxbbZajXbeQQ2xncvT2Ld4PQ5iWCFZ7z5A&oe=64B3695F" alt="" /> <span></span>
                                    </Link>
                                    <div className="price">{cartItems.reduce((total, item) => total + item.price, 0)} {language === "fr" ? "Dinars" : "دينار"}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                </header>
            )
    );
}

export default Header;
