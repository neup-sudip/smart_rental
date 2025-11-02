def insert_data():
    from models import User, Location, Category, Property, db
    from werkzeug.security import generate_password_hash

    # ---- Insert User ----
    if not User.query.filter_by(username="ADMIN").first():
        default_user = User(
            fullname="Admin User",
            username="ADMIN",
            contact_no="9876543210",
            password=generate_password_hash("Admin@12345#")
        )
        db.session.add(default_user)
        db.session.commit()  # Commit to get user.id

    else:
        default_user = User.query.filter_by(username="ADMIN").first()


    # ---- Insert Locations ----
    locations = [
        {"name": "Kathmandu", "value": "Kathmandu"},
        {"name": "Lalitpur", "value": "Lalitpur"},
        {"name": "Bhaktapur", "value": "Bhaktapur"},
    ]

    location_objs = []
    for loc in locations:
        loc_obj = Location.query.filter(
            (Location.name == loc["name"]) | (Location.value == loc["value"])
        ).first()
        if not loc_obj:
            loc_obj = Location(name=loc["name"], value=loc["value"])
            db.session.add(loc_obj)
            db.session.commit()
        location_objs.append(loc_obj)


    # ---- Insert Categories ----
    categories = [
        {"name": "Land", "value": "Land"},
        {"name": "House", "value": "House"},
        {"name": "Apartment", "value": "Apartment"},
        {"name": "Room", "value": "Room"},
        {"name": "Flat", "value": "Flat"},
    ]

    category_objs = []
    for cat in categories:
        cat_obj = Category.query.filter(
            (Category.name == cat["name"]) | (Category.value == cat["value"])
        ).first()
        if not cat_obj:
            cat_obj = Category(name=cat["name"], value=cat["value"])
            db.session.add(cat_obj)
            db.session.commit()
        category_objs.append(cat_obj)

    # ---- Insert Properties ----
    default_properties = [
        # Kathmandu
        {"title": "1BHK Room Kathmandu", "description": "Nice flat in Kathmandu", "price": 15000, "category": "Flat", "available": True, "location": "Kathmandu", "address": "Samakhoshi Kathmandu, Near Square Mall"},
        {"title": "2BHK Apartment Near Kathmandu", "description": "Nice flat in Kathmandu", "price": 18000, "category": "Apartment", "available": False, "location": "Kathmandu", "address": "NewRoad Kathmandu, Near Bishal Bajar"},

        # Lalitpur
        {"title": "2 Floor, 3BHK Lalitpur", "description": "Comfortable house in Lalitpur Area with 3BHK, including parking area, It is 2 floor house", "price": 150000, "category": "House", "available": True, "location": "Lalitpur", "address": "NewRoad Lalitpur, Near Pokhari"},
        {"title": "2BHK Lalitpur", "description": "Modern Flat on Modern House with 2BHK", "price": 22000, "category": "Flat", "available": True, "location": "Lalitpur", "address": "BusPark Lalitpur, Near Big Mall"},

        # Bhaktapur
        {"title": "1BHK Bhaktapur", "description": "Single Room with one Kitchen and Hall", "price": 12000, "category": "Room", "available": True, "location": "Bhaktapur", "address": "Rani Pokhari Bhaktapur"},
        {"title": "3BHK Bhaktapur", "description": "Renovated apartment", "price": 24000, "category": "Apartment", "available": False, "location": "Bhaktapur", "address": "Gundu Bhaktapur, 500m from Pokhari"},
    ]

    for prop in default_properties:
        exists = Property.query.filter_by(owner_id=default_user.id).first()
        if not exists:
            new_prop = Property(
                title=prop["title"],
                description=prop["description"],
                price=prop["price"],
                category=prop["category"],
                available=prop["available"],
                location=prop["location"],
                owner_id=default_user.id,
                address=prop["address"],
            )
            db.session.add(new_prop)

    db.session.commit()
    print("Inserted default user, locations, and properties.")
