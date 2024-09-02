import React from 'react';
import bgImage from '../image/bg.jpeg'; 
import Header from '../component/Header';
import ButtonPrimary from '../component/ButtonPrimary';
import FooterBar from '../component/FooterNavbar';

const HomePage = () => {
  return (
    <section
      className="h-screen w-screen bg-cover bg-center flex flex-col"
      style={{
        backgroundImage: `url(${bgImage})`, 
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Header />
      
      <div className="flex-grow flex justify-start items-center">
        <div className="p-4 rounded-lg ml-4">
          <h1 className="font-sans text-6xl text-white">SELAMAT</h1>
          <h2 className="font-sans text-6xl mt-2 text-white">DATANG DI ENIGMA LAUNDRY</h2>
          <p className="mt-4 text-white">
            Lihat riwayat dan status pesananmu di sini.
          </p>

          <ButtonPrimary className="mt-6" text={"Login Disini"} to="/register" />
        </div>
      </div>

      <FooterBar />
    </section>
  );
};

export default HomePage;
