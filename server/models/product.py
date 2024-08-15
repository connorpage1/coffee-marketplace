from models.__init__ import SerializerMixin, validates, db

class Product(db.Model, SerializerMixin):
    __tablename__ = "products"
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    stock = db.Column(db.String)
    type = db.Column(db.String, unique=True)
    sku = db.Column(db.String)
    image_url = db.Column(db.String)
    description = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    user = db.relationship("User", back_populates="products")

    
    serialize_rules = ("-user",)
    
    def __repr__(self):
        return f"""
            <Product #{self.id}:
                Name: {self.name}
                Stock: {self.stock}
                Type: {self.type}
                SKU: {self.sku}
                Image URL: {self.image_url}
                Description: {self.description}
            />
        """
        
    @validates("name")
    def validate_name(self, key, value):
        if not isinstance(value, str):
            raise TypeError(f"{key} must be of type str")
        elif len(value) < 1:
            raise ValueError(f"{key} must be at least 1 characters long")
        else:
            return value
        
    @validates("stock")
    def validate_stock(self, key, value):
        if not isinstance(value, str):
            raise TypeError(f"{key} must be of type str")
        elif len(value) < 1:
            raise ValueError(f"{key} must be at least 1 characters long")
        else:
            return value
        
    @validates("type")
    def validate_stock(self, key, value):
        if not isinstance(value, str):
            raise TypeError(f"{key} must be of type str")
        elif len(value) < 1:
            raise ValueError(f"{key} must be at least 1 characters long")
        elif not "coffee" and "tea":
            raise ValueError(f"{key} must be either type coffee or tea")
        else:
            return value
        
    @validates("sku")
    def validate_stock(self, key, value):
        if not isinstance(value, str):
            raise TypeError(f"{key} must be of type str")
        elif len(value) < 1:
            raise ValueError(f"{key} must be at least 1 characters long")
        else:
            return value
        
    @validates("image_url")
    def validate_stock(self, key, value):
        if not isinstance(value, str):
            raise TypeError(f"{key} must be of type str")
        elif len(value) < 1:
            raise ValueError(f"{key} must be at least 1 characters long")
        else:
            return value
        
    @validates("description")
    def validate_stock(self, key, value):
        if not isinstance(value, str):
            raise TypeError(f"{key} must be of type str")
        elif len(value) < 1:
            raise ValueError(f"{key} must be at least 1 characters long")
        else:
            return value
        
    @validates("user_id")
    def validate_stock(self, key, value):
        if not isinstance(value, str):
            raise TypeError(f"{key} must be of type str")
        elif len(value) < 1:
            raise ValueError(f"{key} must be at least 1 characters long")
        else:
            return value
        