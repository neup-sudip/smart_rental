from datetime import timedelta
from flask import Blueprint, request, jsonify, make_response
from flask_jwt_extended import create_access_token

from config import Config
from services.auth_service import register_user, login_user

auth_bp = Blueprint("auth_bp", __name__)


@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    result = register_user(data)
    return jsonify(result.to_dict()), result.http_status


@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    result = login_user(data)

    if result.http_status == 200:
        username = result.response_data["userName"]
        access_token = create_access_token(identity=username)

        response = make_response(result.to_dict())

        max_age_seconds = int(Config.JWT_EXPIRE_MINUTES) * 60

        response.set_cookie(
            "token",
            access_token,
            httponly=True,
            secure=True,
            samesite="None",
            path="/",
            max_age=max_age_seconds
        )
        print(f"User login successfully: {username}")

        return response

    return jsonify(result.to_dict()), result.http_status
