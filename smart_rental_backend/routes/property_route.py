from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from services.property_service import list_properties_service, create_property_service, update_property_status_service, \
    update_property_service, property_detail_service
from reponse.APIResponse import APIResponse
from services.property_view_service import add_property_view
from utils.utilities import get_client_ip

property_bp = Blueprint("property_bp", __name__)


@property_bp.route(rule="/list", methods=["GET"])
def list_properties():
    page = int(request.args.get("page", 1))
    size = int(request.args.get("size", 10))
    text = request.args.get("text")
    location = request.args.get("location")
    category = request.args.get("category")

    result = list_properties_service(page=page, size=size, text=text,
                                     location=location, category=category)
    return jsonify(result.to_dict()), result.http_status


@property_bp.route("/<int:property_id>", methods=["GET"])
def property_details(property_id):
    result = property_detail_service(property_id=property_id)

    if result.http_status == 200:
        ip_address = get_client_ip()
        add_property_view(property_id=property_id, ip_address=ip_address)

    return jsonify(result.to_dict()), result.http_status


@property_bp.route("", methods=["POST"])
@jwt_required()
def create_property():
    try:
        data = request.get_json()

        result = create_property_service(data)
        return jsonify(result.to_dict()), result.http_status

    except Exception as e:
        print(f"Error creating property: {str(e)}")
        return jsonify(APIResponse.failed("Server error creating property").to_dict()), 500


@property_bp.route("/update", methods=["POST"])
@jwt_required()
def update_property():
    try:
        data = request.get_json()

        result = update_property_service(data)
        return jsonify(result.to_dict()), result.http_status

    except Exception as e:
        print(f"Error creating property: {str(e)}")
        return jsonify(APIResponse.failed("Server error updating property").to_dict()), 500


@property_bp.route("/update/status", methods=["POST"])
@jwt_required()
def disable_property():
    try:
        data = request.get_json()

        result = update_property_status_service(data)
        return jsonify(result.to_dict()), result.http_status

    except Exception as e:
        print(f"Error in disable property: {str(e)}")
        return jsonify(APIResponse.failed("Server error in disable property").to_dict()), 500
