from models.__init__ import SerializerMixin, validates, db, re


class Product(db.Model, SerializerMixin):
    __tablename__ = "products"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    stock = db.Column(db.Integer)
    type = db.Column(db.String)
    sku = db.Column(db.String)
    image_url = db.Column(db.String)
    description = db.Column(db.String)
    tag = db.Column(db.String)
    price = db.Column(db.Float)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    seller = db.relationship("User", back_populates="selling_products")
    order_items = db.relationship("OrderItem", back_populates="product")

    serialize_rules = ("-user", "-order_items")

    def __repr__(self):
        return f"""
            <Product #{self.id}:
                Name: {self.name}
                Stock: {self.stock}
                Type: {self.type}
                Tag: {self.tag}
                SKU: {self.sku}
                Price: {self.price}
                Image URL: {self.image_url}
                Description: {self.description}
            />
        """

    @validates("name")
    def validate_name(self, key, value):
        if not isinstance(value, str) or not value.strip():
            raise TypeError(f"{key} must be a non-empty string")
        elif len(value) < 1:
            raise ValueError(f"{key} must be at least 1 characters long")
        return value

    @validates("stock")
    def validate_stock(self, key, value):
        if not isinstance(value, int):
            raise TypeError(f"{key} must be a non-empty integer")
        elif value < 0:
            raise ValueError(f"{key} must be greater than 0")
        return value

    @validates("type")
    def validate_type(self, key, value):
        if not isinstance(value, str) or not value.strip():
            raise TypeError(f"{key} must be a non-empty string")
        elif value not in ["coffee", "tea"]:
            raise ValueError(f"{key} must be either type 'coffee' or 'tea'")
        return value

    @validates("tag")
    def validate_tag(self, key, value):
        valid_tags = [
            "light roast",
            "medium roast",
            "dark roast",
            "espresso",
            "origin",
            "flavor",
            "washed processed",
            "natural process",
            "honey process",
            "arabica",
            "robusta",
            "blend",
            "organic",
            "single-origin",
            "black tea",
            "green tea",
            "white tea",
            "herbal",
            "rooibos",
            "matcha",
            "caffeine",
            "decaf",
        ]
        if not isinstance(value, str) or not value.strip():
            raise TypeError(f"{key} must be a non-empty string")
        elif value.lower() not in valid_tags:
            raise ValueError(f"Invalid tag for '{key}': '{value}'")
        return value

    @validates("price")
    def validates_price(self, key, value):
        if isinstance(value, int) and value > 0.01:
            return float(value)
        elif not isinstance(value, float):
            raise TypeError(f"{key} must be of data type float")
        elif value < 0.01:
            raise ValueError(f"{key} cannot be less that one cent")
        return round(value, 2)

    @validates("sku")
    def validate_sku(self, key, value):
        if not isinstance(value, str) or not value.strip():
            raise TypeError(f"{key} must be a non-empty string")
        elif not re.match(r"^[A-Za-z0-9_-]{8,12}$", value):
            raise ValueError(f"{key} must be 8-12 alphanumeric characters long")
        return value

    @validates("image_url")
    def validate_image_url(self, key, value):
        if not isinstance(value, str) or not value.strip():
            raise TypeError(f"{key} must be a non-empty string")
        elif not re.match(r"^https?:\/\/.*\.(jpg|jpeg|png|gif|bmp|webp|svg)$", value):
            raise ValueError(f"{key} must be a valid image url")
        return value

    @validates("description")
    def validate_description(self, key, value):
        if not isinstance(value, str) or not value.strip():
            raise TypeError(f"{key} must be a non-empty string")
        elif not (10 <= len(value) <= 1000):
            raise ValueError("Description must be between 10 and 1000 characters long")
        return value

    @validates("user_id")
    def validate_user_id(self, key, value):
        if not isinstance(value, int):
            raise TypeError(f"{key} must be of type int")
        return value
