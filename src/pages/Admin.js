import React from 'react'
import AdminDashboard from '../components/AdminDashboard';
import Login from '../components/Login';

function Admin() {
  // Check if the access token exists in the local storage
  const accessToken = localStorage.getItem('access_token');

  // If access token exists, render the AdminDashboard component
  // Otherwise, render the Login component
  return accessToken ? <AdminDashboard /> : <Login />;
};

export default Admin