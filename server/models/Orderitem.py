from models.__init__ import SerializerMixin, validates, db, datetime
from config import db


class OrderItem(db.Model):
    __tablename__ = 'order_items'

    id = db.Column(db.Integer, primary_key=True)
    quantity = db.Column(db.Integer, nullable=False)
    price_at_order = db.Column(db.Float, nullable=False)
    order_id = db.Column(db.Integer, db.ForeignKey("orders.id"))
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    # product_id = db.Column(db.Integer, db.ForeignKey("products.id"))

    order = db.relationship('Order', back_populates='order_items')
    product = db.relationship('Product', back_populates='order_items')


    @validates('quantity')
    def validates_total(self, _, quantity):
        if not isinstance(quantity, int):
            raise TypeError("Total price must be of data type integer")
        elif quantity < 1:
            raise ValueError("Quantity must be at least 1")
        else:
            return quantity





