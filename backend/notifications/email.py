import asyncio
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import os
from dotenv import load_dotenv

load_dotenv()

EMAIL_HOST = os.getenv("EMAIL_HOST")
EMAIL_PORT = int(os.getenv("EMAIL_PORT"))
EMAIL_USER = os.getenv("EMAIL_USER")
EMAIL_PASSWORD = os.getenv("EMAIL_PASSWORD")

def send_email(to_email: str, subject: str, html_content: str):
    try:
        msg = MIMEMultipart("alternative")
        msg["Subject"] = subject
        msg["From"] = f"Yugrang <{EMAIL_USER}>"
        msg["To"] = to_email

        part = MIMEText(html_content, "html")
        msg.attach(part)

        with smtplib.SMTP(EMAIL_HOST, EMAIL_PORT) as server:
            server.starttls()
            server.login(EMAIL_USER, EMAIL_PASSWORD)
            server.sendmail(EMAIL_USER, to_email, msg.as_string())
        return True
    except Exception as e:
        print(f"Email error: {e}")
        return False

async def send_welcome_email(email: str, name: str):
    subject = "Welcome to Yugrang! 🎨"
    html = f"""
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0A0A0A; color: #F5F0E8;">
        <div style="background: #1A1A1A; padding: 40px; text-align: center; border-bottom: 2px solid #C9A84C;">
            <h1 style="font-family: Georgia, serif; color: #C9A84C; font-size: 36px; margin: 0; letter-spacing: 4px;">
                YUGRANG
            </h1>
            <p style="color: #888; font-size: 12px; letter-spacing: 3px; text-transform: uppercase; margin-top: 8px;">
                Where Every Colour Tells Your Story
            </p>
        </div>
        <div style="padding: 40px;">
            <h2 style="color: #C9A84C; font-family: Georgia, serif; font-size: 28px;">
                Welcome, {name}! 🎉
            </h2>
            <p style="color: #888; line-height: 1.8; font-size: 14px;">
                Thank you for joining Yugrang! We are excited to have you as part of our family.
            </p>
            <p style="color: #888; line-height: 1.8; font-size: 14px;">
                Explore our exclusive collection of custom clothing — shirts, kurtis, hoodies, couple wear and much more!
            </p>
            <div style="text-align: center; margin: 32px 0;">
                <a href="https://yugrang.com/products"
                   style="background: #C9A84C; color: #0A0A0A; padding: 14px 40px;
                          text-decoration: none; font-size: 12px; letter-spacing: 3px;
                          text-transform: uppercase; font-weight: bold;">
                    Explore Collection
                </a>
            </div>
            <p style="color: #888; font-size: 13px; line-height: 1.8;">
                Koi sawaal? Humse contact karo:
                <a href="mailto:yugrang2026@gmail.com" style="color: #C9A84C;">yugrang2026@gmail.com</a>
            </p>
        </div>
        <div style="background: #1A1A1A; padding: 24px; text-align: center; border-top: 1px solid #333;">
            <p style="color: #555; font-size: 11px; letter-spacing: 1px;">
                © 2026 Yugrang. All rights reserved.
            </p>
            <p style="color: #555; font-size: 11px;">Udaipur, Rajasthan, India</p>
        </div>
    </div>
    """
    await asyncio.to_thread(send_email, email, subject, html)

async def send_order_confirmation_email(
    email: str, name: str, order_id: str, tracking_id: str, total_price: float
):
    subject = f"Order Confirmed! #{order_id} — Yugrang"
    html = f"""
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0A0A0A; color: #F5F0E8;">
        <div style="background: #1A1A1A; padding: 40px; text-align: center; border-bottom: 2px solid #C9A84C;">
            <h1 style="font-family: Georgia, serif; color: #C9A84C; font-size: 36px; margin: 0; letter-spacing: 4px;">
                YUGRANG
            </h1>
        </div>
        <div style="padding: 40px;">
            <h2 style="color: #C9A84C; font-family: Georgia, serif; font-size: 28px;">
                Order Confirmed! ✅
            </h2>
            <p style="color: #888; line-height: 1.8; font-size: 14px;">
                Hi {name}, aapka order successfully place ho gaya hai!
            </p>

            <div style="background: #1A1A1A; border: 1px solid #C9A84C; padding: 24px; margin: 24px 0;">
                <p style="color: #C9A84C; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; margin: 0 0 8px 0;">
                    Order ID
                </p>
                <p style="color: #F5F0E8; font-size: 20px; font-family: Georgia, serif; margin: 0 0 20px 0;">
                    #{order_id}
                </p>

                <p style="color: #C9A84C; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; margin: 0 0 8px 0;">
                    🔍 Tracking ID
                </p>
                <p style="color: #F5F0E8; font-size: 24px; font-family: Georgia, serif; margin: 0 0 8px 0; letter-spacing: 2px;">
                    {tracking_id}
                </p>
                <p style="color: #555; font-size: 11px; margin: 0 0 20px 0;">
                    Is Tracking ID se aap apna order track kar sakte hain
                </p>

                {f'''
                <p style="color: #C9A84C; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; margin: 0 0 8px 0;">
                    Total Amount
                </p>
                <p style="color: #F5F0E8; font-size: 20px; font-family: Georgia, serif; margin: 0;">
                    Rs.{total_price}
                </p>
                ''' if total_price > 0 else ''}
            </div>

            <p style="color: #888; line-height: 1.8; font-size: 14px;">
                Humari team aapko 2 ghante mein WhatsApp par contact karegi.
            </p>
            <p style="color: #888; line-height: 1.8; font-size: 14px;">
                Expected delivery: <span style="color: #C9A84C;">5-7 business days</span>
            </p>

            <div style="text-align: center; margin: 32px 0;">
                <a href="https://yugrang.com/my-orders"
                   style="background: #C9A84C; color: #0A0A0A; padding: 14px 40px;
                          text-decoration: none; font-size: 12px; letter-spacing: 3px;
                          text-transform: uppercase; font-weight: bold;">
                    Track My Order
                </a>
            </div>
        </div>
        <div style="background: #1A1A1A; padding: 24px; text-align: center; border-top: 1px solid #333;">
            <p style="color: #555; font-size: 11px; letter-spacing: 1px;">
                © 2026 Yugrang. All rights reserved.
            </p>
        </div>
    </div>
    """
    send_email(email, subject, html)
    subject = f"Order Confirmed! #{order_id} — Yugrang"
    html = f"""
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0A0A0A; color: #F5F0E8;">
        <div style="background: #1A1A1A; padding: 40px; text-align: center; border-bottom: 2px solid #C9A84C;">
            <h1 style="font-family: Georgia, serif; color: #C9A84C; font-size: 36px; margin: 0; letter-spacing: 4px;">
                YUGRANG
            </h1>
        </div>
        <div style="padding: 40px;">
            <h2 style="color: #C9A84C; font-family: Georgia, serif; font-size: 28px;">
                Order Confirmed! ✅
            </h2>
            <p style="color: #888; line-height: 1.8; font-size: 14px;">
                Hi {name}, aapka order successfully place ho gaya hai!
            </p>
            <div style="background: #1A1A1A; border: 1px solid #C9A84C; padding: 24px; margin: 24px 0;">
                <p style="color: #C9A84C; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; margin: 0 0 8px 0;">
                    Order ID
                </p>
                <p style="color: #F5F0E8; font-size: 20px; font-family: Georgia, serif; margin: 0;">
                    #{order_id}
                </p>
                {f'''
                <p style="color: #C9A84C; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; margin: 16px 0 8px 0;">
                    Total Amount
                </p>
                <p style="color: #F5F0E8; font-size: 20px; font-family: Georgia, serif; margin: 0;">
                    Rs.{total_price}
                </p>
                ''' if total_price > 0 else ''}
            </div>
            <p style="color: #888; line-height: 1.8; font-size: 14px;">
                Humari team aapko 2 ghante mein WhatsApp par contact karegi.
            </p>
            <p style="color: #888; line-height: 1.8; font-size: 14px;">
                Expected delivery: <span style="color: #C9A84C;">5-7 business days</span>
            </p>
            <div style="text-align: center; margin: 32px 0;">
                <a href="https://yugrang.com/my-orders"
                   style="background: #C9A84C; color: #0A0A0A; padding: 14px 40px;
                          text-decoration: none; font-size: 12px; letter-spacing: 3px;
                          text-transform: uppercase; font-weight: bold;">
                    Track My Order
                </a>
            </div>
        </div>
        <div style="background: #1A1A1A; padding: 24px; text-align: center; border-top: 1px solid #333;">
            <p style="color: #555; font-size: 11px; letter-spacing: 1px;">
                © 2026 Yugrang. All rights reserved.
            </p>
        </div>
    </div>
    """
    await asyncio.to_thread(send_email, email, subject, html)

async def send_status_update_email(
    email: str, name: str, order_id: str, status: str
):
    status_messages = {
        'Processing': ('🔄 Order is being processed!', 'Aapka order process ho raha hai.'),
        'In Production': ('✂️ Your outfit is being crafted!', 'Aapka kapda ban raha hai — hamare skilled artisans kaam kar rahe hain!'),
        'Packed': ('📦 Order Packed!', 'Aapka order pack ho gaya hai aur dispatch ke liye ready hai!'),
        'Shipped': ('🚚 Order Shipped!', 'Aapka order ship ho gaya hai! Jald hi aapke paas pahunch jayega.'),
        'Delivered': ('✅ Order Delivered!', 'Aapka order deliver ho gaya! Hume umeed hai aapko pasand aaya hoga.'),
        'Cancelled': ('❌ Order Cancelled', 'Aapka order cancel kar diya gaya hai.'),
    }

    title, message = status_messages.get(
        status, ('📦 Order Update', f'Aapke order ka status {status} ho gaya hai.')
    )

    subject = f"{title} — Order #{order_id} — Yugrang"
    html = f"""
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0A0A0A; color: #F5F0E8;">
        <div style="background: #1A1A1A; padding: 40px; text-align: center; border-bottom: 2px solid #C9A84C;">
            <h1 style="font-family: Georgia, serif; color: #C9A84C; font-size: 36px; margin: 0; letter-spacing: 4px;">
                YUGRANG
            </h1>
        </div>
        <div style="padding: 40px;">
            <h2 style="color: #C9A84C; font-family: Georgia, serif; font-size: 28px;">
                {title}
            </h2>
            <p style="color: #888; line-height: 1.8; font-size: 14px;">
                Namaste {name}! 🙏
            </p>
            <p style="color: #888; line-height: 1.8; font-size: 14px;">
                {message}
            </p>
            <div style="background: #1A1A1A; border: 1px solid #C9A84C; padding: 24px; margin: 24px 0;">
                <p style="color: #C9A84C; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; margin: 0 0 8px 0;">
                    Order ID
                </p>
                <p style="color: #F5F0E8; font-size: 20px; font-family: Georgia, serif; margin: 0 0 16px 0;">
                    #{order_id}
                </p>
                <p style="color: #C9A84C; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; margin: 0 0 8px 0;">
                    Current Status
                </p>
                <p style="color: #F5F0E8; font-size: 20px; font-family: Georgia, serif; margin: 0;">
                    {status}
                </p>
            </div>
            <div style="text-align: center; margin: 32px 0;">
                <a href="https://yugrang.com/my-orders"
                   style="background: #C9A84C; color: #0A0A0A; padding: 14px 40px;
                          text-decoration: none; font-size: 12px; letter-spacing: 3px;
                          text-transform: uppercase; font-weight: bold;">
                    Track My Order
                </a>
            </div>
            <p style="color: #888; font-size: 12px; line-height: 1.8;">
                Koi sawaal? Humse contact karo:
                <a href="mailto:yugrang2026@gmail.com" style="color: #C9A84C;">yugrang2026@gmail.com</a>
            </p>
        </div>
        <div style="background: #1A1A1A; padding: 24px; text-align: center; border-top: 1px solid #333;">
            <p style="color: #555; font-size: 11px; letter-spacing: 1px;">
                © 2026 Yugrang. All rights reserved.
            </p>
        </div>
    </div>
    """
    await asyncio.to_thread(send_email, email, subject, html)