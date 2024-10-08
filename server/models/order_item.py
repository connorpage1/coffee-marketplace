from models.__init__ import SerializerMixin, validates, db, datetime
from config import db


class OrderItem(db.Model, SerializerMixin):
    __tablename__ = "order_items"

    id = db.Column(db.Integer, primary_key=True)
    quantity = db.Column(db.Integer)
    price_at_order = db.Column(db.Float)
    order_id = db.Column(db.Integer, db.ForeignKey("orders.id"))
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    product_id = db.Column(db.Integer, db.ForeignKey("products.id"))

    order = db.relationship("Order", back_populates="order_items")
    product = db.relationship("Product", back_populates="order_items")

    serialize_rules = ("-order", "-product.order_items")

    @validates("quantity")
    def validates_quantity(self, _, quantity):
        if not isinstance(quantity, int):
            raise TypeError("Quantity must be of data type integer")
        elif quantity < 1:
            raise ValueError("Quantity must be at least 1")
        else:
            return quantity

    @validates("price_at_order")
    def validates_price_at_order(self, _, price_at_order):
        if not isinstance(price_at_order, float):
            raise TypeError("Price at order must be of data type float")
        elif price_at_order < 0.01:
            raise ValueError("Price at order cannot be less that one cent")
        else:
            return price_at_order
