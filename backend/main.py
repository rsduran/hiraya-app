# backend/main.py

from app import app
from init_db import init_db

if __name__ == '__main__':
    try:
        init_db()  # Initialize the database
        print("Database initialized successfully.")
    except Exception as e:
        print(f"An error occurred while initializing the database: {e}")
        print("Continuing with application startup...")
    
    app.run(debug=True)