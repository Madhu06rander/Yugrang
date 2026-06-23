from fastapi import APIRouter, Depends, HTTPException, Header
from database import get_db, get_cursor
from models import Product
from auth import verify_token

router = APIRouter()

# ── GET ALL PRODUCTS ──
@router.get("/")
async def get_all_products(db=Depends(get_db)):
    cursor = get_cursor(db)
    cursor.execute("SELECT * FROM products ORDER BY created_at DESC")
    products = cursor.fetchall()
    return {"success": True, "products": products}

# ── GET PRODUCTS BY CATEGORY ──
@router.get("/category/{category}")
async def get_by_category(category: str, db=Depends(get_db)):
    cursor = get_cursor(db)
    cursor.execute(
        "SELECT * FROM products WHERE category = %s ORDER BY created_at DESC",
        (category,)
    )
    products = cursor.fetchall()
    return {"success": True, "products": products}

# ── GET PRODUCTS BY SUBCATEGORY ──
@router.get("/subcategory/{sub_category}")
async def get_by_subcategory(sub_category: str, db=Depends(get_db)):
    cursor = get_cursor(db)
    cursor.execute(
        "SELECT * FROM products WHERE sub_category = %s ORDER BY created_at DESC",
        (sub_category,)
    )
    products = cursor.fetchall()
    return {"success": True, "products": products}

# ── GET SINGLE PRODUCT ──
@router.get("/{product_id}")
async def get_product(product_id: int, db=Depends(get_db)):
    cursor = get_cursor(db)
    cursor.execute("SELECT * FROM products WHERE id = %s", (product_id,))
    product = cursor.fetchone()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found!")
    return {"success": True, "product": product}

# ── SEARCH PRODUCTS ──
@router.get("/search/{query}")
async def search_products(query: str, db=Depends(get_db)):
    cursor = get_cursor(db)
    cursor.execute(
        """SELECT * FROM products 
        WHERE name LIKE %s 
        OR category LIKE %s 
        OR sub_category LIKE %s
        OR description LIKE %s
        ORDER BY created_at DESC""",
        (f"%{query}%", f"%{query}%", f"%{query}%", f"%{query}%")
    )
    products = cursor.fetchall()
    return {"success": True, "products": products}