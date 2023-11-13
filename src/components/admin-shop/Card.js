import React, { useEffect } from 'react'
import { useContext, useState } from 'react';
import { LanguageContext } from '../../LanguageContext';
import { CartContext } from '../../CartContext';
import routes from '../../routes';
import { Link } from 'react-router-dom';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box'

export default function Card({ item, key, handleShopItemClick }) {
    const { language } = useContext(LanguageContext);
    const { addToCart } = useContext(CartContext);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        let timeoutId;
          timeoutId = setTimeout(() => {
            setLoading(false);
          }, 200);

        return () => {
          clearTimeout(timeoutId); // Clear the timeout on component unmount
        };
      }, []); 

    const handleClick = () => {
        addToCart(item);
    }
    return (!loading ? (
        <div className="col-lg-4 col-md-6 col-sm-6" onClick={() => handleShopItemClick(item.id)}>
            <div className="product__item">
                <div className="product__item__pic set-bg" data-setbg={item.thumbnail}>
                    <img src={item.thumbnail} alt=""></img>
                    <ul className="product__hover">
                        <li><Link onClick={handleClick} to={routes.CART} ><a><img src="img/icon/cart.png" alt="" /></a><span>{language === "fr" ? "Ajouter à la Carte" : "أضف الى عربة المقتنيات"}</span></Link></li>
                        <li><Link to={`${routes.SHOPDETAILS}/${item.id}`}><a><img src="img/icon/search.png" alt="" /></a><span>{language === "fr" ? "Voir le Produit" : "النضر الى المنتج"}</span></Link></li>
                    </ul>
                </div>
                <div className="product__item__text">
                    <h6>{item.title}</h6>
                    <a className="add-cart">{language === "fr" ? "Voir les details de l'article" : "أنقر لترى تفاصيل المنتج"}</a>
                    <h5>{item.price} {language === "fr" ? "TND" : "دينار"}</h5>
                    <div className="product__color__select">
                        <label for="pc-4">
                            <input type="radio" id="pc-4" />
                        </label>
                        <label className="active black" for="pc-5">
                            <input type="radio" id="pc-5" />
                        </label>
                        <label className="grey" for="pc-6">
                            <input type="radio" id="pc-6" />
                        </label>
                    </div>
                </div>
            </div>
        </div>) :
        <Box sx={{ width: 210, marginRight: 0.5, my: 5 }}>
        <Stack spacing={2}>
            <Skeleton variant="rectangular" width={210} height={200} />
            <Box sx={{ pt: 0.5 }}>
                <Skeleton />
                <Skeleton width="60%" />
            </Box>
        </Stack>
        </Box>
    )
}
