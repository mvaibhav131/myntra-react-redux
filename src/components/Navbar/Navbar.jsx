import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaSearch, FaUser, FaHeart, FaShoppingBag, FaBars, FaTimes } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import { searchAction } from "../../ActionCreator/productActionCreator";
import "./Navbar.css";

const NAV_CATS = [
  { label: "MEN",           path: "/products/men",    subs: ["T-Shirts","Shirts","Jeans","Trousers","Shorts","Jackets","Blazers"] },
  { label: "WOMEN",         path: "/products/women",  subs: ["Kurtas","Dresses","Jeans","Skirts","Sarees","Tops","Jackets"] },
  { label: "KIDS",          path: "/products/kids",   subs: ["T-Shirts","Dresses","Sets","Sportswear","Jeans"] },
  { label: "HOME & LIVING", path: "/products/home",   subs: ["Bedsheets","Towels","Curtains","Cushions","Lamps"] },
  { label: "BEAUTY",        path: "/products/beauty", subs: ["Makeup","Skincare","Haircare","Fragrances"] },
  { label: "STUDIO",        path: "/products/studio", subs: [], badge: "NEW" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQ, setSearchQ] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [hoveredCat, setHoveredCat] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((s) => s.productReducer.cart);
  const wishlist = useSelector((s) => s.productReducer.wishlist);

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchQ.trim()) {
      dispatch(searchAction(searchQ.trim()));
      navigate("/products/all");
      setSearchQ("");
      setMobileOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    setShowProfile(false);
    setMobileOpen(false);
    navigate("/");
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-inner">
          <Link to="/" className="navbar-logo">
            <span className="logo-text">myntra</span>
          </Link>

          <div className="navbar-cats">
            {NAV_CATS.map((cat) => (
              <div
                key={cat.label}
                className="nav-cat"
                onMouseEnter={() => setHoveredCat(cat.label)}
                onMouseLeave={() => setHoveredCat(null)}
              >
                <NavLink to={cat.path} className="nav-cat-link">
                  {cat.label}
                  {cat.badge && <span className="cat-badge">{cat.badge}</span>}
                </NavLink>
                {cat.subs.length > 0 && hoveredCat === cat.label && (
                  <div className="mega-dropdown">
                    {cat.subs.map((s) => (
                      <Link key={s} to={`${cat.path}?cat=${s.toLowerCase()}`} onClick={() => setHoveredCat(null)}>
                        {s}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className={`navbar-search${searchFocused ? " focused" : ""}`}>
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search for products, brands and more"
              value={searchQ}
              onChange={(e) => setSearchQ(e.target.value)}
              onKeyDown={handleSearch}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
          </div>

          <div className="navbar-actions hide-mobile">
            <div
              className="nav-action"
              onMouseEnter={() => setShowProfile(true)}
              onMouseLeave={() => setShowProfile(false)}
            >
              <FaUser className="action-icon" />
              <span className="action-label">{user ? user.name.split(" ")[0] : "Profile"}</span>
              {showProfile && (
                <div className="profile-dropdown">
                  {user ? (
                    <>
                      <div className="profile-top">
                        <div className="profile-greeting">Hello, {user.name}</div>
                        <div className="profile-email">{user.email}</div>
                        <button className="profile-logout-btn" onClick={handleLogout}>Logout</button>
                      </div>
                      <div className="profile-links">
                        <Link to="/profile"><FaUser /> My Profile</Link>
                        <Link to="/wishlist"><FaHeart /> Wishlist</Link>
                        <Link to="/cart"><FaShoppingBag /> My Bag</Link>
                      </div>
                    </>
                  ) : (
                    <div className="profile-top">
                      <strong>Welcome</strong>
                      <p>To access account and manage orders</p>
                      <Link to="/login" className="profile-login-btn">LOGIN / SIGNUP</Link>
                    </div>
                  )}
                </div>
              )}
            </div>

            <Link to="/wishlist" className="nav-action">
              <div className="icon-badge-wrapper">
                <FaHeart className="action-icon" />
                {wishlist.length > 0 && <span className="badge">{wishlist.length}</span>}
              </div>
              <span className="action-label">Wishlist</span>
            </Link>

            <Link to="/cart" className="nav-action">
              <div className="icon-badge-wrapper">
                <FaShoppingBag className="action-icon" />
                {cart.length > 0 && <span className="badge">{cart.length}</span>}
              </div>
              <span className="action-label">Bag</span>
            </Link>
          </div>

          <div className="show-mobile" style={{ display:"flex", alignItems:"center", gap:"4px", marginLeft:"auto" }}>
            <Link to="/cart" className="nav-action">
              <div className="icon-badge-wrapper">
                <FaShoppingBag className="action-icon" />
                {cart.length > 0 && <span className="badge">{cart.length}</span>}
              </div>
            </Link>
            <button className="mobile-menu-toggle" onClick={() => setMobileOpen(true)}>
              <FaBars />
            </button>
          </div>
        </div>
      </nav>

      {mobileOpen && (
        <div className="mobile-overlay" onClick={() => setMobileOpen(false)}>
          <div className="mobile-backdrop" />
          <div className="mobile-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <span className="logo-text">myntra</span>
              <button className="drawer-close" onClick={() => setMobileOpen(false)}><FaTimes /></button>
            </div>
            <div className="drawer-user">
              {user ? (
                <>
                  <div className="drawer-user-name">{user.name}</div>
                  <div className="drawer-user-email">{user.email}</div>
                  <button className="drawer-logout" onClick={handleLogout}>Logout</button>
                </>
              ) : (
                <>
                  <p>Welcome to Myntra</p>
                  <Link to="/login" className="drawer-login-btn" onClick={() => setMobileOpen(false)}>LOGIN / SIGNUP</Link>
                </>
              )}
            </div>
            <div className="drawer-search">
              <div className="drawer-search-box">
                <FaSearch />
                <input
                  placeholder="Search products, brands..."
                  value={searchQ}
                  onChange={(e) => setSearchQ(e.target.value)}
                  onKeyDown={handleSearch}
                />
              </div>
            </div>
            <nav className="drawer-nav">
              {NAV_CATS.map((cat) => (
                <NavLink key={cat.label} to={cat.path} className="drawer-nav-item" onClick={() => setMobileOpen(false)}>
                  {cat.label} {cat.badge && <span className="cat-badge">{cat.badge}</span>}
                </NavLink>
              ))}
            </nav>
            <div className="drawer-bottom">
              <Link to="/wishlist" className="drawer-action" onClick={() => setMobileOpen(false)}>
                <FaHeart /><span>Wishlist {wishlist.length > 0 && `(${wishlist.length})`}</span>
              </Link>
              <Link to="/profile" className="drawer-action" onClick={() => setMobileOpen(false)}>
                <FaUser /><span>Profile</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
