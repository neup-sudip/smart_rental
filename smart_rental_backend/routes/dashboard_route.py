from flask import Blueprint, jsonify

from services.dashbord_service import dashboard_details

dashboard_bp = Blueprint("dashboard_bp", __name__)

@dashboard_bp.route("", methods=["GET"])
def get_dashboard_details():
    result = dashboard_details()
    return jsonify(result.to_dict()), result.http_status
