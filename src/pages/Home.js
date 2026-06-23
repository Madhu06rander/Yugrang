import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiArrowRight, FiStar, FiTruck, FiScissors, FiCreditCard } from 'react-icons/fi';

export default function Home() {
  const { user } = useAuth();

  const features = [
    { icon: <FiScissors size={28} />, title: 'Custom Design', desc: 'Upload your own design or choose from our collection' },
    { icon: <FiStar size={28} />, title: 'Premium Quality', desc: '100% cotton and premium fabrics for every garment' },
    { icon: <FiTruck size={28} />, title: 'Pan India Delivery', desc: 'Fast delivery within 5-7 business days anywhere in India' },
    { icon: <FiCreditCard size={28} />, title: 'Easy Payment', desc: 'Cash on Delivery and all online payment methods accepted' },
  ];

  const products = [
    { icon: '👔', name: 'Men Shirts', desc: 'Classic & custom shirts', price: 'From ₹899', category: 'Men Shirts' },
    { icon: '👕', name: 'Mens T-Shirt', desc: 'Casual & printed tees', price: 'From ₹499', category: 'Mens T-Shirt' },
    { icon: '🧥', name: 'Men Kurta', desc: 'Denim style kurta', price: 'From ₹849', category: 'Men Kurta' },
    { icon: '👗', name: 'Women Kurti', desc: 'Elegant & stylish kurtis', price: 'From ₹749', category: 'Women Kurti' },
    { icon: '👚', name: 'Women Shirt', desc: 'Custom women shirts', price: 'From ₹799', category: 'Women Shirt' },
    { icon: '👒', name: 'Women T-Shirt', desc: 'Trendy custom tees for women', price: 'From ₹449', category: 'Women T-Shirt' },
    { icon: '🧥', name: 'Couple Wear', desc: 'Matching custom couple outfits', price: 'From ₹999', category: 'Couple Wear' },
    { icon: '🫶', name: 'Hoodie', desc: 'Warm custom hoodies', price: 'From ₹1299', category: 'Hoodie' },
    { icon: '🎁', name: 'Handkerchief', desc: 'Monogrammed & gifting', price: 'From ₹149', category: 'Handkerchief' },
  ];

  return (
    <>
      <style>{`
        /* HERO */
        .hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 120px 24px 80px;
          background: linear-gradient(160deg, #0A0A0A 0%, #111108 60%, #0A0A08 100%);
          position: relative;
          overflow: hidden;
        }
        .hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at center, rgba(201,168,76,0.06) 0%, transparent 70%);
        }
        .hero-eyebrow {
          font-size: 10px;
          letter-spacing: 6px;
          text-transform: uppercase;
          color: #C9A84C;
          margin-bottom: 24px;
        }
        .hero-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(52px, 9vw, 110px);
          font-weight: 300;
          line-height: 1.05;
          color: #F5F0E8;
          margin-bottom: 24px;
        }
        .hero-title em {
          font-style: italic;
          color: #C9A84C;
        }
        .hero-sub {
          font-size: 13px;
          letter-spacing: 2px;
          color: #888;
          max-width: 420px;
          margin: 0 auto 48px;
          line-height: 1.8;
          text-transform: uppercase;
        }
        .hero-btns {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
        }
        .hero-welcome {
          font-size: 13px;
          color: #C9A84C;
          letter-spacing: 2px;
          margin-bottom: 20px;
        }

        /* MARQUEE */
        .marquee-wrap {
          background: #C9A84C;
          padding: 14px 0;
          overflow: hidden;
        }
        .marquee-track {
          display: flex;
          animation: marquee 25s linear infinite;
          white-space: nowrap;
          width: max-content;
        }
        .marquee-item {
          font-size: 10px;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: #0A0A0A;
          font-weight: 500;
          padding: 0 30px;
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        /* FEATURES */
        .features-section {
          padding: 100px 60px;
          background: #1A1A1A;
        }
        .features-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 40px;
          margin-top: 60px;
        }
        .feature-card {
          text-align: center;
          padding: 40px 24px;
          border: 1px solid rgba(201,168,76,0.1);
          transition: border-color 0.3s, transform 0.3s;
        }
        .feature-card:hover {
          border-color: rgba(201,168,76,0.4);
          transform: translateY(-4px);
        }
        .feature-icon {
          color: #C9A84C;
          margin-bottom: 20px;
        }
        .feature-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 20px;
          color: #F5F0E8;
          margin-bottom: 12px;
        }
        .feature-desc {
          font-size: 12px;
          color: #888;
          line-height: 1.8;
          letter-spacing: 0.5px;
        }

        /* PRODUCTS PREVIEW */
        .products-section {
          padding: 100px 60px;
          background: #0A0A0A;
        }
        .products-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 2px;
          margin-top: 60px;
        }
        .product-card {
          background: #111;
          padding: 40px 20px;
          text-align: center;
          border: 1px solid rgba(201,168,76,0.08);
          transition: all 0.3s;
          cursor: pointer;
        }
        .product-card:hover {
          border-color: rgba(201,168,76,0.35);
          background: #161616;
          transform: translateY(-4px);
        }
        .product-emoji {
          font-size: 52px;
          margin-bottom: 16px;
          display: block;
        }
        .product-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 18px;
          color: #F5F0E8;
          margin-bottom: 8px;
        }
        .product-desc-text {
          font-size: 11px;
          color: #888;
          margin-bottom: 12px;
          letter-spacing: 0.5px;
        }
        .product-price {
          font-size: 12px;
          color: #C9A84C;
          letter-spacing: 2px;
        }

        /* STATS */
        .stats-section {
          padding: 80px 60px;
          background: #1A1A1A;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 40px;
          border-top: 1px solid rgba(201,168,76,0.1);
          border-bottom: 1px solid rgba(201,168,76,0.1);
        }
        .stat-item { text-align: center; }
        .stat-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 52px;
          color: #C9A84C;
          font-weight: 300;
          margin-bottom: 8px;
        }
        .stat-label {
          font-size: 10px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #888;
        }

        /* CTA SECTION */
        .cta-section {
          padding: 100px 60px;
          background: #0A0A0A;
          text-align: center;
        }
        .cta-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(40px, 5vw, 72px);
          font-weight: 300;
          color: #F5F0E8;
          margin-bottom: 20px;
          line-height: 1.1;
        }
        .cta-title em {
          font-style: italic;
          color: #C9A84C;
        }
        .cta-sub {
          font-size: 12px;
          color: #888;
          letter-spacing: 1px;
          margin-bottom: 48px;
          line-height: 1.8;
        }

        /* RESPONSIVE */
        @media (max-width: 1100px) {
          .products-grid { grid-template-columns: repeat(3, 1fr); }
          .features-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          .features-section { padding: 60px 24px; }
          .products-section { padding: 60px 24px; }
          .stats-section {
            padding: 60px 24px;
            grid-template-columns: repeat(2, 1fr);
          }
          .cta-section { padding: 60px 24px; }
          .products-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 480px) {
          .products-grid { grid-template-columns: 1fr; }
          .features-grid { grid-template-columns: 1fr; }
          .stats-section { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>

      {/* HERO */}
      <section className="hero">
        <div style={{ position: 'relative', zIndex: 1 }}>
          {user && (
            <p className="hero-welcome">Welcome back, {user.name}! 👋</p>
          )}
          <p className="hero-eyebrow">Yugrang · Est. 2026 · Handcrafted for You</p>
          <h1 className="hero-title">
            Wear What<br /><em>You Imagine</em>
          </h1>
          <p className="hero-sub">
            Bespoke clothing tailored to your vision —<br />
            shirts, kurtas, tees & more
          </p>
          <div className="hero-btns">
            <Link to="/products" className="btn-primary">
              Explore Collection
            </Link>
            <Link to="/customize" className="btn-outline">
              Customise Yours
            </Link>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee-wrap">
        <div className="marquee-track">
          {[...Array(2)].map((_, i) =>
            ['Premium Quality', '✦', 'Custom Designs', '✦',
              'Pan India Delivery', '✦', 'Made to Order', '✦',
              'Your Style Your Way', '✦', 'Cash on Delivery', '✦',
              'Bulk Orders Welcome', '✦', '100% Cotton', '✦'
            ].map((item, j) => (
              <span key={`${i}-${j}`} className="marquee-item">{item}</span>
            ))
          )}
        </div>
      </div>

      {/* FEATURES */}
      <section className="features-section">
        <p className="section-eyebrow">Why Choose Us</p>
        <h2 className="section-title">Crafted with<br />Intention</h2>
        <div className="section-line"></div>
        <div className="features-grid">
          {features.map((f, i) => (
            <div className="feature-card" key={i}>
              <div className="feature-icon">{f.icon}</div>
              <div className="feature-title">{f.title}</div>
              <p className="feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUCTS PREVIEW */}
      <section className="products-section">
        <p className="section-eyebrow">Our Collection</p>
        <h2 className="section-title">What We Make</h2>
        <div className="section-line"></div>
        <div className="products-grid">
          {products.map((p, i) => (
            <Link to={`/products?category=${p.category}`} key={i} style={{ textDecoration: 'none' }}>
              <div className="product-card">
                <span className="product-emoji">{p.icon}</span>
                <div className="product-name">{p.name}</div>
                <p className="product-desc-text">{p.desc}</p>
                <div className="product-price">{p.price}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* STATS */}
      <div className="stats-section">
        <div className="stat-item">
          <div className="stat-num">500+</div>
          <div className="stat-label">Happy Customers</div>
        </div>
        <div className="stat-item">
          <div className="stat-num">100%</div>
          <div className="stat-label">Custom Designs</div>
        </div>
        <div className="stat-item">
          <div className="stat-num">7</div>
          <div className="stat-label">Days Delivery</div>
        </div>
        <div className="stat-item">
          <div className="stat-num">5★</div>
          <div className="stat-label">Rated Quality</div>
        </div>
      </div>

      {/* CTA */}
      <section className="cta-section">
        <p className="section-eyebrow">Get Started</p>
        <h2 className="cta-title">
          Ready to Create<br /><em>Something Unique?</em>
        </h2>
        <p className="cta-sub">
          Join hundreds of happy customers who wear their imagination.
        </p>
        <div className="hero-btns">
          {user ? (
            <Link to="/customize" className="btn-primary">
              Start Customising <FiArrowRight style={{ marginLeft: 8 }} />
            </Link>
          ) : (
            <>
              <Link to="/signup" className="btn-primary">
                Create Account
              </Link>
              <Link to="/products" className="btn-outline">
                View Collection
              </Link>
            </>
          )}
        </div>
      </section>
    </>
  );
}