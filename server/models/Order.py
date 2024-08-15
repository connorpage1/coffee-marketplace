from models.__init__ import SerializerMixin, validates, db

class Order(db.Model, SerializerMixin):
    __tablename__ = "orders"

    id = db.Column(db.Integer, primary_key=True)
    order_date = db.Column(db.Integer)
    total = db.Column(db.Float, nullable=False)
    status = db.Column(db.String)
    discount = db.Column(db.Float)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    # user_id = db.Column(db.Integer, db.ForeignKey("users.id"))


    # user = db.relationship('User', back_populates='orders')
    order_items = db.relationship('OrderItem', back_populates='order')
    # serialize_rules = ('order_items.order',)
