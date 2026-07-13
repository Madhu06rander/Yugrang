import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

export default function PrivacyPolicy() {
  const navigate = useNavigate();

  return (
    <>
      <style>{`
        .policy-page {
          min-height: 100vh;
          background: #0A0A0A;
          padding: 100px 60px 80px;
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
        .policy-hero {
          text-align: center;
          padding: 40px 0 60px;
          border-bottom: 1px solid rgba(201,168,76,0.1);
          margin-bottom: 60px;
        }
        .policy-tag {
          font-size: 9px;
          letter-spacing: 5px;
          text-transform: uppercase;
          color: #C9A84C;
          margin-bottom: 16px;
        }
        .policy-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(40px, 6vw, 80px);
          font-weight: 300;
          color: #F5F0E8;
          line-height: 1.1;
        }
        .policy-title em { font-style: italic; color: #C9A84C; }
        .policy-date {
          font-size: 11px;
          color: #555;
          letter-spacing: 2px;
          margin-top: 16px;
        }
        .policy-content {
          max-width: 800px;
          margin: 0 auto;
        }
        .policy-section {
          margin-bottom: 48px;
          padding-bottom: 48px;
          border-bottom: 1px solid rgba(201,168,76,0.06);
        }
        .policy-section:last-child { border-bottom: none; }
        .policy-section-num {
          font-size: 9px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #C9A84C;
          margin-bottom: 8px;
        }
        .policy-section-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 28px;
          color: #F5F0E8;
          margin-bottom: 16px;
          font-weight: 300;
        }
        .policy-text {
          font-size: 13px;
          color: #888;
          line-height: 2;
          margin-bottom: 12px;
          letter-spacing: 0.3px;
        }
        .policy-list {
          list-style: none;
          padding: 0;
          margin: 0 0 12px 0;
        }
        .policy-list li {
          font-size: 13px;
          color: #888;
          line-height: 2;
          padding-left: 20px;
          position: relative;
        }
        .policy-list li::before {
          content: '✦';
          position: absolute;
          left: 0;
          color: #C9A84C;
          font-size: 8px;
          top: 8px;
        }
        .policy-highlight {
          background: rgba(201,168,76,0.06);
          border-left: 2px solid #C9A84C;
          padding: 16px 20px;
          margin: 16px 0;
          font-size: 13px;
          color: #888;
          line-height: 1.8;
        }
        @media (max-width: 768px) {
          .policy-page { padding: 100px 24px 60px; }
        }
      `}</style>

      <div className="policy-page">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <FiArrowLeft size={14} /> Back
        </button>

        <div className="policy-hero">
          <p className="policy-tag">Legal</p>
          <h1 className="policy-title">
            Privacy <em>Policy</em>
          </h1>
          <p className="policy-date">Last Updated: June 2026</p>
        </div>

        <div className="policy-content">
          <div className="policy-highlight">
            At Yugrang Clothiers, we are committed to protecting your privacy. This policy explains how we collect, use, and safeguard your personal information when you use our website or services.
          </div>

          {[
            {
              num: '01',
              title: 'Information We Collect',
              content: (
                <>
                  <p className="policy-text">We collect the following information when you use our services:</p>
                  <ul className="policy-list">
                    <li>Name, email address, and phone number when you create an account</li>
                    <li>Delivery address and pincode when you place an order</li>
                    <li>Order history and preferences</li>
                    <li>Payment method selection (we do not store card details)</li>
                    <li>Custom design files you upload for custom orders</li>
                  </ul>
                </>
              )
            },
            {
              num: '02',
              title: 'How We Use Your Information',
              content: (
                <>
                  <p className="policy-text">We use your information to:</p>
                  <ul className="policy-list">
                    <li>Process and deliver your orders</li>
                    <li>Send order confirmation and status update emails</li>
                    <li>Contact you on WhatsApp for order confirmation</li>
                    <li>Provide customer support</li>
                    <li>Improve our products and services</li>
                  </ul>
                </>
              )
            },
            {
              num: '03',
              title: 'Data Security',
              content: (
                <>
                  <p className="policy-text">
                    We take the security of your data seriously. Your password is encrypted using industry-standard bcrypt hashing. We use JWT tokens for secure authentication.
                  </p>
                  <p className="policy-text">
                    We do not store your payment card details. All online payments are processed through secure payment gateways.
                  </p>
                </>
              )
            },
            {
              num: '04',
              title: 'Sharing Your Information',
              content: (
                <>
                  <p className="policy-text">We do not sell, trade, or rent your personal information to third parties. We may share your information with:</p>
                  <ul className="policy-list">
                    <li>Courier partners (Shiprocket, Delhivery) for order delivery — only name, phone, and address</li>
                    <li>Payment gateways for processing transactions</li>
                    <li>Legal authorities if required by law</li>
                  </ul>
                </>
              )
            },
            {
              num: '05',
              title: 'Cookies',
              content: (
                <>
                  <p className="policy-text">
                    Our website uses localStorage to store your login session and cart information. This helps you stay logged in and keeps your cart items saved.
                  </p>
                  <p className="policy-text">
                    You can clear this data at any time by logging out or clearing your browser data.
                  </p>
                </>
              )
            },
            {
              num: '06',
              title: 'Your Rights',
              content: (
                <>
                  <p className="policy-text">You have the right to:</p>
                  <ul className="policy-list">
                    <li>Access your personal information stored with us</li>
                    <li>Request correction of incorrect information</li>
                    <li>Request deletion of your account and data</li>
                    <li>Opt out of marketing communications</li>
                  </ul>
                </>
              )
            },
            
            {
              num: '07',
              title: 'Contact Us',
              content: (
                <>
                  <p className="policy-text">For any privacy-related questions or concerns, please contact us:</p>
                  <ul className="policy-list">
                    <li>Email: yugrang2026@gmail.com</li>
                    <li>Location: Udaipur, Rajasthan, India</li>
                    <li>Website: yugrang.com</li>
                  </ul>
                </>
              )
            },
          ].map((section, i) => (
            <div className="policy-section" key={i}>
              <p className="policy-section-num">{section.num}</p>
              <h2 className="policy-section-title">{section.title}</h2>
              {section.content}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}