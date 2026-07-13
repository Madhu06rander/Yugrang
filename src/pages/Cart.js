import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { FiTrash2, FiMinus, FiPlus, FiArrowLeft } from 'react-icons/fi';

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!user) { navigate('/login'); return; }
    navigate('/checkout', {
      state: {
        cartItems: cartItems,
      }
    });
  };

  if (cartItems.length === 0) {
    return (
      <>
        <style>{`
          .empty-cart {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background: #0A0A0A;
            text-align: center;
            padding: 100px 24px;
          }
          .empty-icon { font-size: 80px; margin-bottom: 24px; }
          .empty-title {
            font-family: 'Cormorant Garamond', serif;
            font-size: 42px;
            color: #F5F0E8;
            margin-bottom: 12px;
          }
          .empty-title em { font-style: italic; color: #C9A84C; }
          .empty-sub {
            font-size: 12px;
            color: #888;
            margin-bottom: 36px;
            letter-spacing: 1px;
          }
        `}</style>
        <div className="empty-cart">
          <div className="empty-icon">🛒</div>
          <h2 className="empty-title">Cart is <em>Empty</em></h2>
          <p className="empty-sub">Add some products to your cart first!</p>
          <button
            onClick={() => navigate('/products')}
            style={{
              background: '#C9A84C',
              color: '#0A0A0A',
              border: 'none',
              padding: '14px 40px',
              fontSize: '11px',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              cursor: 'pointer',
              fontFamily: "'Jost', sans-serif",
              fontWeight: '600',
            }}
          >
            Browse Collection
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{`
       .cart-page {
  min-height: 100vh;
  padding: 100px 60px 80px;
  background: #0A0A0A;
  width: 100vw;
  margin: 0;
  box-sizing: border-box;
  overflow-x: hidden;
}
        .cart-grid {
          display: grid;
          grid-template-columns: 1fr 360px;
          gap: 40px;
          margin-top: 40px;
          align-items: start;
        }
        .cart-items { display: flex; flex-direction: column; gap: 16px; }
        .cart-item {
          background: #111;
          border: 1px solid rgba(201,168,76,0.1);
          padding: 20px;
          display: grid;
          grid-template-columns: 100px 1fr auto;
          gap: 20px;
          align-items: center;
          transition: border-color 0.2s;
        }
        .cart-item:hover { border-color: rgba(201,168,76,0.3); }
        .cart-item-img {
          width: 100px;
          height: 100px;
          object-fit: cover;
        }
        .cart-item-emoji {
          width: 100px;
          height: 100px;
          background: #1a1a1a;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 40px;
        }
        .cart-item-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 20px;
          color: #F5F0E8;
          margin-bottom: 6px;
        }
        .cart-item-details {
          font-size: 11px;
          color: #888;
          letter-spacing: 1px;
          margin-bottom: 12px;
        }
        .cart-item-price {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px;
          color: #C9A84C;
        }
        .qty-controls {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: 10px;
        }
        .qty-btn {
          width: 28px;
          height: 28px;
          border: 1px solid rgba(201,168,76,0.3);
          background: transparent;
          color: #C9A84C;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }
        .qty-btn:hover { background: rgba(201,168,76,0.1); }
        .qty-num {
          font-size: 16px;
          color: #F5F0E8;
          min-width: 24px;
          text-align: center;
        }
        .remove-btn {
          background: transparent;
          border: none;
          color: #555;
          cursor: pointer;
          transition: color 0.2s;
          padding: 8px;
        }
        .remove-btn:hover { color: #ff6b6b; }

        /* ORDER SUMMARY */
        .order-summary-box {
          background: #111;
          border: 1px solid rgba(201,168,76,0.15);
          padding: 32px;
          position: sticky;
          top: 100px;
        }
        .summary-heading {
          font-family: 'Cormorant Garamond', serif;
          font-size: 26px;
          color: #F5F0E8;
          margin-bottom: 24px;
        }
        .summary-row {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          color: #888;
          margin-bottom: 12px;
          letter-spacing: 0.5px;
        }
        .summary-row span:last-child { color: #F5F0E8; }
        .summary-divider {
          height: 1px;
          background: rgba(201,168,76,0.15);
          margin: 16px 0;
        }
        .summary-total {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }
        .total-label {
          font-size: 11px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #C9A84C;
        }
        .total-price {
          font-family: 'Cormorant Garamond', serif;
          font-size: 32px;
          color: #C9A84C;
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

        @media (max-width: 900px) {
          .cart-page { padding: 100px 24px 60px; }
          .cart-grid { grid-template-columns: 1fr; }
          .cart-item { grid-template-columns: 80px 1fr auto; }
          .cart-item-img, .cart-item-emoji { width: 80px; height: 80px; }
        }
      `}</style>

      <div className="cart-page">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <FiArrowLeft size={14} /> Back
        </button>

        <p className="section-eyebrow">Your Cart</p>
        <h1 className="section-title">Review Your <em style={{ fontStyle: 'italic', color: '#C9A84C' }}>Order</em></h1>
        <div className="section-line"></div>

        <div className="cart-grid">
          {/* CART ITEMS */}
          <div className="cart-items">
            {cartItems.map(item => (
              <div className="cart-item" key={item.cartId}>
                {item.img
                  ? <img className="cart-item-img" src={item.img} alt={item.name} />
                  : <div className="cart-item-emoji">{item.icon}</div>
                }
                <div>
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-details">
                    Size: {item.size}
                    {item.color && (
                      <span style={{
                        display: 'inline-block',
                        width: 12, height: 12,
                        borderRadius: '50%',
                        background: item.color,
                        marginLeft: 8,
                        verticalAlign: 'middle',
                        border: '1px solid #444'
                      }} />
                    )}
                  </div>
                  <div className="cart-item-price">₹{item.price * item.quantity}</div>
                  <div className="qty-controls">
                    <button className="qty-btn" onClick={() => updateQuantity(item.cartId, item.quantity - 1)}>
                      <FiMinus size={12} />
                    </button>
                    <span className="qty-num">{item.quantity}</span>
                    <button className="qty-btn" onClick={() => updateQuantity(item.cartId, item.quantity + 1)}>
                      <FiPlus size={12} />
                    </button>
                  </div>
                </div>
                <button className="remove-btn" onClick={() => removeFromCart(item.cartId)}>
                  <FiTrash2 size={18} />
                </button>
              </div>
            ))}
          </div>

          {/* ORDER SUMMARY */}
          <div className="order-summary-box">
            <h3 className="summary-heading">Order Summary</h3>
            {cartItems.map(item => (
              <div className="summary-row" key={item.cartId}>
                <span>{item.name} x{item.quantity}</span>
                <span>₹{item.price * item.quantity}</span>
              </div>
            ))}
            <div className="summary-divider" />
            <div className="summary-row">
              <span>Delivery</span>
              <span style={{ color: '#4CAF50' }}>FREE</span>
            </div>
            <div className="summary-divider" />
            <div className="summary-total">
              <span className="total-label">Total</span>
              <span className="total-price">₹{totalPrice}</span>
            </div>
            <button
              className="btn-primary"
              style={{ width: '100%', padding: '16px', fontSize: '11px', letterSpacing: '2px' }}
              onClick={handleCheckout}
            >
              Proceed to Checkout →
            </button>
            <button
              className="btn-outline"
              style={{ width: '100%', padding: '14px', fontSize: '11px', letterSpacing: '2px', marginTop: '12px', textAlign: 'center' }}
              onClick={clearCart}
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
}