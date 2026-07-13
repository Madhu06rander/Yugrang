import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { orderAPI } from '../api';
import { FiUser, FiPhone, FiMapPin, FiCheck, FiArrowLeft } from 'react-icons/fi';
import BrandEffect from '../components/BrandEffect';

export default function Checkout() {
  const { user } = useAuth();
  const { clearCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const buyNowItem = location.state?.item || null;
  const cartItems = location.state?.cartItems || [];
  const items = buyNowItem ? [buyNowItem] : cartItems;
  const totalPrice = items.reduce((sum, i) => sum + (i.price * (i.quantity || 1)), 0);

  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: '',
    city: '',
    pincode: '',
    paymentMethod: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [trackingId, setTrackingId] = useState('');
  const [showEffect, setShowEffect] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateStep1 = () => {
    if (!form.name) { setError('Please enter your name.'); return false; }
    if (!form.phone || form.phone.length < 10) { setError('Please enter valid phone number.'); return false; }
    if (!form.address) { setError('Please enter your address.'); return false; }
    if (!form.city) { setError('Please enter your city.'); return false; }
    if (!form.pincode || form.pincode.length < 6) { setError('Please enter valid pincode.'); return false; }
    return true;
  };

  const validateStep2 = () => {
    if (!form.paymentMethod) { setError('Please select a payment method.'); return false; }
    return true;
  };

  const handleNext = () => {
    setError('');
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;
    if (step === 2) { placeOrder(); return; }
    setStep(step + 1);
  };

  const placeOrder = async () => {
    setLoading(true);
    try {
      const orderData = {
        name: form.name,
        phone: form.phone,
        address: form.address,
        city: form.city,
        pincode: form.pincode,
        payment_method: form.paymentMethod,
        total_price: totalPrice,
        items: items.map(item => ({
          product_name: item.name,
          category: item.category || '',
          size: item.size || '',
          color: item.color || '',
          quantity: item.quantity || 1,
          price: item.price
        }))
      };

      const result = await orderAPI.placeOrder(orderData);

      if (result.success) {
        setOrderId(result.order_id);
        setTrackingId(result.tracking_id);
        if (!buyNowItem) clearCart();
        setShowEffect(true);
      } else {
        setError(result.detail || 'Order failed! Please try again.');
      }
    } catch (error) {
      setError('Server error! Please try again.');
    }
    setLoading(false);
  };

  // SUCCESS SCREEN
  if (orderPlaced) {
    return (
      <>
        <style>{`
          .success-page {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 100px 24px;
            background: #0A0A0A;
            text-align: center;
          }
          .success-card {
            max-width: 520px;
            width: 100%;
            border: 1px solid rgba(201,168,76,0.25);
            padding: 60px 48px;
            background: #1A1A1A;
            position: relative;
          }
          .success-card::before {
            content: '';
            position: absolute;
            top: -1px; left: -1px;
            width: 20px; height: 20px;
            border-top: 2px solid #C9A84C;
            border-left: 2px solid #C9A84C;
          }
          .success-card::after {
            content: '';
            position: absolute;
            bottom: -1px; right: -1px;
            width: 20px; height: 20px;
            border-bottom: 2px solid #C9A84C;
            border-right: 2px solid #C9A84C;
          }
          .success-icon {
            width: 72px; height: 72px;
            border-radius: 50%;
            background: rgba(201,168,76,0.1);
            border: 1px solid rgba(201,168,76,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 28px;
            color: #C9A84C;
          }
          .success-title {
            font-family: 'Cormorant Garamond', serif;
            font-size: 42px;
            font-weight: 300;
            color: #F5F0E8;
            margin-bottom: 12px;
          }
          .success-title em { font-style: italic; color: #C9A84C; }
          .success-sub {
            font-size: 12px;
            color: #888;
            line-height: 1.8;
            margin-bottom: 24px;
            letter-spacing: 0.5px;
          }
          .order-id-box {
            background: rgba(201,168,76,0.08);
            border: 1px solid rgba(201,168,76,0.2);
            padding: 16px;
            font-size: 13px;
            color: #C9A84C;
            letter-spacing: 2px;
            margin-bottom: 16px;
          }
          .tracking-id-box {
            background: rgba(201,168,76,0.04);
            border: 1px solid rgba(201,168,76,0.15);
            padding: 20px;
            margin-bottom: 32px;
            text-align: left;
          }
          .tracking-id-label {
            font-size: 9px;
            letter-spacing: 3px;
            text-transform: uppercase;
            color: #C9A84C;
            margin-bottom: 8px;
          }
          .tracking-id-value {
            font-family: 'Cormorant Garamond', serif;
            font-size: 22px;
            color: #F5F0E8;
            letter-spacing: 2px;
            margin-bottom: 6px;
          }
          .tracking-id-hint {
            font-size: 11px;
            color: #555;
            letter-spacing: 0.5px;
          }
          .success-actions {
            display: flex;
            gap: 12px;
            justify-content: center;
            flex-wrap: wrap;
          }
        `}</style>
        <div className="success-page">
          <div className="success-card">
            <div className="success-icon">
              <FiCheck size={32} />
            </div>
            <h2 className="success-title">Order <em>Placed!</em></h2>
            <p className="success-sub">
              Thank you, {user?.name}! 🎉<br />
              Aapka order successfully place ho gaya hai.<br />
              Humari team 2 ghante mein WhatsApp par contact karegi.
            </p>

            <div className="order-id-box">
              📦 Order ID: {orderId}
            </div>

            {trackingId && (
              <div className="tracking-id-box">
                <p className="tracking-id-label">🔍 Your Tracking ID</p>
                <p className="tracking-id-value">{trackingId}</p>
                <p className="tracking-id-hint">
                  Is ID se aap My Orders mein apna order track kar sakte hain
                </p>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(trackingId);
                    alert('Tracking ID copied!');
                  }}
                  style={{
                    marginTop: '10px',
                    background: 'transparent',
                    border: '1px solid rgba(201,168,76,0.3)',
                    color: '#C9A84C',
                    padding: '6px 16px',
                    fontSize: '10px',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    fontFamily: "'Jost', sans-serif",
                  }}
                >
                  Copy Tracking ID
                </button>
              </div>
            )}

            <div className="success-actions">
              <button
                className="btn-primary"
                onClick={() => navigate('/my-orders')}
              >
                Track My Order
              </button>
              <button
                className="btn-outline"
                onClick={() => navigate('/products')}
              >
                Shop More
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <BrandEffect
        show={showEffect}
        message="order"
        subMessage={`Order ID: ${orderId}`}
        onComplete={() => setOrderPlaced(true)}
      />

      <style>{`
        .checkout-page {
          min-height: 100vh;
          padding: 100px 60px 80px;
          background: #0A0A0A;
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 40px;
          align-items: start;
          width: 100%;
          box-sizing: border-box;
        }
        .back-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: transparent;
          border: none;
          color: #888;
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          cursor: pointer;
          font-family: 'Jost', sans-serif;
          margin-bottom: 32px;
          transition: color 0.2s;
          padding: 0;
        }
        .back-btn:hover { color: #C9A84C; }
        .stepper {
          display: flex;
          align-items: center;
          margin-bottom: 40px;
          max-width: 400px;
        }
        .step-circle {
          width: 36px; height: 36px;
          border-radius: 50%;
          border: 1px solid rgba(201,168,76,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          color: #888;
          font-family: 'Cormorant Garamond', serif;
          flex-shrink: 0;
          transition: all 0.3s;
        }
        .step-circle.active {
          background: #C9A84C;
          border-color: #C9A84C;
          color: #0A0A0A;
          font-weight: 600;
        }
        .step-circle.done {
          background: rgba(201,168,76,0.15);
          border-color: #C9A84C;
          color: #C9A84C;
        }
        .step-label {
          font-size: 10px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #888;
          margin-left: 10px;
        }
        .step-label.active { color: #C9A84C; }
        .step-connector {
          flex: 1;
          height: 1px;
          background: rgba(201,168,76,0.15);
          margin: 0 12px;
        }
        .step-connector.done { background: #C9A84C; }
        .checkout-form {
          background: #111;
          border: 1px solid rgba(201,168,76,0.15);
          padding: 40px;
        }
        .form-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 30px;
          font-weight: 300;
          color: #F5F0E8;
          margin-bottom: 8px;
        }
        .form-title em { font-style: italic; color: #C9A84C; }
        .form-sub {
          font-size: 12px;
          color: #888;
          margin-bottom: 32px;
          letter-spacing: 0.5px;
        }
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .error-box {
          background: rgba(255,107,107,0.08);
          border: 1px solid rgba(255,107,107,0.3);
          padding: 12px 16px;
          font-size: 12px;
          color: #ff6b6b;
          margin-bottom: 20px;
        }
        .input-wrap { position: relative; }
        .input-side-icon {
          position: absolute;
          left: 16px; top: 50%;
          transform: translateY(-50%);
          color: #888;
          pointer-events: none;
        }
        .input-pl { padding-left: 44px !important; }
        .payment-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        .pay-card {
          border: 1px solid rgba(201,168,76,0.15);
          padding: 20px;
          cursor: pointer;
          transition: all 0.2s;
          text-align: center;
        }
        .pay-card:hover, .pay-card.active {
          border-color: #C9A84C;
          background: rgba(201,168,76,0.06);
        }
        .pay-icon { font-size: 28px; margin-bottom: 8px; }
        .pay-title {
          font-size: 12px;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: #F5F0E8;
          margin-bottom: 4px;
        }
        .pay-sub { font-size: 11px; color: #888; }
        .step-actions {
          display: flex;
          gap: 12px;
          margin-top: 32px;
        }
        .btn-back-step {
          background: transparent;
          border: 1px solid rgba(201,168,76,0.25);
          color: #888;
          padding: 14px 28px;
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          cursor: pointer;
          font-family: 'Jost', sans-serif;
          transition: all 0.2s;
        }
        .btn-back-step:hover { border-color: #C9A84C; color: #C9A84C; }
        .order-summary-box {
          background: #111;
          border: 1px solid rgba(201,168,76,0.15);
          padding: 32px;
          position: sticky;
          top: 100px;
        }
        .summary-heading {
          font-family: 'Cormorant Garamond', serif;
          font-size: 24px;
          color: #F5F0E8;
          margin-bottom: 24px;
        }
        .summary-item {
          display: flex;
          gap: 12px;
          margin-bottom: 16px;
          padding-bottom: 16px;
          border-bottom: 1px solid rgba(201,168,76,0.08);
        }
        .summary-item-img {
          width: 60px; height: 60px;
          object-fit: cover; flex-shrink: 0;
        }
        .summary-item-emoji {
          width: 60px; height: 60px;
          background: #1a1a1a;
          display: flex; align-items: center;
          justify-content: center;
          font-size: 28px; flex-shrink: 0;
        }
        .summary-item-name { font-size: 13px; color: #F5F0E8; margin-bottom: 4px; }
        .summary-item-details { font-size: 11px; color: #888; margin-bottom: 4px; }
        .summary-item-price { font-size: 13px; color: #C9A84C; }
        .summary-divider {
          height: 1px;
          background: rgba(201,168,76,0.15);
          margin: 16px 0;
        }
        .summary-row {
          display: flex;
          justify-content: space-between;
          font-size: 12px; color: #888;
          margin-bottom: 10px;
        }
        .summary-row span:last-child { color: #F5F0E8; }
        .summary-total {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 16px;
        }
        .total-label {
          font-size: 11px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #C9A84C;
        }
        .total-price {
          font-family: 'Cormorant Garamond', serif;
          font-size: 30px; color: #C9A84C;
        }
        .form-input {
          width: 100%;
          background: #1A1A1A !important;
          border: 1px solid rgba(201,168,76,0.2);
          color: #F5F0E8 !important;
          padding: 14px 16px;
          font-family: 'Jost', sans-serif;
          font-size: 13px;
          outline: none;
          transition: border-color 0.2s;
          box-sizing: border-box;
        }
        .form-input:focus { border-color: #C9A84C; }
        .form-input::placeholder { color: #555 !important; }
        .form-label {
          display: block;
          font-size: 9px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #C9A84C;
          margin-bottom: 10px;
        }
        .form-group { margin-bottom: 20px; }
        @media (max-width: 900px) {
          .checkout-page {
            grid-template-columns: 1fr;
            padding: 100px 24px 60px;
          }
          .form-row { grid-template-columns: 1fr; }
          .payment-grid { grid-template-columns: 1fr; }
          .checkout-form { padding: 24px; }
        }
      `}</style>

      <div className="checkout-page">
        <div>
          <button className="back-btn" onClick={() => navigate(-1)}>
            <FiArrowLeft size={14} /> Back
          </button>

          <p className="section-eyebrow">Checkout</p>
          <h1 className="section-title" style={{ marginBottom: 32 }}>
            Confirm Your <em style={{ fontStyle: 'italic', color: '#C9A84C' }}>Order</em>
          </h1>

          {/* STEPPER */}
          <div className="stepper">
            <div className={`step-circle ${step === 1 ? 'active' : 'done'}`}>
              {step > 1 ? <FiCheck size={14} /> : '1'}
            </div>
            <span className={`step-label ${step === 1 ? 'active' : ''}`}>Delivery</span>
            <div className={`step-connector ${step > 1 ? 'done' : ''}`} />
            <div className={`step-circle ${step === 2 ? 'active' : ''}`}>2</div>
            <span className={`step-label ${step === 2 ? 'active' : ''}`}>Payment</span>
          </div>

          <div className="checkout-form">
            {error && <div className="error-box">⚠ {error}</div>}

            {/* STEP 1 — DELIVERY */}
            {step === 1 && (
              <>
                <h2 className="form-title">Delivery <em>Details</em></h2>
                <p className="form-sub">Where should we deliver your order?</p>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <div className="input-wrap">
                      <FiUser size={14} className="input-side-icon" />
                      <input
                        className="form-input input-pl"
                        name="name"
                        placeholder="Your name"
                        value={form.name}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone Number *</label>
                    <div className="input-wrap">
                      <FiPhone size={14} className="input-side-icon" />
                      <input
                        className="form-input input-pl"
                        name="phone"
                        placeholder="10-digit number"
                        value={form.phone}
                        onChange={handleChange}
                        maxLength={10}
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Full Address *</label>
                  <div className="input-wrap">
                    <FiMapPin size={14} className="input-side-icon" />
                    <input
                      className="form-input input-pl"
                      name="address"
                      placeholder="House no, Street, Area..."
                      value={form.address}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">City *</label>
                    <input
                      className="form-input"
                      name="city"
                      placeholder="Your city"
                      value={form.city}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Pincode *</label>
                    <input
                      className="form-input"
                      name="pincode"
                      placeholder="6-digit pincode"
                      value={form.pincode}
                      onChange={handleChange}
                      maxLength={6}
                    />
                  </div>
                </div>
              </>
            )}

            {/* STEP 2 — PAYMENT */}
            {step === 2 && (
              <>
                <h2 className="form-title">Choose <em>Payment</em></h2>
                <p className="form-sub">Select your preferred payment method.</p>
                <div className="payment-grid">
                  <div
                    className={`pay-card ${form.paymentMethod === 'cod' ? 'active' : ''}`}
                    onClick={() => setForm({ ...form, paymentMethod: 'cod' })}
                  >
                    <div className="pay-icon">🚚</div>
                    <div className="pay-title">Cash on Delivery</div>
                    <div className="pay-sub">Pay when you receive</div>
                  </div>
                  <div
                    className={`pay-card ${form.paymentMethod === 'upi' ? 'active' : ''}`}
                    onClick={() => setForm({ ...form, paymentMethod: 'upi' })}
                  >
                    <div className="pay-icon">📱</div>
                    <div className="pay-title">UPI Payment</div>
                    <div className="pay-sub">GPay, PhonePe, Paytm</div>
                  </div>
                  <div
                    className={`pay-card ${form.paymentMethod === 'card' ? 'active' : ''}`}
                    onClick={() => setForm({ ...form, paymentMethod: 'card' })}
                  >
                    <div className="pay-icon">💳</div>
                    <div className="pay-title">Card Payment</div>
                    <div className="pay-sub">Debit / Credit Card</div>
                  </div>
                  <div
                    className={`pay-card ${form.paymentMethod === 'netbanking' ? 'active' : ''}`}
                    onClick={() => setForm({ ...form, paymentMethod: 'netbanking' })}
                  >
                    <div className="pay-icon">🏦</div>
                    <div className="pay-title">Net Banking</div>
                    <div className="pay-sub">All major banks</div>
                  </div>
                </div>
              </>
            )}

            {/* BUTTONS */}
            <div className="step-actions">
              {step > 1 && (
                <button
                  className="btn-back-step"
                  onClick={() => { setError(''); setStep(step - 1); }}
                >
                  ← Back
                </button>
              )}
              <button
                className="btn-primary"
                style={{ flex: 1, padding: '16px', fontSize: '11px', letterSpacing: '2px' }}
                onClick={handleNext}
                disabled={loading}
              >
                {loading ? 'Processing...' : step === 2 ? '✓ Place Order' : 'Continue →'}
              </button>
            </div>
          </div>
        </div>

        {/* ORDER SUMMARY */}
        <div className="order-summary-box">
          <h3 className="summary-heading">Order Summary</h3>
          {items.map((item, i) => (
            <div className="summary-item" key={i}>
              {item.img
                ? <img className="summary-item-img" src={item.img} alt={item.name} />
                : <div className="summary-item-emoji">{item.icon || '👕'}</div>
              }
              <div>
                <div className="summary-item-name">{item.name}</div>
                <div className="summary-item-details">
                  Size: {item.size} · Qty: {item.quantity || 1}
                </div>
                <div className="summary-item-price">₹{item.price * (item.quantity || 1)}</div>
              </div>
            </div>
          ))}
          <div className="summary-divider" />
          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{totalPrice}</span>
          </div>
          <div className="summary-row">
            <span>Delivery</span>
            <span style={{ color: '#4CAF50' }}>FREE</span>
          </div>
          <div className="summary-divider" />
          <div className="summary-total">
            <span className="total-label">Total</span>
            <span className="total-price">₹{totalPrice}</span>
          </div>
        </div>
      </div>
    </>
  );
}