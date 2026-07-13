import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import logo from '../assets/Logo.png';

export default function ScrollToTopOnNavigate() {
  const { pathname } = useLocation();
  const [loading, setLoading] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    setLoading(true);
    setFadeOut(false);
    window.scrollTo(0, 0);

    // 1.5 sec baad fadeout shuru
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 1500);

    // 2 sec baad completely hatao
    const hideTimer = setTimeout(() => {
      setLoading(false);
      setFadeOut(false);
    }, 2000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, [pathname]);

  if (!loading) return null;

  return (
    <>
      <style>{`
        .page-loader {
          position: fixed;
          inset: 0;
          background: #0A0A0A;
          z-index: 999998;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          transition: opacity 0.5s ease;
          opacity: ${fadeOut ? 0 : 1};
        }
        .page-loader-logo {
          width: 90px;
          height: 90px;
          object-fit: contain;
          filter: brightness(1.3) contrast(1.1) drop-shadow(0 0 16px rgba(201,168,76,0.5));
          animation: spinLogo 2s linear infinite;
        }
        @keyframes spinLogo {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .page-loader-bar {
          width: 120px;
          height: 1px;
          background: rgba(201,168,76,0.15);
          margin-top: 28px;
          overflow: hidden;
          position: relative;
        }
        .page-loader-bar-fill {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          background: #C9A84C;
          animation: loadFill 1.5s ease forwards;
        }
        @keyframes loadFill {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>

      <div className="page-loader">
        <img src={logo} alt="Yugrang" className="page-loader-logo" />
        <div className="page-loader-bar">
          <div className="page-loader-bar-fill" />
        </div>
      </div>
    </>
  );
}