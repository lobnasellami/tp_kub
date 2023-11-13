import React, { useEffect, useState } from 'react'
import { ExpandLess, ExpandMore } from '@mui/icons-material';

export default function Category({setCategory}) {
    const [quantities, setQuantities] = useState({})

    //This funtion will be used to fetch the quantity of each category on component first mount.
    useEffect(()=>{
        setQuantities ({
            menQuantity : 12,
            womenQuantity : 15,
            bagsQuantity : 13,
            clothingQuantity : 16,
            shoesQuantity : 18,
            accessoiriesQuantity : 9,
            kidsQuantity : 11
        })
    },[]);
    const [isActive, setIsActive] = useState(true);

    const toggle = () => {
        setIsActive(!isActive);
    };

    return (
        <div className={`card ${isActive ? 'active' : ''}`}>
            <div className="card-heading">
                <a
                    onClick={toggle}
                    className={`accordion-toggle ${isActive ? 'active' : ''}`}
                >
                    Catégorie
                    {isActive ? <ExpandLess /> : <ExpandMore />}
                </a>
            </div>
            <div className={`collapse ${isActive ? 'show' : ''}`} id="collapseThree">
            <div className="card-body">
                <div className="shop__sidebar__categories">
                    <ul className="nice-scroll">
                        <li><a className="clickable-element" onClick={()=>setCategory("Men")}>Men ({quantities?.menQuantity})</a></li>
                    <li><a className="clickable-element" onClick={()=>setCategory("Women")}>Women ({quantities?.womenQuantity}) </a></li>
                        <li><a className="clickable-element" onClick={()=>setCategory("Bags")}>Bags ({quantities?.bagsQuantity})</a></li>
                        <li><a className="clickable-element" onClick={()=>setCategory("Clothing")}>Clothing ({quantities?.clothingQuantity})</a></li>
                        <li><a className="clickable-element" onClick={()=>setCategory("Shoes")}>Shoes ({quantities?.shoesQuantity})</a></li>
                        <li><a className="clickable-element" onClick={()=>setCategory("Accessoiries")}>Accessories ({quantities?.accessoiriesQuantity})</a></li>
                        <li><a className="clickable-element" onClick={()=>setCategory("Kids")}>Kids ({quantities?.kidsQuantity})</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
  )
}
