from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime

# ── USER MODELS ──
class UserSignup(BaseModel):
    name: str
    email: EmailStr
    phone: str
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: int
    name: str
    email: str
    phone: str
    created_at: datetime

# ── ORDER MODELS ──
class OrderItem(BaseModel):
    product_name: str
    category: str
    size: str
    color: Optional[str] = ""
    quantity: int
    price: float

class PlaceOrder(BaseModel):
    name: str
    phone: str
    address: str
    city: str
    pincode: str
    payment_method: str
    items: List[OrderItem]
    total_price: float

class OrderResponse(BaseModel):
    order_id: str
    status: str
    total_price: float
    created_at: datetime

# ── CUSTOM ORDER MODELS ──
class CustomOrder(BaseModel):
    garment: str
    size: str
    color: Optional[str] = ""
    custom_text: Optional[str] = ""
    placement: Optional[str] = ""
    quantity: int = 1
    notes: Optional[str] = ""
    payment_method: str
    name: str
    phone: str
    address: str
    city: str
    pincode: str

# ── CART MODELS ──
class CartItem(BaseModel):
    product_name: str
    category: str
    size: str
    color: Optional[str] = ""
    quantity: int = 1
    price: float
    img_url: Optional[str] = ""

# ── PRODUCT MODELS ──
class Product(BaseModel):
    name: str
    category: str
    sub_category: Optional[str] = ""
    price: float
    description: Optional[str] = ""
    badge: Optional[str] = ""
    img_url: Optional[str] = ""

# ── ADMIN MODELS ──
class UpdateOrderStatus(BaseModel):
    order_id: str
    status: str