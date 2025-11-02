from . import db

class Location(db.Model):
    __tablename__ = "locations"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False, unique=True)
    value = db.Column(db.String(50), nullable=False, unique=True)

    def __repr__(self):
        return f"<Location {self.name}>"