from fastapi import APIRouter, Depends, HTTPException, Header
from database import get_db, get_cursor
from models import Product, UpdateOrderStatus
from auth import verify_token

router = APIRouter()

ADMIN_EMAIL = "yugrang2026@gmail.com"

def verify_admin(authorization: str, db):
    if not authorization:
        raise HTTPException(status_code=401, detail="Not authenticated!")
    token = authorization.replace("Bearer ", "")
    email = verify_token(token)
    if not email:
        raise HTTPException(status_code=401, detail="Invalid token!")
    if email != ADMIN_EMAIL:
        raise HTTPException(status_code=403, detail="Admin access required!")
    return email

# ── GET ALL ORDERS ──
@router.get("/orders")
async def get_all_orders(authorization: str = Header(None), db=Depends(get_db)):
    verify_admin(authorization, db)
    cursor = get_cursor(db)
    cursor.execute("""
        SELECT o.*, u.name as customer_name, u.email as customer_email
        FROM orders o
        LEFT JOIN users u ON o.user_id = u.id
        ORDER BY o.created_at DESC
    """)
    orders = cursor.fetchall()
    for order in orders:
        cursor.execute(
            "SELECT * FROM order_items WHERE order_id = %s",
            (order["order_id"],)
        )
        order["items"] = cursor.fetchall()
    return {"success": True, "orders": orders}

# ── GET ALL CUSTOM ORDERS ──
@router.get("/custom-orders")
async def get_all_custom_orders(authorization: str = Header(None), db=Depends(get_db)):
    verify_admin(authorization, db)
    cursor = get_cursor(db)
    cursor.execute("""
        SELECT co.*, u.name as customer_name, u.email as customer_email
        FROM custom_orders co
        LEFT JOIN users u ON co.user_id = u.id
        ORDER BY co.created_at DESC
    """)
    orders = cursor.fetchall()
    return {"success": True, "orders": orders}

# ── UPDATE ORDER STATUS ──
@router.put("/orders/status")
async def update_order_status(
    data: UpdateOrderStatus,
    authorization: str = Header(None),
    db=Depends(get_db)
):
    verify_admin(authorization, db)
    cursor = get_cursor(db)
    cursor.execute(
        "UPDATE orders SET status = %s WHERE order_id = %s",
        (data.status, data.order_id)
    )
    db.commit()
    return {
        "success": True,
        "message": f"Order {data.order_id} status updated to {data.status}"
    }

# ── GET ALL CUSTOMERS ──
@router.get("/customers")
async def get_all_customers(authorization: str = Header(None), db=Depends(get_db)):
    verify_admin(authorization, db)
    cursor = get_cursor(db)
    cursor.execute("""
        SELECT u.id, u.name, u.email, u.phone, u.created_at,
        COUNT(o.id) as total_orders,
        SUM(o.total_price) as total_spent
        FROM users u
        LEFT JOIN orders o ON u.id = o.user_id
        GROUP BY u.id
        ORDER BY u.created_at DESC
    """)
    customers = cursor.fetchall()
    return {"success": True, "customers": customers}

# ── ADD PRODUCT ──
@router.post("/products/add")
async def add_product(
    product: Product,
    authorization: str = Header(None),
    db=Depends(get_db)
):
    verify_admin(authorization, db)
    cursor = get_cursor(db)
    cursor.execute("""
        INSERT INTO products
        (name, category, sub_category, price, description, badge, img_url)
        VALUES (%s, %s, %s, %s, %s, %s, %s)
    """, (
        product.name, product.category, product.sub_category,
        product.price, product.description, product.badge, product.img_url
    ))
    db.commit()
    return {
        "success": True,
        "message": "Product added successfully!",
        "product_id": cursor.lastrowid
    }

# ── UPDATE PRODUCT ──
@router.put("/products/update/{product_id}")
async def update_product(
    product_id: int,
    product: Product,
    authorization: str = Header(None),
    db=Depends(get_db)
):
    verify_admin(authorization, db)
    cursor = get_cursor(db)
    cursor.execute("""
        UPDATE products SET
        name=%s, category=%s, sub_category=%s,
        price=%s, description=%s, badge=%s, img_url=%s
        WHERE id=%s
    """, (
        product.name, product.category, product.sub_category,
        product.price, product.description, product.badge,
        product.img_url, product_id
    ))
    db.commit()
    return {"success": True, "message": "Product updated successfully!"}

# ── DELETE PRODUCT ──
@router.delete("/products/delete/{product_id}")
async def delete_product(
    product_id: int,
    authorization: str = Header(None),
    db=Depends(get_db)
):
    verify_admin(authorization, db)
    cursor = get_cursor(db)
    cursor.execute("DELETE FROM products WHERE id = %s", (product_id,))
    db.commit()
    return {"success": True, "message": "Product deleted successfully!"}

# ── DASHBOARD STATS ──
@router.get("/dashboard")
async def get_dashboard_stats(authorization: str = Header(None), db=Depends(get_db)):
    verify_admin(authorization, db)
    cursor = get_cursor(db)

    cursor.execute("SELECT COUNT(*) as total FROM users")
    total_users = cursor.fetchone()["total"]

    cursor.execute("SELECT COUNT(*) as total FROM orders")
    total_orders = cursor.fetchone()["total"]

    cursor.execute("SELECT SUM(total_price) as total FROM orders WHERE status != 'Cancelled'")
    total_revenue = cursor.fetchone()["total"] or 0

    cursor.execute("SELECT COUNT(*) as total FROM orders WHERE status = 'Pending'")
    pending_orders = cursor.fetchone()["total"]

    cursor.execute("SELECT COUNT(*) as total FROM custom_orders WHERE status = 'Pending'")
    pending_custom = cursor.fetchone()["total"]

    cursor.execute("""
        SELECT o.order_id, o.total_price, o.status, o.created_at,
        u.name as customer_name
        FROM orders o
        LEFT JOIN users u ON o.user_id = u.id
        ORDER BY o.created_at DESC
        LIMIT 5
    """)
    recent_orders = cursor.fetchall()

    return {
        "success": True,
        "stats": {
            "total_users": total_users,
            "total_orders": total_orders,
            "total_revenue": float(total_revenue),
            "pending_orders": pending_orders,
            "pending_custom_orders": pending_custom,
            "recent_orders": recent_orders
        }
    }