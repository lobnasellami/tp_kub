import React, { useEffect, useState } from 'react'
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import { useContext } from 'react';
import { LanguageContext } from '../../LanguageContext';


function valuetext(value) {
    return `${value} ${"DT"}`;
  }

export default function Price({articles, setPrice, fromSideMenu}) {
    const { language } = useContext(LanguageContext);
    const [minMax, setMinMax] = useState([0,2000]);
    
    useEffect(() => {
        if(articles === "Ovin Engraissement") {
            setMinMax([450,2000]);
        }
        else if(articles === "Brebis") {
            setMinMax([300,1500]);
        }
        else if(articles === "Poulailler Engraissement") {
            setMinMax([3,50]);
        }
        else {
            setMinMax([500,900]);
        }
    }, [articles])

    const [value, setValue] = useState([0,2000]);
    const handleChange = (event, newValue) => {
        setValue(newValue);
        setPrice(value);
    };
    
const marks = [
  {
    value: minMax[0],
    label: valuetext(minMax[0]),
  },
  {
    value: minMax[1],
    label: valuetext(minMax[1]),
  },
];

    function valueLabelFormat(value) {      
        return `${value} ${"DT"}`;
      }

    return (
        <div className={fromSideMenu? "": "card"}>
            <div className="card-heading">
                <a data-toggle="collapse" data-target="#collapseThree">{language==="fr" ? "Prix" : "الثمن"}</a>
            </div>
            <div>
                <div>
                    <Box ml="5" pl="10">
                        <Slider
                            min={minMax[0]}
                            max={minMax[1]}
                            getAriaLabel={() => 'Prix range'}
                            value={value}
                            onChange={handleChange}
                            valueLabelDisplay="auto"
                            getAriaValueText={valuetext}
                            valueLabelFormat={valueLabelFormat}
                            defaultValue={minMax[1]}
                            marks={marks}
                        />
                    </Box>
                </div>
            </div>
        </div>
    )
}