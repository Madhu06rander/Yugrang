import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

import { useCart } from '../context/CartContext';
import logo from '../assets/Logo.png';
import { FiMenu, FiX, FiUser, FiLogOut, FiShoppingCart, FiSearch, FiHeart } from 'react-icons/fi';
import { useWishlist } from '../context/WishlistContext';

// Product data for search
const searchProducts = [
  { id: 1, name: 'Custom Leaves Print Shirt', category: 'Men Shirts', price: 899, icon: '👔' },
  { id: 2, name: 'Rounded Art Print Shirt', category: 'Men Shirts', price: 949, icon: '👔' },
  { id: 3, name: 'Introvert Graphic Tee', category: 'Mens T-Shirt', price: 499, icon: '👕' },
  { id: 4, name: 'Leaf Design Tee', category: 'Mens T-Shirt', price: 549, icon: '👕' },
  { id: 5, name: 'Floral Print Kurta', category: 'Men Kurta', price: 849, icon: '🧥' },
  { id: 6, name: 'Mandala Print Kurta', category: 'Men Kurta', price: 899, icon: '🧥' },
  { id: 7, name: 'Border Mandala Kurti', category: 'Women Kurti', price: 749, icon: '👗' },
  { id: 8, name: 'Hand Painted Kurti', category: 'Women Kurti', price: 849, icon: '👗' },
  { id: 9, name: 'Animal Print Shirt', category: 'Women Shirt', price: 799, icon: '👚' },
  { id: 10, name: 'Cat Path Print Shirt', category: 'Women Shirt', price: 749, icon: '👚' },
  { id: 11, name: 'Bike Obsessed Handkerchief', category: 'Handkerchief', price: 149, icon: '🎁' },
  { id: 12, name: 'Bro & Sis Special', category: 'Handkerchief', price: 149, icon: '🎁' },
  { id: 23, name: 'Bear Couple Wear', category: 'Couple Wear', price: 999, icon: '👫' },
  { id: 24, name: 'Cartoon Couple Wear', category: 'Couple Wear', price: 1099, icon: '👫' },
  { id: 29, name: 'Bear Hoodie', category: 'Hoodie', price: 1299, icon: '🧥' },
  { id: 30, name: 'Forever Hoodie', category: 'Hoodie', price: 1399, icon: '🧥' },
  { id: 31, name: 'Harry Potter Hoodie', category: 'Hoodie', price: 1499, icon: '🧥' },
  { id: 48, name: 'Sun Moon Tee', category: 'Mens T-Shirt', price: 549, icon: '👕' },
  { id: 49, name: 'Abstract Sun Moon Tee', category: 'Mens T-Shirt', price: 599, icon: '👕' },
  { id: 55, name: 'Floral Print Kurti', category: 'Women Kurti', price: 749, icon: '👗' },
  { id: 56, name: 'Lotus Print Kurti', category: 'Women Kurti', price: 799, icon: '👗' },
  { id: 63, name: 'Animal Floral Geometric Tee', category: 'Women T-Shirt', price: 449, icon: '👒' },
  { id: 64, name: 'Animal Tribal Tee', category: 'Women T-Shirt', price: 499, icon: '👒' },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { totalItems } = useCart();
  const { wishlist } = useWishlist();
  const handleLogout = () => {
    logout();
    navigate('/');
    setMenuOpen(false);
  };

  const filteredProducts = searchQuery.length > 1
    ? searchProducts.filter(p =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : [];

  const handleSearchSelect = (product) => {
    setSearchOpen(false);
    setSearchQuery('');
    navigate(`/products?category=${product.category}`);
  };

  const handleSearchKey = (e) => {
    if (e.key === 'Escape') {
      setSearchOpen(false);
      setSearchQuery('');
    }
    if (e.key === 'Enter' && searchQuery.length > 0) {
      setSearchOpen(false);
      navigate(`/products?search=${searchQuery}`);
      setSearchQuery('');
    }
  };

  return (
    <>
      <style>{`
        .navbar {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 999;
          padding: 0 60px;
          height: 90px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(201,168,76,0.15);
          backdrop-filter: blur(12px);
          background: rgba(10,10,10,0.95);
          width: 100%;
          box-sizing: border-box;
        }
        .nav-logo {
          text-decoration: none;
          display: flex;
          align-items: center;
        }
        .nav-logo img {
          height: 72px;
          width: auto;
          object-fit: contain;
          filter: brightness(1.4) contrast(1.3) saturate(0.7) sepia(0.3) hue-rotate(-8deg) drop-shadow(0 0 8px rgba(201,168,76,0.3));
          transition: filter 0.3s;
        }
        .nav-logo img:hover {
          filter: brightness(1.5) contrast(1.15) drop-shadow(0 0 12px rgba(201,168,76,0.5));
        }
        .nav-links {
          display: flex;
          gap: 36px;
          list-style: none;
        }
        .nav-link {
          font-size: 11px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #888888;
          text-decoration: none;
          transition: color 0.3s;
        }
        .nav-link:hover { color: #C9A84C; }
        .nav-right {
          display: flex;
          align-items: center;
          gap: 20px;
        }
        .nav-username {
          font-size: 12px;
          letter-spacing: 2px;
          color: #C9A84C;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .nav-logout-btn {
          background: rgba(201,168,76,0.12);
          border: 1px solid rgba(201,168,76,0.6);
          color: #C9A84C;
          padding: 8px 18px;
          font-size: 10px;
          letter-spacing: 2px;
          text-transform: uppercase;
          cursor: pointer;
          font-family: 'Jost', sans-serif;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: all 0.3s;
        }
        .nav-logout-btn:hover {
          background: #C9A84C;
          border-color: #C9A84C;
          color: #0A0A0A;
        }
        .nav-signup-btn {
          background: #C9A84C;
          color: #0A0A0A;
          padding: 10px 24px;
          font-size: 10px;
          letter-spacing: 3px;
          text-transform: uppercase;
          text-decoration: none;
          font-family: 'Jost', sans-serif;
          font-weight: 500;
          transition: all 0.3s;
        }
        .nav-signup-btn:hover { background: #E8D5A3; }
        .nav-search-btn {
          background: none;
          border: none;
          color: #888;
          cursor: pointer;
          display: flex;
          align-items: center;
          transition: color 0.2s;
          padding: 0;
        }
        .nav-search-btn:hover { color: #C9A84C; }
        .menu-icon {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
        }
        .cart-icon-wrap {
          position: relative;
          cursor: pointer;
          color: #888;
          transition: color 0.2s;
          display: flex;
          align-items: center;
        }
        .cart-icon-wrap:hover { color: #C9A84C; }
        .cart-badge {
          position: absolute;
          top: -8px;
          right: -8px;
          background: #C9A84C;
          color: #0A0A0A;
          font-size: 9px;
          font-weight: 700;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .mobile-menu {
          position: fixed;
          top: 90px;
          right: 0;
          width: 240px;
          background: rgba(15,15,15,0.98);
          border: 1px solid rgba(201,168,76,0.2);
          border-top: none;
          display: flex;
          flex-direction: column;
          padding: 16px 0;
          z-index: 998;
          backdrop-filter: blur(12px);
          box-shadow: -4px 4px 24px rgba(0,0,0,0.6);
        }
        .mobile-link {
          font-size: 11px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #C9A84C;
          text-decoration: none;
          transition: all 0.2s;
          padding: 12px 24px;
          border-bottom: 1px solid rgba(201,168,76,0.08);
          display: block;
        }
        .mobile-link:hover {
          background: rgba(201,168,76,0.08);
          padding-left: 32px;
        }
        .mobile-divider {
          width: 100%;
          height: 1px;
          background: rgba(201,168,76,0.15);
          margin: 4px 0;
        }
        .mobile-logout {
          background: none;
          border: none;
          color: #ff6b6b;
          font-size: 11px;
          letter-spacing: 3px;
          text-transform: uppercase;
          cursor: pointer;
          font-family: 'Jost', sans-serif;
          text-align: left;
          padding: 12px 24px;
          width: 100%;
          transition: all 0.2s;
        }
        .mobile-logout:hover {
          background: rgba(255,107,107,0.08);
          padding-left: 32px;
        }

        /* SEARCH */
        .search-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.97);
          z-index: 99999;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          padding: 120px 24px 40px;
          animation: searchFadeIn 0.3s ease;
          overflow-y: auto;
        }
        @keyframes searchFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .search-close {
          position: fixed;
          top: 24px;
          right: 32px;
          background: none;
          border: none;
          color: #888;
          cursor: pointer;
          transition: color 0.2s;
          padding: 8px;
        }
        .search-close:hover { color: #C9A84C; }
        .search-box {
          width: 100%;
          max-width: 680px;
          position: relative;
        }
        .search-label {
          font-size: 10px;
          letter-spacing: 5px;
          text-transform: uppercase;
          color: #555;
          margin-bottom: 16px;
          display: block;
        }
        .search-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid rgba(201,168,76,0.4);
          color: #F5F0E8;
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(28px, 5vw, 48px);
          font-weight: 300;
          padding: 12px 48px 12px 0;
          outline: none;
          letter-spacing: 2px;
        }
        .search-input::placeholder { color: #2a2a2a; }
        .search-input:focus {
          border-bottom-color: #C9A84C;
        }
        .search-submit {
          position: absolute;
          right: 0;
          bottom: 12px;
          background: none;
          border: none;
          color: #C9A84C;
          cursor: pointer;
          padding: 0;
        }
        .search-hint {
          font-size: 10px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #333;
          margin-top: 16px;
          display: block;
        }
        .search-results {
          width: 100%;
          max-width: 680px;
          margin-top: 40px;
        }
        .search-results-title {
          font-size: 9px;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: #555;
          margin-bottom: 16px;
          padding-bottom: 12px;
          border-bottom: 1px solid rgba(201,168,76,0.1);
        }
        .search-result-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px 0;
          border-bottom: 1px solid rgba(201,168,76,0.06);
          cursor: pointer;
          transition: all 0.2s;
        }
        .search-result-item:hover {
          padding-left: 12px;
          border-bottom-color: rgba(201,168,76,0.2);
        }
        .search-result-emoji {
          width: 52px;
          height: 52px;
          background: #111;
          border: 1px solid rgba(201,168,76,0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          flex-shrink: 0;
        }
        .search-result-info { flex: 1; }
        .search-result-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 20px;
          color: #F5F0E8;
          margin-bottom: 4px;
        }
        .search-result-cat {
          font-size: 9px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #C9A84C;
        }
        .search-result-price {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px;
          color: #C9A84C;
          flex-shrink: 0;
        }
        .search-no-result {
          text-align: center;
          padding: 48px 0;
        }
        .search-no-result-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 32px;
          color: #333;
          margin-bottom: 8px;
        }
        .search-no-result-sub {
          font-size: 11px;
          letter-spacing: 2px;
          color: #2a2a2a;
          text-transform: uppercase;
        }

        @media (max-width: 768px) {
          .navbar { padding: 0 24px; height: 80px; }
          .nav-logo img { height: 56px; }
          .nav-links { display: none; }
          .nav-right { display: none; }
          .menu-icon { display: block; }
          .mobile-menu { top: 80px; }
        }
      `}</style>

      {/* SEARCH OVERLAY */}
      {searchOpen && (
        <div className="search-overlay">
          <button
            className="search-close"
            onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
          >
            <FiX size={24} />
          </button>

          <div className="search-box">
            <span className="search-label">Search Products</span>
            <div style={{ position: 'relative' }}>
              <input
                className="search-input"
                placeholder="Type to search..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onKeyDown={handleSearchKey}
                autoFocus
              />
              <button className="search-submit">
                <FiSearch size={20} />
              </button>
            </div>
            <span className="search-hint">
              Press Enter to search all · ESC to close
            </span>
          </div>

          {searchQuery.length > 1 && (
            <div className="search-results">
              {filteredProducts.length > 0 ? (
                <>
                  <p className="search-results-title">
                    {filteredProducts.length} Results found
                  </p>
                  {filteredProducts.map(product => (
                    <div
                      key={product.id}
                      className="search-result-item"
                      onClick={() => handleSearchSelect(product)}
                    >
                      <div className="search-result-emoji">{product.icon}</div>
                      <div className="search-result-info">
                        <div className="search-result-name">{product.name}</div>
                        <div className="search-result-cat">{product.category}</div>
                      </div>
                      <div className="search-result-price">₹{product.price}</div>
                    </div>
                  ))}
                </>
              ) : (
                <div className="search-no-result">
                  <p className="search-no-result-title">No results found</p>
                  <p className="search-no-result-sub">Try a different search term</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      <nav className="navbar">
        {/* LOGO */}
        <Link to="/" className="nav-logo">
          <img src={logo} alt="Yugrang Clothiers" />
        </Link>

        {/* DESKTOP LINKS */}
        <ul className="nav-links">
          <li><Link to="/" className="nav-link">Home</Link></li>
          <li><Link to="/products" className="nav-link">Collection</Link></li>
          <li><Link to="/customize" className="nav-link">Customise</Link></li>
        </ul>

        {/* DESKTOP RIGHT */}
        <div className="nav-right">
          {/* SEARCH */}
          <button
            className="nav-search-btn"
            onClick={() => setSearchOpen(true)}
          >
            <FiSearch size={20} />
          </button>

          {/* CART */}
          <div className="cart-icon-wrap" onClick={() => navigate('/cart')}>
            <FiShoppingCart size={20} />
            {totalItems > 0 && (
              <span className="cart-badge">{totalItems}</span>
            )}
          </div>

          {/* WISHLIST */}
          <div
            className="cart-icon-wrap"
            onClick={() => navigate('/wishlist')}
            style={{ color: wishlist?.length > 0 ? '#C9A84C' : '#888' }}
          >
            <FiHeart size={20} />
            {wishlist?.length > 0 && (
              <span className="cart-badge">{wishlist.length}</span>
            )}
          </div>

          {user ? (
            <>
              <span className="nav-username">
                <FiUser size={14} />
                {user.name}
              </span>
              <Link to="/my-orders" className="nav-link" style={{ color: '#888' }}>
                My Orders
              </Link>
              {user.email === 'yugrang2026@gmail.com' && (
                <Link to="/admin" className="nav-link" style={{ color: '#C9A84C' }}>
                  Admin
                </Link>
              )}
              <button className="nav-logout-btn" onClick={handleLogout}>
                <FiLogOut size={14} />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/signup" className="nav-signup-btn">Sign Up</Link>
            </>
          )}
        </div>

        {/* MOBILE HAMBURGER */}
        <button className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen
            ? <FiX size={24} color="#C9A84C" />
            : <FiMenu size={24} color="#C9A84C" />
          }
        </button>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div className="mobile-menu">
            <Link to="/" className="mobile-link" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link to="/products" className="mobile-link" onClick={() => setMenuOpen(false)}>Collection</Link>
            <Link to="/customize" className="mobile-link" onClick={() => setMenuOpen(false)}>Customise</Link>
            <div className="mobile-divider" />
            {user ? (
              <>
                <span className="mobile-link" style={{ color: '#C9A84C' }}>
                  👤 {user.name}
                </span>
                <Link to="/my-orders" className="mobile-link" onClick={() => setMenuOpen(false)}>
                  My Orders
                </Link>
                {user.email === 'yugrang2026@gmail.com' && (
                  <Link to="/admin" className="mobile-link" onClick={() => setMenuOpen(false)}>
                    Admin
                  </Link>
                )}
                <button className="mobile-logout" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="mobile-link" onClick={() => setMenuOpen(false)}>Login</Link>
                <Link to="/signup" className="mobile-link" onClick={() => setMenuOpen(false)}>Sign Up</Link>
              </>
            )}
          </div>
        )}
      </nav>
    </>
  );
}