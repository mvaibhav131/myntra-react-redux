import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaBoxOpen, FaTruck, FaHome } from 'react-icons/fa';
import './OrderConfirmation.css';
import './Checkout.css';

const OrderConfirmation = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!state?.orderId) navigate('/', { replace: true });
  }, [navigate, state?.orderId]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!state?.orderId) return null;

  const { orderId, total, address, payMethod } = state;
  const deliveryDate = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', {
    weekday: 'long', day: 'numeric', month: 'long',
  });

  const PAY_LABELS = { upi: 'UPI', card: 'Credit/Debit Card', cod: 'Cash on Delivery' };

  return (
    <div className="confirmation-page">
      <div className="confirmation-card">
        {/* Success animation */}
        <div className="confirm-icon-wrap">
          <FaCheckCircle className="confirm-icon" />
          <div className="confirm-rings">
            <div className="ring ring-1" />
            <div className="ring ring-2" />
          </div>
        </div>

        <h1 className="confirm-title">Order Placed Successfully!</h1>
        <p className="confirm-subtitle">
          Thank you for shopping with <strong style={{ color: 'var(--primary)' }}>myntra</strong>
        </p>

        <div className="order-id-box">
          <span>Order ID</span>
          <strong>{orderId}</strong>
        </div>

        {/* Delivery timeline */}
        <div className="delivery-timeline">
          <div className="timeline-item active">
            <div className="timeline-icon"><FaCheckCircle /></div>
            <div>
              <strong>Order Confirmed</strong>
              <span>Just now</span>
            </div>
          </div>
          <div className="timeline-connector" />
          <div className="timeline-item">
            <div className="timeline-icon"><FaBoxOpen /></div>
            <div>
              <strong>Processing</strong>
              <span>1-2 business days</span>
            </div>
          </div>
          <div className="timeline-connector" />
          <div className="timeline-item">
            <div className="timeline-icon"><FaTruck /></div>
            <div>
              <strong>Expected Delivery</strong>
              <span>{deliveryDate}</span>
            </div>
          </div>
        </div>

        {/* Order details */}
        <div className="confirm-details-grid">
          <div className="confirm-detail-box">
            <h4>Delivery Address</h4>
            {address && (
              <>
                <p>{address.name}</p>
                <p>{address.address}</p>
                <p>{address.city}, {address.state} — {address.pincode}</p>
                <p>📞 {address.phone}</p>
              </>
            )}
          </div>
          <div className="confirm-detail-box">
            <h4>Payment Info</h4>
            <p>Method: <strong>{PAY_LABELS[payMethod] || payMethod}</strong></p>
            <p>Total Paid: <strong>₹{total?.toLocaleString('en-IN')}</strong></p>
            <p className="payment-success-label">✓ Payment Successful</p>
          </div>
        </div>

        {/* Actions */}
        <div className="confirm-actions">
          <Link to="/" className="conf-btn-primary">
            <FaHome /> CONTINUE SHOPPING
          </Link>
          <Link to="/profile" className="conf-btn-secondary">
            VIEW MY ORDERS
          </Link>
        </div>

        <p className="confirm-note">
          A confirmation email will be sent to your registered email address.
        </p>
      </div>
    </div>
  );
};

export default OrderConfirmation;
