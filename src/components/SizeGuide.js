import React, { useState } from 'react';
import { FiX } from 'react-icons/fi';

export default function SizeGuide({ isOpen, onClose, category }) {
  const [activeTab, setActiveTab] = useState('size');

  const sizeCharts = {
    shirt: [
      { size: 'S', chest: '36"', shoulder: '16"', length: '28"', waist: '32"' },
      { size: 'M', chest: '38"', shoulder: '17"', length: '29"', waist: '34"' },
      { size: 'L', chest: '40"', shoulder: '18"', length: '30"', waist: '36"' },
      { size: 'XL', chest: '42"', shoulder: '19"', length: '31"', waist: '38"' },
      { size: 'XXL', chest: '44"', shoulder: '20"', length: '32"', waist: '40"' },
    ],
    kurti: [
      { size: 'S', chest: '34"', shoulder: '14"', length: '40"', waist: '30"' },
      { size: 'M', chest: '36"', shoulder: '15"', length: '41"', waist: '32"' },
      { size: 'L', chest: '38"', shoulder: '16"', length: '42"', waist: '34"' },
      { size: 'XL', chest: '40"', shoulder: '17"', length: '43"', waist: '36"' },
    ],
    tshirt: [
      { size: 'S', chest: '36"', shoulder: '16"', length: '26"', waist: '32"' },
      { size: 'M', chest: '38"', shoulder: '17"', length: '27"', waist: '34"' },
      { size: 'L', chest: '40"', shoulder: '18"', length: '28"', waist: '36"' },
      { size: 'XL', chest: '42"', shoulder: '19"', length: '29"', waist: '38"' },
      { size: 'XXL', chest: '44"', shoulder: '20"', length: '30"', waist: '40"' },
    ],
    hoodie: [
      { size: 'S', chest: '38"', shoulder: '17"', length: '27"', waist: '34"' },
      { size: 'M', chest: '40"', shoulder: '18"', length: '28"', waist: '36"' },
      { size: 'L', chest: '42"', shoulder: '19"', length: '29"', waist: '38"' },
      { size: 'XL', chest: '44"', shoulder: '20"', length: '30"', waist: '40"' },
      { size: 'XXL', chest: '46"', shoulder: '21"', length: '31"', waist: '42"' },
    ],
  };

  const getChart = () => {
    if (!category) return sizeCharts.shirt;
    const cat = category.toLowerCase();
    if (cat.includes('kurti') || cat.includes('kurta')) return sizeCharts.kurti;
    if (cat.includes('t-shirt') || cat.includes('tshirt') || cat.includes('tee')) return sizeCharts.tshirt;
    if (cat.includes('hoodie')) return sizeCharts.hoodie;
    return sizeCharts.shirt;
  };

  if (!isOpen) return null;

  return (
    <>
      <style>{`
        .size-guide-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.85);
          z-index: 99999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }
        .size-guide-box {
          background: #1A1A1A;
          border: 1px solid rgba(201,168,76,0.25);
          max-width: 600px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
        }
        .size-guide-header {
          padding: 28px 32px;
          border-bottom: 1px solid rgba(201,168,76,0.15);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .size-guide-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 28px;
          color: #F5F0E8;
          font-weight: 300;
        }
        .size-guide-title em {
          font-style: italic;
          color: #C9A84C;
        }
        .size-guide-close {
          background: transparent;
          border: 1px solid rgba(201,168,76,0.2);
          color: #888;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
        }
        .size-guide-close:hover {
          border-color: #C9A84C;
          color: #C9A84C;
        }
        .size-guide-tabs {
          display: flex;
          border-bottom: 1px solid rgba(201,168,76,0.1);
        }
        .size-tab {
          padding: 14px 24px;
          font-size: 10px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #888;
          cursor: pointer;
          border: none;
          background: transparent;
          font-family: 'Jost', sans-serif;
          transition: all 0.2s;
          border-bottom: 2px solid transparent;
        }
        .size-tab.active {
          color: #C9A84C;
          border-bottom-color: #C9A84C;
        }
        .size-guide-body { padding: 32px; }
        .size-tip {
          background: rgba(201,168,76,0.06);
          border: 1px solid rgba(201,168,76,0.15);
          padding: 16px;
          font-size: 12px;
          color: #888;
          line-height: 1.8;
          margin-bottom: 24px;
          letter-spacing: 0.3px;
        }
        .size-tip strong { color: #C9A84C; }
        .size-table {
          width: 100%;
          border-collapse: collapse;
        }
        .size-table th {
          font-size: 9px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #C9A84C;
          padding: 12px 16px;
          text-align: left;
          border-bottom: 1px solid rgba(201,168,76,0.2);
          background: rgba(201,168,76,0.05);
        }
        .size-table td {
          padding: 12px 16px;
          font-size: 13px;
          color: #888;
          border-bottom: 1px solid rgba(255,255,255,0.04);
        }
        .size-table tr:hover td {
          background: rgba(201,168,76,0.03);
          color: #F5F0E8;
        }
        .size-table td:first-child {
          color: #F5F0E8;
          font-weight: 500;
          letter-spacing: 1px;
        }
        .measure-guide {
          margin-top: 8px;
        }
        .measure-item {
          display: flex;
          gap: 16px;
          padding: 16px 0;
          border-bottom: 1px solid rgba(201,168,76,0.06);
          align-items: flex-start;
        }
        .measure-num {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(201,168,76,0.1);
          border: 1px solid rgba(201,168,76,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          color: #C9A84C;
          flex-shrink: 0;
        }
        .measure-text h4 {
          font-size: 13px;
          color: #F5F0E8;
          margin-bottom: 4px;
          font-family: 'Cormorant Garamond', serif;
          font-size: 16px;
        }
        .measure-text p {
          font-size: 12px;
          color: #666;
          line-height: 1.7;
        }
      `}</style>

      <div className="size-guide-overlay" onClick={onClose}>
        <div className="size-guide-box" onClick={e => e.stopPropagation()}>
          <div className="size-guide-header">
            <h2 className="size-guide-title">Size <em>Guide</em></h2>
            <button className="size-guide-close" onClick={onClose}>
              <FiX size={16} />
            </button>
          </div>

          <div className="size-guide-tabs">
            <button
              className={`size-tab ${activeTab === 'size' ? 'active' : ''}`}
              onClick={() => setActiveTab('size')}
            >
              Size Chart
            </button>
            <button
              className={`size-tab ${activeTab === 'measure' ? 'active' : ''}`}
              onClick={() => setActiveTab('measure')}
            >
              How to Measure
            </button>
          </div>

          <div className="size-guide-body">
            {activeTab === 'size' && (
              <>
                <div className="size-tip">
                  💡 <strong>Tip:</strong> If you are between sizes, we recommend going one size up for a comfortable fit. All measurements are in inches.
                </div>
                <table className="size-table">
                  <thead>
                    <tr>
                      <th>Size</th>
                      <th>Chest</th>
                      <th>Shoulder</th>
                      <th>Length</th>
                      <th>Waist</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getChart().map((row, i) => (
                      <tr key={i}>
                        <td>{row.size}</td>
                        <td>{row.chest}</td>
                        <td>{row.shoulder}</td>
                        <td>{row.length}</td>
                        <td>{row.waist}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}

            {activeTab === 'measure' && (
              <div className="measure-guide">
                <div className="size-tip">
                  📏 <strong>Note:</strong> Use a soft measuring tape for accurate measurements. Measure over light clothing or directly on body.
                </div>
                {[
                  {
                    title: 'Chest',
                    desc: 'Wrap the tape measure around the fullest part of your chest, keeping it parallel to the ground. Keep arms relaxed at your sides.'
                  },
                  {
                    title: 'Shoulder',
                    desc: 'Measure from the tip of one shoulder across to the tip of the other shoulder, across the back.'
                  },
                  {
                    title: 'Length',
                    desc: 'Measure from the highest point of the shoulder (near neck) straight down to the desired length.'
                  },
                  {
                    title: 'Waist',
                    desc: 'Measure around the narrowest part of your waist, usually about 1 inch above your belly button.'
                  },
                ].map((item, i) => (
                  <div className="measure-item" key={i}>
                    <div className="measure-num">{i + 1}</div>
                    <div className="measure-text">
                      <h4>{item.title}</h4>
                      <p>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}