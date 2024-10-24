# backend/config.py

import os

class Config:
    """Flask application configuration."""
    # Database configuration
    SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:password@localhost/hiraya-db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    # Additional configurations can be added here
    JSON_SORT_KEYS = False  # Preserve JSON key order
    CORS_HEADERS = 'Content-Type'  # CORS headers