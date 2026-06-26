import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import './Footer.css';

const FOOTER_LINKS = [
  {
    heading: 'Online Shopping',
    links: ['Men', 'Women', 'Kids', 'Home & Living', 'Beauty', 'Gift Cards', 'Myntra Insider'],
  },
  {
    heading: 'Customer Policies',
    links: ['Contact Us', 'FAQ', 'T&C', 'Terms of Use', 'Track Orders', 'Shipping', 'Cancellation', 'Returns'],
  },
  {
    heading: 'Experience Myntra App',
    links: ['Download the App'],
    showAppBadges: true,
  },
  {
    heading: 'Keep in Touch',
    links: [],
    showSocial: true,
  },
];

const Footer = () => (
  <footer className="footer">
    <div className="footer-top">
      <div className="footer-inner">
        {FOOTER_LINKS.map((col) => (
          <div key={col.heading} className="footer-col">
            <h4 className="footer-heading">{col.heading}</h4>
            {col.links.map((link) => (
              <Link key={link} to="#" className="footer-link">{link}</Link>
            ))}
            {col.showAppBadges && (
              <div className="app-badges">
                <img src="https://constant.myntassets.com/web/assets/img/80x27apple.png" alt="App Store" onError={(e) => { e.target.style.display='none'; }} />
                <img src="https://constant.myntassets.com/web/assets/img/80x27android.png" alt="Play Store" onError={(e) => { e.target.style.display='none'; }} />
              </div>
            )}
            {col.showSocial && (
              <div className="social-icons">
                <a href="https://facebook.com" rel="noopener noreferrer" target="_blank" className="social-icon"><FaFacebookF /></a>
                <a href="https://twitter.com" rel="noopener noreferrer" target="_blank" className="social-icon"><FaTwitter /></a>
                <a href="https://instagram.com" rel="noopener noreferrer" target="_blank" className="social-icon"><FaInstagram /></a>
                <a href="https://linkedin.com" rel="noopener noreferrer" target="_blank" className="social-icon"><FaLinkedinIn /></a>
                <a href="https://youtube.com" rel="noopener noreferrer" target="_blank" className="social-icon"><FaYoutube /></a>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>

    <div className="footer-guarantee">
      <div className="footer-guarantee-inner">
        <div className="guarantee-item">
          <span className="guarantee-icon">💯</span>
          <div>
            <strong>100% ORIGINAL</strong>
            <span>guarantee for all products at myntra.com</span>
          </div>
        </div>
        <div className="guarantee-item">
          <span className="guarantee-icon">↩️</span>
          <div>
            <strong>RETURN WITHIN 30 DAYS</strong>
            <span>of receiving your order</span>
          </div>
        </div>
      </div>
    </div>

    <div className="footer-bottom">
      <p>© {new Date().getFullYear()} myntra.com — A clone built with React & Redux for educational purposes.</p>
      <p>This is a demo project. Not affiliated with Myntra Designs Pvt. Ltd.</p>
    </div>
  </footer>
);

export default Footer;
