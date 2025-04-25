import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './lib/AuthContext';  // Retirez AuthProvider de l'import
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
import { LoginForm } from './components/auth/LoginForm';

// Composant de protection des routes
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Chargement...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

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
          <Route path="/login" element={<LoginForm />} />
          <Route
            path="/espace-client"
            element={
              <ProtectedRoute>
                <ClientSpace />
              </ProtectedRoute>
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/register/confirmation" element={<RegisterConfirmation />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <FloatingQuoteButton />
      <Footer />
    </div>
  );
}

export default App;
