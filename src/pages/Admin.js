import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { adminAPI } from '../api';
import {
  FiPackage, FiUsers, FiDollarSign, FiClock,
  FiCheck, FiTruck, FiX, FiEdit, FiLogOut,
  FiShoppingBag, FiGrid, FiList
} from 'react-icons/fi';

const ADMIN_EMAIL = 'yugrang2026@gmail.com';

export default function Admin() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState(null);
  const [orders, setOrders] = useState([]);
  const [customOrders, setCustomOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || user.email !== ADMIN_EMAIL) {
      navigate('/');
      return;
    }
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    setLoading(true);
    const res = await adminAPI.getDashboard();
    if (res.success) setStats(res.stats);
    setLoading(false);
  };

  const loadOrders = async () => {
    setLoading(true);
    const res = await adminAPI.getAllOrders();
    if (res.success) setOrders(res.orders);
    setLoading(false);
  };

  const loadCustomOrders = async () => {
    setLoading(true);
    const res = await adminAPI.getCustomOrders();
    if (res.success) setCustomOrders(res.orders);
    setLoading(false);
  };

  const loadCustomers = async () => {
    setLoading(true);
    const res = await adminAPI.getAllCustomers();
    if (res.success) setCustomers(res.customers);
    setLoading(false);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'orders') loadOrders();
    else if (tab === 'custom') loadCustomOrders();
    else if (tab === 'customers') loadCustomers();
    else if (tab === 'dashboard') loadDashboard();
  };

  const updateStatus = async (orderId, status) => {
    const res = await adminAPI.updateOrderStatus(orderId, status);
    if (res.success) {
      loadOrders();
      alert(`Order ${orderId} status updated to ${status}!`);
    }
  };

  const statusColor = (status) => {
    const colors = {
      'Pending': '#FFA500',
      'Processing': '#1B3A6B',
      'Shipped': '#C9A84C',
      'Delivered': '#4CAF50',
      'Cancelled': '#ff6b6b',
    };
    return colors[status] || '#888';
  };

  return (
    <>
      <style>{`
        .admin-page {
          min-height: 100vh;
          background: #0A0A0A;
          display: flex;
        }

        /* SIDEBAR */
        .admin-sidebar {
          width: 240px;
          background: #111;
          border-right: 1px solid rgba(201,168,76,0.15);
          padding: 0;
          display: flex;
          flex-direction: column;
          position: fixed;
          top: 0;
          left: 0;
          height: 100vh;
          z-index: 100;
        }
        .admin-logo {
          padding: 28px 24px;
          border-bottom: 1px solid rgba(201,168,76,0.15);
        }
        .admin-logo-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: 20px;
          color: #C9A84C;
          letter-spacing: 4px;
        }
        .admin-logo-sub {
          font-size: 9px;
          letter-spacing: 3px;
          color: #555;
          text-transform: uppercase;
          margin-top: 4px;
        }
        .admin-nav {
          padding: 20px 0;
          flex: 1;
        }
        .admin-nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 24px;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #666;
          border-left: 3px solid transparent;
        }
        .admin-nav-item:hover {
          color: #C9A84C;
          background: rgba(201,168,76,0.05);
        }
        .admin-nav-item.active {
          color: #C9A84C;
          background: rgba(201,168,76,0.08);
          border-left-color: #C9A84C;
        }
        .admin-logout {
          padding: 20px 24px;
          border-top: 1px solid rgba(201,168,76,0.15);
        }
        .admin-logout-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          background: transparent;
          border: 1px solid rgba(201,168,76,0.2);
          color: #888;
          padding: 10px 16px;
          font-size: 10px;
          letter-spacing: 2px;
          text-transform: uppercase;
          cursor: pointer;
          font-family: 'Jost', sans-serif;
          width: 100%;
          transition: all 0.2s;
        }
        .admin-logout-btn:hover {
          border-color: #ff6b6b;
          color: #ff6b6b;
        }

        /* MAIN */
        .admin-main {
          margin-left: 240px;
          flex: 1;
          padding: 40px;
          min-height: 100vh;
        }
        .admin-header {
          margin-bottom: 40px;
        }
        .admin-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 36px;
          color: #F5F0E8;
          margin-bottom: 4px;
        }
        .admin-title em { font-style: italic; color: #C9A84C; }
        .admin-sub {
          font-size: 11px;
          color: #555;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        /* STATS GRID */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-bottom: 40px;
        }
        .stat-card {
          background: #111;
          border: 1px solid rgba(201,168,76,0.1);
          padding: 24px;
          transition: border-color 0.2s;
        }
        .stat-card:hover { border-color: rgba(201,168,76,0.3); }
        .stat-icon {
          color: #C9A84C;
          margin-bottom: 16px;
          opacity: 0.7;
        }
        .stat-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 36px;
          color: #F5F0E8;
          margin-bottom: 4px;
        }
        .stat-label {
          font-size: 9px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #555;
        }

        /* RECENT ORDERS */
        .section-card {
          background: #111;
          border: 1px solid rgba(201,168,76,0.1);
          padding: 28px;
          margin-bottom: 24px;
        }
        .section-card-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px;
          color: #F5F0E8;
          margin-bottom: 20px;
          padding-bottom: 16px;
          border-bottom: 1px solid rgba(201,168,76,0.1);
        }

        /* TABLE */
        .admin-table {
          width: 100%;
          border-collapse: collapse;
        }
        .admin-table th {
          font-size: 9px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #C9A84C;
          padding: 12px 16px;
          text-align: left;
          border-bottom: 1px solid rgba(201,168,76,0.15);
        }
        .admin-table td {
          padding: 14px 16px;
          font-size: 12px;
          color: #888;
          border-bottom: 1px solid rgba(255,255,255,0.04);
        }
        .admin-table tr:hover td {
          background: rgba(201,168,76,0.03);
        }
        .status-badge {
          padding: 4px 12px;
          font-size: 9px;
          letter-spacing: 2px;
          text-transform: uppercase;
          border-radius: 2px;
        }
        .status-select {
          background: #1a1a1a;
          border: 1px solid rgba(201,168,76,0.2);
          color: #C9A84C;
          padding: 6px 10px;
          font-size: 10px;
          font-family: 'Jost', sans-serif;
          cursor: pointer;
          outline: none;
        }
        .status-select option { background: #1a1a1a; }

        /* LOADING */
        .admin-loading {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 60px;
          color: #C9A84C;
          font-size: 11px;
          letter-spacing: 3px;
          text-transform: uppercase;
        }

        /* RESPONSIVE */
        @media (max-width: 900px) {
          .admin-sidebar { width: 60px; }
          .admin-logo-text { display: none; }
          .admin-logo-sub { display: none; }
          .admin-nav-item span { display: none; }
          .admin-main { margin-left: 60px; padding: 24px; }
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>

      <div className="admin-page">
        {/* SIDEBAR */}
        <div className="admin-sidebar">
          <div className="admin-logo">
            <div className="admin-logo-text">YUGRANG</div>
            <div className="admin-logo-sub">Admin Panel</div>
          </div>

          <nav className="admin-nav">
            <div
              className={`admin-nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => handleTabChange('dashboard')}
            >
              <FiGrid size={16} />
              <span>Dashboard</span>
            </div>
            <div
              className={`admin-nav-item ${activeTab === 'orders' ? 'active' : ''}`}
              onClick={() => handleTabChange('orders')}
            >
              <FiPackage size={16} />
              <span>Orders</span>
            </div>
            <div
              className={`admin-nav-item ${activeTab === 'custom' ? 'active' : ''}`}
              onClick={() => handleTabChange('custom')}
            >
              <FiEdit size={16} />
              <span>Custom Orders</span>
            </div>
            <div
              className={`admin-nav-item ${activeTab === 'customers' ? 'active' : ''}`}
              onClick={() => handleTabChange('customers')}
            >
              <FiUsers size={16} />
              <span>Customers</span>
            </div>
          </nav>

          <div className="admin-logout">
            <button
              className="admin-logout-btn"
              onClick={() => { logout(); navigate('/'); }}
            >
              <FiLogOut size={14} />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="admin-main">

          {/* DASHBOARD */}
          {activeTab === 'dashboard' && (
            <>
              <div className="admin-header">
                <h1 className="admin-title">
                  Welcome, <em>{user?.name}</em>
                </h1>
                <p className="admin-sub">Yugrang Admin Dashboard</p>
              </div>

              {loading ? (
                <div className="admin-loading">Loading...</div>
              ) : stats ? (
                <>
                  <div className="stats-grid">
                    <div className="stat-card">
                      <div className="stat-icon"><FiUsers size={24} /></div>
                      <div className="stat-num">{stats.total_users}</div>
                      <div className="stat-label">Total Customers</div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-icon"><FiPackage size={24} /></div>
                      <div className="stat-num">{stats.total_orders}</div>
                      <div className="stat-label">Total Orders</div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-icon"><FiDollarSign size={24} /></div>
                      <div className="stat-num">₹{stats.total_revenue?.toLocaleString()}</div>
                      <div className="stat-label">Total Revenue</div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-icon"><FiClock size={24} /></div>
                      <div className="stat-num">{stats.pending_orders}</div>
                      <div className="stat-label">Pending Orders</div>
                    </div>
                  </div>

                  <div className="section-card">
                    <div className="section-card-title">Recent Orders</div>
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Order ID</th>
                          <th>Customer</th>
                          <th>Amount</th>
                          <th>Status</th>
                          <th>Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {stats.recent_orders?.map(order => (
                          <tr key={order.order_id}>
                            <td style={{ color: '#C9A84C' }}>#{order.order_id}</td>
                            <td style={{ color: '#F5F0E8' }}>{order.customer_name}</td>
                            <td>₹{order.total_price}</td>
                            <td>
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
                            </td>
                            <td>{new Date(order.created_at).toLocaleDateString('en-IN')}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              ) : null}
            </>
          )}

          {/* ALL ORDERS */}
          {activeTab === 'orders' && (
            <>
              <div className="admin-header">
                <h1 className="admin-title">All <em>Orders</em></h1>
                <p className="admin-sub">{orders.length} orders found</p>
              </div>

              {loading ? (
                <div className="admin-loading">Loading...</div>
              ) : (
                <div className="section-card">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Customer</th>
                        <th>Phone</th>
                        <th>Amount</th>
                        <th>Payment</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>Update</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map(order => (
                        <tr key={order.order_id}>
                          <td style={{ color: '#C9A84C' }}>#{order.order_id}</td>
                          <td style={{ color: '#F5F0E8' }}>{order.customer_name}</td>
                          <td>{order.phone}</td>
                          <td>₹{order.total_price}</td>
                          <td style={{ textTransform: 'uppercase' }}>{order.payment_method}</td>
                          <td>
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
                          </td>
                          <td>{new Date(order.created_at).toLocaleDateString('en-IN')}</td>
                          <td>
                            <select
                              className="status-select"
                              value={order.status}
                              onChange={e => updateStatus(order.order_id, e.target.value)}
                            >
                              <option>Pending</option>
                              <option>Processing</option>
                              <option>Shipped</option>
                              <option>Delivered</option>
                              <option>Cancelled</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}

          {/* CUSTOM ORDERS */}
          {activeTab === 'custom' && (
            <>
              <div className="admin-header">
                <h1 className="admin-title">Custom <em>Orders</em></h1>
                <p className="admin-sub">{customOrders.length} custom orders found</p>
              </div>

              {loading ? (
                <div className="admin-loading">Loading...</div>
              ) : (
                <div className="section-card">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Customer</th>
                        <th>Garment</th>
                        <th>Size</th>
                        <th>Custom Text</th>
                        <th>Payment</th>
                        <th>Status</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {customOrders.map(order => (
                        <tr key={order.order_id}>
                          <td style={{ color: '#C9A84C' }}>#{order.order_id}</td>
                          <td style={{ color: '#F5F0E8' }}>{order.customer_name}</td>
                          <td>{order.garment}</td>
                          <td>{order.size}</td>
                          <td>{order.custom_text || '—'}</td>
                          <td style={{ textTransform: 'uppercase' }}>{order.payment_method}</td>
                          <td>
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
                          </td>
                          <td>{new Date(order.created_at).toLocaleDateString('en-IN')}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}

          {/* CUSTOMERS */}
          {activeTab === 'customers' && (
            <>
              <div className="admin-header">
                <h1 className="admin-title">All <em>Customers</em></h1>
                <p className="admin-sub">{customers.length} customers found</p>
              </div>

              {loading ? (
                <div className="admin-loading">Loading...</div>
              ) : (
                <div className="section-card">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Total Orders</th>
                        <th>Total Spent</th>
                        <th>Joined</th>
                      </tr>
                    </thead>
                    <tbody>
                      {customers.map(customer => (
                        <tr key={customer.id}>
                          <td style={{ color: '#F5F0E8' }}>{customer.name}</td>
                          <td>{customer.email}</td>
                          <td>{customer.phone}</td>
                          <td style={{ color: '#C9A84C' }}>{customer.total_orders || 0}</td>
                          <td>₹{customer.total_spent || 0}</td>
                          <td>{new Date(customer.created_at).toLocaleDateString('en-IN')}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}

        </div>
      </div>
    </>
  );
}