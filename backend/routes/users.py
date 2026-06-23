from fastapi import APIRouter, Depends, HTTPException, Header
from database import get_db, get_cursor
from models import UserSignup, UserLogin
from auth import hash_password, verify_password, create_access_token, verify_token
from notifications.email import send_welcome_email
import uuid

router = APIRouter()

# ── SIGNUP ──
@router.post("/signup")
async def signup(user: UserSignup, db=Depends(get_db)):
    cursor = get_cursor(db)
    
    # Check if email already exists
    cursor.execute("SELECT id FROM users WHERE email = %s", (user.email,))
    existing = cursor.fetchone()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered!")
    
    # Check if phone already exists
    cursor.execute("SELECT id FROM users WHERE phone = %s", (user.phone,))
    existing_phone = cursor.fetchone()
    if existing_phone:
        raise HTTPException(status_code=400, detail="Phone number already registered!")
    
    # Hash password
    hashed_pwd = hash_password(user.password)
    
    # Insert user
    cursor.execute(
        "INSERT INTO users (name, email, phone, password) VALUES (%s, %s, %s, %s)",
        (user.name, user.email, user.phone, hashed_pwd)
    )
    db.commit()
    
    # Get new user id
    user_id = cursor.lastrowid
    
    # Create token
    token = create_access_token({"sub": user.email, "id": user_id})
    
    # Send welcome email
    try:
        await send_welcome_email(user.email, user.name)
    except:
        pass
    
    return {
        "success": True,
        "message": "Account created successfully!",
        "token": token,
        "user": {
            "id": user_id,
            "name": user.name,
            "email": user.email,
            "phone": user.phone
        }
    }

# ── LOGIN ──
@router.post("/login")
async def login(user: UserLogin, db=Depends(get_db)):
    cursor = get_cursor(db)
    
    # Find user
    cursor.execute("SELECT * FROM users WHERE email = %s", (user.email,))
    db_user = cursor.fetchone()
    
    if not db_user:
        raise HTTPException(status_code=401, detail="Invalid email or password!")
    
    # Verify password
    if not verify_password(user.password, db_user["password"]):
        raise HTTPException(status_code=401, detail="Invalid email or password!")
    
    # Create token
    token = create_access_token({"sub": db_user["email"], "id": db_user["id"]})
    
    return {
        "success": True,
        "message": "Login successful!",
        "token": token,
        "user": {
            "id": db_user["id"],
            "name": db_user["name"],
            "email": db_user["email"],
            "phone": db_user["phone"]
        }
    }

# ── GET PROFILE ──
@router.get("/profile")
async def get_profile(authorization: str = Header(None), db=Depends(get_db)):
    if not authorization:
        raise HTTPException(status_code=401, detail="Not authenticated!")
    
    token = authorization.replace("Bearer ", "")
    email = verify_token(token)
    
    if not email:
        raise HTTPException(status_code=401, detail="Invalid token!")
    
    cursor = get_cursor(db)
    cursor.execute("SELECT id, name, email, phone, created_at FROM users WHERE email = %s", (email,))
    user = cursor.fetchone()
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found!")
    
    return {"success": True, "user": user}

# ── GET MY ORDERS ──
@router.get("/my-orders")
async def get_my_orders(authorization: str = Header(None), db=Depends(get_db)):
    if not authorization:
        raise HTTPException(status_code=401, detail="Not authenticated!")
    
    token = authorization.replace("Bearer ", "")
    email = verify_token(token)
    
    if not email:
        raise HTTPException(status_code=401, detail="Invalid token!")
    
    cursor = get_cursor(db)
    
    # Get user
    cursor.execute("SELECT id FROM users WHERE email = %s", (email,))
    user = cursor.fetchone()
    
    # Get orders
    cursor.execute(
        "SELECT * FROM orders WHERE user_id = %s ORDER BY created_at DESC",
        (user["id"],)
    )
    orders = cursor.fetchall()
    
    # Get order items for each order
    for order in orders:
        cursor.execute(
            "SELECT * FROM order_items WHERE order_id = %s",
            (order["order_id"],)
        )
        order["items"] = cursor.fetchall()
    
    return {"success": True, "orders": orders}