import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiPhone } from 'react-icons/fi';

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = () => {
    setError('');

    // VALIDATIONS
    if (!form.name || !form.email || !form.phone || !form.password || !form.confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }
    if (form.name.length < 2) {
      setError('Please enter your full name.');
      return;
    }
    if (!form.email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (form.phone.length < 10) {
      setError('Please enter a valid 10-digit phone number.');
      return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const result = signup(form.name, form.email, form.password, form.phone);
      if (result.success) {
        navigate('/');
      } else {
        setError(result.message);
      }
      setLoading(false);
    }, 800);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSignup();
  };

  // PASSWORD STRENGTH
  const getStrength = () => {
    const p = form.password;
    if (p.length === 0) return { label: '', color: 'transparent', width: '0%' };
    if (p.length < 4) return { label: 'Weak', color: '#ff6b6b', width: '25%' };
    if (p.length < 6) return { label: 'Fair', color: '#FFA500', width: '50%' };
    if (p.length < 10) return { label: 'Good', color: '#C9A84C', width: '75%' };
    return { label: 'Strong', color: '#4CAF50', width: '100%' };
  };
  const strength = getStrength();

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
          max-width: 500px;
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
          background: rgba(255,107,107,0.08);
          border: 1px solid rgba(255,107,107,0.3);
          padding: 12px 16px;
          font-size: 12px;
          color: #ff6b6b;
          letter-spacing: 0.5px;
          margin-bottom: 20px;
          line-height: 1.5;
        }
        .strength-bar-wrap {
          margin-top: 8px;
        }
        .strength-bar-bg {
          width: 100%;
          height: 3px;
          background: rgba(255,255,255,0.08);
          border-radius: 2px;
          overflow: hidden;
        }
        .strength-bar-fill {
          height: 100%;
          border-radius: 2px;
          transition: all 0.4s;
        }
        .strength-label {
          font-size: 10px;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-top: 5px;
        }
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
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
          top: -1px; left: -1px;
          width: 20px; height: 20px;
          border-top: 2px solid #C9A84C;
          border-left: 2px solid #C9A84C;
        }
        .corner-br {
          position: absolute;
          bottom: -1px; right: -1px;
          width: 20px; height: 20px;
          border-bottom: 2px solid #C9A84C;
          border-right: 2px solid #C9A84C;
        }
        .terms-text {
          font-size: 11px;
          color: #666;
          text-align: center;
          margin-top: 20px;
          line-height: 1.6;
          letter-spacing: 0.3px;
        }

        @media (max-width: 520px) {
          .auth-card { padding: 40px 24px; }
          .auth-title { font-size: 32px; }
          .form-row { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="auth-page">
        <div className="auth-card">

          {/* CORNER DECORATIONS */}
          <div className="corner-tl"></div>
          <div className="corner-br"></div>

          <p className="auth-eyebrow">Join Us Today</p>
          <h1 className="auth-title">Create Your<br /><em>Account</em></h1>
          <p className="auth-sub">
            Sign up to place custom orders, track deliveries,
            and save your favourite designs.
          </p>

          {/* ERROR */}
          {error && <div className="error-box">⚠ {error}</div>}

          {/* NAME & PHONE ROW */}
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <div className="input-wrapper">
                <FiUser size={15} className="input-icon" />
                <input
                  className="form-input input-with-icon"
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <div className="input-wrapper">
                <FiPhone size={15} className="input-icon" />
                <input
                  className="form-input input-with-icon"
                  type="tel"
                  name="phone"
                  placeholder="10-digit number"
                  value={form.phone}
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                  maxLength={10}
                />
              </div>
            </div>
          </div>

          {/* EMAIL */}
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div className="input-wrapper">
              <FiMail size={15} className="input-icon" />
              <input
                className="form-input input-with-icon"
                type="email"
                name="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
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
                name="password"
                placeholder="Min. 6 characters"
                value={form.password}
                onChange={handleChange}
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
            {/* PASSWORD STRENGTH */}
            {form.password.length > 0 && (
              <div className="strength-bar-wrap">
                <div className="strength-bar-bg">
                  <div
                    className="strength-bar-fill"
                    style={{
                      width: strength.width,
                      background: strength.color,
                    }}
                  />
                </div>
                <p className="strength-label" style={{ color: strength.color }}>
                  {strength.label}
                </p>
              </div>
            )}
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="form-group">
            <label className="form-label">Confirm Password</label>
            <div className="input-wrapper">
              <FiLock size={15} className="input-icon" />
              <input
                className="form-input input-with-icon"
                type={showConfirm ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Re-enter your password"
                value={form.confirmPassword}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                style={{ paddingRight: '44px' }}
              />
              <button
                className="pass-toggle"
                onClick={() => setShowConfirm(!showConfirm)}
              >
                {showConfirm ? <FiEyeOff size={15} /> : <FiEye size={15} />}
              </button>
            </div>
            {/* MATCH INDICATOR */}
            {form.confirmPassword.length > 0 && (
              <p style={{
                fontSize: '10px',
                letterSpacing: '1px',
                marginTop: '5px',
                color: form.password === form.confirmPassword ? '#4CAF50' : '#ff6b6b'
              }}>
                {form.password === form.confirmPassword ? '✓ Passwords match' : '✗ Passwords do not match'}
              </p>
            )}
          </div>

          {/* SIGNUP BUTTON */}
          <button
            className="btn-full btn-gold"
            onClick={handleSignup}
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Create My Account →'}
          </button>

          <p className="terms-text">
            By signing up you agree to our Terms of Service<br />
            and Privacy Policy.
          </p>

          <div className="auth-divider">
            <div className="auth-divider-line"></div>
            <span className="auth-divider-text">or</span>
            <div className="auth-divider-line"></div>
          </div>

          {/* LOGIN LINK */}
          <div className="auth-bottom">
            <p className="auth-bottom-text">
              Already have an account?{' '}
              <Link to="/login" className="auth-bottom-link">
                Login here
              </Link>
            </p>
          </div>

        </div>
      </div>
    </>
  );
}