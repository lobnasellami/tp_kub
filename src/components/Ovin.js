import React, { useEffect, useState } from 'react';
import Sidebar from './sidebar/Sidebar';
import Search from './sidebar/Search';
import MainShop from './main-shop/MainShop';
import { applyFilters } from '../methods';

export default function Ovin({ data }) {
  const [allFilters, setAllFilters] = useState({});
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    const filteredRes = applyFilters(data, allFilters);
    setFilteredData(filteredRes);
  }, [allFilters, data]);

  return (
    <div className="row">
      <div className="col-lg-3">
        <div className="shop__sidebar">
          {window.innerWidth < 991 ? (
            <div className="filter-bar">
              <Sidebar
                setAllFilters={setAllFilters}
                articles={"Ovin Engraissement"}
              />
            </div>
          ) : (
            <React.Fragment>
              <Sidebar
                setAllFilters={setAllFilters}
                articles={"Ovin Engraissement"}
              />
            </React.Fragment>
          )}
        </div>
      </div>
      <div className="col-lg-9">
        <div className="shop__product__option">
          <MainShop filteredData={filteredData} />
        </div>
      </div>
    </div>
  );
}
