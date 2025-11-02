from services.property_service import list_properties_service
from utils.jwt_helper import get_userid_service


def my_properties_service(page=1, size=10):
    user_id = get_userid_service()

    return list_properties_service(page=page, size=size, user_id=user_id)
