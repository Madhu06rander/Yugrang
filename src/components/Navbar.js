import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiMenu, FiX, FiUser, FiLogOut } from 'react-icons/fi';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

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
          background: transparent;
          border: 1px solid rgba(201,168,76,0.3);
          color: #888;
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
          border-color: #C9A84C;
          color: #C9A84C;
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
          position: absolute;
          top: 80px;
          left: 0; right: 0;
          background: #111111;
          border-top: 1px solid rgba(201,168,76,0.15);
          display: flex;
          flex-direction: column;
          padding: 24px 30px;
          gap: 22px;
          z-index: 998;
        }
        .mobile-link {
          font-size: 12px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #888;
          text-decoration: none;
          transition: color 0.3s;
        }
        .mobile-link:hover { color: #C9A84C; }
        .mobile-logout {
          background: none;
          border: none;
          color: #C9A84C;
          font-size: 12px;
          letter-spacing: 3px;
          text-transform: uppercase;
          cursor: pointer;
          font-family: 'Jost', sans-serif;
          text-align: left;
          padding: 0;
        }
        .mobile-divider {
          width: 100%;
          height: 1px;
          background: rgba(201,168,76,0.1);
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