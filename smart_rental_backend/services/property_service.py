from dtos.PageDTO import PageDTO
from dtos.PropertyDTO import PropertyDTO
from reponse.APIResponse import APIResponse
from models import db, Property
from utils.jwt_helper import get_userid_service
from decimal import Decimal, ROUND_HALF_UP, InvalidOperation


def list_properties_service(page=1, size=10, text=None, location=None, category=None, user_id=None):
    query = Property.query
    # query = query.filter(Property.available.is_(True))

    if user_id is not None and user_id != "":
        query = query.filter_by(owner_id=user_id)

    if text:
        query = query.filter(
            (Property.title.ilike(f"%{text}%")) |
            (Property.description.ilike(f"%{text}%"))
        )

    if location is not None and location != "":
        query = query.filter_by(location=location)

    if category is not None and category != "":
        query = query.filter_by(category=category)

    query = query.order_by(Property.updated_at.desc())

    pagination = query.paginate(page=page, per_page=size)

    properties = [PropertyDTO(p).to_dict() for p in pagination.items]

    page_dto = PageDTO(
        items=properties,
        total=pagination.total,
        page=pagination.page,
        size=pagination.per_page,
        pages=pagination.pages
    )

    return APIResponse.success(
        "Properties fetched successfully",
        page_dto.to_dict()
    )


def property_detail_service(property_id):
    property_detail = Property.query.filter_by(id=property_id).first()

    if not property_detail:
        return APIResponse.failed("Invalid Property requested")

    property_dto = PropertyDTO(property_detail)

    return APIResponse.success("Property Detail", property_dto.to_dict())


def create_property_service(data):
    user_id = get_userid_service()

    price = Decimal(data["price"]).quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)

    # Add Basic length, character, validation

    new_property = Property(
        title=data["title"],
        description=data.get("description"),
        price=price,
        category=data["category"],
        available=data.get("available", True),
        location=data["location"],
        address=data["address"],
        owner_id=user_id
    )

    db.session.add(new_property)
    db.session.commit()

    dto = PropertyDTO(new_property)

    print(f"Property created successfully: {new_property.__repr__()}")

    return APIResponse.success(
        "Property created successfully",
        dto.to_dict()
    )


def update_property_service(data):
    property_id = data["id"]

    user_id = get_userid_service()

    user_property = Property.query.filter_by(id=property_id, owner_id=user_id).first()

    if not user_property:
        return APIResponse.failed("Invalid Property requested")

    update_property_fields(user_property, data)

    db.session.commit()

    return APIResponse.success("Property updated successfully")


def update_property_status_service(data):

    property_id = data["id"]
    property_status = data["available"]
    user_id = get_userid_service()

    user_property = Property.query.filter_by(id=property_id, owner_id=user_id).first()

    if not user_property:
        return APIResponse.failed("Invalid Property requested")

    if user_property.available and property_status == True:
        return  APIResponse.failed("Property already available")

    if not user_property.available and property_status == False:
        return APIResponse.failed("Property already disabled")

    user_property.available = property_status
    db.session.commit()

    return APIResponse.success("Property disabled successfully")



def update_property_fields(user_property, data):
    # Fields that can be updated
    allowed_fields = ["title", "description", "category", "location", "category", "address"]

    setattr(user_property, "available", data.get("available"))

    price_value = data.get("price")
    if price_value not in [None, ""]:
        try:
            value = Decimal(price_value).quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)
            if value != getattr(user_property, "price"):
                setattr(user_property, "price", value)
        except (ValueError, InvalidOperation) as e:
            print(f"Invalid price: {price_value}, Exception: {e}")

    # Update other allowed fields
    for field in allowed_fields:
        value = data.get(field)
        if value in [None, ""]:
            continue
        # For string fields, strip whitespace
        if isinstance(value, str):
            value = value.strip()
            if len(value) == 0:
                continue
        # Only update if different from current value
        if value != getattr(user_property, field):
            setattr(user_property, field, value)
