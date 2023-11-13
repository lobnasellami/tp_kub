import React from 'react';
import DataGrid from '@inovua/reactdatagrid-community';
import '@inovua/reactdatagrid-community/index.css';

const columns = [
  { name: 'id', header: 'ID', defaultVisible: false },
  { name: 'title', header: 'Title' },
  { name: 'price', header: 'Price' },
  // Add more columns as needed
];

const DataGridComponent = ({ data, handleShopItemClick }) => {
  return (
    <DataGrid
      dataSource={data}
      columns={columns}
      idProperty="id"
      style={{ height: '400px' }}
      licenseKey="YOUR_LICENSE_KEY" // Replace with your license key or leave it as is for non-commercial use
      onRowClick={(row) => handleShopItemClick(row.data.id)}
    />
  );
};

export default DataGridComponent;
