import mysql.connector
from mysql.connector import pooling
import os
from dotenv import load_dotenv

load_dotenv()

DB_HOST = os.getenv("DB_HOST", "localhost")
DB_USER = os.getenv("DB_USER", "root")
DB_PASSWORD = os.getenv("DB_PASSWORD", "yugrang123")
DB_NAME = os.getenv("DB_NAME", "yugrang")

print(f"Connecting to DB: {DB_HOST} as {DB_USER}")

db_config = {
    "host": DB_HOST,
    "user": DB_USER,
    "password": DB_PASSWORD,
    "database": DB_NAME,
}

connection_pool = pooling.MySQLConnectionPool(
    pool_name="yugrang_pool",
    pool_size=10,
    **db_config
)

def get_db():
    connection = connection_pool.get_connection()
    try:
        yield connection
    finally:
        connection.close()

def get_cursor(connection):
    return connection.cursor(dictionary=True)