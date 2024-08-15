from models.__init__ import SerializerMixin, validates, re, db

class Product(db.Model, SerializerMixin):
    __tablename__ = "products"
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    stock = db.Column(db.String)
    genre = db.Column(db.String)
    sku = db.Column(db.String)
    image_url = db.Column(db.String)
    description = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    user = db.relationship("User", back_populates="product")
    
    serialize_rules = ("-user",)
    
    def __repr__(self):
        return f"""
            <Product #{self.id}:
                Name: {self.name}
                Stock: {self.stock}
                Genre: {self.genre}
                SKU: {self.sku}
                Image URL: {self.image_url}
                Description: {self.description}
            />
        """
        
    @validates("name")
    
    @validates("stock")
    
    @validates("genre")
    
    @validates("sku")
    
    @validates("image_url")
    
    @validates("description")