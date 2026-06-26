import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('myntraUser');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const login = (email, password) => {
    if (!email || !password) {
      return { success: false, message: 'Please fill all fields' };
    }
    if (password.length < 3) {
      return { success: false, message: 'Invalid password' };
    }
    const displayName = email
      .split('@')[0]
      .replace(/[._]/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase());
    const userData = {
      id: Date.now(),
      name: displayName,
      email,
      phone: '',
      joined: new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' }),
    };
    setUser(userData);
    localStorage.setItem('myntraUser', JSON.stringify(userData));
    return { success: true };
  };

  const signup = (name, email, password) => {
    if (!name || !email || !password) {
      return { success: false, message: 'Please fill all fields' };
    }
    if (password.length < 6) {
      return { success: false, message: 'Password must be at least 6 characters' };
    }
    const userData = {
      id: Date.now(),
      name,
      email,
      phone: '',
      joined: new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' }),
    };
    setUser(userData);
    localStorage.setItem('myntraUser', JSON.stringify(userData));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('myntraUser');
  };

  const updateUser = (updatedData) => {
    const newUser = { ...user, ...updatedData };
    setUser(newUser);
    localStorage.setItem('myntraUser', JSON.stringify(newUser));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signup, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
