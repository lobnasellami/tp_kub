import React, { useEffect, useState } from 'react';
import Sidebar from './sidebarAdmin/Sidebar';
import Search from './sidebar/Search';
import MainShop from './admin-shop/MainShop';
import { applyFilters } from '../methods';
import BoolEditor from '@inovua/reactdatagrid-community/BoolEditor'
import SelectEditor from '@inovua/reactdatagrid-community/SelectEditor'
import NumericEditor from '@inovua/reactdatagrid-community/NumericEditor'
import { addArticle, updateArticle, deleteArticle } from '../admin/adminUtils'

export default function Poulailler({ data, articles }) {
  const [allFilters, setAllFilters] = useState({});
  const [filteredData, setFilteredData] = useState(data);
  const [filteredDataSource, setFilteredDataSource] = useState(filteredData);
  const [newlyAddedItemId, setNewlyAddedItemId] = useState(null);

  useEffect(() => {
    const filteredRes = applyFilters(data, allFilters);
    setFilteredData(filteredRes);
  }, [allFilters, data]);


  const handleDeleteItem = (id) => {
    deleteArticle(id);
  
    // Create a new array with items that should not be deleted
    const updatedItems = filteredData.filter((item) => item.id !== id);
  
    setFilteredData(updatedItems);
    alert('Article Supprimé avec Succès!');
  };

  const handleAddItem = () => {
    // Create a new empty object for the new item
    const newEmptyItem = {
      id: Math.random().toString(), // You can use a more appropriate ID generation method
      title: "Poulailler Engraissement",
      description: "",
      price: 0,
      discountPercentage: 0,
      type: "Djej",
      age: 0,
      weight: 0,
      category: "Poulailler Engraissement",
      thumbnail: "",
      images: "",
      video: "",
      vendu: false
    };

    // Add the new empty object to the data source
    setFilteredData((prevData) => [newEmptyItem, ...prevData ]);
    // Set the ID of the newly added item to scroll to it later
    setNewlyAddedItemId(newEmptyItem.id);
    window.scrollTo(0, 300);
  };

  function isItemExist(id, itemsArray) {
    // Check if any object in the itemsArray has the specified id
    return itemsArray.some((item) => item.id === id);
  }


  const handleSaveItem = (id, item) => {
    if (isItemExist(id, data)) {
      //implement data validation logic
      //call updating function
      updateArticle(id, item);
      alert('Article Modifié avec Succès!');
    } else {
      //call adding function
      const dataClone = articles;
      dataClone.push(item);
      addArticle(item, dataClone);
      alert('Article Ajouté avec Succès!')
    }
  };

  const typeData = [
    { id: 'Djej', label: 'Djej' },
    { id: 'Dindon', label: 'Dindon' },
    { id: 'Simmen', label: 'Simmen' },
  ];

  const columns = [
    { name: 'title', header: 'Titre', minWidth: 200, defaultFlex: 2, editable: true },
    { name: 'price', header: 'Prix', maxWidth: 1000, defaultFlex: 1, editable: true, type: 'number' },
    {
      name: 'type',
      header: 'Type',
      defaultFlex: 1,
      width: 100,
      render: ({ value }) => typeData[value] ? typeData[value] : value,
      editor: SelectEditor,
      editorProps: {
        idProperty: 'id',
        dataSource: typeData,
        collapseOnSelect: true,
        clearIcon: null
      },
      editable: true
    },
    { name: 'age', header: 'Age', maxWidth: 100, defaultFlex: 1, editable: true, type: 'number' },
    { name: 'weight', header: 'Poids', maxWidth: 100, defaultFlex: 1, editable: true, type: 'number' },
    {
      name: 'thumbnail', // Name of the data field containing the image URL
      header: 'Image URL', // Header text for the column
      minWidth: 60,
      defaultFlex: 2,
      type: 'image', // Custom type for rendering image URLs
      editable: true, // Set to true if you want to allow editing the URLs in the grid
      render: ({ value }) => {
        // Custom renderer for the image URLs
        return (
          <a href={value} target="_blank" rel="noopener noreferrer">
            <img src={value} alt="Product" style={{ width: '50px', height: '50px' }} />
          </a>
        );
      },
    },
    {
      name: 'image', // Name of the data field containing the image URL
      header: 'Image URL 2', // Header text for the column
      minWidth: 60,
      defaultFlex: 2,
      type: 'image', // Custom type for rendering image URLs
      editable: true, // Set to true if you want to allow editing the URLs in the grid
      render: ({ value }) => {
        // Custom renderer for the image URLs
        return (
          <a href={value} target="_blank" rel="noopener noreferrer">
            <img src={value} alt="Product" style={{ width: '50px', height: '50px' }} />
          </a>
        );
      },
    },
    { name: 'vendu', header: 'Vendu', width: 100, render: ({ value }) => value ? 'Vendu' : 'Non Vendu', editor: BoolEditor, editable: true },
    {
      name: 'Supression',
      header: 'Supression',
      maxWidth: 100,
      render: ({ value, data }) => (
        <button onClick={() => handleDeleteItem(data.id)}>Supprimer</button>
      ),
    },
    {
      name: 'Sauvegarde',
      header: 'Sauvegarde',
      minWidth: 115,
      render: ({ value, data }) => (
        <button onClick={() => handleSaveItem(data.id, data)}>Sauvegarder</button>
      ),
      defaultFlex: 1,
    },
  ];


  return (
    <div>
      <div className="shop__sidebar">
        {window.innerWidth < 991 ? (
          <div className="filter-bar">
            <Sidebar
              setAllFilters={setAllFilters}
              articles={"Poulailler Engraissement"}
            />
          </div>
        ) : (
          <React.Fragment>
            <Sidebar
              setAllFilters={setAllFilters}
              articles={"Poulailler Engraissement"}
            />
          </React.Fragment>
        )}
      </div>
      <div className="shop__product__option">
        <MainShop filteredData={filteredData} columns={columns} handleAddItem={handleAddItem} newlyAddedItemId={newlyAddedItemId} />
      </div>
    </div>
  );
}