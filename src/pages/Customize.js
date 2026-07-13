import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiUpload, FiCheck, FiArrowLeft } from 'react-icons/fi';

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
    { hex: '#1a1a1a', name: 'Black' },
    { hex: '#FFFFFF', name: 'White' },
    { hex: '#C9A84C', name: 'Gold' },
    { hex: '#8B0000', name: 'Maroon' },
    { hex: '#1B3A6B', name: 'Navy' },
    { hex: '#2D5A27', name: 'Forest Green' },
    { hex: '#F4C2C2', name: 'Baby Pink' },
    { hex: '#FFA500', name: 'Orange' },
    { hex: '#800080', name: 'Purple' },
    { hex: '#40E0D0', name: 'Turquoise' },
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
    if (!form.phone || form.phone.length < 10) { setError('Please enter valid phone number.'); return false; }
    if (!form.address) { setError('Please enter your address.'); return false; }
    if (!form.city) { setError('Please enter your city.'); return false; }
    if (!form.pincode || form.pincode.length < 6) { setError('Please enter valid pincode.'); return false; }
    return true;
  };

  const nextStep = () => {
    setError('');
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;
    if (step === 3) {
      if (!validateStep3()) return;
      placeOrder();
      return;
    }
    setStep(step + 1);
  };

  const prevStep = () => {
    setError('');
    if (step === 1) { navigate(-1); return; }
    setStep(step - 1);
  };

  const placeOrder = () => {
    setOrderPlaced(true);
  };

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
            position: relative;
          }
          .success-card::before {
            content: '';
            position: absolute;
            top: -1px; left: -1px;
            width: 24px; height: 24px;
            border-top: 2px solid #C9A84C;
            border-left: 2px solid #C9A84C;
          }
          .success-card::after {
            content: '';
            position: absolute;
            bottom: -1px; right: -1px;
            width: 24px; height: 24px;
            border-bottom: 2px solid #C9A84C;
            border-right: 2px solid #C9A84C;
          }
        `}</style>
        <div className="success-page">
          <div className="success-card">
            <div style={{
              width: 72, height: 72,
              borderRadius: '50%',
              background: 'rgba(201,168,76,0.1)',
              border: '1px solid rgba(201,168,76,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 28px',
              color: '#C9A84C'
            }}>
              <FiCheck size={32} />
            </div>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '42px', fontWeight: 300,
              color: '#F5F0E8', marginBottom: '12px'
            }}>
              Order <em style={{ fontStyle: 'italic', color: '#C9A84C' }}>Placed!</em>
            </h2>
            <p style={{ fontSize: '12px', color: '#888', lineHeight: 1.8, marginBottom: '32px' }}>
              Thank you, {user?.name}! 🎉<br />
              Your custom order has been received.<br />
              Our team will contact you on WhatsApp within 2 hours.
            </p>
            <div style={{
              background: 'rgba(201,168,76,0.08)',
              border: '1px solid rgba(201,168,76,0.2)',
              padding: '16px', fontSize: '13px',
              color: '#C9A84C', letterSpacing: '2px',
              marginBottom: '32px'
            }}>
              Garment: {form.garment} · Size: {form.size}
            </div>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                style={{
                  background: '#C9A84C', color: '#0A0A0A',
                  border: 'none', padding: '14px 32px',
                  fontSize: '11px', letterSpacing: '2px',
                  textTransform: 'uppercase', cursor: 'pointer',
                  fontFamily: "'Jost', sans-serif", fontWeight: 600
                }}
                onClick={() => navigate('/')}
              >
                Back to Home
              </button>
              <button
                style={{
                  background: 'transparent', color: '#C9A84C',
                  border: '1px solid rgba(201,168,76,0.4)',
                  padding: '14px 32px', fontSize: '11px',
                  letterSpacing: '2px', textTransform: 'uppercase',
                  cursor: 'pointer', fontFamily: "'Jost', sans-serif"
                }}
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
        * { box-sizing: border-box; }

       .customize-page {
  min-height: 100vh;
  padding: 100px 0 80px;
  background: #0A0A0A;
  width: 100vw;
  margin: 0;
  box-sizing: border-box;
  overflow-x: hidden;
}

        .customize-inner {
          max-width: 900px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .back-btn-cust {
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
          margin-bottom: 40px;
          transition: color 0.2s;
          padding: 0;
        }
        .back-btn-cust:hover { color: #C9A84C; }

        /* STEPPER */
        .cust-stepper {
          display: flex;
          align-items: center;
          margin-bottom: 48px;
          max-width: 500px;
        }
        .cust-step {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .cust-step-circle {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 1px solid rgba(201,168,76,0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Cormorant Garamond', serif;
          font-size: 16px;
          color: #555;
          flex-shrink: 0;
          transition: all 0.3s;
        }
        .cust-step-circle.active {
          background: #C9A84C;
          border-color: #C9A84C;
          color: #0A0A0A;
          font-weight: 700;
        }
        .cust-step-circle.done {
          background: rgba(201,168,76,0.15);
          border-color: #C9A84C;
          color: #C9A84C;
        }
        .cust-step-label {
          font-size: 10px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #555;
          font-family: 'Jost', sans-serif;
        }
        .cust-step-label.active { color: #C9A84C; }
        .cust-connector {
          flex: 1;
          height: 1px;
          background: rgba(201,168,76,0.1);
          margin: 0 16px;
          min-width: 40px;
        }
        .cust-connector.done { background: #C9A84C; }

        /* FORM CARD */
        .cust-card {
          background: #111;
          border: 1px solid rgba(201,168,76,0.12);
          padding: 48px;
          position: relative;
        }
        .cust-card::before {
  content: '';
  position: absolute;
  top: -1px; left: -1px;
  width: 20px; height: 20px;
  border-top: 2px solid #C9A84C;
  border-left: 2px solid #C9A84C;
}
        .cust-card::after {
          content: '';
          position: absolute;
          bottom: -1px; right: -1px;
          width: 24px; height: 24px;
          border-bottom: 2px solid #C9A84C;
          border-right: 2px solid #C9A84C;
        }

        .cust-card-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 36px;
          font-weight: 300;
          color: #F5F0E8;
          margin-bottom: 6px;
        }
        .cust-card-title em { font-style: italic; color: #C9A84C; }
        .cust-card-sub {
          font-size: 12px;
          color: #666;
          letter-spacing: 0.5px;
          margin-bottom: 40px;
          line-height: 1.7;
        }

        /* FORM ELEMENTS */
        .cust-label {
          display: block;
          font-size: 9px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #C9A84C;
          margin-bottom: 12px;
        }
        .cust-group { margin-bottom: 28px; }
        .cust-select {
          width: 100%;
          background: #1A1A1A;
          border: 1px solid rgba(201,168,76,0.2);
          color: #F5F0E8;
          padding: 14px 16px;
          font-family: 'Jost', sans-serif;
          font-size: 13px;
          outline: none;
          cursor: pointer;
          transition: border-color 0.2s;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23C9A84C' stroke-width='1.5' fill='none'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 16px center;
          padding-right: 40px;
        }
        .cust-select:focus { border-color: #C9A84C; }
        .cust-select option { background: #1A1A1A; color: #F5F0E8; }
        .cust-input {
          width: 100%;
          background: #1A1A1A;
          border: 1px solid rgba(201,168,76,0.2);
          color: #F5F0E8;
          padding: 14px 16px;
          font-family: 'Jost', sans-serif;
          font-size: 13px;
          outline: none;
          transition: border-color 0.2s;
        }
        .cust-input:focus { border-color: #C9A84C; }
        .cust-input::placeholder { color: #444; }
        .cust-textarea {
          width: 100%;
          background: #1A1A1A;
          border: 1px solid rgba(201,168,76,0.2);
          color: #F5F0E8;
          padding: 14px 16px;
          font-family: 'Jost', sans-serif;
          font-size: 13px;
          outline: none;
          transition: border-color 0.2s;
          resize: vertical;
          min-height: 100px;
        }
        .cust-textarea:focus { border-color: #C9A84C; }
        .cust-textarea::placeholder { color: #444; }

        /* SIZE BUTTONS */
        .size-grid {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }
        .size-btn-cust {
          padding: 12px 22px;
          border: 1px solid rgba(201,168,76,0.2);
          background: transparent;
          color: #888;
          font-family: 'Jost', sans-serif;
          font-size: 12px;
          cursor: pointer;
          transition: all 0.2s;
          letter-spacing: 1px;
        }
        .size-btn-cust:hover { border-color: #C9A84C; color: #C9A84C; }
        .size-btn-cust.active {
          background: #C9A84C;
          border-color: #C9A84C;
          color: #0A0A0A;
          font-weight: 600;
        }

        /* COLOR PICKER */
        .color-grid {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }
        .color-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          cursor: pointer;
        }
        .color-circle {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          transition: all 0.2s;
          border: 2px solid transparent;
        }
        .color-circle.active {
          border-color: #C9A84C;
          transform: scale(1.15);
          box-shadow: 0 0 12px rgba(201,168,76,0.4);
        }
        .color-name {
          font-size: 8px;
          color: #555;
          letter-spacing: 1px;
          text-align: center;
          max-width: 48px;
        }
        .color-name.active { color: #C9A84C; }

        /* UPLOAD BOX */
        .upload-box {
          border: 1px dashed rgba(201,168,76,0.3);
          padding: 40px 24px;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s;
          background: rgba(201,168,76,0.02);
        }
        .upload-box:hover {
          border-color: #C9A84C;
          background: rgba(201,168,76,0.05);
        }
        .upload-box.uploaded {
          border-color: #4CAF50;
          background: rgba(76,175,80,0.05);
        }
        .upload-text {
          font-size: 11px;
          letter-spacing: 2px;
          color: #666;
          text-transform: uppercase;
          margin-top: 12px;
        }
        .upload-text.uploaded { color: #4CAF50; }

        /* QUANTITY */
        .qty-wrap {
          display: flex;
          align-items: center;
          gap: 0;
          border: 1px solid rgba(201,168,76,0.2);
          width: fit-content;
        }
        .qty-btn-cust {
          width: 48px;
          height: 48px;
          background: rgba(201,168,76,0.08);
          border: none;
          color: #C9A84C;
          font-size: 20px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
          font-family: 'Jost', sans-serif;
        }
        .qty-btn-cust:hover { background: rgba(201,168,76,0.15); }
        .qty-num-cust {
          width: 64px;
          text-align: center;
          font-family: 'Cormorant Garamond', serif;
          font-size: 24px;
          color: #F5F0E8;
          border-left: 1px solid rgba(201,168,76,0.2);
          border-right: 1px solid rgba(201,168,76,0.2);
          padding: 10px 0;
        }

        /* 2 COLUMN ROW */
        .cust-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        /* PAYMENT CARDS */
        .pay-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .pay-card-cust {
          border: 1px solid rgba(201,168,76,0.15);
          padding: 24px;
          cursor: pointer;
          transition: all 0.25s;
          text-align: center;
          background: #1A1A1A;
        }
        .pay-card-cust:hover { border-color: rgba(201,168,76,0.4); }
        .pay-card-cust.active {
          border-color: #C9A84C;
          background: rgba(201,168,76,0.06);
        }
        .pay-card-icon { font-size: 32px; margin-bottom: 10px; }
        .pay-card-title {
          font-size: 12px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #F5F0E8;
          margin-bottom: 4px;
          font-family: 'Jost', sans-serif;
        }
        .pay-card-sub { font-size: 11px; color: #666; }

        /* ORDER SUMMARY BOX */
        .summary-box {
          background: rgba(201,168,76,0.04);
          border: 1px solid rgba(201,168,76,0.12);
          padding: 24px;
          margin-bottom: 32px;
        }
        .summary-box-title {
          font-size: 9px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #C9A84C;
          margin-bottom: 16px;
        }
        .summary-row-cust {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          color: #888;
          padding: 6px 0;
          border-bottom: 1px solid rgba(201,168,76,0.05);
        }
        .summary-row-cust span:last-child { color: #F5F0E8; }

        /* ERROR */
        .cust-error {
          background: rgba(255,107,107,0.08);
          border: 1px solid rgba(255,107,107,0.3);
          padding: 12px 16px;
          font-size: 12px;
          color: #ff6b6b;
          margin-bottom: 24px;
          letter-spacing: 0.3px;
        }

        /* ACTIONS */
        .cust-actions {
          display: flex;
          gap: 12px;
          margin-top: 40px;
          padding-top: 32px;
          border-top: 1px solid rgba(201,168,76,0.08);
        }
        .cust-back-btn {
          background: transparent;
          border: 1px solid rgba(201,168,76,0.25);
          color: #888;
          padding: 16px 32px;
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          cursor: pointer;
          font-family: 'Jost', sans-serif;
          transition: all 0.2s;
          flex-shrink: 0;
        }
        .cust-back-btn:hover {
          border-color: #C9A84C;
          color: #C9A84C;
        }
        .cust-next-btn {
          flex: 1;
          background: #C9A84C;
          border: none;
          color: #0A0A0A;
          padding: 16px 32px;
          font-size: 11px;
          letter-spacing: 3px;
          text-transform: uppercase;
          cursor: pointer;
          font-family: 'Jost', sans-serif;
          font-weight: 700;
          transition: all 0.2s;
        }
        .cust-next-btn:hover { background: #E8D5A3; }

        @media (max-width: 768px) {
          .customize-page { padding: 100px 0 60px; }
          .cust-card { padding: 28px 20px; }
          .cust-row { grid-template-columns: 1fr; }
          .pay-grid { grid-template-columns: 1fr; }
          .cust-step-label { display: none; }
          .cust-connector { min-width: 24px; }
        }
      `}</style>

      <div className="customize-page">
        <div className="customize-inner">
          <button className="back-btn-cust" onClick={() => navigate(-1)}>
            <FiArrowLeft size={14} /> Back
          </button>

          <p style={{ fontSize: '9px', letterSpacing: '5px', color: '#C9A84C', textTransform: 'uppercase', marginBottom: '12px' }}>
            Custom Order
          </p>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(40px, 6vw, 72px)',
            fontWeight: 300,
            color: '#F5F0E8',
            marginBottom: '8px',
            lineHeight: 1.1
          }}>
            Design Your<br />
            <em style={{ fontStyle: 'italic', color: '#C9A84C' }}>Perfect Piece</em>
          </h1>
          <div style={{ width: 48, height: 1, background: '#C9A84C', marginBottom: '48px' }} />

          {/* STEPPER */}
          <div className="cust-stepper">
            {['Design', 'Payment', 'Delivery'].map((label, i) => (
              <React.Fragment key={i}>
                <div className="cust-step">
                  <div className={`cust-step-circle ${step === i + 1 ? 'active' : step > i + 1 ? 'done' : ''}`}>
                    {step > i + 1 ? <FiCheck size={16} /> : i + 1}
                  </div>
                  <span className={`cust-step-label ${step === i + 1 ? 'active' : ''}`}>{label}</span>
                </div>
                {i < 2 && (
                  <div className={`cust-connector ${step > i + 1 ? 'done' : ''}`} />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* FORM CARD */}
          <div className="cust-card">

            {/* ── STEP 1 — DESIGN ── */}
            {step === 1 && (
              <>
                <h2 className="cust-card-title">Your <em>Design</em></h2>
                <p className="cust-card-sub">Choose your garment and tell us exactly what you want.</p>

                {error && <div className="cust-error">⚠ {error}</div>}

                <div className="cust-row">
                  <div className="cust-group">
                    <label className="cust-label">Select Garment *</label>
                    <select className="cust-select" name="garment" value={form.garment} onChange={handleChange}>
                      <option value="">— Choose Item —</option>
                      {['Shirt', 'T-Shirt', 'Girls Short Kurti', 'Jeans Short Kurta', 'Handkerchief'].map(g => (
                        <option key={g} value={g}>{g}</option>
                      ))}
                    </select>
                  </div>

                  <div className="cust-group">
                    <label className="cust-label">Design Placement</label>
                    <select className="cust-select" name="placement" value={form.placement} onChange={handleChange}>
                      <option value="">— Where to print? —</option>
                      {['Front Center', 'Back Center', 'Left Chest', 'Right Chest', 'Sleeve', 'All Over'].map(p => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="cust-group">
                  <label className="cust-label">Select Size *</label>
                  <div className="size-grid">
                    {['S', 'M', 'L', 'XL', 'XXL', 'Free Size'].map(s => (
                      <button
                        key={s}
                        className={`size-btn-cust ${form.size === s ? 'active' : ''}`}
                        onClick={() => setForm({ ...form, size: s })}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="cust-group">
                  <label className="cust-label">Choose Fabric Color</label>
                  <div className="color-grid">
                    {colors.map((c, i) => (
                      <div
                        key={i}
                        className="color-item"
                        onClick={() => setForm({ ...form, color: c.hex })}
                      >
                        <div
                          className={`color-circle ${form.color === c.hex ? 'active' : ''}`}
                          style={{
                            background: c.hex,
                            border: c.hex === '#FFFFFF'
                              ? form.color === c.hex
                                ? '2px solid #C9A84C'
                                : '2px solid #333'
                              : form.color === c.hex
                                ? '2px solid #C9A84C'
                                : '2px solid transparent'
                          }}
                        />
                        <span className={`color-name ${form.color === c.hex ? 'active' : ''}`}>
                          {c.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="cust-group">
                  <label className="cust-label">Custom Text / Name</label>
                  <input
                    className="cust-input"
                    name="customText"
                    placeholder="e.g. Rahul, Team 2024, Your Logo Text..."
                    value={form.customText}
                    onChange={handleChange}
                  />
                </div>

                <div className="cust-group">
                  <label className="cust-label">Upload Your Design</label>
                  <div
                    className={`upload-box ${form.fileName ? 'uploaded' : ''}`}
                    onClick={() => document.getElementById('designFile').click()}
                  >
                    <FiUpload size={28} color={form.fileName ? '#4CAF50' : '#C9A84C'} style={{ opacity: 0.7 }} />
                    <p className={`upload-text ${form.fileName ? 'uploaded' : ''}`}>
                      {form.fileName ? `✓ ${form.fileName}` : 'Click to upload image or design file'}
                    </p>
                    <p style={{ fontSize: '10px', color: '#444', marginTop: '6px' }}>
                      JPG, PNG, PDF supported
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

                <div className="cust-group">
                  <label className="cust-label">Quantity</label>
                  <div className="qty-wrap">
                    <button
                      className="qty-btn-cust"
                      onClick={() => setForm({ ...form, quantity: Math.max(1, form.quantity - 1) })}
                    >−</button>
                    <span className="qty-num-cust">{form.quantity}</span>
                    <button
                      className="qty-btn-cust"
                      onClick={() => setForm({ ...form, quantity: form.quantity + 1 })}
                    >+</button>
                  </div>
                </div>

                <div className="cust-group">
                  <label className="cust-label">Special Instructions</label>
                  <textarea
                    className="cust-textarea"
                    name="notes"
                    placeholder="Any extra details, color preferences, references, inspirations..."
                    value={form.notes}
                    onChange={handleChange}
                  />
                </div>
              </>
            )}

            {/* ── STEP 2 — PAYMENT ── */}
            {step === 2 && (
              <>
                <h2 className="cust-card-title">Choose <em>Payment</em></h2>
                <p className="cust-card-sub">Select how you would like to pay for your custom order.</p>

                {error && <div className="cust-error">⚠ {error}</div>}

                <div className="summary-box">
                  <p className="summary-box-title">Order Summary</p>
                  {[
                    ['Garment', form.garment],
                    ['Size', form.size],
                    ['Color', form.color ? '●' : '—'],
                    ['Placement', form.placement || '—'],
                    ['Custom Text', form.customText || '—'],
                    ['Quantity', form.quantity],
                    ['Design File', form.fileName ? '✓ Uploaded' : '—'],
                  ].map(([label, value], i) => (
                    <div className="summary-row-cust" key={i}>
                      <span>{label}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        {label === 'Color' && form.color && (
                          <span style={{ width: 14, height: 14, borderRadius: '50%', background: form.color, border: '1px solid #333', display: 'inline-block' }} />
                        )}
                        {value}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="cust-group">
                  <label className="cust-label">Payment Method *</label>
                  <div className="pay-grid">
                    <div
                      className={`pay-card-cust ${form.paymentMethod === 'cod' ? 'active' : ''}`}
                      onClick={() => setForm({ ...form, paymentMethod: 'cod' })}
                    >
                      <div className="pay-card-icon">🚚</div>
                      <div className="pay-card-title">Cash on Delivery</div>
                      <p className="pay-card-sub">Pay when you receive</p>
                    </div>
                    <div
                      className={`pay-card-cust ${form.paymentMethod === 'online' ? 'active' : ''}`}
                      onClick={() => setForm({ ...form, paymentMethod: 'online' })}
                    >
                      <div className="pay-card-icon">📱</div>
                      <div className="pay-card-title">Online Payment</div>
                      <p className="pay-card-sub">UPI, Card, Net Banking</p>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* ── STEP 3 — DELIVERY ── */}
            {step === 3 && (
              <>
                <h2 className="cust-card-title">Delivery <em>Details</em></h2>
                <p className="cust-card-sub">Where should we send your custom order?</p>

                {error && <div className="cust-error">⚠ {error}</div>}

                <div className="summary-box">
                  <p className="summary-box-title">Final Order Summary</p>
                  {[
                    ['Garment', form.garment],
                    ['Size', form.size],
                    ['Quantity', form.quantity],
                    ['Payment', form.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment'],
                  ].map(([label, value], i) => (
                    <div className="summary-row-cust" key={i}>
                      <span>{label}</span>
                      <span>{value}</span>
                    </div>
                  ))}
                </div>

                <div className="cust-row">
                  <div className="cust-group">
                    <label className="cust-label">Full Name *</label>
                    <input
                      className="cust-input"
                      name="name"
                      placeholder="Your name"
                      value={form.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="cust-group">
                    <label className="cust-label">Phone Number *</label>
                    <input
                      className="cust-input"
                      name="phone"
                      placeholder="10-digit number"
                      value={form.phone}
                      onChange={handleChange}
                      maxLength={10}
                    />
                  </div>
                </div>

                <div className="cust-group">
                  <label className="cust-label">Full Address *</label>
                  <input
                    className="cust-input"
                    name="address"
                    placeholder="House no, Street, Area..."
                    value={form.address}
                    onChange={handleChange}
                  />
                </div>

                <div className="cust-row">
                  <div className="cust-group">
                    <label className="cust-label">City *</label>
                    <input
                      className="cust-input"
                      name="city"
                      placeholder="Your city"
                      value={form.city}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="cust-group">
                    <label className="cust-label">Pincode *</label>
                    <input
                      className="cust-input"
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

            {/* ACTIONS */}
            <div className="cust-actions">
              <button className="cust-back-btn" onClick={prevStep}>
                ← Back
              </button>
              <button className="cust-next-btn" onClick={nextStep}>
                {step === 3 ? '✓ Place Order' : 'Continue →'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}