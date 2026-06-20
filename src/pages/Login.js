import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setError('');

    // VALIDATION
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    if (!email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const result = login(email, password);
      if (result.success) {
        navigate('/');
      } else {
        setError(result.message);
      }
      setLoading(false);
    }, 800);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleLogin();
  };

  return (
    <>
      <style>{`
        .auth-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 100px 24px 60px;
          background: linear-gradient(160deg, #0A0A0A 0%, #111108 100%);
          position: relative;
        }
        .auth-page::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at center, rgba(201,168,76,0.05) 0%, transparent 70%);
        }
        .auth-card {
          width: 100%;
          max-width: 460px;
          border: 1px solid rgba(201,168,76,0.2);
          padding: 56px 48px;
          background: rgba(26,26,26,0.9);
          backdrop-filter: blur(12px);
          position: relative;
          z-index: 1;
        }
        .auth-eyebrow {
          font-size: 9px;
          letter-spacing: 5px;
          text-transform: uppercase;
          color: #C9A84C;
          margin-bottom: 12px;
        }
        .auth-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 40px;
          font-weight: 300;
          color: #F5F0E8;
          margin-bottom: 8px;
          line-height: 1.1;
        }
        .auth-title em {
          font-style: italic;
          color: #C9A84C;
        }
        .auth-sub {
          font-size: 12px;
          color: #888;
          letter-spacing: 0.5px;
          margin-bottom: 40px;
          line-height: 1.7;
        }
        .input-wrapper {
          position: relative;
          width: 100%;
        }
        .input-icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: #888;
          pointer-events: none;
        }
        .input-with-icon {
          padding-left: 44px !important;
        }
        .pass-toggle {
          position: absolute;
          right: 16px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: #888;
          cursor: pointer;
          padding: 0;
          transition: color 0.2s;
        }
        .pass-toggle:hover { color: #C9A84C; }
        .error-box {
          background: rgba(255, 107, 107, 0.08);
          border: 1px solid rgba(255, 107, 107, 0.3);
          padding: 12px 16px;
          font-size: 12px;
          color: #ff6b6b;
          letter-spacing: 0.5px;
          margin-bottom: 20px;
          line-height: 1.5;
        }
        .auth-divider {
          display: flex;
          align-items: center;
          gap: 16px;
          margin: 28px 0;
        }
        .auth-divider-line {
          flex: 1;
          height: 1px;
          background: rgba(201,168,76,0.15);
        }
        .auth-divider-text {
          font-size: 10px;
          letter-spacing: 2px;
          color: #888;
          text-transform: uppercase;
        }
        .auth-bottom {
          text-align: center;
          margin-top: 28px;
        }
        .auth-bottom-text {
          font-size: 12px;
          color: #888;
          letter-spacing: 0.5px;
        }
        .auth-bottom-link {
          color: #C9A84C;
          text-decoration: none;
          letter-spacing: 1px;
          font-size: 12px;
          transition: color 0.2s;
        }
        .auth-bottom-link:hover { color: #E8D5A3; }
        .btn-full {
          width: 100%;
          padding: 16px;
          font-size: 11px;
          letter-spacing: 3px;
          text-transform: uppercase;
          cursor: pointer;
          font-family: 'Jost', sans-serif;
          font-weight: 500;
          border: none;
          transition: all 0.3s;
        }
        .btn-gold {
          background: #C9A84C;
          color: #0A0A0A;
        }
        .btn-gold:hover:not(:disabled) {
          background: #E8D5A3;
          transform: translateY(-2px);
        }
        .btn-gold:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .corner-tl {
          position: absolute;
          top: -1px;
          left: -1px;
          width: 20px;
          height: 20px;
          border-top: 2px solid #C9A84C;
          border-left: 2px solid #C9A84C;
        }
        .corner-br {
          position: absolute;
          bottom: -1px;
          right: -1px;
          width: 20px;
          height: 20px;
          border-bottom: 2px solid #C9A84C;
          border-right: 2px solid #C9A84C;
        }

        @media (max-width: 520px) {
          .auth-card { padding: 40px 24px; }
          .auth-title { font-size: 32px; }
        }
      `}</style>

      <div className="auth-page">
        <div className="auth-card">

          {/* CORNER DECORATIONS */}
          <div className="corner-tl"></div>
          <div className="corner-br"></div>

          <p className="auth-eyebrow">Welcome Back</p>
          <h1 className="auth-title">Login to<br /><em>Luxe Thread</em></h1>
          <p className="auth-sub">
            Enter your credentials to access your account and manage your orders.
          </p>

          {/* ERROR */}
          {error && <div className="error-box">⚠ {error}</div>}

          {/* EMAIL */}
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div className="input-wrapper">
              <FiMail size={15} className="input-icon" />
              <input
                className="form-input input-with-icon"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="input-wrapper">
              <FiLock size={15} className="input-icon" />
              <input
                className="form-input input-with-icon"
                type={showPass ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                style={{ paddingRight: '44px' }}
              />
              <button
                className="pass-toggle"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? <FiEyeOff size={15} /> : <FiEye size={15} />}
              </button>
            </div>
          </div>

          {/* LOGIN BUTTON */}
          <button
            className="btn-full btn-gold"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login to Account →'}
          </button>

          <div className="auth-divider">
            <div className="auth-divider-line"></div>
            <span className="auth-divider-text">or</span>
            <div className="auth-divider-line"></div>
          </div>

          {/* SIGNUP LINK */}
          <div className="auth-bottom">
            <p className="auth-bottom-text">
              Don't have an account?{' '}
              <Link to="/signup" className="auth-bottom-link">
                Create one here
              </Link>
            </p>
          </div>

        </div>
      </div>
    </>
  );
}