from app import app, db
from utils import load_data_into_db

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        load_data_into_db()
    app.run(debug=True)