import requests
import os
from dotenv import load_dotenv

load_dotenv()

SHIPROCKET_EMAIL = os.getenv("SHIPROCKET_EMAIL")
SHIPROCKET_PASSWORD = os.getenv("SHIPROCKET_PASSWORD")
BASE_URL = "https://apiv2.shiprocket.in/v1/external"

def get_token():
    try:
        res = requests.post(f"{BASE_URL}/auth/login", json={
            "email": SHIPROCKET_EMAIL,
            "password": SHIPROCKET_PASSWORD
        })
        data = res.json()
        return data.get("token")
    except Exception as e:
        print(f"Shiprocket auth error: {e}")
        return None

def create_shipment(order_id: str, tracking_id: str, customer_name: str,
                    customer_phone: str, customer_address: str,
                    customer_city: str, customer_pincode: str,
                    items: list, total_price: float, payment_method: str):
    try:
        token = get_token()
        if not token:
            return None

        headers = {
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json"
        }

        # Payment method
        payment_method_code = "COD" if payment_method == "cod" else "Prepaid"

        # Order items
        order_items = []
        for item in items:
            order_items.append({
                "name": item.get("product_name", "Custom Product"),
                "sku": f"YUG-{order_id}",
                "units": item.get("quantity", 1),
                "selling_price": str(item.get("price", 0)),
            })

        payload = {
            "order_id": order_id,
            "order_date": "",
            "pickup_location": "Primary",
            "channel_id": "",
            "comment": f"Yugrang Custom Order - {tracking_id}",
            "billing_customer_name": customer_name,
            "billing_last_name": "",
            "billing_address": customer_address,
            "billing_city": customer_city,
            "billing_pincode": customer_pincode,
            "billing_state": "Rajasthan",
            "billing_country": "India",
            "billing_email": "",
            "billing_phone": customer_phone,
            "shipping_is_billing": True,
            "order_items": order_items,
            "payment_method": payment_method_code,
            "sub_total": total_price,
            "length": 10,
            "breadth": 10,
            "height": 5,
            "weight": 0.5
        }

        res = requests.post(
            f"{BASE_URL}/orders/create/adhoc",
            json=payload,
            headers=headers
        )
        data = res.json()
        print(f"Shiprocket order created: {data}")
        return data

    except Exception as e:
        print(f"Shiprocket shipment error: {e}")
        return None

def get_tracking(shipment_id: str):
    try:
        token = get_token()
        if not token:
            return None

        headers = {"Authorization": f"Bearer {token}"}
        res = requests.get(
            f"{BASE_URL}/courier/track/shipment/{shipment_id}",
            headers=headers
        )
        return res.json()
    except Exception as e:
        print(f"Shiprocket tracking error: {e}")
        return None