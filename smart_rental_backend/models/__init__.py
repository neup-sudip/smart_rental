from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

from .user import User
from .property import Property
from .location import Location
from .category import Category
from .property_views import PropertyView