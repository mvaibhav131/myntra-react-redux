import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaCheckCircle, FaMapMarkerAlt, FaWallet, FaCreditCard, FaMobileAlt, FaMoneyBillWave, FaLock } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { clearCartAction } from '../../ActionCreator/productActionCreator';
import { useAuth } from '../../context/AuthContext';
import './Checkout.css';

const STEPS = ['Address', 'Order Summary', 'Payment'];

const Checkout = () => {
  const [step, setStep] = useState(0);
  const [address, setAddress] = useState({ name: '', phone: '', pincode: '', address: '', city: '', state: '', type: 'Home' });
  const [payMethod, setPayMethod] = useState('upi');
  const [upiId, setUpiId] = useState('');
  const [cardNum, setCardNum] = useState('');
  const [processing, setProcessing] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useAuth();
  const cart = useSelector((s) => s.productReducer.cart);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) {
      navigate('/login', { state: { from: '/checkout' }, replace: true });
    }
  }, [user, navigate]);

  if (!user) return null;

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const discount = cart.reduce((s, i) => s + (i.mrp - i.price) * i.qty, 0);
  const delivery = subtotal >= 499 ? 0 : 49;
  const total = subtotal + delivery;

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    const { name, phone, pincode, address: addr, city, state } = address;
    if (!name || !phone || !pincode || !addr || !city || !state) {
      toast.error('Please fill all address fields');
      return;
    }
    if (phone.length < 10) { toast.error('Enter valid phone number'); return; }
    if (pincode.length !== 6) { toast.error('Enter valid 6-digit pincode'); return; }
    setStep(1);
    window.scrollTo(0, 0);
  };

  const handleProceedToPayment = () => {
    setStep(2);
    window.scrollTo(0, 0);
  };

  const handlePayment = () => {
    if (payMethod === 'upi' && !upiId.includes('@')) {
      toast.error('Enter a valid UPI ID (e.g. name@upi)');
      return;
    }
    if (payMethod === 'card' && cardNum.replace(/\s/g, '').length < 16) {
      toast.error('Enter a valid 16-digit card number');
      return;
    }
    setProcessing(true);
    setTimeout(() => {
      dispatch(clearCartAction());
      navigate('/order-confirmation', {
        state: { orderId: `MNT${Date.now().toString().slice(-8)}`, total, address, payMethod },
        replace: true,
      });
    }, 2000);
  };

  if (cart.length === 0 && step < 2) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 20px' }}>
        <h2>Your bag is empty!</h2>
        <button onClick={() => navigate('/')} style={{ marginTop: 16, padding: '12px 24px', background: 'var(--primary)', color: '#fff', borderRadius: 4, fontSize: 14, fontWeight: 700, border: 'none', cursor: 'pointer' }}>
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        {/* Step indicator */}
        <div className="step-bar">
          {STEPS.map((s, i) => (
            <div key={s} className={`step-item${i <= step ? ' active' : ''}${i < step ? ' done' : ''}`}>
              <div className="step-circle">
                {i < step ? <FaCheckCircle /> : <span>{i + 1}</span>}
              </div>
              <span className="step-label">{s}</span>
              {i < STEPS.length - 1 && <div className={`step-line${i < step ? ' done' : ''}`} />}
            </div>
          ))}
        </div>

        <div className="checkout-layout">
          {/* Main checkout content */}
          <div className="checkout-main">
            {/* ── STEP 0: ADDRESS ── */}
            {step === 0 && (
              <div className="checkout-card">
                <h3 className="checkout-card-title"><FaMapMarkerAlt /> Delivery Address</h3>
                {user && (
                  <div className="user-greeting-bar">
                    Delivering to: <strong>{user.name}</strong>
                  </div>
                )}
                <form className="address-form" onSubmit={handleAddressSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Full Name *</label>
                      <input
                        type="text"
                        placeholder="As per ID"
                        value={address.name}
                        onChange={(e) => setAddress({ ...address, name: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label>Mobile Number *</label>
                      <input
                        type="tel"
                        placeholder="10-digit mobile number"
                        maxLength={10}
                        value={address.phone}
                        onChange={(e) => setAddress({ ...address, phone: e.target.value.replace(/\D/g, '') })}
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Pincode *</label>
                      <input
                        type="text"
                        placeholder="6-digit pincode"
                        maxLength={6}
                        value={address.pincode}
                        onChange={(e) => setAddress({ ...address, pincode: e.target.value.replace(/\D/g, '') })}
                      />
                    </div>
                    <div className="form-group">
                      <label>City *</label>
                      <input
                        type="text"
                        placeholder="City"
                        value={address.city}
                        onChange={(e) => setAddress({ ...address, city: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Address (House/Flat/Block/Street) *</label>
                    <textarea
                      rows={2}
                      placeholder="Building name, street, area"
                      value={address.address}
                      onChange={(e) => setAddress({ ...address, address: e.target.value })}
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>State *</label>
                      <select value={address.state} onChange={(e) => setAddress({ ...address, state: e.target.value })}>
                        <option value="">Select State</option>
                        {['Maharashtra','Delhi','Karnataka','Tamil Nadu','Gujarat','Rajasthan','West Bengal','Uttar Pradesh','Telangana','Kerala','Madhya Pradesh','Punjab','Haryana'].map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Address Type</label>
                      <div className="addr-type-row">
                        {['Home', 'Work', 'Other'].map((t) => (
                          <button
                            key={t}
                            type="button"
                            className={`addr-type-btn${address.type === t ? ' selected' : ''}`}
                            onClick={() => setAddress({ ...address, type: t })}
                          >{t}</button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <button type="submit" className="checkout-primary-btn">SAVE AND CONTINUE</button>
                </form>
              </div>
            )}

            {/* ── STEP 1: ORDER SUMMARY ── */}
            {step === 1 && (
              <div className="checkout-card">
                <h3 className="checkout-card-title">Order Summary</h3>
                <div className="addr-confirmed">
                  <FaMapMarkerAlt />
                  <div>
                    <strong>{address.name}</strong> — {address.type}
                    <p>{address.address}, {address.city}, {address.state} — {address.pincode}</p>
                    <p>Mobile: {address.phone}</p>
                  </div>
                  <button className="edit-addr-btn" onClick={() => setStep(0)}>Change</button>
                </div>
                <div className="order-items-list">
                  {cart.map((item) => (
                    <div key={`${item.id}-${item.selectedSize}`} className="order-item">
                      <img src={item.image} alt={item.name} onError={(e) => { e.target.src='https://picsum.photos/seed/oi/70/90'; }} />
                      <div className="order-item-details">
                        <p className="oi-brand">{item.brand}</p>
                        <p className="oi-name">{item.name}</p>
                        <p className="oi-size">Size: {item.selectedSize} · Qty: {item.qty}</p>
                      </div>
                      <span className="oi-price">₹{(item.price * item.qty).toLocaleString('en-IN')}</span>
                    </div>
                  ))}
                </div>
                <button className="checkout-primary-btn" onClick={handleProceedToPayment}>
                  PROCEED TO PAYMENT
                </button>
              </div>
            )}

            {/* ── STEP 2: PAYMENT ── */}
            {step === 2 && (
              <div className="checkout-card">
                <h3 className="checkout-card-title"><FaWallet /> Payment Options</h3>
                <div className="payment-options">
                  {[
                    { id: 'upi',  label: 'UPI',            icon: <FaMobileAlt />,   desc: 'Pay using UPI apps' },
                    { id: 'card', label: 'Credit / Debit Card', icon: <FaCreditCard />, desc: 'Visa, Mastercard, RuPay' },
                    { id: 'cod',  label: 'Cash on Delivery', icon: <FaMoneyBillWave />, desc: 'Pay when delivered' },
                  ].map((opt) => (
                    <label key={opt.id} className={`pay-option${payMethod === opt.id ? ' selected' : ''}`}>
                      <input
                        type="radio"
                        name="payMethod"
                        value={opt.id}
                        checked={payMethod === opt.id}
                        onChange={() => setPayMethod(opt.id)}
                      />
                      <div className="pay-option-left">
                        <span className="pay-icon">{opt.icon}</span>
                        <div>
                          <strong>{opt.label}</strong>
                          <span className="pay-desc">{opt.desc}</span>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>

                {/* Dynamic form based on method */}
                {payMethod === 'upi' && (
                  <div className="payment-form">
                    <label className="pf-label">Enter UPI ID</label>
                    <input
                      type="text"
                      className="pf-input"
                      placeholder="e.g. yourname@upi"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                    />
                  </div>
                )}
                {payMethod === 'card' && (
                  <div className="payment-form">
                    <label className="pf-label">Card Number</label>
                    <input type="text" className="pf-input" placeholder="1234 5678 9012 3456" maxLength={19}
                      value={cardNum}
                      onChange={(e) => {
                        const v = e.target.value.replace(/\D/g,'').slice(0,16);
                        setCardNum(v.replace(/(.{4})/g,'$1 ').trim());
                      }}
                    />
                    <div className="card-row">
                      <div>
                        <label className="pf-label">Expiry Date</label>
                        <input type="text" className="pf-input" placeholder="MM / YY" maxLength={7} />
                      </div>
                      <div>
                        <label className="pf-label">CVV</label>
                        <input type="password" className="pf-input" placeholder="•••" maxLength={3} />
                      </div>
                    </div>
                    <label className="pf-label">Name on Card</label>
                    <input type="text" className="pf-input" placeholder="As on card" />
                  </div>
                )}
                {payMethod === 'cod' && (
                  <div className="cod-note">
                    <p>💵 You will pay <strong>₹{total.toLocaleString('en-IN')}</strong> in cash upon delivery.</p>
                    <p className="cod-small">COD available for orders up to ₹10,000</p>
                  </div>
                )}

                <div className="secure-pay-badge">
                  <FaLock /> Safe and Secure Payments. Easy Returns. 100% Authentic Products.
                </div>

                <button className="checkout-primary-btn pay-btn" onClick={handlePayment} disabled={processing}>
                  {processing ? (
                    <span style={{ display:'flex',alignItems:'center',gap:8,justifyContent:'center' }}>
                      <span className="btn-spinner-dark" /> Processing...
                    </span>
                  ) : (
                    `PAY ₹${total.toLocaleString('en-IN')}`
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Price summary sidebar */}
          <div className="checkout-sidebar">
            <div className="checkout-price-box">
              <h3 className="cps-title">PRICE DETAILS</h3>
              <div className="cps-row"><span>Price ({cart.length} items)</span><span>₹{subtotal.toLocaleString('en-IN')}</span></div>
              <div className="cps-row"><span>Discount</span><span className="cps-disc">− ₹{discount.toLocaleString('en-IN')}</span></div>
              <div className="cps-row"><span>Delivery</span><span className={delivery === 0 ? 'cps-free' : ''}>{delivery === 0 ? 'FREE' : `₹${delivery}`}</span></div>
              <hr className="cps-hr" />
              <div className="cps-row cps-total"><strong>Total</strong><strong>₹{total.toLocaleString('en-IN')}</strong></div>
              <div className="cps-savings">You save ₹{discount.toLocaleString('en-IN')} 🎉</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
