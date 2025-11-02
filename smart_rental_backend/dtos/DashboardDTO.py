
class DashboardDTO:
    def __init__(self, latest_properties, top_properties, by_locations, by_categories, locations, categories):
        self.latest_properties = latest_properties
        self.top_properties = top_properties
        self.by_locations = by_locations
        self.by_categories = by_categories
        self.locations = locations
        self.categories = categories

    def to_dict(self):
        return {
            "latestProperties": self.latest_properties,
            "topProperties": self.top_properties,
            "byLocations": self.by_locations,
            "byCategories": self.by_categories,
            "locations": self.locations,
            "categories": self.categories
        }