from flask_jwt_extended import create_access_token, get_jwt_identity, verify_jwt_in_request
from flask_jwt_extended.exceptions import NoAuthorizationError
from flask import request
from exceptions.UnauthorizedException import UnauthorizedException
from services.user_service import get_user_by_username


def create_token(identity):
    return create_access_token(identity=identity)


def get_identity_from_token():
    try:
        verify_jwt_in_request()
        return get_jwt_identity()
    except NoAuthorizationError:
        raise UnauthorizedException("Invalid or missing JWT token")


def get_token_from_header():
    auth_header = request.headers.get("Authorization", "")
    if auth_header.startswith("Bearer "):
        return auth_header.split(" ")[1]
    return None

def get_userid_service():

    username = get_identity_from_token()

    api_response = get_user_by_username(username)

    if not api_response.response_status:
        raise UnauthorizedException("Invalid User")

    return api_response.response_data.id