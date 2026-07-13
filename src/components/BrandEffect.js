import React, { useState, useEffect } from 'react';
import logo from '../assets/Logo.png';

export default function BrandEffect({ show, message, subMessage, onComplete }) {
  const [phase, setPhase] = useState('enter');

  useEffect(() => {
    if (!show) return;
    setPhase('enter');
    const t1 = setTimeout(() => setPhase('show'), 100);
    const t2 = setTimeout(() => setPhase('fadeout'), 2500);
    const t3 = setTimeout(() => {
      if (onComplete) onComplete();
    }, 3000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [show]);

  if (!show) return null;

  return (
    <>
      <style>{`
        .be-overlay {
          position: fixed;
          inset: 0;
          background: #0A0A0A;
          z-index: 999999;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 20px;
          transition: opacity 0.5s ease;
          opacity: ${phase === 'fadeout' ? 0 : phase === 'enter' ? 0 : 1};
          pointer-events: all;
        }
        .be-logo {
          width: 80px;
          height: 80px;
          object-fit: contain;
          filter: brightness(1.3) drop-shadow(0 0 20px rgba(201,168,76,0.6));
          animation: beFloat 2s ease-in-out infinite alternate;
        }
        @keyframes beFloat {
          0% { transform: translateY(0px); }
          100% { transform: translateY(-10px); }
        }
        .be-brand {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(48px, 10vw, 96px);
          font-weight: 300;
          letter-spacing: 16px;
          color: transparent;
          background: linear-gradient(90deg, #8B6914, #C9A84C, #E8D5A3, #C9A84C, #8B6914);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          animation: beShimmer 2s linear infinite;
          text-transform: uppercase;
          margin: 0;
        }
        @keyframes beShimmer {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
        .be-line {
          height: 1px;
          background: linear-gradient(90deg, transparent, #C9A84C, transparent);
          animation: beExpand 0.8s ease forwards 0.3s;
          width: 0;
          opacity: 0;
        }
        @keyframes beExpand {
          from { width: 0; opacity: 0; }
          to { width: 200px; opacity: 1; }
        }
        .be-message {
          font-family: 'Cormorant Garamond', serif;
          font-size: 28px;
          color: #F5F0E8;
          font-weight: 300;
          letter-spacing: 3px;
          animation: beFadeUp 0.6s ease forwards 0.4s;
          opacity: 0;
          text-align: center;
        }
        .be-message em { font-style: italic; color: #C9A84C; }
        .be-sub {
          font-size: 11px;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: #555;
          animation: beFadeUp 0.6s ease forwards 0.6s;
          opacity: 0;
        }
        .be-icon {
          font-size: 40px;
          animation: beIconPop 0.5s ease forwards 0.2s;
          opacity: 0;
        }
        @keyframes beFadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes beIconPop {
          from { opacity: 0; transform: scale(0.5); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>

      <div className="be-overlay">
        <img src={logo} alt="Yugrang" className="be-logo" />
        <h1 className="be-brand">Yugrang</h1>
        <div className="be-line" />

        {message === 'order' && <div className="be-icon">✅</div>}
        {message === 'login' && <div className="be-icon">👋</div>}
        {message === 'signup' && <div className="be-icon">🎉</div>}

        {message === 'order' && (
          <p className="be-message">Order <em>Confirmed!</em></p>
        )}
        {message === 'login' && (
          <p className="be-message">Welcome <em>Back!</em></p>
        )}
        {message === 'signup' && (
          <p className="be-message">Welcome to <em>Yugrang!</em></p>
        )}

        {subMessage && <p className="be-sub">{subMessage}</p>}
      </div>
    </>
  );
}