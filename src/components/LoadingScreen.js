import { useState, useEffect } from 'react';
import logo from '../assets/Logo.png';

export default function LoadingScreen({ onComplete }) {
  const [phase, setPhase] = useState('enter');

  useEffect(() => {
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
  }, []);

  return (
    <>
      <style>{`
        .ls-overlay {
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
        }
        .ls-logo {
          width: 80px;
          height: 80px;
          object-fit: contain;
          filter: brightness(1.3) drop-shadow(0 0 20px rgba(201,168,76,0.6));
          animation: lsFloat 2s ease-in-out infinite alternate;
        }
        @keyframes lsFloat {
          0% { transform: translateY(0px); }
          100% { transform: translateY(-10px); }
        }
        .ls-brand {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(48px, 10vw, 96px);
          font-weight: 300;
          letter-spacing: 16px;
          color: transparent;
          background: linear-gradient(90deg, #8B6914, #C9A84C, #E8D5A3, #C9A84C, #8B6914);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          animation: lsShimmer 2s linear infinite;
          text-transform: uppercase;
          margin: 0;
        }
        @keyframes lsShimmer {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
        .ls-line {
          height: 1px;
          background: linear-gradient(90deg, transparent, #C9A84C, transparent);
          animation: lsExpand 0.8s ease forwards 0.3s;
          width: 0;
          opacity: 0;
        }
        @keyframes lsExpand {
          from { width: 0; opacity: 0; }
          to { width: 200px; opacity: 1; }
        }
        .ls-tagline {
          font-size: 11px;
          letter-spacing: 6px;
          text-transform: uppercase;
          color: #555;
          animation: lsFadeUp 0.6s ease forwards 0.5s;
          opacity: 0;
        }
        @keyframes lsFadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="ls-overlay">
        <img src={logo} alt="Yugrang" className="ls-logo" />
        <h1 className="ls-brand">Yugrang</h1>
        <div className="ls-line" />
        <p className="ls-tagline">Clothiers · Est. 2026</p>
      </div>
    </>
  );
}