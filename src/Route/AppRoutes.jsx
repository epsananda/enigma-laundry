import React from 'react';
import { Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import Transaksi from '../pages/TransaksiPage';
import LandingPage from '../pages/LandingPage';
import Register from '../pages/RegisterPage';
// import NewTransaction from '../component/NewTransaction';
import ProdukPage from '../pages/ProdukPage';
import CustomerPage from '../pages/CustomerPage';

const AppRoutes = () => {
  return (
      <Routes>
        <Route element={<Transaksi />} path="/transaksi" />
        <Route element={<LandingPage />} path="/" />
        <Route element={<Register />} path='/register' />
        {/* <Route element={<NewTransaction />} path="/transaksi" /> */}
        <Route element={<ProdukPage />} path='/produk' />
        <Route element={<CustomerPage />} path='/costumer' />
      </Routes>
  );
};

export default AppRoutes;
