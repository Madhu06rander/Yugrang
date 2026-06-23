import requests
import os
from dotenv import load_dotenv

load_dotenv()

WHATSAPP_PHONE = os.getenv("WHATSAPP_PHONE")

async def send_whatsapp_notification(
    customer_name: str,
    order_id: str,
    total_price: float,
    customer_phone: str,
    payment_method: str
):
    try:
        # Admin ko notification
        admin_message = f"""🛍️ *NEW ORDER — YUGRANG*

*Order ID:* #{order_id}
*Customer:* {customer_name}
*Phone:* {customer_phone}
*Payment:* {payment_method.upper()}
{f'*Amount:* ₹{total_price}' if total_price > 0 else '*Type:* Custom Order'}

Please confirm the order! ✅"""

        # Customer ko notification
        customer_message = f"""✅ *Order Confirmed — YUGRANG*

Namaste {customer_name}! 🙏

Aapka order place ho gaya hai!

*Order ID:* #{order_id}
{f'*Total:* ₹{total_price}' if total_price > 0 else '*Type:* Custom Order'}

Humari team 2 ghante mein aapse contact karegi.

*Delivery:* 5-7 business days 🚚

Dhanyawad! 🎨
*Team Yugrang*"""

        # Send to admin via WhatsApp Web URL
        admin_url = f"https://api.whatsapp.com/send?phone={WHATSAPP_PHONE}&text={requests.utils.quote(admin_message)}"
        customer_url = f"https://api.whatsapp.com/send?phone=91{customer_phone}&text={requests.utils.quote(customer_message)}"

        print(f"Admin WhatsApp URL: {admin_url}")
        print(f"Customer WhatsApp URL: {customer_url}")

        return True
    except Exception as e:
        print(f"WhatsApp error: {e}")
        return False

async def send_custom_order_whatsapp(
    customer_name: str,
    order_id: str,
    garment: str,
    customer_phone: str
):
    try:
        admin_message = f"""✏️ *NEW CUSTOM ORDER — YUGRANG*

*Order ID:* #{order_id}
*Customer:* {customer_name}
*Phone:* {customer_phone}
*Garment:* {garment}

Please contact customer for details! 📞"""

        admin_url = f"https://api.whatsapp.com/send?phone={WHATSAPP_PHONE}&text={requests.utils.quote(admin_message)}"
        print(f"Admin WhatsApp URL: {admin_url}")

        return True
    except Exception as e:
        print(f"WhatsApp error: {e}")
        return False