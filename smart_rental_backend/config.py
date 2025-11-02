import os
from dotenv import load_dotenv
from datetime import timedelta

load_dotenv()  # load environment variables from .env

class Config:
    # JWT settings
    JWT_TOKEN_LOCATION = os.environ["JWT_TOKEN_LOCATION"]
    JWT_ACCESS_COOKIE_NAME = os.environ["JWT_ACCESS_COOKIE_NAME"]
    JWT_COOKIE_CSRF_PROTECT = os.environ.get("JWT_COOKIE_CSRF_PROTECT", "False").lower() == "true"

    JWT_SECRET_KEY = os.environ["JWT_SECRET_KEY"]
    JWT_EXPIRE_MINUTES = int(os.environ["JWT_EXPIRE_MINUTES"])
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(minutes=JWT_EXPIRE_MINUTES)
    SQLALCHEMY_DATABASE_URI = os.environ["DATABASE_URL"]
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    MAX_DASHBOARD_CONTENT_LENGTH = int(os.environ["MAX_DASHBOARD_CONTENT_LENGTH"])
    REACT_APP_BASE_URL = os.environ["REACT_APP_BASE_URL"]
