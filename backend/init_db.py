# backend/init_db.py

from app import app, db
from models import Provider, Exam, Topic, UserPreference, FavoriteQuestion
from utils import load_data_into_db
import psycopg2
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT
from sqlalchemy import text

def init_db():
    # Database connection parameters
    dbname = "hiraya-db"
    user = "postgres"
    password = "password"
    host = "localhost"

    # Connect to the database
    with app.app_context():
        # Drop all tables
        db.drop_all()
        print("Dropped all tables.")

        # Create all tables
        db.create_all()
        print("Created all tables.")

        # Load initial data
        load_data_into_db()
        print("Loaded initial data into the database.")

if __name__ == "__main__":
    init_db()