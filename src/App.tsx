import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth, AuthProvider } from './lib/AuthContext';
import { CartProvider } from './lib/CartContext';
import { StripeProvider } from './components/StripeProvider';
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
import AmbassadorSpace from './pages/AmbassadorSpace';
import Unauthorized from './pages/Unauthorized';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import ProductManager from './pages/admin/ProductManager';

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
    <AuthProvider>
      <CartProvider>
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
              <Route path="/espace-client" element={<ClientSpace />} />
              <Route path="/register" element={<Register />} />
              <Route path="/register/confirmation" element={<RegisterConfirmation />} />
              <Route path="/unauthorized" element={<Unauthorized />} />
              <Route path="/panier" element={<Cart />} />
              <Route path="/checkout" element={
                <StripeProvider>
                  <Checkout />
                </StripeProvider>
              } />
              <Route path="/commande-confirmee" element={<OrderConfirmation />} />
              
              {/* Routes protégées */}
              <Route
                path="/espace-ambassadeur"
                element={<AmbassadorSpace />}
              />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <Admin />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/products"
                element={
                  <ProtectedRoute>
                    <ProductManager />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
          <FloatingQuoteButton />
          <Footer />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;