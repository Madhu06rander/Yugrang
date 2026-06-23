const BASE_URL = 'http://localhost:8000/api';

const getToken = () => localStorage.getItem('yugrang_token');

const headers = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${getToken()}`
});

// ── AUTH ──
export const authAPI = {
  signup: async (data) => {
    const res = await fetch(`${BASE_URL}/users/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  login: async (data) => {
    const res = await fetch(`${BASE_URL}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  getProfile: async () => {
    const res = await fetch(`${BASE_URL}/users/profile`, {
      headers: headers()
    });
    return res.json();
  },

  getMyOrders: async () => {
    const res = await fetch(`${BASE_URL}/users/my-orders`, {
      headers: headers()
    });
    return res.json();
  }
};

// ── ORDERS ──
export const orderAPI = {
  placeOrder: async (data) => {
    const res = await fetch(`${BASE_URL}/orders/place`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(data)
    });
    return res.json();
  },

  placeCustomOrder: async (data) => {
    const res = await fetch(`${BASE_URL}/orders/custom`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(data)
    });
    return res.json();
  },

  getOrder: async (orderId) => {
    const res = await fetch(`${BASE_URL}/orders/${orderId}`, {
      headers: headers()
    });
    return res.json();
  },

  cancelOrder: async (orderId) => {
    const res = await fetch(`${BASE_URL}/orders/cancel/${orderId}`, {
      method: 'PUT',
      headers: headers()
    });
    return res.json();
  }
};

// ── PRODUCTS ──
export const productAPI = {
  getAll: async () => {
    const res = await fetch(`${BASE_URL}/products/`);
    return res.json();
  },

  getByCategory: async (category) => {
    const res = await fetch(`${BASE_URL}/products/category/${category}`);
    return res.json();
  },

  search: async (query) => {
    const res = await fetch(`${BASE_URL}/products/search/${query}`);
    return res.json();
  }
};

// ── ADMIN ──
export const adminAPI = {
  getDashboard: async () => {
    const res = await fetch(`${BASE_URL}/admin/dashboard`, {
      headers: headers()
    });
    return res.json();
  },

  getAllOrders: async () => {
    const res = await fetch(`${BASE_URL}/admin/orders`, {
      headers: headers()
    });
    return res.json();
  },

  updateOrderStatus: async (orderId, status) => {
    const res = await fetch(`${BASE_URL}/admin/orders/status`, {
      method: 'PUT',
      headers: headers(),
      body: JSON.stringify({ order_id: orderId, status })
    });
    return res.json();
  },

  getAllCustomers: async () => {
    const res = await fetch(`${BASE_URL}/admin/customers`, {
      headers: headers()
    });
    return res.json();
  },

  getCustomOrders: async () => {
    const res = await fetch(`${BASE_URL}/admin/custom-orders`, {
      headers: headers()
    });
    return res.json();
  }
};