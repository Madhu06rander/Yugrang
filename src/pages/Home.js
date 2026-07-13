import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiArrowRight, FiStar, FiTruck, FiScissors, FiCreditCard } from 'react-icons/fi';

export default function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();

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
       * {
  box-sizing: border-box;
}
body {
  margin: 0;
  padding: 0;
  background: #0A0A0A;
}
h1, h2, h3, h4, h5, h6 {
  color: #F5F0E8;
}
p {
  color: #888;
}

        
        /* HERO */
        .hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 160px 24px 80px;
          background: linear-gradient(160deg, #0A0A0A 0%, #111108 60%, #0A0A08 100%);
          position: relative;
          overflow: hidden;
          width: 100%;
          padding: 120px 24px 80px;
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
        .hero-title em { font-style: italic; color: #C9A84C; }
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
          width: 100%;
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
          padding: 100px 40px;
          background: #1A1A1A;
          width: 100%;
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
        .feature-icon { color: #C9A84C; margin-bottom: 20px; }
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
          padding: 100px 40px;
          background: #0A0A0A;
          width: 100%;
        }
        .products-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          margin-top: 60px;
        }
        .product-card {
          background: linear-gradient(160deg, #131313 0%, #0d0d0d 100%);
          padding: 44px 28px;
          text-align: center;
          border: 1px solid rgba(201,168,76,0.1);
          border-radius: 4px;
          transition: all 0.35s ease;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }
        .product-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #C9A84C, transparent);
          opacity: 0;
          transition: opacity 0.35s;
        }
        .product-card:hover::before { opacity: 1; }
        .product-card:hover {
          border-color: rgba(201,168,76,0.4);
          background: linear-gradient(160deg, #181818 0%, #111 100%);
          transform: translateY(-6px);
          box-shadow: 0 16px 32px rgba(0,0,0,0.4);
        }
        .product-emoji {
          font-size: 40px;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 76px;
          height: 76px;
          margin-left: auto;
          margin-right: auto;
          border-radius: 50%;
          background: rgba(201,168,76,0.06);
          border: 1px solid rgba(201,168,76,0.15);
          transition: all 0.3s;
        }
        .product-card:hover .product-emoji {
          background: rgba(201,168,76,0.12);
          border-color: rgba(201,168,76,0.3);
          transform: scale(1.05);
        }
        .product-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px;
          color: #F5F0E8;
          margin-bottom: 8px;
          font-weight: 400;
        }
        .product-desc-text {
          font-size: 11px;
          color: #777;
          margin-bottom: 16px;
          letter-spacing: 0.5px;
          line-height: 1.6;
        }
        .product-price {
          font-size: 13px;
          color: #C9A84C;
          letter-spacing: 1.5px;
          font-weight: 500;
          display: inline-block;
          padding-top: 12px;
          border-top: 1px solid rgba(201,168,76,0.12);
          width: 100%;
        }

        /* ABOUT SECTION */
        .about-section {
          padding: 100px 60px;
          background: #111;
          width: 100%;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }
        .about-tag {
          display: inline-block;
          font-size: 9px;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: #C9A84C;
          border: 1px solid rgba(201,168,76,0.3);
          padding: 6px 16px;
          margin-bottom: 24px;
        }
        .about-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 48px;
          font-weight: 300;
          color: #F5F0E8;
          line-height: 1.15;
          margin-bottom: 24px;
        }
        .about-title em { font-style: italic; color: #C9A84C; }
        .about-desc {
          font-size: 13px;
          color: #888;
          line-height: 2;
          margin-bottom: 16px;
          letter-spacing: 0.3px;
        }
        .about-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-top: 40px;
          padding-top: 40px;
          border-top: 1px solid rgba(201,168,76,0.12);
        }
        .about-stat-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 36px;
          color: #C9A84C;
          margin-bottom: 4px;
        }
        .about-stat-label {
          font-size: 9px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #666;
        }
        .about-right {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .about-card {
          background: #1A1A1A;
          border: 1px solid rgba(201,168,76,0.1);
          padding: 28px 20px;
          text-align: center;
          transition: all 0.3s;
        }
        .about-card:hover {
          border-color: rgba(201,168,76,0.3);
          transform: translateY(-4px);
        }
        .about-card-icon { font-size: 32px; margin-bottom: 12px; }
        .about-card-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 16px;
          color: #F5F0E8;
          margin-bottom: 6px;
        }
        .about-card-desc { font-size: 11px; color: #666; line-height: 1.6; }

        /* PROCESS SECTION */
        .process-section {
          padding: 100px 60px;
          background: #0A0A0A;
          width: 100%;
        }
        .process-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 32px;
          margin-top: 60px;
          position: relative;
        }
        .process-grid::before {
          content: '';
          position: absolute;
          top: 32px;
          left: 10%;
          right: 10%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(201,168,76,0.3), transparent);
        }
        .process-card {
          text-align: center;
          padding: 0 16px;
          position: relative;
        }
        .process-num {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: rgba(201,168,76,0.08);
          border: 1px solid rgba(201,168,76,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 24px;
          font-family: 'Cormorant Garamond', serif;
          font-size: 24px;
          color: #C9A84C;
        }
        .process-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 20px;
          color: #F5F0E8;
          margin-bottom: 12px;
        }
        .process-desc { font-size: 12px; color: #888; line-height: 1.8; }

        /* TESTIMONIALS */
        .testimonials-section {
          padding: 100px 60px;
          background: #1A1A1A;
          width: 100%;
        }
        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-top: 60px;
        }
        .testimonial-card {
          background: #111;
          border: 1px solid rgba(201,168,76,0.1);
          padding: 32px;
          transition: all 0.3s;
        }
        .testimonial-card:hover {
          border-color: rgba(201,168,76,0.3);
          transform: translateY(-4px);
        }
        .testimonial-stars {
          color: #C9A84C;
          font-size: 14px;
          letter-spacing: 2px;
          margin-bottom: 16px;
        }
        .testimonial-text {
          font-size: 13px;
          color: #888;
          line-height: 1.9;
          margin-bottom: 24px;
          font-style: italic;
        }
        .testimonial-divider {
          height: 1px;
          background: rgba(201,168,76,0.1);
          margin-bottom: 16px;
        }
        .testimonial-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 18px;
          color: #F5F0E8;
          margin-bottom: 4px;
        }
        .testimonial-location {
          font-size: 10px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #555;
        }

        /* STATS */
        .stats-section {
          padding: 80px 60px;
          background: #C9A84C;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 40px;
          width: 100%;
        }
        .stat-item { text-align: center; }
        .stat-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 52px;
          color: #0A0A0A;
          font-weight: 300;
          margin-bottom: 8px;
        }
        .stat-label {
          font-size: 10px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: rgba(0,0,0,0.6);
        }

        /* CTA SECTION */
        .cta-section {
          padding: 120px 60px;
          background: #0A0A0A;
          text-align: center;
          width: 100%;
          position: relative;
          overflow: hidden;
        }
        .cta-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at center, rgba(201,168,76,0.05) 0%, transparent 70%);
        }
        .cta-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(40px, 5vw, 72px);
          font-weight: 300;
          color: #F5F0E8;
          margin-bottom: 20px;
          line-height: 1.1;
          position: relative;
        }
        .cta-title em { font-style: italic; color: #C9A84C; }
        .cta-sub {
          font-size: 12px;
          color: #888;
          letter-spacing: 1px;
          margin-bottom: 48px;
          line-height: 1.8;
          position: relative;
        }

        /* RESPONSIVE */
        @media (max-width: 1100px) {
          .products-grid { grid-template-columns: repeat(3, 1fr); }
          .features-grid { grid-template-columns: repeat(2, 1fr); }
          .about-section { grid-template-columns: 1fr; gap: 40px; }
          .process-grid { grid-template-columns: repeat(2, 1fr); }
          .testimonials-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          .announcement-bar { font-size: 9px; padding: 8px 12px; }
          .features-section { padding: 60px 24px; }
          .products-section { padding: 60px 24px; }
          .about-section { padding: 60px 24px; }
          .process-section { padding: 60px 24px; }
          .testimonials-section { padding: 60px 24px; }
          .stats-section { padding: 60px 24px; grid-template-columns: repeat(2, 1fr); }
          .cta-section { padding: 60px 24px; }
          .products-grid { grid-template-columns: repeat(2, 1fr); }
          .process-grid { grid-template-columns: repeat(2, 1fr); }
          .testimonials-grid { grid-template-columns: 1fr; }
          .about-right { grid-template-columns: 1fr; }
          .about-stats { grid-template-columns: repeat(3, 1fr); }
          .process-grid::before { display: none; }
        }
        @media (max-width: 480px) {
          .products-grid { grid-template-columns: 1fr; }
          .features-grid { grid-template-columns: 1fr; }
          .stats-section { grid-template-columns: repeat(2, 1fr); }
          .about-stats { grid-template-columns: repeat(2, 1fr); }
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

      {/* ABOUT SECTION */}
      <section className="about-section">
        <div>
          <span className="about-tag">Our Story</span>
          <h2 className="about-title">
            तृतीयपीढ़ी<br />
            <em>वस्त्र व्यवसाय</em>
          </h2>
          <p className="about-desc">
            Yugrang is not just a clothing brand — it is a legacy. Born in Udaipur, Rajasthan,
            we carry forward three generations of craftsmanship, passion, and dedication to
            the art of clothing.
          </p>
          <p className="about-desc">
            Every piece we create is handcrafted with love, using premium fabrics and
            traditional techniques passed down through generations — now combined with
            modern custom design capabilities.
          </p>
          <p className="about-desc">
            From hand-painted shirts to mandala kurtis, from couple wear to personalized
            handkerchiefs — every order tells a unique story.
          </p>
          <div className="about-stats">
            <div>
              <div className="about-stat-num">3rd</div>
              <div className="about-stat-label">Generation</div>
            </div>
            <div>
              <div className="about-stat-num">500+</div>
              <div className="about-stat-label">Happy Customers</div>
            </div>
            <div>
              <div className="about-stat-num">100%</div>
              <div className="about-stat-label">Handcrafted</div>
            </div>
          </div>
        </div>
        <div className="about-right">
          {[
            { icon: '🎨', title: 'Hand Painted', desc: 'Every design is painted by skilled artisans' },
            { icon: '🧵', title: 'Premium Fabric', desc: '100% cotton and premium quality materials' },
            { icon: '✂️', title: 'Custom Fit', desc: 'Made to your exact measurements' },
            { icon: '📦', title: 'Safe Delivery', desc: 'Carefully packed and delivered to you' },
          ].map((card, i) => (
            <div className="about-card" key={i}>
              <div className="about-card-icon">{card.icon}</div>
              <div className="about-card-title">{card.title}</div>
              <p className="about-card-desc">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PROCESS SECTION */}
      <section className="process-section">
        <p className="section-eyebrow">How It Works</p>
        <h2 className="section-title">Simple <em style={{ fontStyle: 'italic', color: '#C9A84C' }}>4 Steps</em></h2>
        <div className="section-line"></div>
        <div className="process-grid">
          {[
            { num: '01', title: 'Choose & Order', desc: 'Browse our collection or place a custom order with your design' },
            { num: '02', title: 'We Craft', desc: 'Our skilled artisans handcraft your garment with premium materials' },
            { num: '03', title: 'Quality Check', desc: 'Every piece goes through strict quality inspection before packing' },
            { num: '04', title: 'Delivered to You', desc: 'Your order is carefully packed and delivered within 5-7 days' },
          ].map((step, i) => (
            <div className="process-card" key={i}>
              <div className="process-num">{step.num}</div>
              <div className="process-title">{step.title}</div>
              <p className="process-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials-section">
        <p className="section-eyebrow">Customer Stories</p>
        <h2 className="section-title">What They <em style={{ fontStyle: 'italic', color: '#C9A84C' }}>Say</em></h2>
        <div className="section-line"></div>
        <div className="testimonials-grid">
          {[
            {
              stars: '★★★★★',
              text: 'Absolutely love the quality! The mandala print kurta I ordered exceeded my expectations. The fabric is so soft and the design is stunning.',
              name: 'Priya Sharma',
              location: 'Jaipur, Rajasthan'
            },
            {
              stars: '★★★★★',
              text: 'Ordered couple hoodies for our anniversary — they turned out perfect! The custom printing is so detailed. Will definitely order again!',
              name: 'Rahul & Sneha',
              location: 'Mumbai, Maharashtra'
            },
            {
              stars: '★★★★★',
              text: 'The hand painted shirt is a masterpiece. Got so many compliments! Packaging was perfect and delivery was on time. Highly recommended!',
              name: 'Arjun Mehta',
              location: 'Udaipur, Rajasthan'
            },
          ].map((t, i) => (
            <div className="testimonial-card" key={i}>
              <div className="testimonial-stars">{t.stars}</div>
              <p className="testimonial-text">"{t.text}"</p>
              <div className="testimonial-divider" />
              <div className="testimonial-name">{t.name}</div>
              <div className="testimonial-location">{t.location}</div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <button
            onClick={() => navigate('/reviews')}
            style={{
              background: 'transparent',
              border: '1px solid rgba(201,168,76,0.3)',
              color: '#C9A84C',
              padding: '12px 32px',
              fontSize: '10px',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              cursor: 'pointer',
              fontFamily: "'Jost', sans-serif",
              transition: 'all 0.2s',
            }}
          >
            View All Reviews →
          </button>
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
        <div className="hero-btns" style={{ position: 'relative' }}>
          {user ? (
            <button
              onClick={() => navigate('/customize')}
              style={{
                background: '#C9A84C',
                color: '#0A0A0A',
                border: 'none',
                padding: '16px 48px',
                fontSize: '11px',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                cursor: 'pointer',
                fontFamily: "'Jost', sans-serif",
                fontWeight: '600',
                transition: 'all 0.3s',
              }}
            >
              Start Customising →
            </button>
          ) : (
            <>
              <button
                onClick={() => navigate('/signup')}
                style={{
                  background: '#C9A84C',
                  color: '#0A0A0A',
                  border: 'none',
                  padding: '16px 48px',
                  fontSize: '11px',
                  letterSpacing: '3px',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  fontFamily: "'Jost', sans-serif",
                  fontWeight: '600',
                  transition: 'all 0.3s',
                }}
              >
                Create Account
              </button>
              <button
                onClick={() => navigate('/products')}
                style={{
                  background: 'transparent',
                  color: '#C9A84C',
                  border: '1px solid #C9A84C',
                  padding: '16px 48px',
                  fontSize: '11px',
                  letterSpacing: '3px',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  fontFamily: "'Jost', sans-serif",
                  fontWeight: '500',
                  transition: 'all 0.3s',
                }}
              >
                View Collection
              </button>
            </>
          )}
        </div>
      </section>
    </>
  );
}