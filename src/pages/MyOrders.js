import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../api';
import { FiPackage, FiArrowLeft, FiClock, FiCheck, FiTruck, FiX } from 'react-icons/fi';

export default function MyOrders() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    if (!user) { navigate('/login'); return; }
    loadOrders();

    // Har 30 seconds mein auto refresh
    const interval = setInterval(() => {
      loadOrders();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const loadOrders = async () => {
    setLoading(true);
    const res = await authAPI.getMyOrders();
    if (res.success) setOrders(res.orders);
    setLoading(false);
  };

  const statusSteps = [
    { key: 'Pending', label: 'Order Placed', icon: '🛍️' },
    { key: 'Packed', label: 'Packed & Ready', icon: '📦' },
    { key: 'Shipped', label: 'Shipped', icon: '🚚' },
    { key: 'Delivered', label: 'Delivered', icon: '✅' },
  ];

  const getStepIndex = (status) => {
    if (status === 'Cancelled') return -1;
    return statusSteps.findIndex(s => s.key === status);
  };

  const statusColor = (status) => {
    const colors = {
      'Pending': '#FFA500',
      'Processing': '#1B3A6B',
      'In Production': '#800080',
      'Packed': '#C9A84C',
      'Shipped': '#40E0D0',
      'Delivered': '#4CAF50',
      'Cancelled': '#ff6b6b',
    };
    return colors[status] || '#888';
  };

  return (
    <>
      <style>{`
        .myorders-page {
          min-height: 100vh;
          padding: 100px 60px 80px;
          background: #0A0A0A;
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
        .orders-grid {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-top: 40px;
        }
        .order-card {
          background: #111;
          border: 1px solid rgba(201,168,76,0.1);
          padding: 28px;
          transition: border-color 0.2s;
          cursor: pointer;
        }
        .order-card:hover { border-color: rgba(201,168,76,0.3); }
        .order-card-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 20px;
          flex-wrap: wrap;
          gap: 12px;
        }
        .order-id {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px;
          color: #C9A84C;
          margin-bottom: 4px;
        }
        .order-date {
          font-size: 11px;
          color: #555;
          letter-spacing: 1px;
        }
        .order-amount {
          font-family: 'Cormorant Garamond', serif;
          font-size: 28px;
          color: #F5F0E8;
          text-align: right;
        }
        .order-payment {
          font-size: 10px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #555;
          text-align: right;
        }
        .status-badge {
          display: inline-block;
          padding: 5px 14px;
          font-size: 9px;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 20px;
        }

        /* TRACKING STEPPER */
        .tracking-stepper {
          display: flex;
          align-items: center;
          margin: 20px 0;
          overflow-x: auto;
          padding-bottom: 8px;
        }
        .tracking-step {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          min-width: 80px;
        }
        .tracking-circle {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          border: 2px solid rgba(201,168,76,0.2);
          background: #1a1a1a;
          color: #444;
          transition: all 0.3s;
          flex-shrink: 0;
        }
        .tracking-circle.completed {
          background: #C9A84C;
          border-color: #C9A84C;
          color: #0A0A0A;
        }
        .tracking-circle.active {
  background: #C9A84C;
  border-color: #C9A84C;
  color: #0A0A0A;
  box-shadow: 0 0 16px rgba(201,168,76,0.5);
  transform: scale(1.1);
}
        .tracking-label {
          font-size: 9px;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: #444;
          text-align: center;
          line-height: 1.4;
        }
        .tracking-label.completed { color: #C9A84C; }
        .tracking-label.active { color: #F5F0E8; }
        .tracking-line {
          flex: 1;
          height: 2px;
          background: rgba(201,168,76,0.1);
          margin: 0 4px;
          margin-bottom: 28px;
          min-width: 20px;
        }
        .tracking-line.completed { background: #C9A84C; }

        /* ORDER ITEMS */
        .order-items {
          margin-top: 16px;
          padding-top: 16px;
          border-top: 1px solid rgba(201,168,76,0.08);
        }
        .order-items-title {
          font-size: 9px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #555;
          margin-bottom: 12px;
        }
        .order-item-row {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          color: #888;
          padding: 6px 0;
          border-bottom: 1px solid rgba(255,255,255,0.03);
        }
        .order-item-row span:last-child { color: #C9A84C; }

        /* CANCELLED */
        .cancelled-banner {
          background: rgba(255,107,107,0.08);
          border: 1px solid rgba(255,107,107,0.2);
          padding: 12px 16px;
          font-size: 12px;
          color: #ff6b6b;
          letter-spacing: 1px;
          margin-top: 16px;
        }

        /* EMPTY */
        .empty-orders {
          text-align: center;
          padding: 80px 24px;
        }
        .empty-icon { font-size: 60px; margin-bottom: 20px; }
        .empty-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 36px;
          color: #F5F0E8;
          margin-bottom: 12px;
        }
        .empty-title em { font-style: italic; color: #C9A84C; }
        .empty-sub {
          font-size: 12px;
          color: #888;
          margin-bottom: 32px;
          letter-spacing: 1px;
        }

        /* LOADING */
        .orders-loading {
          text-align: center;
          padding: 60px;
          color: #C9A84C;
          font-size: 11px;
          letter-spacing: 3px;
          text-transform: uppercase;
        }

        @media (max-width: 768px) {
          .myorders-page { padding: 100px 24px 60px; }
          .order-card-top { flex-direction: column; }
          .order-amount { text-align: left; }
          .tracking-step { min-width: 60px; }
          .tracking-circle { width: 32px; height: 32px; font-size: 12px; }
          .tracking-label { font-size: 8px; }
        }
      `}</style>

      <div className="myorders-page">
        <button className="back-btn" onClick={() => navigate('/')}>
          <FiArrowLeft size={14} /> Back to Home
        </button>

        <p className="section-eyebrow">My Account</p>
        <h1 className="section-title">My <em style={{ fontStyle: 'italic', color: '#C9A84C' }}>Orders</em></h1>
        <div className="section-line"></div>

        {loading ? (
          <div className="orders-loading">Loading your orders...</div>
        ) : orders.length === 0 ? (
          <div className="empty-orders">
            <div className="empty-icon">🛍️</div>
            <h2 className="empty-title">No <em>Orders</em> Yet</h2>
            <p className="empty-sub">You haven't placed any orders yet!</p>
            <button className="btn-primary" onClick={() => navigate('/products')}>
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="orders-grid">
            {orders.map(order => {
              const stepIndex = getStepIndex(order.status);
              return (
                <div className="order-card" key={order.order_id}>
                  <div className="order-card-top">
                    <div>
                      <div className="order-id">#{order.order_id}</div>
                      <div className="order-date">
                        {new Date(order.created_at).toLocaleDateString('en-IN', {
                          day: 'numeric', month: 'long', year: 'numeric'
                        })}
                      </div>
                    </div>
                    <div>
                      <div className="order-amount">₹{order.total_price}</div>
                      <div className="order-payment">{order.payment_method}</div>
                    </div>
                  </div>

                  {/* STATUS BADGE */}
                  <span
                    className="status-badge"
                    style={{
                      background: `${statusColor(order.status)}22`,
                      color: statusColor(order.status),
                      border: `1px solid ${statusColor(order.status)}44`
                    }}
                  >
                    {order.status}
                  </span>

                  {/* TRACKING STEPPER */}
                  {order.status !== 'Cancelled' && (
                    <div className="tracking-stepper">
                      {statusSteps.map((step, i) => (
                        <React.Fragment key={step.key}>
                          <div className="tracking-step">
                            <div className={`tracking-circle ${i < stepIndex ? 'completed' :
                                i === stepIndex ? 'active' : ''
                              }`}>
                              {i < stepIndex ? <FiCheck size={14} /> : step.icon}
                            </div>
                            <div className={`tracking-label ${i < stepIndex ? 'completed' :
                                i === stepIndex ? 'active' : ''
                              }`}>
                              {step.label}
                            </div>
                          </div>
                          {i < statusSteps.length - 1 && (
                            <div className={`tracking-line ${i < stepIndex ? 'completed' : ''}`} />
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  )}

                  {/* CANCELLED */}
                  {order.status === 'Cancelled' && (
                    <div className="cancelled-banner">
                      <FiX size={14} style={{ marginRight: 8 }} />
                      This order has been cancelled.
                    </div>
                  )}

                  {/* ORDER ITEMS */}
                  {order.items && order.items.length > 0 && (
                    <div className="order-items">
                      <div className="order-items-title">Items Ordered</div>
                      {order.items.map((item, i) => (
                        <div className="order-item-row" key={i}>
                          <span>{item.product_name} — Size: {item.size} × {item.quantity}</span>
                          <span>₹{item.price * item.quantity}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* TRACKING ID + ADDRESS */}
                  <div style={{
                    marginTop: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px'
                  }}>
                    {order.tracking_id && (
                      <div style={{
                        padding: '14px 16px',
                        background: 'rgba(201,168,76,0.06)',
                        border: '1px solid rgba(201,168,76,0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: '8px'
                      }}>
                        <div>
                          <p style={{
                            fontSize: '9px',
                            letterSpacing: '3px',
                            textTransform: 'uppercase',
                            color: '#C9A84C',
                            margin: '0 0 4px 0'
                          }}>
                            🔍 Tracking ID
                          </p>
                          <p style={{
                            fontSize: '16px',
                            color: '#F5F0E8',
                            fontFamily: "'Cormorant Garamond', serif",
                            letterSpacing: '2px',
                            margin: 0
                          }}>
                            {order.tracking_id}
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(order.tracking_id);
                            alert('Tracking ID copied!');
                          }}
                          style={{
                            background: 'transparent',
                            border: '1px solid rgba(201,168,76,0.3)',
                            color: '#C9A84C',
                            padding: '6px 14px',
                            fontSize: '10px',
                            letterSpacing: '2px',
                            textTransform: 'uppercase',
                            cursor: 'pointer',
                            fontFamily: "'Jost', sans-serif",
                          }}
                        >
                          Copy
                        </button>
                      </div>
                    )}
                    <div style={{
                      padding: '12px 16px',
                      background: 'rgba(201,168,76,0.04)',
                      border: '1px solid rgba(201,168,76,0.08)',
                      fontSize: '12px',
                      color: '#666',
                      lineHeight: '1.8'
                    }}>
                      📍 {order.address}, {order.city} — {order.pincode}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}