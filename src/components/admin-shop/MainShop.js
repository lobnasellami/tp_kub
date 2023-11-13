import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { LanguageContext } from '../../LanguageContext';
import ReactDataGrid from '@inovua/reactdatagrid-community';
import '@inovua/reactdatagrid-community/index.css';
import BoolEditor from '@inovua/reactdatagrid-community/BoolEditor'
import SelectEditor from '@inovua/reactdatagrid-community/SelectEditor'
import NumericEditor from '@inovua/reactdatagrid-community/NumericEditor'

export default function MainShop({ filteredData, columns, handleAddItem, handleDeleteItem, handleSaveItem, raceData }) {
  const { language } = useContext(LanguageContext);
  const navigate = useNavigate();
  const [pageSize, setPageSize] = useState(10); // Number of rows per page
  const [filteredDataSource, setFilteredDataSource] = useState(filteredData);
  const [newlyAddedItemId, setNewlyAddedItemId] = useState(null);
  const [gridRef, setGridRef] = useState(null);

  const footer = {
    rowId: "footer",
    height: 45,
    cells: [
      { type: "add", text: "", onClick: () => handleAddItem() },
      { type: "text", text: "", className: 'bg-green-50' },
      { type: "text", text: "", className: 'bg-green-50' },
      { type: "text", text: "", className: 'bg-green-50' },
      { type: "text", text: "", className: 'bg-green-50' },
    ],
  };

  useEffect(() => {
    setFilteredDataSource(filteredData);
  }, [filteredData, handleDeleteItem]);

  const handleShopItemClick = (index) => {
    navigate(`/boutique/${index}`);
  };

  const handleButtonClick = () => {
    // Select the element by its class name
    const element = document.querySelector('.inovua-react-pagination-toolbar__icon--named--FIRST_PAGE');

    if (element) {
      // Trigger the click event on the selected element
      element.click();
    }
    gridRef.current.scrollToIndex(0)
  };
  useEffect(() => {
    // Scroll to the newly added item in the data grid
    if (newlyAddedItemId) {
      // Scroll to the corresponding row in the data grid
      // Assuming 'gridRef' is a ref to the ReactDataGrid component
      gridRef.current.scrollToIndex(0)
      // Reset the newly added item ID state to prevent unnecessary scrolling on subsequent renders
      setNewlyAddedItemId(null);
    }
  }, [newlyAddedItemId]);


  const gridStyle = { minHeight: 550 };

  const frenchLocalization = {
    pageText:'Page ',
    ofText:' de ',
    perPageText:'Résultats par page',
    showingText:'Affichage de ',
    clearAll:'Tout effacer',
    clear:'Effacer',
    showFilteringRow:'Afficher la ligne de filtrage',
    hideFilteringRow:'Masquer la ligne de filtrage',
    dragHeaderToGroup:'Glisser l en- tête pour grouper',
    disable : 'Désactiver',
    enable : 'Activer',
    disable : 'Désactiver',
    sortAsc : 'Trier par ordre croissant',
    sortDesc : 'Trier par ordre décroissant',
    unsort : 'Annuler le tri',
    group : 'Grouper',
    ungroup : 'Dégrouper',
    lockStart : 'Verrouiller le début',
    lockEnd : 'Verrouiller la fin',
    unlock : 'Déverrouiller',
    columns : 'Colonnes',
    contains : 'Contient',
    startsWith : 'Commence par',
    endsWith : 'Se termine par',
    notContains : 'Ne contient pas',
    neq : 'N est pas égal',
    eq : 'Égal',
    notEmpty : 'Non vide',
    empty : 'Vide',
    lt : 'Moins que',
    lte : 'Moins que ou égal',
    gt : 'Plus que',
    gte : 'Plus que ou égal',
  };

  const onEditComplete = useCallback(({ value, columnId, rowId }) => {
    setFilteredDataSource((prevData) => {
      // Create a copy of the previous data
      const newData = [...prevData];
      // Find the index of the row with the given rowId
      const rowIndex = newData.findIndex((item) => item.id === rowId);
      if (rowIndex !== -1) {
        // Update the value of the specified column in the found row
        newData[rowIndex][columnId] = value;
      }
      return newData;
    });
  }, []);

  const cellDOMProps = (cellProps) => {
    return {
      onClick: () => {
        gridRef.current.startEdit({ columnId: cellProps.id, rowIndex: cellProps.rowIndex })
      }
    }
  }

  const addCellDOMProps = (columns) => {
    const modifiedColumns = columns.map((column) => {
      if (column.name !== 'Supression' && column.name !== 'Sauvegarde') {
        return {
          ...column,
          cellDOMProps
        };
      }
      return column;
    });
  
    return modifiedColumns;
  };
  
  // Call the function and get the modified columns array
  const modifiedColumns = addCellDOMProps(columns);
  
  return (
    <div>
      <div className="shop__product__option__left">
        {language === 'fr' ? (
          <p>Affichage de {filteredDataSource.length} résultats</p>
        ) : (
          <p>عرض {filteredDataSource.length} نتيجة</p>
        )}
      </div>

      <ReactDataGrid
        onReady={setGridRef}
        idProperty="id"
        columns={modifiedColumns}
        dataSource={filteredDataSource}
        style={gridStyle}
        pagination
        i18n={frenchLocalization}
        paginationProps={{
          enabled: true,
          pageSize: pageSize,
          pageSizeOptions: [5, 10, 20]
        }}
        editable={true}
        onEditComplete={onEditComplete}
        filter={{
          enabled: true,
          filterValue: (filter) => {
            const data = data.filter((item) => {
              return (
                item.title.toLowerCase().includes(filter.toLowerCase()) ||
                item.price.toLowerCase().includes(filter.toLowerCase())
              );
            });
            setFilteredDataSource(data);
          },
        }}
      />

      <button onClick={() => { handleButtonClick(); handleAddItem(); }}>Ajouter Article</button>

      {/* Optional: Render additional components below the data grid if needed */}
    </div>
  );
}