from . import db
from datetime import datetime, timezone

class Property(db.Model):
    __tablename__ = "properties"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=False)
    price = db.Column(db.Float, nullable=False)
    category = db.Column(db.String(50), nullable=False)
    available = db.Column(db.Boolean, default=False)
    owner_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    location = db.Column(db.String(50), nullable=False)
    address = db.Column(db.String(255), nullable=False)

    created_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))
    updated_at = db.Column(db.DateTime, default=datetime.now(timezone.utc),
                           onupdate=datetime.now(timezone.utc))

    # Relationship with the User model
    owner = db.relationship('User', backref='properties')

    def __repr__(self):
        return f"<Property {self.title} - Owner {self.owner_id} - Location {self.location}>"
