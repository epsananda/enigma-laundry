import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import Register from '../pages/RegisterPage';
import ProdukPage from '../pages/ProdukPage';
import CustomerPage from '../pages/CustomerPage';
import TransaksiPage from '../pages/TransaksiPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<TransaksiPage />} path="/transaksi" />
      <Route element={<LandingPage />} path="/" />
      <Route element={<Register />} path='/register' />
      <Route element={<ProdukPage />} path='/produk' />
      <Route element={<CustomerPage />} path='/costumer' />
    </Routes>
  );
};

export default AppRoutes;
