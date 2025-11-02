class CategoryDTO:
    def __init__(self, name, value, reference):
        self.name = name
        self.value = value
        self.reference = reference

    def to_dict(self):
        return {
            "name": self.name,
            "value": self.value,
            "reference": self.reference
        }
