import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

export default function AboutUs() {
  const navigate = useNavigate();

  return (
    <>
      <style>{`
        .about-page {
          min-height: 100vh;
          background: #0A0A0A;
          padding: 100px 60px 80px;
          width: 100%;
          box-sizing: border-box;
        }
        .back-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: transparent;
          border: none;
          color: #888;
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          cursor: pointer;
          font-family: 'Jost', sans-serif;
          margin-bottom: 40px;
          transition: color 0.2s;
          padding: 0;
        }
        .back-btn:hover { color: #C9A84C; }
        .about-hero {
          text-align: center;
          padding: 60px 0;
          border-bottom: 1px solid rgba(201,168,76,0.1);
          margin-bottom: 80px;
        }
        .about-hero-tag {
          font-size: 9px;
          letter-spacing: 5px;
          text-transform: uppercase;
          color: #C9A84C;
          margin-bottom: 20px;
        }
        .about-hero-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(48px, 7vw, 96px);
          font-weight: 300;
          color: #F5F0E8;
          line-height: 1.05;
          margin-bottom: 24px;
        }
        .about-hero-title em { font-style: italic; color: #C9A84C; }
        .about-hero-sub {
          font-size: 13px;
          color: #888;
          letter-spacing: 1px;
          line-height: 1.8;
          max-width: 500px;
          margin: 0 auto;
        }
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          margin-bottom: 80px;
          align-items: center;
        }
        .about-section-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 42px;
          font-weight: 300;
          color: #F5F0E8;
          margin-bottom: 24px;
          line-height: 1.2;
        }
        .about-section-title em { font-style: italic; color: #C9A84C; }
        .about-text {
          font-size: 13px;
          color: #888;
          line-height: 2;
          margin-bottom: 16px;
          letter-spacing: 0.3px;
        }
        .about-values {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-bottom: 80px;
        }
        .value-card {
          background: #111;
          border: 1px solid rgba(201,168,76,0.1);
          padding: 32px 24px;
          text-align: center;
          transition: all 0.3s;
        }
        .value-card:hover {
          border-color: rgba(201,168,76,0.3);
          transform: translateY(-4px);
        }
        .value-icon { font-size: 36px; margin-bottom: 16px; }
        .value-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px;
          color: #F5F0E8;
          margin-bottom: 12px;
        }
        .value-desc { font-size: 12px; color: #888; line-height: 1.8; }
        .team-section {
          background: #111;
          border: 1px solid rgba(201,168,76,0.1);
          padding: 60px;
          text-align: center;
          margin-bottom: 80px;
        }
        .generation-badge {
          display: inline-block;
          background: rgba(201,168,76,0.1);
          border: 1px solid rgba(201,168,76,0.3);
          color: #C9A84C;
          font-size: 9px;
          letter-spacing: 4px;
          text-transform: uppercase;
          padding: 8px 20px;
          margin-bottom: 24px;
        }
        .generation-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 52px;
          color: #F5F0E8;
          font-weight: 300;
          margin-bottom: 16px;
        }
        .generation-title em { font-style: italic; color: #C9A84C; }
        .generation-desc {
          font-size: 13px;
          color: #888;
          line-height: 2;
          max-width: 600px;
          margin: 0 auto;
        }
        @media (max-width: 768px) {
          .about-page { padding: 100px 24px 60px; }
          .about-grid { grid-template-columns: 1fr; gap: 40px; }
          .about-values { grid-template-columns: 1fr; }
          .team-section { padding: 40px 24px; }
          .generation-title { font-size: 36px; }
        }
      `}</style>

      <div className="about-page">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <FiArrowLeft size={14} /> Back
        </button>

        {/* HERO */}
        <div className="about-hero">
          <p className="about-hero-tag">Our Story</p>
          <h1 className="about-hero-title">
            About <em>Yugrang</em>
          </h1>
          <p className="about-hero-sub">
            Three generations of craftsmanship, passion, and dedication to the art of clothing — from Udaipur, Rajasthan to your doorstep.
          </p>
        </div>

        {/* STORY */}
        <div className="about-grid">
          <div>
            <h2 className="about-section-title">
              Our <em>Story</em>
            </h2>
            <p className="about-text">
              Yugrang was born from a legacy of love for clothing and craftsmanship. What started as a small family venture in Udaipur, Rajasthan, has now grown into a modern custom clothing brand — carrying the rich heritage of three generations.
            </p>
            <p className="about-text">
              The name "Yugrang" comes from two Sanskrit words — "Yug" (era/generation) and "Rang" (colour). Together, they represent our belief that every era has its own colours, and every person has a unique story to tell through what they wear.
            </p>
            <p className="about-text">
              We combine traditional Indian craftsmanship with modern design sensibilities to create clothing that is not just worn — but felt.
            </p>
          </div>
          <div style={{
            background: '#111',
            border: '1px solid rgba(201,168,76,0.15)',
            padding: '48px',
            textAlign: 'center'
          }}>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '80px',
              color: '#C9A84C',
              opacity: 0.3,
              lineHeight: 1,
              marginBottom: '16px'
            }}>❝</div>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '24px',
              color: '#F5F0E8',
              fontStyle: 'italic',
              lineHeight: 1.6,
              marginBottom: '24px'
            }}>
              "Where Every Colour Tells Your Story"
            </p>
            <p style={{ fontSize: '11px', color: '#555', letterSpacing: '3px', textTransform: 'uppercase' }}>
              — Yugrang Clothiers
            </p>
          </div>
        </div>

        {/* VALUES */}
        <p style={{ fontSize: '9px', letterSpacing: '5px', textTransform: 'uppercase', color: '#C9A84C', marginBottom: '16px' }}>
          What We Stand For
        </p>
        <h2 className="about-section-title" style={{ marginBottom: '40px' }}>
          Our <em>Values</em>
        </h2>
        <div className="about-values">
          {[
            { icon: '🎨', title: 'Artistry', desc: 'Every piece is crafted with artistic intention — hand painted designs, mandala prints, and unique patterns that stand out.' },
            { icon: '🧵', title: 'Quality', desc: 'We use only premium quality fabrics and materials. 100% cotton, soft textures, and durable prints that last.' },
            { icon: '💛', title: 'Passion', desc: 'Clothing is not just our business — it is our passion. Three generations of love for the craft goes into every garment.' },
            { icon: '✂️', title: 'Customisation', desc: 'We believe everyone deserves clothing that is truly theirs. Custom designs, sizes, and prints — made just for you.' },
            { icon: '🌱', title: 'Heritage', desc: 'Rooted in the rich cultural heritage of Rajasthan, we bring traditional artistry to modern fashion.' },
            { icon: '🤝', title: 'Trust', desc: 'We build lasting relationships with our customers. Your satisfaction is our priority — from order to delivery.' },
          ].map((v, i) => (
            <div className="value-card" key={i}>
              <div className="value-icon">{v.icon}</div>
              <div className="value-title">{v.title}</div>
              <p className="value-desc">{v.desc}</p>
            </div>
          ))}
        </div>

        {/* GENERATION */}
        <div className="team-section">
          <div className="generation-badge">तृतीयपीढ़ी वस्त्र व्यवसाय</div>
          <h2 className="generation-title">
            3rd <em>Generation</em>
          </h2>
          <p className="generation-desc">
            Our family has been in the clothing business for three generations. Each generation has brought its own innovation, creativity, and dedication — and we continue that legacy with Yugrang Clothiers.
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '32px',
            marginTop: '48px',
            paddingTop: '48px',
            borderTop: '1px solid rgba(201,168,76,0.1)'
          }}>
            {[
              { gen: '1st', title: 'The Foundation', desc: 'Started with traditional hand-stitched clothing in Udaipur' },
              { gen: '2nd', title: 'The Growth', desc: 'Expanded to custom printing and modern designs' },
              { gen: '3rd', title: 'The Innovation', desc: 'Yugrang — bringing heritage to the digital age' },
            ].map((g, i) => (
              <div key={i}>
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '36px',
                  color: '#C9A84C',
                  marginBottom: '8px'
                }}>{g.gen}</div>
                <div style={{
                  fontSize: '14px',
                  color: '#F5F0E8',
                  fontFamily: "'Cormorant Garamond', serif",
                  marginBottom: '8px'
                }}>{g.title}</div>
                <p style={{ fontSize: '12px', color: '#666', lineHeight: '1.7' }}>{g.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', padding: '40px 0' }}>
          <p style={{ fontSize: '9px', letterSpacing: '5px', color: '#C9A84C', textTransform: 'uppercase', marginBottom: '16px' }}>
            Start Shopping
          </p>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '48px',
            color: '#F5F0E8',
            fontWeight: '300',
            marginBottom: '32px'
          }}>
            Wear Our <em style={{ fontStyle: 'italic', color: '#C9A84C' }}>Legacy</em>
          </h2>
          <button
            onClick={() => navigate('/products')}
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
            }}
          >
            Explore Collection
          </button>
        </div>
      </div>
    </>
  );
}