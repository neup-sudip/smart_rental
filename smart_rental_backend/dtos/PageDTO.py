class PageDTO:
    def __init__(self, items, total, page, size, pages):
        self.items = items
        self.total = total
        self.page = page
        self.size = size
        self.pages = pages

    def to_dict(self):
        return {
            "total": self.total,
            "page": self.page,
            "size": self.size,
            "pages": self.pages,
            "items": self.items
        }