import React, { createContext, useState, useContext } from 'react';
import { authAPI } from '../api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('yugrang_user')) || null
  );

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

  const logout = () => {
    localStorage.removeItem('yugrang_token');
    localStorage.removeItem('yugrang_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}