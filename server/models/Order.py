from models.__init__ import SerializerMixin, validates, db, datetime


class Order(db.Model, SerializerMixin):
    __tablename__ = "orders"
    
    id = db.Column(db.Integer, primary_key=True)
    order_date = db.Column(db.Integer)
    total = db.Column(db.Float, nullable=False)
    status = db.Column(db.String)
    discount = db.Column(db.Float)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))

    user = db.relationship('User', back_populates='orders')
    order_items = db.relationship('OrderItem', back_populates='order')
    products = db.relationship('OrderItem.product', back_populates='order')
    
    serialize_rules = ('-order_items.order', "-user.orders")

    
    @validates('total')
    def validates_total(self, _, total):
        if not isinstance(total, float):
            raise TypeError("Total price must be of data type float")
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
        
    @validates('discount')
    def validates_discount(self, _, discount):
        if not isinstance(discount, float):
            raise TypeError("Discount must be of type float")
        elif discount > 99:
            raise ValueError('Discount must be 99% or lower')
        elif discount < 0:
            raise ValueError('Discount cannot be negative')
        else:
            return discount
    # @validates('order_date')
    # def validates_order_date(self, _, order_date):
    #     if not isinstance(order_date, datetime):
    #         raise TypeError('Order_date must be of type datetime')

