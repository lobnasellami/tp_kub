import React from 'react'
import { useContext } from 'react';
import { LanguageContext } from '../../LanguageContext';

export default function CardSale() {
    const { language } = useContext(LanguageContext);
  return (
    <div className="col-lg-4 col-md-6 col-sm-6">
                            <div className="product__item sale">
                                <div className="product__item__pic set-bg" data-setbg="img/product/product-3.jpg">
                                    <span className="label">Sale</span>
                                    <ul className="product__hover">
                                        <li><a href="#"><img src="img/icon/heart.png" alt=""/></a></li>
                                        <li><a href="#"><img src="img/icon/compare.png" alt=""/> <span>Compare</span></a>
                                        </li>
                                        <li><a href="#"><img src="img/icon/search.png" alt=""/></a></li>
                                    </ul>
                                </div>
                                <div className="product__item__text">
                                    <h6>Multi-pocket Chest Bag</h6>
                                    <a href="#" className="add-cart">+ Add To Cart</a>
                                    <div className="rating">
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star-o"></i>
                                    </div>
                                    <h5>$43.48</h5>
                                    <div className="product__color__select">
                                        <label for="pc-7">
                                            <input type="radio" id="pc-7"/>
                                        </label>
                                        <label className="active black" for="pc-8">
                                            <input type="radio" id="pc-8"/>
                                        </label>
                                        <label className="grey" for="pc-9">
                                            <input type="radio" id="pc-9"/>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
  )
}
