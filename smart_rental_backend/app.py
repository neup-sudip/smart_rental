from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from config import Config
from exceptions.GlobalExceptionHandler import register_error_handlers
from routes import index_routes
from models import db
from startup.insert_data import insert_data

jwt = JWTManager()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    jwt.init_app(app)

    index_routes(app)

    # Automatically create tables if they don't exist
    with app.app_context():
        db.create_all()
        insert_data()

    register_error_handlers(app)

    CORS(app, origins=[Config.REACT_APP_BASE_URL], supports_credentials=True)

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
