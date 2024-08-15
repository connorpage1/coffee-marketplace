#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import Flask, request, make_response, session
from flask_migrate import Migrate
from flask_restful import Resource, Api
from models.Order import db, Order
from models.Orderitem import db, OrderItem
import os
from ipdb import set_trace

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.environ.get("DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'app.db')}")

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.json.compact = False

migrate = Migrate(app, db)

db.init_app(app)

api = Api(app)

# Local imports
from config import app, db, api
# Add your model imports


# Views go here!

class Orders(Resource):
    def get(self):
        try:
            return make_response([order.to_dict() for order in Order.query], 200)
        except Exception as e:
            return make_response({"error" : str(e)}, 404)
    def post(self):
        try:
            data = request.get_json()
            new_order = Order(**data)
            db.session.add(new_order)
            db.session.commit()
            return make_response(new_order.to_dict(), 201)
        except Exception as e:
            db.session.rollback()
            return make_response({"error" : str(e)}, 400)
        
class GetOrderById(Resource):
    def get(self, id):
        try:
            order = db.session.get(Order, id)
            if order is None:
                return make_response({"error" : str(e)}, 404)
            else:
                return make_response(order.to_dict(),200)
        except:
            return make_response({"error" : str(e)}, 404)

# class Signup(Resource):
#     def post(self):
#         try:
#             data = request.get_json
#             new_user = User(**data)
#             db.session.add(new_user)
#             db.session.commit()
#             session['user_id'] = new_user.id
#             return make_response (new_user.to_dict(), 201)
#         except Exception as e:
#             return make_response({"error" : str(e)}, 400)
        
# class Login(Resource):
#     def post(self):
#         try:
#             data = request.get_json()
#             user = User.query.filter_by(username=data.get("username").first())
#             if user and user.authenticate(data.get("password")):
#                     session["user_id"] = user.id
#                     return make_response(user.to_dict(), 201)
#             else:
#                 return make_response({"error" : "invalid username or password"}, 401)
#         except Exception as e:
#                 return make_response({"error" : str(e)}, 422)
        
# class Logout(Resource):
#     def delete(self):
#         try:
#             if session.get("user_id"):
#                 del session['user_id']
#                 return make_response({}, 204)
#             else:
#                 return make_response({}, 401)
#         except Exception as e:
#             return 401

        

api.add_resource(Orders, '/orders')
api.add_resource(GetOrderById, '/orders/<int:id>')
# api.add_resource(Signup, '/signup')
# api.add_resource(Login, '/login')
# api.add_resource(Logout, '/logout')

if __name__ == '__main__':
    app.run(port=5555, debug=True)

