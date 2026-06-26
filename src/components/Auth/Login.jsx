import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaEnvelope, FaLock } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import './Auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill all fields');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const result = login(email, password);
      setLoading(false);
      if (result.success) {
        toast.success('Welcome back! 👋', { icon: false });
        navigate(from, { replace: true });
      } else {
        toast.error(result.message || 'Login failed');
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
          <p className="auth-tagline">Login to get access to your Orders, Wishlist and Recommendations</p>
          <img
            src="https://constant.myntassets.com/web/assets/img/login.png"
            alt="login"
            className="auth-illustration"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        </div>

        <div className="auth-right">
          <h2 className="auth-title">Login</h2>
          <p className="auth-subtitle">
            Don't have an account? <Link to="/signup" className="auth-link">Create one</Link>
          </p>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <FaEnvelope className="input-icon" />
              <input
                type="email"
                placeholder="Enter Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>

            <div className="input-group">
              <FaLock className="input-icon" />
              <input
                type={showPass ? 'text' : 'password'}
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              <button type="button" className="eye-btn" onClick={() => setShowPass(!showPass)}>
                {showPass ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <p className="forgot-pass-link">
              <Link to="#">Forgot Password?</Link>
            </p>

            <button type="submit" className="auth-submit-btn" disabled={loading}>
              {loading ? <span className="btn-spinner" /> : 'LOGIN'}
            </button>
          </form>

          <div className="auth-divider"><span>OR</span></div>

          {/* Demo credentials */}
          <div className="demo-hint">
            <p>🎉 <strong>Demo Login:</strong> any email + any password (min 3 chars)</p>
          </div>

          <p className="auth-switch">
            New to Myntra? <Link to="/signup" className="auth-link">Create Account</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
