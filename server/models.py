from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

class Order(db.Model, SerializerMixin):
    __tablename__ = "orders"

    id = db.Column(db.Integer, primary_key=True)
    order_date = db.Column(db.Integer)
    total = db.Column(db.Float, nullable=False)
    status = db.Column(db.String)
    discount = db.Column(db.Float)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))


    user = db.relationship('User', back_populate='orders')
    order_items = db.relationship('OrderItem', back_populates='order')
    def __repr__(self):
        return f"<Order {self.total}, {self.status}>"


class OrderItem(db.Model):
    __tablename__ = 'order_items'

    id = db.Column(db.Integer, primary_key=True)
    quantity = db.Column(db.Integer, nullable=False)
    price_at_order = db.Column(db.Float, nullable=False)
    order_id = db.Column(db.Integer, db.ForeignKey("orders.id"))
    # product_id = db.Column(db.Integer, db.ForeignKey("products.id"))

    order = db.relationship('Order', back_populates='order_items')
    # product = db.relationship('Product', back_populates='order_items')





