from .auth_route import auth_bp
from .dashboard_route import dashboard_bp
from .info_route import info_bp
from .property_route import property_bp
from .analytics_route import analytics_bp
from .profile_route import profile_bp

def index_routes(app):
    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(property_bp, url_prefix="/api/properties")
    app.register_blueprint(analytics_bp, url_prefix="/api/analytics")
    app.register_blueprint(profile_bp, url_prefix="/api/profile")
    app.register_blueprint(dashboard_bp, url_prefix="/api/dashboard")
    app.register_blueprint(info_bp, url_prefix="/api/info")

