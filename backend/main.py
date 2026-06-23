from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import users, orders, products, admin
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(
    title="Yugrang API",
    description="Backend API for Yugrang Custom Clothing",
    version="1.0.0"
)

# CORS — React frontend se connect karne ke liye
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://yugrang.com",
        "https://www.yugrang.com"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
app.include_router(users.router, prefix="/api/users", tags=["Users"])
app.include_router(orders.router, prefix="/api/orders", tags=["Orders"])
app.include_router(products.router, prefix="/api/products", tags=["Products"])
app.include_router(admin.router, prefix="/api/admin", tags=["Admin"])

@app.get("/")
async def root():
    return {
        "message": "Yugrang API is running! 🎨",
        "version": "1.0.0",
        "docs": "/docs"
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "Yugrang Backend"}