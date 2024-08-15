from models.__init__ import SerializerMixin, validates, db

class Order(db.Model, SerializerMixin):
    __tablename__ = "orders"

    
    id = db.Column(db.Integer, primary_key=True)
    order_date = db.Column(db.DateTime)
    total = db.Column(db.Float, nullable=False)
    status = db.Column(db.String)
    discount = db.Column(db.Float)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    # user_id = db.Column(db.Integer, db.ForeignKey("users.id"))

    @validates('total')
    def validates_total(self, _, total):
        if not isinstance(total, float):
            raise TypeError("Value must be of data type float")
        elif total < .01:
            raise ValueError("Price cannot be less that one cent")
        else:
            return total
    @validates('status')
    def validates_total(self, _, status):
        if not isinstance(status, str):
            raise TypeError("Value must be of data type string")
        elif status not in ["pending", "ordered", "shipped", "delivered"]:
            raise ValueError("Value must be pending, ordered, shipped, or delivered")
        else:
            return status



    # user = db.relationship('User', back_populates='orders')
    order_items = db.relationship('OrderItem', back_populates='order')
    # serialize_rules = ('order_items.order',)
