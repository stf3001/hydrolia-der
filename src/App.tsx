import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Technology from './pages/Technology';
import Products from './pages/Products';
import WaterCalculator from './pages/WaterCalculator';
import Applications from './pages/Applications';
import Certification from './pages/Certification';
import EspritColibri from './pages/EspritColibri';
import QuiSommesNous from './pages/QuiSommesNous';
import FAQ from './pages/FAQ';
import ClientSpace from './components/ClientSpace';
import Register from './pages/Register';
import RegisterConfirmation from './pages/RegisterConfirmation';
import Admin from './pages/Admin';
import FloatingQuoteButton from './components/FloatingQuoteButton';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/technologie" element={<Technology />} />
          <Route path="/produits" element={<Products />} />
          <Route path="/calculateur" element={<WaterCalculator />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/certification" element={<Certification />} />
          <Route path="/qui-sommes-nous" element={<QuiSommesNous />} />
          <Route path="/esprit-colibri" element={<EspritColibri />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/espace-client" element={<ClientSpace />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register/confirmation" element={<RegisterConfirmation />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
      <FloatingQuoteButton />
      <Footer />
    </div>
  );
}

export default App;