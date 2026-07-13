import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { FiArrowLeft, FiHeart, FiShoppingBag, FiTrash2 } from 'react-icons/fi';

export default function Wishlist() {
  const navigate = useNavigate();
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <>
      <style>{`
        .wishlist-page {
          min-height: 100vh;
          padding: 100px 60px 80px;
          background: #0A0A0A;
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
          margin-bottom: 40px;
          transition: color 0.2s;
          padding: 0;
        }
        .back-btn:hover { color: #C9A84C; }
        .wishlist-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 48px;
          flex-wrap: wrap;
          gap: 16px;
        }
        .wishlist-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        .wishlist-card {
          background: #111;
          border: 1px solid rgba(201,168,76,0.1);
          transition: all 0.3s;
          position: relative;
          overflow: hidden;
        }
        .wishlist-card:hover {
          border-color: rgba(201,168,76,0.3);
          transform: translateY(-4px);
        }
        .wishlist-img {
          width: 100%;
          height: 240px;
          object-fit: cover;
        }
        .wishlist-emoji {
          width: 100%;
          height: 240px;
          background: #1a1a1a;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 72px;
        }
        .wishlist-info { padding: 20px; }
        .wishlist-cat {
          font-size: 9px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #C9A84C;
          margin-bottom: 6px;
        }
        .wishlist-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 20px;
          color: #F5F0E8;
          margin-bottom: 12px;
        }
        .wishlist-price {
          font-family: 'Cormorant Garamond', serif;
          font-size: 24px;
          color: #C9A84C;
          margin-bottom: 16px;
        }
        .wishlist-actions {
          display: flex;
          gap: 10px;
        }
        .btn-add-cart {
          flex: 1;
          background: #C9A84C;
          border: none;
          color: #0A0A0A;
          padding: 12px;
          font-size: 10px;
          letter-spacing: 2px;
          text-transform: uppercase;
          cursor: pointer;
          font-family: 'Jost', sans-serif;
          font-weight: 600;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        .btn-add-cart:hover { background: #E8D5A3; }
        .btn-remove {
          background: transparent;
          border: 1px solid rgba(255,107,107,0.3);
          color: #ff6b6b;
          padding: 12px 14px;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .btn-remove:hover {
          background: rgba(255,107,107,0.1);
          border-color: #ff6b6b;
        }
        .empty-wishlist {
          text-align: center;
          padding: 80px 24px;
        }
        .empty-icon {
          font-size: 64px;
          margin-bottom: 24px;
          color: #333;
        }
        .empty-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 40px;
          color: #F5F0E8;
          margin-bottom: 12px;
        }
        .empty-title em { font-style: italic; color: #C9A84C; }
        .empty-sub {
          font-size: 12px;
          color: #888;
          margin-bottom: 32px;
          letter-spacing: 0.5px;
        }
        .clear-btn {
          background: transparent;
          border: 1px solid rgba(255,107,107,0.3);
          color: #ff6b6b;
          padding: 10px 24px;
          font-size: 10px;
          letter-spacing: 2px;
          text-transform: uppercase;
          cursor: pointer;
          font-family: 'Jost', sans-serif;
          transition: all 0.2s;
        }
        .clear-btn:hover {
          background: rgba(255,107,107,0.1);
        }
        @media (max-width: 1024px) {
          .wishlist-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          .wishlist-page { padding: 100px 24px 60px; }
          .wishlist-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="wishlist-page">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <FiArrowLeft size={14} /> Back
        </button>

        <div className="wishlist-header">
          <div>
            <p className="section-eyebrow">My Account</p>
            <h1 className="section-title">
              My <em style={{ fontStyle: 'italic', color: '#C9A84C' }}>Wishlist</em>
            </h1>
            <div className="section-line" />
          </div>
          {wishlist.length > 0 && (
            <button className="clear-btn" onClick={clearWishlist}>
              Clear All
            </button>
          )}
        </div>

        {wishlist.length === 0 ? (
          <div className="empty-wishlist">
            <div className="empty-icon">
              <FiHeart size={64} />
            </div>
            <h2 className="empty-title">
              Wishlist is <em>Empty</em>
            </h2>
            <p className="empty-sub">
              Save your favourite products here!
            </p>
            <button
              className="btn-primary"
              onClick={() => navigate('/products')}
            >
              Browse Collection
            </button>
          </div>
        ) : (
          <div className="wishlist-grid">
            {wishlist.map(product => (
              <div className="wishlist-card" key={product.id}>
                {product.img ? (
                  <img
                    className="wishlist-img"
                    src={product.img}
                    alt={product.name}
                  />
                ) : (
                  <div className="wishlist-emoji">
                    {product.icon || '👕'}
                  </div>
                )}
                <div className="wishlist-info">
                  <p className="wishlist-cat">{product.category}</p>
                  <h3 className="wishlist-name">{product.name}</h3>
                  <div className="wishlist-price">₹{product.price}</div>
                  <div className="wishlist-actions">
                    <button
                      className="btn-add-cart"
                      onClick={() => {
                        navigate('/products');
                      }}
                    >
                      <FiShoppingBag size={14} />
                      View & Buy
                    </button>
                    <button
                      className="btn-remove"
                      onClick={() => removeFromWishlist(product.id)}
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}