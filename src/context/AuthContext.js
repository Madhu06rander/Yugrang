import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('luxethread_user')) || null
  );

  const signup = (name, email, password) => {
    const users = JSON.parse(localStorage.getItem('luxethread_users')) || [];
    
    const exists = users.find(u => u.email === email);
    if (exists) {
      return { success: false, message: 'Email already registered!' };
    }

    const newUser = { name, email, password };
    users.push(newUser);
    localStorage.setItem('luxethread_users', JSON.stringify(users));
    localStorage.setItem('luxethread_user', JSON.stringify(newUser));
    setUser(newUser);
    return { success: true };
  };

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('luxethread_users')) || [];
    
    const found = users.find(
      u => u.email === email && u.password === password
    );

    if (found) {
      localStorage.setItem('luxethread_user', JSON.stringify(found));
      setUser(found);
      return { success: true };
    }

    return { success: false, message: 'Invalid email or password!' };
  };

  const logout = () => {
    localStorage.removeItem('luxethread_user');
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