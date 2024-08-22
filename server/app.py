# Remote library imports
from flask import Flask, request, make_response, session
from flask_migrate import Migrate
from flask_restful import Resource, Api
import os
from datetime import datetime

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.environ.get("DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'app.db')}")

# Local imports
from config import app, db, api
from models.order import Order
from models.order_item import OrderItem
from models.user import User
from models.product import Product


# Views go here!
class Orders(Resource):
    def get(self):
        try:
            return make_response([order.to_dict() for order in Order.query], 200)
        except Exception as e:
            return make_response({"error": str(e)}, 404)

    def post(self):
        try:
            data = request.get_json()
            new_order = Order(**data)
            db.session.add(new_order)
            db.session.commit()
            return make_response(new_order.to_dict(), 201)
        except Exception as e:
            db.session.rollback()
            return make_response({"error": str(e)}, 400)


class GetOrderById(Resource):
    def get(self, id):
        try:
            order = db.session.get(Order, id)

            if order is None:
                return make_response({"error": str(e)}, 404)
            else:
                return make_response(order.to_dict(), 200)
        except Exception as e:
            return make_response({"error": str(e)}, 404)


class OrderItems(Resource):
    def get(self):
        try:
            serialized_order_items = [
                order_item.to_dict(rules=("-order", "-product.order_items"))
                for order_item in OrderItem.query
            ]
            return make_response(serialized_order_items, 200)
        except Exception as e:
            return {"error": str(e)}, 400

    def post(self):
        try:
            if user_id := session.get("user_id"):
                new_order = Order(
                    order_date=datetime.now(),
                    status="pending",
                    discount=0.0,
                    user_id=user_id,
                )
                db.session.add(new_order)
                db.session.commit()
                data = request.get_json()
                total = 0
                for order_item in data:
                    product = db.session.get(Product, order_item["product_id"])
                    new_order_item = OrderItem(**order_item, order_id=new_order.id)
                    db.session.add(new_order_item)
                    db.session.commit()
                    product.stock -= int(order_item["quantity"])
                    db.session.commit()
                    total += new_order_item.price_at_order * new_order_item.quantity
                new_order.status = "ordered"
                new_order.total = total
                db.session.commit()
                return (
                    f"Thank you for your purchase, your total is: ${total}, see you soon!",
                    201,
                )
            else:
                return make_response({"error": "No logged in user"}, 401)
        except Exception as e:
            db.session.rollback()
            return {"error": str(e)}, 400


class Signup(Resource):
    def post(self):
        try:
            data = request.get_json()
            new_user = User(**data)
            db.session.add(new_user)
            db.session.commit()
            session["user_id"] = new_user.id
            return make_response(new_user.to_dict(), 201)
        except Exception as e:
            db.session.rollback()
            if "UNIQUE constraint failed: user.email" in str(e):
                return make_response({"error": "Email already exists"}, 400)
        except Exception as e:
            db.session.rollback()
            return make_response({"error": str(e)}, 400)


class Login(Resource):
    def post(self):
        try:
            data = request.get_json()
            user = User.query.filter_by(email=data.get("email")).first()
            if user and user.authenticate(data.get("password_hash")):
                session["user_id"] = user.id
                return make_response(user.to_dict(), 201)
            else:
                return make_response({"error": "Incorrect email or password"}, 401)
        except Exception as e:
            return make_response({"error": str(e)}, 422)


class Logout(Resource):
    def delete(self):
        try:
            if session.get("user_id"):
                del session["user_id"]
                return make_response({}, 204)
            else:
                return make_response({}, 401)
        except Exception as e:
            return make_response({}, 401)


class Profile(Resource):

    def get(self):
        try:
            if user_id := session.get("user_id"):
                user = db.session.get(User, user_id)
                if user.role_id == 1:
                    return make_response(
                        user.to_dict(rules=("purchased_products", "orders")), 200
                    )
                else:
                    return make_response(
                        user.to_dict(rules=("selling_products", "orders")), 200
                    )
            return make_response({"error": "No logged in user"}, 401)
        except Exception as e:
            return make_response({"error": str(e)}, 422)

    def patch(self):
        try:
            if user_id := session.get("user_id"):
                data = request.get_json()
                user = db.session.get(User, user_id)
                if "pwupdate" in request.args and not user.authenticate(
                    data.get("current_password")
                ):
                    return make_response({"error": "Incorrect password"}, 401)
                for attr, value in data.items():
                    setattr(user, attr, value)
                db.session.commit()
                return make_response(user.to_dict(), 200)
            else:
                return make_response({"error": "No logged in user"}, 401)
        except Exception as e:
            db.session.rollback()
            return make_response({"error": str(e)}, 422)

    def delete(self):
        try:
            if user_id := session.get("user_id"):
                user = db.session.get(User, user_id)
                db.session.delete(user)
                db.session.commit()
                del session["user_id"]
                return make_response({}, 204)
            else:
                return make_response({"error": "No logged in user"}, 401)
        except Exception as e:
            return make_response({"error": str(e)}, 422)


class UserById(Resource):
    def get(self, id):
        try:
            user = db.session.get(User, id)

            if not user or user.role_id == 1:
                return make_response(
                    {"error": "This user does not exist or is not a seller"}, 404
                )
            else:
                return make_response(
                    user.to_dict(only=("first_name", "last_name", "selling_products")),
                    200,
                )
        except Exception as e:
            return make_response({"error": str(e)}, 400)


class CheckSession(Resource):
    def get(self):
        try:
            if user_id := session.get("user_id"):
                user = db.session.get(User, user_id)
                return make_response(
                    user.to_dict(rules=("id", "email", "role_id", "first_name")), 200
                )
            return make_response({"error": "No logged in user"}, 401)
        except Exception as e:
            return make_response({"error": str(e)}, 422)


class Products(Resource):
    def get(self):
        try:
            serialized_products = [
                product.to_dict(rules=("-user", "-order_items"))
                for product in Product.query
            ]
            return make_response(serialized_products, 200)
        except Exception as e:
            return {"error": str(e)}, 400

    def post(self):
        try:
            data = request.get_json()
            new_product = Product(**data)
            db.session.add(new_product)
            db.session.commit()
            return (new_product.to_dict(), 201)
        except Exception as e:
            db.session.rollback()
            return {"error": str(e)}, 400


class ProductById(Resource):
    def get(self, id):
        try:
            product = db.session.get(Product, id)

            if not product:
                return make_response({"error": str(e)}, 404)
            else:
                return make_response(product.to_dict(), 200)
        except Exception as e:
            return make_response({"error": str(e)}, 404)

    def patch(self, id):
        try:
            data = request.get_json()
            product = db.session.get(Product, id)
            if product:
                for attr, value in data.items():
                    if value:
                        setattr(product, attr, value)
                db.session.commit()
                return product.to_dict(), 200
            return {"error": "Product not found"}, 404
        except Exception as e:
            db.session.rollback()
            return {"error": str(e)}, 422

    def delete(self, id):
        try:
            if product := db.session.get(Product, id):
                db.session.delete(product)
                db.session.commit()
                return {}, 204
            return {"error": "Product not found"}, 404
        except Exception as e:
            db.session.rollback()
            return {"error": str(e)}, 422


class ProductByUser(Resource):
    def get(self, id):
        try:
            if user := db.session.get(User, id):
                products = [
                    product.to_dict(
                        rules=(
                            "-created_at",
                            "-id",
                            "-sku",
                            "-order_items",
                            "-user_id",
                            "-seller",
                            "-updated_at",
                        )
                    )
                    for product in user.selling_products
                ]
                return (products, 200)
        except Exception as e:
            return {"error": "User not found"}, 404
        


api.add_resource(Orders, "/orders")
api.add_resource(GetOrderById, "/orders/<int:id>")
api.add_resource(OrderItems, "/order_items")
api.add_resource(Signup, "/signup")
api.add_resource(Login, "/login")
api.add_resource(Logout, "/logout")
api.add_resource(Profile, "/profile")
api.add_resource(UserById, "/user/<int:id>")
api.add_resource(CheckSession, "/check-session")
api.add_resource(Products, "/products")
api.add_resource(ProductById, "/products/<int:id>")
api.add_resource(ProductByUser, "/products/user/<int:id>")



if __name__ == "__main__":
    app.run(port=5555, debug=True)
