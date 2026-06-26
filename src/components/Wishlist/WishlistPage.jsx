import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaHeart, FaTrash, FaShoppingBag } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { removeFromWishlistAction, addToCartAction } from '../../ActionCreator/productActionCreator';
import './WishlistPage.css';

const WishlistPage = () => {
  const dispatch = useDispatch();
  const wishlist = useSelector((s) => s.productReducer.wishlist);

  const handleRemove = (item) => {
    dispatch(removeFromWishlistAction(item));
    toast.info('Removed from Wishlist');
  };

  const handleMoveToBag = (item) => {
    const size = item.sizes && item.sizes.length > 0 ? item.sizes[0] : 'M';
    dispatch(addToCartAction(item, size));
    dispatch(removeFromWishlistAction(item));
    toast.success('Moved to Bag! 🛍️', { icon: false });
  };

  if (wishlist.length === 0) {
    return (
      <div className="wishlist-page">
        <div className="wishlist-container">
          <div className="empty-wishlist">
            <FaHeart className="empty-wl-icon" />
            <h2>Your Wishlist is empty!</h2>
            <p>Save your favourite items here and come back to buy them later.</p>
            <Link to="/" className="explore-btn">EXPLORE NOW</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <div className="wishlist-container">
        <div className="wishlist-header">
          <h2>My Wishlist <span>({wishlist.length} {wishlist.length === 1 ? 'item' : 'items'})</span></h2>
        </div>
        <div className="wishlist-grid">
          {wishlist.map((item) => (
            <div key={item.id} className="wl-card">
              <Link to={`/product/${item.id}`} className="wl-img-wrap">
                <img
                  src={item.image}
                  alt={item.name}
                  onError={(e) => { e.target.src = 'https://picsum.photos/seed/wl/200/280'; }}
                />
                {item.discount >= 20 && (
                  <span className="wl-discount-badge">{item.discount}% OFF</span>
                )}
              </Link>
              <div className="wl-info">
                <p className="wl-brand">{item.brand}</p>
                <p className="wl-name">{item.name}</p>
                <div className="wl-price-row">
                  <span className="wl-price">₹{item.price.toLocaleString('en-IN')}</span>
                  <span className="wl-mrp">₹{item.mrp.toLocaleString('en-IN')}</span>
                  <span className="wl-disc">{item.discount}% off</span>
                </div>
                <div className="wl-actions">
                  <button className="wl-bag-btn" onClick={() => handleMoveToBag(item)}>
                    <FaShoppingBag /> MOVE TO BAG
                  </button>
                  <button className="wl-remove-btn" onClick={() => handleRemove(item)}>
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;

