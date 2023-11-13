import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { getAllArticles } from './admin/adminUtils';

const ArticlesContext = createContext();

const ArticlesProvider = ({ children }) => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getAllArticles().then((articles) => {
        setArticles(articles)
      });
  }, []);

  return (
    <ArticlesContext.Provider value={{ articles }}>
      {children}
    </ArticlesContext.Provider>
  );
};

export { ArticlesContext, ArticlesProvider };
