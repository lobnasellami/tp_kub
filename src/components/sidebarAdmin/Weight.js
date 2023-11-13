import React, { useEffect, useState } from 'react'
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import { useContext } from 'react';
import { LanguageContext } from '../../LanguageContext';


function valuetext(value) {
    return `${value} ${"Kg"}`;
  }

export default function Weight({articles, setWeight,fromSideMenu}) {
    const { language } = useContext(LanguageContext);
    const [minMax, setMinMax] = useState([]);

    useEffect(() => {
        if(articles === "Ovin Engraissement") {
            setMinMax([20,150]);
        }
        else if(articles === "Poulailler Engraissement") {
            setMinMax([0.1,5]);
        }
        else {
            setMinMax([10,50]);
        }
    }, [articles])

    const [value, setValue] = useState([0, 150]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        setWeight(value);
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
        return `${value} ${"Kg"}`;
      }

    return (
        <div className={fromSideMenu? "": 'card'}>
            <div className="card-heading">
                <a data-toggle="collapse" data-target="#collapseThree">{language==="fr" ? "Poids Vif" : "الوزن الحي"}</a>
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
                            defaultValue={minMax}
                            marks={marks}
                        />
                    </Box>
                </div>
            </div>
        </div>
    )
}