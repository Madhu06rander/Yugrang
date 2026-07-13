import React from 'react';
import { Link } from 'react-router-dom';
import { FiInstagram, FiTwitter, FiFacebook } from 'react-icons/fi';

export default function Footer() {
  return (
    <>
      <style>{`
        .footer {
          background: #0A0A0A;
          padding: 60px;
          border-top: 1px solid rgba(201,168,76,0.1);
        }
        .footer-inner {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 60px;
          margin-bottom: 50px;
        }
        .footer-brand {
          font-family: 'Cormorant Garamond', serif;
          font-size: 28px;
          color: #C9A84C;
          letter-spacing: 4px;
          margin-bottom: 16px;
        }
        .footer-tagline {
          font-size: 12px;
          color: #888;
          line-height: 1.8;
          max-width: 260px;
          margin-bottom: 20px;
        }
        .social-row {
          display: flex;
          gap: 16px;
        }
        .social-icon {
          color: #888;
          text-decoration: none;
          transition: color 0.3s;
          cursor: pointer;
        }
        .social-icon:hover { color: #C9A84C; }
        .footer-col-title {
          font-size: 9px;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: #C9A84C;
          margin-bottom: 20px;
        }
        .footer-col-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .footer-col-link {
          font-size: 12px;
          color: #888;
          text-decoration: none;
          letter-spacing: 0.5px;
          cursor: pointer;
          transition: color 0.3s;
        }
        .footer-col-link:hover { color: #C9A84C; }
        .footer-bottom {
          padding-top: 30px;
          border-top: 1px solid rgba(201,168,76,0.1);
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
        }
        .footer-copy {
          font-size: 10px;
          color: rgba(136,136,136,0.6);
          letter-spacing: 1px;
        }

        @media (max-width: 900px) {
          .footer { padding: 40px 24px; }
          .footer-inner {
            grid-template-columns: 1fr 1fr;
            gap: 40px;
          }
        }

        @media (max-width: 540px) {
          .footer-inner {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          .footer-bottom {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>

      <footer className="footer">
        <div className="footer-inner">

          {/* BRAND */}
          <div>
            <div className="footer-brand">YUGRANG</div>
            <p className="footer-tagline">
              Yugrang — where every colour tells your story.<br />
              Custom clothing crafted with care and passion.
            </p>
            <div className="social-row">
              <a href="https://www.instagram.com/yug_rang?igsh=ZTkzcjVzNXg2cGIw" className="social-icon"><FiInstagram size={18} /></a>
              <a href="#" className="social-icon"><FiFacebook size={18} /></a>
              <a href="#" className="social-icon"><FiTwitter size={18} /></a>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h4 className="footer-col-title">Quick Links</h4>
            <ul className="footer-col-list">
              <li><Link to="/" className="footer-col-link">Home</Link></li>
              <li><Link to="/products" className="footer-col-link">Collection</Link></li>
              <li><Link to="/customize" className="footer-col-link">Customise</Link></li>
              <li><Link to="/login" className="footer-col-link">Login</Link></li>
              <li><Link to="/signup" className="footer-col-link">Sign Up</Link></li>
              <Link to="/reviews" className="footer-link">Reviews</Link>
              <Link to="/about" className="footer-link">About Us</Link>
              <Link to="/privacy" className="footer-link">Privacy Policy</Link>
            </ul>
          </div>

          {/* PRODUCTS */}
          <div>
            <h4 className="footer-col-title">Products</h4>
            <ul className="footer-col-list">
              <li><span className="footer-col-link">Shirts</span></li>
              <li><span className="footer-col-link">T-Shirts</span></li>
              <li><span className="footer-col-link">Girls Short Kurti</span></li>
              <li><span className="footer-col-link">Jeans Short Kurta</span></li>
              <li><span className="footer-col-link">Handkerchief</span></li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="footer-col-title">Contact</h4>
            <ul className="footer-col-list">
              <li><span className="footer-col-link">📍 Udaipur, Rajasthan</span></li>
              <li><span className="footer-col-link">📞 +91 XXXXXXXXXX</span></li>
              <li><span className="footer-col-link">✉️ yugrang2026@gmail.com</span></li>
              {/* <li><span className="footer-col-link">⏰ Mon–Sat, 10am–7pm</span></li> */}
            </ul>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="footer-bottom">
          <span className="footer-copy">© 2026 Yugrang. All rights reserved.</span>
          <span className="footer-copy">Made with ❤️ in India 🇮🇳</span>
        </div>
      </footer>
    </>
  );
}