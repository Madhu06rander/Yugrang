import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiMenu, FiX, FiUser, FiLogOut, FiShoppingCart } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalItems } = useCart();

  const handleLogout = () => {
    logout();
    navigate('/');
    setMenuOpen(false);
  };

  return (
    <>
      <style>{`
        .navbar {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 999;
          padding: 0 60px;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(201,168,76,0.15);
          backdrop-filter: blur(12px);
          background: rgba(10,10,10,0.95);
        }
        .nav-logo {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px;
          font-weight: 600;
          letter-spacing: 6px;
          color: #C9A84C;
          text-decoration: none;
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
          gap: 24px;
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
        .menu-icon {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
        }
        .mobile-menu {
  position: fixed;
  top: 80px;
  right: 0;
  width: 240px;
  height: auto;
  max-height: fit-content;
  background: rgba(15,15,15,0.98);
  border: 1px solid rgba(201,168,76,0.2);
  border-top: none;
  display: flex;
  flex-direction: column;
  padding: 16px 0;
  gap: 0;
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
  color: #E8D5A3;
  padding-left: 32px;
}
        .mobile-divider {
  width: 100%;
  height: 1px;
  background: rgba(201,168,76,0.15);
  margin: 4px 0;
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
        @media (max-width: 768px) {
          .navbar { padding: 0 24px; }
          .nav-links { display: none; }
          .nav-right { display: none; }
          .menu-icon { display: block; }
        }
      `}</style>

      <nav className="navbar">
        {/* LOGO */}
        <Link to="/" className="nav-logo">LUXE THREAD</Link>

        {/* DESKTOP LINKS */}
        <ul className="nav-links">
          <li><Link to="/" className="nav-link">Home</Link></li>
          <li><Link to="/products" className="nav-link">Collection</Link></li>
          <li><Link to="/customize" className="nav-link">Customise</Link></li>
        </ul>

        {/* DESKTOP RIGHT */}
        <div className="nav-right">

          {/* CART ICON */}
          <div className="cart-icon-wrap" onClick={() => navigate('/cart')}>
            <FiShoppingCart size={20} />
            {totalItems > 0 && (
              <span className="cart-badge">{totalItems}</span>
            )}
          </div>
          {user ? (
            <>
              <span className="nav-username">
                <FiUser size={14} />
                {user.name}
              </span>
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