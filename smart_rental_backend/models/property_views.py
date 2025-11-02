from . import db
from datetime import datetime, timezone

class PropertyView(db.Model):
    __tablename__ = 'property_views'

    id = db.Column(db.Integer, primary_key=True)
    property_id = db.Column(db.Integer, db.ForeignKey('properties.id'))
    ip_address = db.Column(db.String(50))
    created_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))

