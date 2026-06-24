from fastapi import APIRouter, Depends, HTTPException, Header, BackgroundTasks
from database import get_db, get_cursor
from models import PlaceOrder, CustomOrder
from auth import verify_token
from notifications.email import send_order_confirmation_email
from shiprocket import create_shipment
import uuid

router = APIRouter()

def get_current_user(authorization: str, db):
    if not authorization:
        raise HTTPException(status_code=401, detail="Not authenticated!")
    token = authorization.replace("Bearer ", "")
    email = verify_token(token)
    if not email:
        raise HTTPException(status_code=401, detail="Invalid token!")
    cursor = get_cursor(db)
    cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
    user = cursor.fetchone()
    if not user:
        raise HTTPException(status_code=404, detail="User not found!")
    return user

def generate_tracking_id():
    return "YUG" + str(uuid.uuid4())[:10].upper().replace("-", "")

# ── PLACE ORDER ──
@router.post("/place")
async def place_order(
    order: PlaceOrder,
    background_tasks: BackgroundTasks,
    authorization: str = Header(None),
    db=Depends(get_db)
):
    user = get_current_user(authorization, db)
    cursor = get_cursor(db)

    # Generate IDs
    order_id = "YUG" + str(uuid.uuid4())[:8].upper()
    tracking_id = generate_tracking_id()

    # Insert order
    cursor.execute("""
        INSERT INTO orders
        (order_id, tracking_id, user_id, name, phone, address, city,
        pincode, payment_method, total_price, status)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """, (
        order_id, tracking_id, user["id"], order.name, order.phone,
        order.address, order.city, order.pincode,
        order.payment_method, order.total_price, "Pending"
    ))

    # Insert order items
    for item in order.items:
        cursor.execute("""
            INSERT INTO order_items
            (order_id, product_name, category, size, color, quantity, price)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
        """, (
            order_id, item.product_name, item.category,
            item.size, item.color, item.quantity, item.price
        ))

    db.commit()

    # Shiprocket mein order create karo
    try:
        shipment = create_shipment(
            order_id=order_id,
            tracking_id=tracking_id,
            customer_name=order.name,
            customer_phone=order.phone,
            customer_address=order.address,
            customer_city=order.city,
            customer_pincode=order.pincode,
            items=[item.dict() for item in order.items],
            total_price=order.total_price,
            payment_method=order.payment_method
        )
        if shipment:
            print(f"Shiprocket shipment created for order {order_id}")
    except Exception as e:
        print(f"Shiprocket error: {e}")

    # Send email in background
    background_tasks.add_task(
        send_order_confirmation_email,
        user["email"],
        user["name"],
        order_id,
        tracking_id,
        order.total_price
    )

    return {
        "success": True,
        "message": "Order placed successfully!",
        "order_id": order_id,
        "tracking_id": tracking_id
    }

# ── PLACE CUSTOM ORDER ──
@router.post("/custom")
async def place_custom_order(
    order: CustomOrder,
    background_tasks: BackgroundTasks,
    authorization: str = Header(None),
    db=Depends(get_db)
):
    user = get_current_user(authorization, db)
    cursor = get_cursor(db)

    order_id = "YUGC" + str(uuid.uuid4())[:8].upper()
    tracking_id = generate_tracking_id()

    cursor.execute("""
        INSERT INTO custom_orders
        (order_id, tracking_id, user_id, garment, size, color, custom_text,
        placement, quantity, notes, payment_method, name, phone,
        address, city, pincode, status)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """, (
        order_id, tracking_id, user["id"], order.garment, order.size,
        order.color, order.custom_text, order.placement,
        order.quantity, order.notes, order.payment_method,
        order.name, order.phone, order.address,
        order.city, order.pincode, "Pending"
    ))

    db.commit()

    background_tasks.add_task(
        send_order_confirmation_email,
        user["email"],
        user["name"],
        order_id,
        tracking_id,
        0
    )

    return {
        "success": True,
        "message": "Custom order placed successfully!",
        "order_id": order_id,
        "tracking_id": tracking_id
    }

# ── GET ORDER BY ID ──
@router.get("/{order_id}")
async def get_order(
    order_id: str,
    authorization: str = Header(None),
    db=Depends(get_db)
):
    user = get_current_user(authorization, db)
    cursor = get_cursor(db)

    cursor.execute(
        "SELECT * FROM orders WHERE order_id = %s AND user_id = %s",
        (order_id, user["id"])
    )
    order = cursor.fetchone()

    if not order:
        raise HTTPException(status_code=404, detail="Order not found!")

    cursor.execute(
        "SELECT * FROM order_items WHERE order_id = %s",
        (order_id,)
    )
    order["items"] = cursor.fetchall()

    return {"success": True, "order": order}

# ── CANCEL ORDER ──
@router.put("/cancel/{order_id}")
async def cancel_order(
    order_id: str,
    authorization: str = Header(None),
    db=Depends(get_db)
):
    user = get_current_user(authorization, db)
    cursor = get_cursor(db)

    cursor.execute(
        "SELECT * FROM orders WHERE order_id = %s AND user_id = %s",
        (order_id, user["id"])
    )
    order = cursor.fetchone()

    if not order:
        raise HTTPException(status_code=404, detail="Order not found!")

    if order["status"] not in ["Pending", "Processing"]:
        raise HTTPException(
            status_code=400,
            detail="Order cannot be cancelled at this stage!"
        )

    cursor.execute(
        "UPDATE orders SET status = %s WHERE order_id = %s",
        ("Cancelled", order_id)
    )
    db.commit()

    return {"success": True, "message": "Order cancelled successfully!"}