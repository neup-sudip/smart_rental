from dtos.UserDTO import UserDTO
from models import User
from reponse.APIResponse import APIResponse

def get_user_by_username(username):

    user = User.query.filter_by(username=username.upper()).first()

    if not user:
        return APIResponse.failed("Invalid credentials")

    user_dto = UserDTO(user)

    return APIResponse.success("Login successful", user_dto)