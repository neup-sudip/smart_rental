from flask import Blueprint, jsonify

from reponse.APIResponse import APIResponse
from services.dashbord_service import get_locations, get_categories

info_bp = Blueprint("info_bp", __name__)


@info_bp.route("", methods=["GET"])
def get_locations_categories():
    locations = get_locations()
    categories = get_categories()

    result = APIResponse.success("Details", {"locations": locations, "categories": categories})

    return jsonify(result.to_dict()), result.http_status
