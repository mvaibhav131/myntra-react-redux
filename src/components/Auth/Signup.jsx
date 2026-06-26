import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import './Auth.css';

const Signup = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      toast.error('Please fill all fields');
      return;
    }
    if (form.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    if (form.password !== form.confirm) {
      toast.error('Passwords do not match');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const result = signup(form.name, form.email, form.password);
      setLoading(false);
      if (result.success) {
        toast.success('Account created! Welcome to Myntra 🎉', { icon: false });
        navigate('/');
      } else {
        toast.error(result.message || 'Signup failed');
      }
    }, 800);
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-left">
          <div className="auth-brand">
            <span className="logo-text">myntra</span>
          </div>
          <p className="auth-tagline">Create your account and start shopping the latest trends</p>
          <img
            src="https://constant.myntassets.com/web/assets/img/login.png"
            alt="signup"
            className="auth-illustration"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        </div>

        <div className="auth-right">
          <h2 className="auth-title">Create Account</h2>
          <p className="auth-subtitle">
            Already a member? <Link to="/login" className="auth-link">Login</Link>
          </p>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <FaUser className="input-icon" />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                autoComplete="name"
              />
            </div>

            <div className="input-group">
              <FaEnvelope className="input-icon" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
              />
            </div>

            <div className="input-group">
              <FaLock className="input-icon" />
              <input
                type={showPass ? 'text' : 'password'}
                name="password"
                placeholder="Password (min 6 characters)"
                value={form.password}
                onChange={handleChange}
                autoComplete="new-password"
              />
              <button type="button" className="eye-btn" onClick={() => setShowPass(!showPass)}>
                {showPass ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <div className="input-group">
              <FaLock className="input-icon" />
              <input
                type="password"
                name="confirm"
                placeholder="Confirm Password"
                value={form.confirm}
                onChange={handleChange}
                autoComplete="new-password"
              />
            </div>

            <p className="auth-terms">
              By creating an account, you agree to our{' '}
              <Link to="#" className="auth-link">Terms & Conditions</Link> and{' '}
              <Link to="#" className="auth-link">Privacy Policy</Link>
            </p>

            <button type="submit" className="auth-submit-btn" disabled={loading}>
              {loading ? <span className="btn-spinner" /> : 'CREATE ACCOUNT'}
            </button>
          </form>

          <p className="auth-switch">
            Already have an account? <Link to="/login" className="auth-link">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
