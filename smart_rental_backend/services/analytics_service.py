from sqlalchemy import func, case, true
from models import db, Property, Location
from reponse.APIResponse import APIResponse


def average_rent_service():
    query = (
        db.session.query(
            Location.name,
            func.count(Property.id).label("property_count"),
            func.sum(
                case(
                    (Property.available.is_(true()), 1),
                    else_=0
                )
            ).label("available_count"),
            func.coalesce(func.avg(Property.price), 0).label("average_rent")
        )
        .outerjoin(Property, Property.location == Location.value)
        .group_by(Location.id)
        .all()
    )

    result = [
        {
            "location": name,
            "propertyCount": count,
            "availableCount": available,
            "averageRent": round(float(avg), 2)
        }
        for name, count, available, avg in query
    ]

    return APIResponse.success(
        "Analytics Report",
        result
    )
