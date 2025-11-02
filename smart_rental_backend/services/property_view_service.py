from models import db, PropertyView
from datetime import datetime, timezone

def add_property_view(property_id, ip_address):
    try:
        # Check if this IP already exists for the property
        existing_view = PropertyView.query.filter_by(
            property_id=property_id, ip_address=ip_address
        ).first()

        if not existing_view:
            new_view = PropertyView(
                property_id=property_id,
                ip_address=ip_address,
            )
            db.session.add(new_view)
            db.session.commit()

    except Exception as e:
        db.session.rollback()
        print(f"Error adding property view: {e}")