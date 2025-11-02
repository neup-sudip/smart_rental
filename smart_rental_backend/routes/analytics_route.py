from flask import Blueprint, jsonify
from services.analytics_service import average_rent_service

analytics_bp = Blueprint("analytics_bp", __name__)


@analytics_bp.route("/average-rent", methods=["GET"])
def average_rent():
    result = average_rent_service()
    return jsonify(result.to_dict()), result.http_status
