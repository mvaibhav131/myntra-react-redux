import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaBox, FaHeart, FaShoppingBag, FaEdit, FaSignOutAlt, FaPhone, FaEnvelope, FaCalendar } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import './Profile.css';

const DUMMY_ORDERS = [
  { id: 'MNT20240001', date: 'Dec 15, 2024', total: 2499, status: 'Delivered', items: 2, image: 'https://picsum.photos/seed/ord1/60/80' },
  { id: 'MNT20240002', date: 'Dec 20, 2024', total: 1299, status: 'In Transit', items: 1, image: 'https://picsum.photos/seed/ord2/60/80' },
  { id: 'MNT20240003', date: 'Jan 02, 2025', total: 4999, status: 'Processing', items: 3, image: 'https://picsum.photos/seed/ord3/60/80' },
];

const STATUS_COLORS = {
  Delivered: 'var(--green)',
  'In Transit': 'var(--orange)',
  Processing: '#1976d2',
};

const Profile = () => {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();
  const cart = useSelector((s) => s.productReducer.cart);
  const wishlist = useSelector((s) => s.productReducer.wishlist);
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({ name: user?.name || '', phone: user?.phone || '' });

  if (!user) {
    return (
      <div className="profile-page">
        <div className="profile-not-logged-in">
          <FaUser className="pnl-icon" />
          <h2>Please login to view your profile</h2>
          <Link to="/login" className="pnl-login-btn">LOGIN / SIGNUP</Link>
        </div>
      </div>
    );
  }

  const handleSave = () => {
    if (!editForm.name.trim()) { toast.error('Name cannot be empty'); return; }
    updateUser(editForm);
    setEditing(false);
    toast.success('Profile updated!');
  };

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/');
  };

  const initials = user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <div className="profile-page">
      <div className="profile-container">
        {/* Sidebar */}
        <aside className="profile-sidebar">
          <div className="profile-avatar">
            <div className="avatar-circle">{initials}</div>
            <div className="avatar-info">
              <strong>{user.name}</strong>
              <span>{user.email}</span>
            </div>
          </div>

          <nav className="profile-nav">
            <a href="#overview" className="profile-nav-item active"><FaUser /> My Account</a>
            <a href="#orders"   className="profile-nav-item"><FaBox /> My Orders</a>
            <Link to="/wishlist" className="profile-nav-item"><FaHeart /> Wishlist ({wishlist.length})</Link>
            <Link to="/cart"    className="profile-nav-item"><FaShoppingBag /> My Bag ({cart.length})</Link>
            <button className="profile-nav-item logout-nav-btn" onClick={handleLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </nav>
        </aside>

        {/* Main content */}
        <main className="profile-main">
          {/* Account overview */}
          <div className="profile-section" id="overview">
            <div className="section-head">
              <h3>My Account</h3>
              {!editing && (
                <button className="edit-profile-btn" onClick={() => setEditing(true)}>
                  <FaEdit /> Edit
                </button>
              )}
            </div>

            {editing ? (
              <div className="edit-form">
                <div className="edit-field">
                  <label>Full Name</label>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  />
                </div>
                <div className="edit-field">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+91 XXXXX XXXXX"
                    value={editForm.phone}
                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                    maxLength={14}
                  />
                </div>
                <div className="edit-actions">
                  <button className="save-btn" onClick={handleSave}>Save Changes</button>
                  <button className="cancel-btn" onClick={() => setEditing(false)}>Cancel</button>
                </div>
              </div>
            ) : (
              <div className="profile-info-grid">
                <div className="pi-item">
                  <FaUser className="pi-icon" />
                  <div>
                    <span className="pi-label">Full Name</span>
                    <strong className="pi-value">{user.name}</strong>
                  </div>
                </div>
                <div className="pi-item">
                  <FaEnvelope className="pi-icon" />
                  <div>
                    <span className="pi-label">Email Address</span>
                    <strong className="pi-value">{user.email}</strong>
                  </div>
                </div>
                <div className="pi-item">
                  <FaPhone className="pi-icon" />
                  <div>
                    <span className="pi-label">Phone Number</span>
                    <strong className="pi-value">{user.phone || 'Not added'}</strong>
                  </div>
                </div>
                <div className="pi-item">
                  <FaCalendar className="pi-icon" />
                  <div>
                    <span className="pi-label">Member Since</span>
                    <strong className="pi-value">{user.joined || 'N/A'}</strong>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="profile-stats">
            <div className="stat-card" onClick={() => navigate('/cart')}>
              <FaShoppingBag className="stat-icon" style={{ color: 'var(--primary)' }} />
              <strong>{cart.length}</strong>
              <span>Bag Items</span>
            </div>
            <div className="stat-card" onClick={() => navigate('/wishlist')}>
              <FaHeart className="stat-icon" style={{ color: 'var(--primary)' }} />
              <strong>{wishlist.length}</strong>
              <span>Wishlist</span>
            </div>
            <div className="stat-card">
              <FaBox className="stat-icon" style={{ color: 'var(--orange)' }} />
              <strong>{DUMMY_ORDERS.length}</strong>
              <span>Orders</span>
            </div>
          </div>

          {/* Orders */}
          <div className="profile-section" id="orders">
            <div className="section-head"><h3>My Orders</h3></div>
            <div className="orders-list">
              {DUMMY_ORDERS.map((order) => (
                <div key={order.id} className="order-card">
                  <img src={order.image} alt="order" onError={(e) => { e.target.src = 'https://picsum.photos/seed/order/60/80'; }} />
                  <div className="order-card-info">
                    <p className="order-id">Order #{order.id}</p>
                    <p className="order-meta">{order.date} · {order.items} item{order.items > 1 ? 's' : ''}</p>
                    <p className="order-total">₹{order.total.toLocaleString('en-IN')}</p>
                  </div>
                  <div>
                    <span className="order-status" style={{ color: STATUS_COLORS[order.status] }}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;
