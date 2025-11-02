from models import db, User
from reponse.APIResponse import APIResponse
from dtos.UserDTO import UserDTO


def register_user(data):
    # Basic validation
    if not data.get("username") or not data.get("password"):
        return APIResponse.failed("Username and password required")

    if User.query.filter_by(username=data["username"].upper()).first():
        return APIResponse.failed("Username already exists")

    user = User(
        fullname=data.get("fullname"),
        username=data["username"].upper(),
        contact_no=data.get("contactNo")
    )

    user.set_password(data["password"])  # Hashing password

    db.session.add(user)
    db.session.commit()

    print(f"User created successfully: {user.username}")

    # Use DTO to return only safe fields
    user_dto = UserDTO(user).to_dict()

    return APIResponse.success("User registered successfully", user_dto)


def login_user(data):
    user = User.query.filter_by(username=data["username"].upper()).first()

    if not user or not user.check_password(data["password"]):
        return APIResponse.failed("Invalid credentials")

    user_dto = UserDTO(user).to_dict()

    return APIResponse.success("User login successfully", user_dto)
