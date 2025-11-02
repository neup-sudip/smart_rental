class UserDTO:
    def __init__(self, user):
        self.id = user.id
        self.fullname = user.fullname
        self.username = user.username
        self.contact_no = user.contact_no

    def to_dict(self):
        return {
            "id": self.id,
            "fullName": self.fullname,
            "userName": self.username,
            "contactNo": self.contact_no
        }