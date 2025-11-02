from flask import jsonify
from flask_jwt_extended.exceptions import NoAuthorizationError
from jwt import ExpiredSignatureError, InvalidTokenError

from reponse.APIResponse import APIResponse
from exceptions.UnauthorizedException import UnauthorizedException

def register_error_handlers(app):
    # Handling UnauthorizedException errors (custom)
    @app.errorhandler(UnauthorizedException)
    def handle_unauthorized(e):
        response = APIResponse.failed(e.message)
        return jsonify(response.to_dict()), 401

    # Handling Expired JWT Token Errors (JWT errors)
    @app.errorhandler(ExpiredSignatureError)
    def handle_expired_token(e):
        response = APIResponse.failed("Your session has expired. Please log in again.")
        return jsonify(response.to_dict()), 403

    # Handling Invalid JWT Token Errors (JWT errors)
    @app.errorhandler(InvalidTokenError)
    def handle_invalid_token(e):
        response = APIResponse.failed("Invalid token. Please provide a valid token.")
        return jsonify(response.to_dict()), 403

    # Handling Missing Authorization Header
    @app.errorhandler(NoAuthorizationError)
    def handle_missing_auth_header(e):
        response = APIResponse.failed("Missing Authorization Header")
        return jsonify(response.to_dict()), 403

    # Handling all other general errors
    @app.errorhandler(Exception)
    def handle_general_error(e):
        print(f"Global Exception Handler : {str(e)}")

        # Handle all other errors with a generic internal server error
        response = APIResponse.error("Internal Server Error")
        return jsonify(response.to_dict()), 500
