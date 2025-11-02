from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required

from services.profile_service import my_properties_service

profile_bp = Blueprint('profile_bp', __name__)

@profile_bp.route("/properties", methods=["GET"])
@jwt_required()
def my_properties():
    page = int(request.args.get("page", 1))
    size = int(request.args.get("size", 10))

    result = my_properties_service(page=page, size=size)
    return jsonify(result.to_dict()), result.http_status