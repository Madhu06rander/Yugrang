import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiArrowLeft, FiStar } from 'react-icons/fi';

export default function Reviews() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [reviews, setReviews] = useState(
    JSON.parse(localStorage.getItem('yugrang_reviews')) || [
      {
        id: 1,
        name: 'Priya Sharma',
        location: 'Jaipur',
        product: 'Mandala Print Kurta',
        rating: 5,
        comment: 'Absolutely love the quality! The mandala print exceeded my expectations.',
        date: '2026-06-15',
        verified: true,
      },
      {
        id: 2,
        name: 'Rahul & Sneha',
        location: 'Mumbai',
        product: 'Bear Couple Hoodie',
        rating: 5,
        comment: 'Ordered couple hoodies for our anniversary — they turned out perfect!',
        date: '2026-06-20',
        verified: true,
      },
      {
        id: 3,
        name: 'Arjun Mehta',
        location: 'Udaipur',
        product: 'Hand Painted Shirt',
        rating: 5,
        comment: 'The hand painted shirt is a masterpiece. Got so many compliments!',
        date: '2026-06-22',
        verified: true,
      },
    ]
  );

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    product: '',
    rating: 0,
    comment: '',
  });
  const [hoverRating, setHoverRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = () => {
    setError('');
    if (!form.product) { setError('Please enter product name.'); return; }
    if (!form.rating) { setError('Please select a rating.'); return; }
    if (!form.comment || form.comment.length < 10) { setError('Please write at least 10 characters.'); return; }

    const newReview = {
      id: Date.now(),
      name: user?.name || 'Anonymous',
      location: 'India',
      product: form.product,
      rating: form.rating,
      comment: form.comment,
      date: new Date().toISOString().split('T')[0],
      verified: !!user,
    };

    const updated = [newReview, ...reviews];
    setReviews(updated);
    localStorage.setItem('yugrang_reviews', JSON.stringify(updated));
    setSubmitted(true);
    setForm({ product: '', rating: 0, comment: '' });
    setShowForm(false);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const avgRating = reviews.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : 0;

  const ratingCount = [5, 4, 3, 2, 1].map(star => ({
    star,
    count: reviews.filter(r => r.rating === star).length,
    percent: reviews.length
      ? Math.round((reviews.filter(r => r.rating === star).length / reviews.length) * 100)
      : 0,
  }));

  return (
    <>
      <style>{`
        .reviews-page {
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
        .reviews-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 60px;
          flex-wrap: wrap;
          gap: 24px;
        }
        .rating-overview {
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 48px;
          background: #111;
          border: 1px solid rgba(201,168,76,0.1);
          padding: 40px;
          margin-bottom: 48px;
          align-items: center;
        }
        .rating-big {
          text-align: center;
        }
        .rating-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 72px;
          color: #C9A84C;
          line-height: 1;
          margin-bottom: 8px;
        }
        .rating-stars {
          color: #C9A84C;
          font-size: 20px;
          letter-spacing: 2px;
          margin-bottom: 8px;
        }
        .rating-count {
          font-size: 11px;
          color: #555;
          letter-spacing: 2px;
          text-transform: uppercase;
        }
        .rating-bars { width: 100%; }
        .rating-bar-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 10px;
        }
        .rating-bar-label {
          font-size: 11px;
          color: #888;
          width: 40px;
          flex-shrink: 0;
          letter-spacing: 1px;
        }
        .rating-bar-bg {
          flex: 1;
          height: 6px;
          background: rgba(201,168,76,0.1);
          border-radius: 3px;
          overflow: hidden;
        }
        .rating-bar-fill {
          height: 100%;
          background: #C9A84C;
          border-radius: 3px;
          transition: width 0.6s ease;
        }
        .rating-bar-count {
          font-size: 11px;
          color: #555;
          width: 24px;
          text-align: right;
          flex-shrink: 0;
        }
        .reviews-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
          margin-bottom: 40px;
        }
        .review-card {
          background: #111;
          border: 1px solid rgba(201,168,76,0.08);
          padding: 28px;
          transition: all 0.3s;
        }
        .review-card:hover {
          border-color: rgba(201,168,76,0.25);
          transform: translateY(-2px);
        }
        .review-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 16px;
        }
        .review-stars { color: #C9A84C; font-size: 14px; letter-spacing: 2px; }
        .review-date { font-size: 10px; color: #444; letter-spacing: 1px; }
        .review-product {
          font-size: 10px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #C9A84C;
          margin-bottom: 10px;
        }
        .review-comment {
          font-size: 13px;
          color: #888;
          line-height: 1.8;
          font-style: italic;
          margin-bottom: 20px;
        }
        .review-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .review-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 18px;
          color: #F5F0E8;
        }
        .review-location {
          font-size: 10px;
          color: #555;
          letter-spacing: 1px;
        }
        .verified-badge {
          font-size: 9px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #4CAF50;
          background: rgba(76,175,80,0.1);
          border: 1px solid rgba(76,175,80,0.2);
          padding: 3px 8px;
        }
        /* WRITE REVIEW FORM */
        .review-form {
          background: #111;
          border: 1px solid rgba(201,168,76,0.15);
          padding: 40px;
          margin-top: 40px;
          position: relative;
        }
        .review-form::before {
          content: '';
          position: absolute;
          top: -1px; left: -1px;
          width: 20px; height: 20px;
          border-top: 2px solid #C9A84C;
          border-left: 2px solid #C9A84C;
        }
        .review-form::after {
          content: '';
          position: absolute;
          bottom: -1px; right: -1px;
          width: 20px; height: 20px;
          border-bottom: 2px solid #C9A84C;
          border-right: 2px solid #C9A84C;
        }
        .star-selector {
          display: flex;
          gap: 8px;
          margin-bottom: 24px;
        }
        .star-btn {
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
          transition: transform 0.2s;
        }
        .star-btn:hover { transform: scale(1.2); }
        .success-toast {
          position: fixed;
          bottom: 32px;
          left: 50%;
          transform: translateX(-50%);
          background: #1A1A1A;
          border: 1px solid rgba(76,175,80,0.4);
          color: #4CAF50;
          padding: 16px 32px;
          font-size: 12px;
          letter-spacing: 2px;
          z-index: 9999;
          animation: toastIn 0.3s ease;
        }
        @keyframes toastIn {
          from { opacity: 0; transform: translateX(-50%) translateY(20px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
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
        .form-group { margin-bottom: 24px; }
        .error-box {
          background: rgba(255,107,107,0.08);
          border: 1px solid rgba(255,107,107,0.3);
          padding: 12px 16px;
          font-size: 12px;
          color: #ff6b6b;
          margin-bottom: 20px;
        }
        @media (max-width: 768px) {
          .reviews-page { padding: 100px 24px 60px; }
          .reviews-grid { grid-template-columns: 1fr; }
          .rating-overview { grid-template-columns: 1fr; gap: 24px; }
          .review-form { padding: 24px; }
        }
      `}</style>

      {submitted && (
        <div className="success-toast">
          ✓ Review submitted successfully!
        </div>
      )}

      <div className="reviews-page">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <FiArrowLeft size={14} /> Back
        </button>

        <div className="reviews-header">
          <div>
            <p className="section-eyebrow">Customer Stories</p>
            <h1 className="section-title">
              Reviews & <em style={{ fontStyle: 'italic', color: '#C9A84C' }}>Ratings</em>
            </h1>
            <div className="section-line" />
          </div>
          {user && (
            <button
              onClick={() => setShowForm(!showForm)}
              style={{
                background: showForm ? 'transparent' : '#C9A84C',
                color: showForm ? '#C9A84C' : '#0A0A0A',
                border: '1px solid #C9A84C',
                padding: '12px 28px',
                fontSize: '10px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                cursor: 'pointer',
                fontFamily: "'Jost', sans-serif",
                fontWeight: '600',
                transition: 'all 0.2s',
              }}
            >
              {showForm ? '✕ Cancel' : '✍ Write Review'}
            </button>
          )}
        </div>

        {/* RATING OVERVIEW */}
        <div className="rating-overview">
          <div className="rating-big">
            <div className="rating-num">{avgRating}</div>
            <div className="rating-stars">
              {'★'.repeat(Math.round(avgRating))}{'☆'.repeat(5 - Math.round(avgRating))}
            </div>
            <div className="rating-count">{reviews.length} Reviews</div>
          </div>
          <div className="rating-bars">
            {ratingCount.map(({ star, count, percent }) => (
              <div className="rating-bar-row" key={star}>
                <span className="rating-bar-label">{star} ★</span>
                <div className="rating-bar-bg">
                  <div
                    className="rating-bar-fill"
                    style={{ width: `${percent}%` }}
                  />
                </div>
                <span className="rating-bar-count">{count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* WRITE REVIEW FORM */}
        {showForm && (
          <div className="review-form">
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '28px',
              color: '#F5F0E8',
              marginBottom: '8px',
              fontWeight: 300,
            }}>
              Write a <em style={{ fontStyle: 'italic', color: '#C9A84C' }}>Review</em>
            </h2>
            <p style={{ fontSize: '12px', color: '#888', marginBottom: '32px' }}>
              Share your experience with Yugrang products
            </p>

            {error && <div className="error-box">⚠ {error}</div>}

            <div className="form-group">
              <label className="form-label">Product Name *</label>
              <input
                className="form-input"
                placeholder="Which product are you reviewing?"
                value={form.product}
                onChange={e => setForm({ ...form, product: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Your Rating *</label>
              <div className="star-selector">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    className="star-btn"
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setForm({ ...form, rating: star })}
                  >
                    <FiStar
                      size={28}
                      fill={star <= (hoverRating || form.rating) ? '#C9A84C' : 'none'}
                      color={star <= (hoverRating || form.rating) ? '#C9A84C' : '#333'}
                    />
                  </button>
                ))}
                {form.rating > 0 && (
                  <span style={{ fontSize: '12px', color: '#C9A84C', alignSelf: 'center', marginLeft: '8px' }}>
                    {['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'][form.rating]}
                  </span>
                )}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Your Review *</label>
              <textarea
                className="form-input"
                placeholder="Tell us about your experience..."
                value={form.comment}
                onChange={e => setForm({ ...form, comment: e.target.value })}
                style={{ minHeight: '120px', resize: 'vertical' }}
              />
              <p style={{ fontSize: '10px', color: '#444', marginTop: '6px', letterSpacing: '1px' }}>
                {form.comment.length}/500 characters
              </p>
            </div>

            <button
              onClick={handleSubmit}
              style={{
                background: '#C9A84C',
                color: '#0A0A0A',
                border: 'none',
                padding: '16px 40px',
                fontSize: '11px',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                cursor: 'pointer',
                fontFamily: "'Jost', sans-serif",
                fontWeight: '700',
                transition: 'all 0.2s',
              }}
            >
              Submit Review →
            </button>
          </div>
        )}

        {/* REVIEWS GRID */}
        <div className="reviews-grid" style={{ marginTop: showForm ? '40px' : '0' }}>
          {reviews.map(review => (
            <div className="review-card" key={review.id}>
              <div className="review-top">
                <div className="review-stars">
                  {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                </div>
                <div className="review-date">{review.date}</div>
              </div>
              <p className="review-product">✦ {review.product}</p>
              <p className="review-comment">"{review.comment}"</p>
              <div className="review-bottom">
                <div>
                  <div className="review-name">{review.name}</div>
                  <div className="review-location">{review.location}</div>
                </div>
                {review.verified && (
                  <span className="verified-badge">✓ Verified</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}