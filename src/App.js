import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import Wishlist from './pages/Wishlist';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Reviews from './pages/Reviews';

// import ScrollToTop from './components/ScrollToTop';
import ScrollToTopOnNavigate from './components/ScrollToTopOnNavigate';
import LoadingScreen from './components/LoadingScreen';


import Home from './pages/Home';
import Products from './pages/Products';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Customize from './pages/Customize';
import MyOrders from './pages/MyOrders';
import Admin from './pages/Admin';
import AboutUs from './pages/AboutUs';
import PrivacyPolicy from './pages/PrivacyPolicy';


// Global variable — sirf ek baar chalega
let appLoaded = false;

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

function AdminRoute({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (user.email !== 'yugrang2026@gmail.com') return <Navigate to="/" />;
  return children;
}

function AppContent() {
  const [showLoader, setShowLoader] = useState(!appLoaded);

  const handleLoaderComplete = () => {
    appLoaded = true;
    setShowLoader(false);
  };

  if (showLoader) {
    return <LoadingScreen onComplete={handleLoaderComplete} />;
  }

  return (
    <>
      <ScrollToTopOnNavigate />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/customize" element={<Customize />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/checkout" element={
          <ProtectedRoute><Checkout /></ProtectedRoute>
        } />
        <Route path="/my-orders" element={
          <ProtectedRoute><MyOrders /></ProtectedRoute>
        } />
        <Route path="/admin" element={
          <AdminRoute><Admin /></AdminRoute>
        } />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/wishlist" element={
  <ProtectedRoute><Wishlist /></ProtectedRoute>
} />
      </Routes>
      <Footer />
      <WhatsAppButton />
      {/* <ScrollToTop /> */}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <AppContent />
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}