import React, { createContext, useState, useContext, useEffect, useRef, useCallback } from 'react';
import { authAPI } from '../api';

const AuthContext = createContext();

const INACTIVE_TIMEOUT = 30 * 60 * 1000; // 30 minutes
const WARNING_TIMEOUT = 25 * 60 * 1000;  // 25 minutes (5 min pehle warning)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('yugrang_user')) || null
  );
  const [showWarning, setShowWarning] = useState(false);
  const inactiveTimer = useRef(null);
  const warningTimer = useRef(null);

  const logout = useCallback(() => {
    localStorage.removeItem('yugrang_token');
    localStorage.removeItem('yugrang_user');
    setUser(null);
    setShowWarning(false);
    clearTimeout(inactiveTimer.current);
    clearTimeout(warningTimer.current);
  }, []);

  const resetTimers = useCallback(() => {
    if (!user) return;
    setShowWarning(false);
    clearTimeout(inactiveTimer.current);
    clearTimeout(warningTimer.current);

    // 25 min baad warning
    warningTimer.current = setTimeout(() => {
      setShowWarning(true);
    }, WARNING_TIMEOUT);

    // 30 min baad auto logout
    inactiveTimer.current = setTimeout(() => {
      setShowWarning(false);
      logout();
      alert('Aap 30 minutes se inactive the — automatically logout ho gaye hain.');
    }, INACTIVE_TIMEOUT);
  }, [user, logout]);

  // User activity detect karo
  useEffect(() => {
    if (!user) return;

    const events = ['mousemove', 'mousedown', 'keypress', 'scroll', 'touchstart', 'click'];
    const handleActivity = () => resetTimers();

    events.forEach(e => window.addEventListener(e, handleActivity));
    resetTimers();

    return () => {
      events.forEach(e => window.removeEventListener(e, handleActivity));
      clearTimeout(inactiveTimer.current);
      clearTimeout(warningTimer.current);
    };
  }, [user, resetTimers]);

  const signup = async (name, email, password, phone) => {
    try {
      const result = await authAPI.signup({ name, email, password, phone });
      if (result.success) {
        localStorage.setItem('yugrang_token', result.token);
        localStorage.setItem('yugrang_user', JSON.stringify(result.user));
        setUser(result.user);
        return { success: true };
      } else {
        return { success: false, message: result.detail || 'Signup failed!' };
      }
    } catch (error) {
      return { success: false, message: 'Server error! Please try again.' };
    }
  };

  const login = async (email, password) => {
    try {
      const result = await authAPI.login({ email, password });
      if (result.success) {
        localStorage.setItem('yugrang_token', result.token);
        localStorage.setItem('yugrang_user', JSON.stringify(result.user));
        setUser(result.user);
        return { success: true };
      } else {
        return { success: false, message: result.detail || 'Invalid email or password!' };
      }
    } catch (error) {
      return { success: false, message: 'Server error! Please try again.' };
    }
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}

      {/* WARNING POPUP */}
      {showWarning && user && (
        <>
          <style>{`
            .logout-warning-overlay {
              position: fixed;
              inset: 0;
              background: rgba(0,0,0,0.85);
              z-index: 99999;
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 24px;
            }
            .logout-warning-box {
              background: #1A1A1A;
              border: 1px solid rgba(201,168,76,0.4);
              padding: 48px;
              max-width: 420px;
              width: 100%;
              text-align: center;
              position: relative;
            }
            .logout-warning-icon {
              font-size: 48px;
              margin-bottom: 20px;
            }
            .logout-warning-title {
              font-family: 'Cormorant Garamond', serif;
              font-size: 28px;
              color: #F5F0E8;
              margin-bottom: 12px;
            }
            .logout-warning-title em {
              font-style: italic;
              color: #C9A84C;
            }
            .logout-warning-sub {
              font-size: 12px;
              color: #888;
              line-height: 1.8;
              margin-bottom: 32px;
              letter-spacing: 0.5px;
            }
            .logout-warning-btns {
              display: flex;
              gap: 12px;
              justify-content: center;
            }
            .btn-stay {
              background: #C9A84C;
              color: #0A0A0A;
              border: none;
              padding: 14px 32px;
              font-size: 11px;
              letter-spacing: 2px;
              text-transform: uppercase;
              cursor: pointer;
              font-family: 'Jost', sans-serif;
              font-weight: 500;
              transition: all 0.2s;
            }
            .btn-stay:hover { background: #E8D5A3; }
            .btn-logout-now {
              background: transparent;
              color: #888;
              border: 1px solid rgba(201,168,76,0.25);
              padding: 14px 32px;
              font-size: 11px;
              letter-spacing: 2px;
              text-transform: uppercase;
              cursor: pointer;
              font-family: 'Jost', sans-serif;
              transition: all 0.2s;
            }
            .btn-logout-now:hover {
              border-color: #ff6b6b;
              color: #ff6b6b;
            }
          `}</style>
          <div className="logout-warning-overlay">
            <div className="logout-warning-box">
              <div className="logout-warning-icon">⏰</div>
              <h2 className="logout-warning-title">
                Still <em>There?</em>
              </h2>
              <p className="logout-warning-sub">
                Aap 25 minutes se inactive hain.<br />
                5 minute mein automatically logout ho jayenge!<br />
                Kya aap continue karna chahte hain?
              </p>
              <div className="logout-warning-btns">
                <button className="btn-stay" onClick={resetTimers}>
                  ✓ Haan, Continue Karo
                </button>
                <button className="btn-logout-now" onClick={logout}>
                  Logout Karo
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}