import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  FiUpload, FiCheck, FiShoppingBag,
  FiUser, FiPhone, FiMapPin
} from 'react-icons/fi';

export default function Customize() {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const prefill = location.state || {};

  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    garment: prefill.product || '',
    size: prefill.size || '',
    color: prefill.color || '',
    customText: '',
    placement: '',
    notes: '',
    quantity: 1,
    fileName: '',
    paymentMethod: '',
    name: user?.name || '',
    phone: user?.phone || '',
    address: '',
    city: '',
    pincode: '',
  });
  const [error, setError] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);

  const colors = [
    '#1a1a1a', '#FFFFFF', '#C9A84C', '#8B0000',
    '#1B3A6B', '#2D5A27', '#F4C2C2', '#FFA500',
    '#800080', '#40E0D0',
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {
    if (e.target.files[0]) {
      setForm({ ...form, fileName: e.target.files[0].name });
    }
  };

  const validateStep1 = () => {
    if (!form.garment) { setError('Please select a garment.'); return false; }
    if (!form.size) { setError('Please select a size.'); return false; }
    return true;
  };

  const validateStep2 = () => {
    if (!form.paymentMethod) { setError('Please select a payment method.'); return false; }
    return true;
  };

  const validateStep3 = () => {
    if (!form.name) { setError('Please enter your name.'); return false; }
    if (!form.phone || form.phone.length < 10) { setError('Please enter a valid phone number.'); return false; }
    if (!form.address) { setError('Please enter your address.'); return false; }
    if (!form.city) { setError('Please enter your city.'); return false; }
    if (!form.pincode || form.pincode.length < 6) { setError('Please enter a valid pincode.'); return false; }
    return true;
  };

  const nextStep = () => {
    setError('');
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;
    if (step === 3 && !validateStep3()) return;
    if (step === 3) {
      placeOrder();
      return;
    }
    setStep(step + 1);
  };

  const placeOrder = () => {
    const order = {
      ...form,
      user: user.email,
      orderId: 'LT' + Date.now(),
      date: new Date().toLocaleDateString('en-IN'),
    };
    const orders = JSON.parse(localStorage.getItem('luxethread_orders')) || [];
    orders.push(order);
    localStorage.setItem('luxethread_orders', JSON.stringify(orders));
    setOrderPlaced(true);
  };

  // ORDER SUCCESS SCREEN
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
            max-width: 500px;
            width: 100%;
            border: 1px solid rgba(201,168,76,0.25);
            padding: 60px 48px;
            background: #1A1A1A;
          }
          .success-icon {
            width: 72px;
            height: 72px;
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
            margin-bottom: 32px;
            letter-spacing: 0.5px;
          }
          .order-id {
            background: rgba(201,168,76,0.08);
            border: 1px solid rgba(201,168,76,0.2);
            padding: 16px;
            font-size: 13px;
            color: #C9A84C;
            letter-spacing: 2px;
            margin-bottom: 32px;
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
              Thank you, {user.name}! Your custom order has been received.
              Our team will contact you on WhatsApp within 2 hours to confirm details.
            </p>
            <div className="order-id">
              Order ID: LT{Date.now().toString().slice(-6)}
            </div>
            <div className="success-actions">
              <button
                className="btn-primary"
                onClick={() => navigate('/')}
              >
                Back to Home
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
      <style>{`
        .customize-page {
          min-height: 100vh;
          padding: 100px 60px 80px;
          background: #0A0A0A;
        }
        /* STEPPER */
        .stepper {
          display: flex;
          align-items: center;
          margin-bottom: 60px;
          max-width: 600px;
        }
        .step-item {
          display: flex;
          align-items: center;
          gap: 12px;
          flex: 1;
        }
        .step-circle {
          width: 40px;
          height: 40px;
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
        }
        .step-label.active { color: #C9A84C; }
        .step-connector {
          flex: 1;
          height: 1px;
          background: rgba(201,168,76,0.15);
          margin: 0 12px;
        }
        .step-connector.done { background: #C9A84C; }

        /* FORM CARD */
        .form-card {
          max-width: 680px;
          border: 1px solid rgba(201,168,76,0.15);
          padding: 48px;
          background: #111;
        }
        .form-card-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 32px;
          font-weight: 300;
          color: #F5F0E8;
          margin-bottom: 8px;
        }
        .form-card-title em { font-style: italic; color: #C9A84C; }
        .form-card-sub {
          font-size: 12px;
          color: #888;
          margin-bottom: 36px;
          letter-spacing: 0.5px;
          line-height: 1.7;
        }
        .error-box {
          background: rgba(255,107,107,0.08);
          border: 1px solid rgba(255,107,107,0.3);
          padding: 12px 16px;
          font-size: 12px;
          color: #ff6b6b;
          letter-spacing: 0.5px;
          margin-bottom: 20px;
        }
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .size-row {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .size-btn {
          padding: 10px 20px;
          border: 1px solid rgba(201,168,76,0.2);
          background: transparent;
          color: #888;
          font-family: 'Jost', sans-serif;
          font-size: 12px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .size-btn.active, .size-btn:hover {
          background: #C9A84C;
          border-color: #C9A84C;
          color: #0A0A0A;
        }
        .color-row {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }
        .color-dot {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          cursor: pointer;
          border: 2px solid transparent;
          transition: all 0.2s;
        }
        .color-dot.active, .color-dot:hover {
          border-color: #C9A84C;
          transform: scale(1.15);
        }
        .upload-box {
          border: 1px dashed rgba(201,168,76,0.3);
          padding: 32px;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s;
        }
        .upload-box:hover {
          border-color: #C9A84C;
          background: rgba(201,168,76,0.03);
        }
        .upload-text {
          font-size: 11px;
          letter-spacing: 2px;
          color: #888;
          text-transform: uppercase;
          margin-top: 10px;
        }
        .qty-row {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .qty-btn {
          width: 36px;
          height: 36px;
          border: 1px solid rgba(201,168,76,0.3);
          background: transparent;
          color: #C9A84C;
          font-size: 18px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }
        .qty-btn:hover {
          background: rgba(201,168,76,0.1);
        }
        .qty-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 28px;
          color: #F5F0E8;
          min-width: 32px;
          text-align: center;
        }
        .payment-opts {
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
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #F5F0E8;
          margin-bottom: 4px;
        }
        .pay-sub {
          font-size: 11px;
          color: #888;
        }
        .input-icon-wrap {
          position: relative;
        }
        .input-side-icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: #888;
          pointer-events: none;
        }
        .input-pl {
          padding-left: 44px !important;
        }
        .step-actions {
          display: flex;
          gap: 12px;
          margin-top: 36px;
        }
        .btn-back {
          background: transparent;
          border: 1px solid rgba(201,168,76,0.25);
          color: #888;
          padding: 14px 32px;
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          cursor: pointer;
          font-family: 'Jost', sans-serif;
          transition: all 0.2s;
        }
        .btn-back:hover {
          border-color: #C9A84C;
          color: #C9A84C;
        }
        .order-summary {
          background: rgba(201,168,76,0.04);
          border: 1px solid rgba(201,168,76,0.15);
          padding: 20px;
          margin-bottom: 28px;
        }
        .summary-title {
          font-size: 10px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #C9A84C;
          margin-bottom: 14px;
        }
        .summary-row {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          color: #888;
          margin-bottom: 8px;
          letter-spacing: 0.5px;
        }
        .summary-row span:last-child { color: #F5F0E8; }

        @media (max-width: 768px) {
          .customize-page { padding: 100px 24px 60px; }
          .form-card { padding: 28px 20px; }
          .form-row { grid-template-columns: 1fr; }
          .payment-opts { grid-template-columns: 1fr; }
          .stepper { gap: 4px; }
          .step-label { display: none; }
        }
      `}</style>

      <div className="customize-page">
        <p className="section-eyebrow">Custom Order</p>
        <h1 className="section-title">Design Your<br /><em style={{ fontStyle: 'italic', color: '#C9A84C' }}>Perfect Piece</em></h1>
        <div className="section-line"></div>

        {/* STEPPER */}
        <div className="stepper">
          {['Design', 'Payment', 'Delivery'].map((label, i) => (
            <React.Fragment key={i}>
              <div className="step-item">
                <div className={`step-circle ${step === i + 1 ? 'active' : step > i + 1 ? 'done' : ''}`}>
                  {step > i + 1 ? <FiCheck size={16} /> : i + 1}
                </div>
                <span className={`step-label ${step === i + 1 ? 'active' : ''}`}>{label}</span>
              </div>
              {i < 2 && (
                <div className={`step-connector ${step > i + 1 ? 'done' : ''}`} />
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="form-card">

          {/* ── STEP 1 — DESIGN ── */}
          {step === 1 && (
            <>
              <h2 className="form-card-title">Your <em>Design</em></h2>
              <p className="form-card-sub">Choose your garment and tell us exactly what you want.</p>

              {error && <div className="error-box">⚠ {error}</div>}

              {/* GARMENT */}
              <div className="form-group">
                <label className="form-label">Select Garment *</label>
                <select
                  className="form-select"
                  name="garment"
                  value={form.garment}
                  onChange={handleChange}
                >
                  <option value="">— Choose Item —</option>
                  {['Shirt', 'T-Shirt', 'Girls Short Kurti', 'Jeans Short Kurta', 'Handkerchief'].map(g => (
                    <option key={g}>{g}</option>
                  ))}
                </select>
              </div>

              {/* SIZE */}
              <div className="form-group">
                <label className="form-label">Select Size *</label>
                <div className="size-row">
                  {['S', 'M', 'L', 'XL', 'XXL', 'Free Size'].map(s => (
                    <button
                      key={s}
                      className={`size-btn ${form.size === s ? 'active' : ''}`}
                      onClick={() => setForm({ ...form, size: s })}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* COLOR */}
              <div className="form-group">
                <label className="form-label">Choose Color</label>
                <div className="color-row">
                  {colors.map((c, i) => (
                    <div
                      key={i}
                      className={`color-dot ${form.color === c ? 'active' : ''}`}
                      style={{
                        background: c,
                        border: c === '#FFFFFF'
                          ? '2px solid #444'
                          : form.color === c
                            ? '2px solid #C9A84C'
                            : '2px solid transparent',
                      }}
                      onClick={() => setForm({ ...form, color: c })}
                    />
                  ))}
                </div>
              </div>

              {/* CUSTOM TEXT */}
              <div className="form-group">
                <label className="form-label">Custom Text / Name</label>
                <input
                  className="form-input"
                  name="customText"
                  placeholder="e.g. Rahul, Team 2024, Your Logo Text..."
                  value={form.customText}
                  onChange={handleChange}
                />
              </div>

              {/* PLACEMENT */}
              <div className="form-group">
                <label className="form-label">Design Placement</label>
                <select
                  className="form-select"
                  name="placement"
                  value={form.placement}
                  onChange={handleChange}
                >
                  <option value="">— Where to print/embroider? —</option>
                  <option>Front Center</option>
                  <option>Back Center</option>
                  <option>Left Chest</option>
                  <option>Right Chest</option>
                  <option>Sleeve</option>
                  <option>All Over</option>
                </select>
              </div>

              {/* UPLOAD */}
              <div className="form-group">
                <label className="form-label">Upload Your Design</label>
                <div className="upload-box" onClick={() => document.getElementById('designFile').click()}>
                  <FiUpload size={28} color="#C9A84C" style={{ opacity: 0.6 }} />
                  <p className="upload-text">
                    {form.fileName ? `✓ ${form.fileName}` : 'Click to upload image or design file'}
                  </p>
                  <input
                    id="designFile"
                    type="file"
                    accept="image/*,.pdf"
                    style={{ display: 'none' }}
                    onChange={handleFile}
                  />
                </div>
              </div>

              {/* QUANTITY */}
              <div className="form-group">
                <label className="form-label">Quantity</label>
                <div className="qty-row">
                  <button
                    className="qty-btn"
                    onClick={() => setForm({ ...form, quantity: Math.max(1, form.quantity - 1) })}
                  >−</button>
                  <span className="qty-num">{form.quantity}</span>
                  <button
                    className="qty-btn"
                    onClick={() => setForm({ ...form, quantity: form.quantity + 1 })}
                  >+</button>
                </div>
              </div>

              {/* NOTES */}
              <div className="form-group">
                <label className="form-label">Special Instructions</label>
                <textarea
                  className="form-textarea"
                  name="notes"
                  placeholder="Any extra details, color preferences, references..."
                  value={form.notes}
                  onChange={handleChange}
                />
              </div>
            </>
          )}

          {/* ── STEP 2 — PAYMENT ── */}
          {step === 2 && (
            <>
              <h2 className="form-card-title">Choose <em>Payment</em></h2>
              <p className="form-card-sub">Select how you would like to pay for your order.</p>

              {error && <div className="error-box">⚠ {error}</div>}

              {/* ORDER SUMMARY */}
              <div className="order-summary">
                <p className="summary-title">Order Summary</p>
                <div className="summary-row"><span>Garment</span><span>{form.garment}</span></div>
                <div className="summary-row"><span>Size</span><span>{form.size}</span></div>
                {form.customText && <div className="summary-row"><span>Custom Text</span><span>{form.customText}</span></div>}
                {form.placement && <div className="summary-row"><span>Placement</span><span>{form.placement}</span></div>}
                <div className="summary-row"><span>Quantity</span><span>{form.quantity}</span></div>
                {form.fileName && <div className="summary-row"><span>Design File</span><span>✓ Uploaded</span></div>}
              </div>

              {/* PAYMENT OPTIONS */}
              <div className="form-group">
                <label className="form-label">Payment Method *</label>
                <div className="payment-opts">
                  <div
                    className={`pay-card ${form.paymentMethod === 'cod' ? 'active' : ''}`}
                    onClick={() => setForm({ ...form, paymentMethod: 'cod' })}
                  >
                    <div className="pay-icon">🚚</div>
                    <div className="pay-title">Cash on Delivery</div>
                    <div className="pay-sub">Pay when you receive</div>
                  </div>
                  <div
                    className={`pay-card ${form.paymentMethod === 'online' ? 'active' : ''}`}
                    onClick={() => setForm({ ...form, paymentMethod: 'online' })}
                  >
                    <div className="pay-icon">📱</div>
                    <div className="pay-title">Online Payment</div>
                    <div className="pay-sub">UPI, Card, Net Banking</div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ── STEP 3 — DELIVERY ── */}
          {step === 3 && (
            <>
              <h2 className="form-card-title">Delivery <em>Details</em></h2>
              <p className="form-card-sub">Where should we send your order?</p>

              {error && <div className="error-box">⚠ {error}</div>}

              {/* NAME & PHONE */}
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <div className="input-icon-wrap">
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
                  <div className="input-icon-wrap">
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

              {/* ADDRESS */}
              <div className="form-group">
                <label className="form-label">Full Address *</label>
                <div className="input-icon-wrap">
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

              {/* CITY & PINCODE */}
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

              {/* FINAL SUMMARY */}
              <div className="order-summary">
                <p className="summary-title">Final Order Summary</p>
                <div className="summary-row"><span>Garment</span><span>{form.garment}</span></div>
                <div className="summary-row"><span>Size</span><span>{form.size}</span></div>
                <div className="summary-row"><span>Quantity</span><span>{form.quantity}</span></div>
                <div className="summary-row">
                  <span>Payment</span>
                  <span>{form.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment'}</span>
                </div>
              </div>
            </>
          )}

          {/* NAVIGATION BUTTONS */}
          <div className="step-actions">
            {step > 1 && (
              <button className="btn-back" onClick={() => { setError(''); setStep(step - 1); }}>
                ← Back
              </button>
            )}
            <button
              className="btn-primary"
              style={{ flex: 1, padding: '16px', fontSize: '11px', letterSpacing: '2px' }}
              onClick={nextStep}
            >
              {step === 3
                ? <><FiShoppingBag size={14} style={{ marginRight: 8 }} /> Place Order</>
                : 'Continue →'
              }
            </button>
          </div>

        </div>
      </div>
    </>
  );
}