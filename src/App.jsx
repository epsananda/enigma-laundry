import React from 'react';
import { Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import MainPage from './pages/MainPage';
import LandingPage from './pages/LandingPage';
import Register from './pages/RegisterPage';
import NewTransaction from './component/NewTransaction';
import ProdukPage from './pages/ProdukPage';
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    // <BrowserRouter>
      <Routes>
        <Route element={<MainPage />} path="/mainmenu" />
        <Route element={<LandingPage />} path="/" />
        <Route element={<Register />} path='/register' />
        <Route element={<NewTransaction />} path="/transaksi" />
        <Route element={<ProdukPage />} path='/produk' />
      </Routes>

  );
};

export default App;
