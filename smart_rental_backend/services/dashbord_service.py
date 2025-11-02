from sqlalchemy import func

from config import Config
from dtos.CategoryDTO import CategoryDTO
from dtos.DashboardDTO import DashboardDTO
from dtos.PropertyDTO import PropertyDTO
from models import *
from reponse.APIResponse import APIResponse

def dashboard_details():
    try:
        latest_properties = get_latest_properties(Config.MAX_DASHBOARD_CONTENT_LENGTH)

        most_viewed_properties = get_most_viewed_properties(Config.MAX_DASHBOARD_CONTENT_LENGTH)

        category_data = get_category_data()

        location_data = get_location_data()

        dashboard = DashboardDTO(
            latest_properties=latest_properties,
            top_properties=most_viewed_properties,
            by_categories=category_data,
            by_locations=location_data,
            locations= get_locations(),
            categories=get_categories(),
        )

        return APIResponse.success("Success", dashboard.to_dict())

    except Exception as e:
        print(f"Error fetching dashboard data value: {str(e)}")
        return APIResponse.error("Error fetching dashboard data")


def get_latest_properties(limit=8):
    # Get latest added available properties
    latest_properties = (
        db.session.query(Property)
        .filter(Property.available.is_(True))
        .order_by(Property.created_at.desc())
        .limit(limit)
        .all()
    )
    return [PropertyDTO(p).to_dict() for p in latest_properties]


def get_most_viewed_properties(limit=8):
    # Get property IDs and view counts, only for available properties
    most_viewed = (
        db.session.query(
            Property.id,
            func.count(PropertyView.ip_address).label("view_count")
        )
        .join(PropertyView, PropertyView.property_id == Property.id)
        .filter(Property.available.is_(True))
        .group_by(Property.id)
        .order_by(func.count(PropertyView.ip_address).desc())
        .limit(limit)
        .all()
    )

    property_ids = [prop_id for prop_id, _ in most_viewed]

    if not property_ids:
        return []

    ordering_case = db.case(
        {prop_id: index for index, prop_id in enumerate(property_ids)},
        value=Property.id
    )

    properties = (
        Property.query
        .filter(Property.id.in_(property_ids), Property.available.is_(True))
        .order_by(ordering_case)
        .all()
    )

    return [PropertyDTO(p).to_dict() for p in properties]


def get_category_data():
    # Group by Property.category and count only available properties
    query = (
        db.session.query(
            Property.category,
            func.count(Property.id).label('property_count')
        )
        .filter(Property.available.is_(True))
        .group_by(Property.category)
        .all()
    )

    categories = [CategoryDTO(category, property_count, "category").to_dict() for category, property_count in query]
    return categories


def get_location_data():
    # Group by Property.location and count only available properties
    query = (
        db.session.query(
            Property.location,
            func.count(Property.id).label('property_count')
        )
        .filter(Property.available.is_(True))
        .group_by(Property.location)
        .all()
    )

    categories = [CategoryDTO(location, property_count, "location").to_dict() for location, property_count in query]
    return categories



def get_locations():
    location_query = db.session.query(Location).all()
    return [CategoryDTO(name=loc.name, value=loc.value, reference="location").to_dict() for loc in location_query]

def get_categories():
    category_query = db.session.query(Category).all()
    return [CategoryDTO(name=cat.name, value=cat.value, reference="category").to_dict() for cat in category_query]
