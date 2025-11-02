class PropertyDTO:
    def __init__(self, property):
        self.id = property.id
        self.title = property.title
        self.description = property.description
        self.location = property.location
        self.price = float(property.price)
        self.category = property.category
        self.available = property.available
        self.owner_id = property.owner_id
        self.address = property.address

        self.owner_full_name = property.owner.fullname
        self.created_date = property.created_at.strftime('%Y-%m-%d %H:%M:%S') if property.created_at else None

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "location": self.location,
            "address": self.address,
            "price": self.price,
            "category": self.category,
            "available": self.available,
            "ownerId": self.owner_id,
            "ownerName": self.owner_full_name,
            "createdDate": self.created_date
        }