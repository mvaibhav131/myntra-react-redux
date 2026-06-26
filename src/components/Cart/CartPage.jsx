import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaMinus, FaPlus, FaTrash, FaShoppingBag, FaArrowRight, FaTruck, FaShieldAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import {
  removeFromCartAction,
  updateCartQtyAction,
  toggleWishlistAction,
} from '../../ActionCreator/productActionCreator';
import './CartPage.css';

const DELIVERY_FEE = 49;
const FREE_DELIVERY_THRESHOLD = 499;

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((s) => s.productReducer.cart);
  const wishlist = useSelector((s) => s.productReducer.wishlist);
  const wishlistIds = new Set(wishlist.map((w) => w.id));

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const discount = cart.reduce((sum, item) => sum + (item.mrp - item.price) * item.qty, 0);
  const delivery = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
  const total = subtotal + delivery;

  const handleRemove = (item) => {
    dispatch(removeFromCartAction(item));
    toast.info('Item removed from bag');
  };

  const handleQty = (item, delta) => {
    const newQty = item.qty + delta;
    if (newQty < 1) {
      dispatch(removeFromCartAction(item));
      toast.info('Item removed from bag');
    } else {
      dispatch(updateCartQtyAction(item, newQty));
    }
  };

  const handleMoveToWishlist = (item) => {
    dispatch(removeFromCartAction(item));
    if (!wishlistIds.has(item.id)) {
      dispatch(toggleWishlistAction(item));
      toast.success('Moved to Wishlist! 💛', { icon: false });
    } else {
      toast.info('Already in Wishlist');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-container">
          <div className="empty-cart">
            <FaShoppingBag className="empty-cart-icon" />
            <h2>Hey, it feels so light!</h2>
            <p>There is nothing in your bag. Let's add some items.</p>
            <Link to="/" className="continue-shopping-btn">CONTINUE SHOPPING</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <div className="cart-layout">
          {/* Left: Cart items */}
          <div className="cart-left">
            {/* Delivery info bar */}
            {delivery === 0 ? (
              <div className="delivery-bar free">
                <FaTruck /> <span>Your order qualifies for <strong>FREE Delivery</strong></span>
              </div>
            ) : (
              <div className="delivery-bar">
                <FaTruck />
                <span>Add items worth ₹{(FREE_DELIVERY_THRESHOLD - subtotal).toLocaleString('en-IN')} for <strong>FREE delivery</strong></span>
              </div>
            )}

            {/* Cart header */}
            <div className="cart-header">
              <h2>My Bag <span>({cart.length} {cart.length === 1 ? 'item' : 'items'})</span></h2>
            </div>

            {/* Cart items */}
            {cart.map((item) => (
              <div key={`${item.id}-${item.selectedSize}`} className="cart-item">
                <Link to={`/product/${item.id}`} className="cart-item-img">
                  <img
                    src={item.image}
                    alt={item.name}
                    onError={(e) => { e.target.src = 'https://picsum.photos/seed/ci/120/160'; }}
                  />
                </Link>
                <div className="cart-item-info">
                  <div className="cart-item-top">
                    <div>
                      <p className="ci-brand">{item.brand}</p>
                      <p className="ci-name">{item.name}</p>
                      <p className="ci-size">Size: <strong>{item.selectedSize}</strong></p>
                    </div>
                    <button className="ci-remove-btn" onClick={() => handleRemove(item)}>
                      <FaTrash />
                    </button>
                  </div>
                  <div className="cart-item-bottom">
                    <div className="ci-qty-control">
                      <button onClick={() => handleQty(item, -1)}><FaMinus /></button>
                      <span>{item.qty}</span>
                      <button onClick={() => handleQty(item, +1)}><FaPlus /></button>
                    </div>
                    <div className="ci-price-block">
                      <span className="ci-price">₹{(item.price * item.qty).toLocaleString('en-IN')}</span>
                      <span className="ci-mrp">₹{(item.mrp * item.qty).toLocaleString('en-IN')}</span>
                      <span className="ci-disc">{item.discount}% off</span>
                    </div>
                  </div>
                  <button className="move-to-wishlist" onClick={() => handleMoveToWishlist(item)}>
                    Move to Wishlist
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Price summary */}
          <div className="cart-right">
            <div className="price-summary">
              <h3 className="ps-title">PRICE DETAILS</h3>
              <div className="ps-row">
                <span>Price ({cart.length} items)</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="ps-row">
                <span>Discount</span>
                <span className="ps-discount">− ₹{discount.toLocaleString('en-IN')}</span>
              </div>
              <div className="ps-row">
                <span>Delivery Charges</span>
                {delivery === 0 ? (
                  <span className="ps-free">FREE</span>
                ) : (
                  <span>₹{delivery}</span>
                )}
              </div>
              <hr className="ps-divider" />
              <div className="ps-row total">
                <strong>Total Amount</strong>
                <strong>₹{total.toLocaleString('en-IN')}</strong>
              </div>
              <div className="ps-savings">
                You will save ₹{discount.toLocaleString('en-IN')} on this order
              </div>
              <button className="place-order-btn" onClick={() => navigate('/checkout')}>
                PLACE ORDER <FaArrowRight />
              </button>
              <div className="secure-badge">
                <FaShieldAlt /> <span>100% SECURE PAYMENTS</span>
              </div>
            </div>

            {/* Coupons */}
            <div className="coupon-box">
              <h4>Apply Coupons</h4>
              <div className="coupon-input-row">
                <input type="text" placeholder="Enter coupon code" />
                <button>Apply</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
