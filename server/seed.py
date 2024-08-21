#!/usr/bin/env python3

# Standard library imports
from random import choice as rc 
from werkzeug.security import generate_password_hash

# Remote library imports
from faker import Faker

# # Local imports
from app import app, db
from models.order import Order
from models.order_item import OrderItem
from models.user import User
from models.product import Product

fake = Faker()

def seed_data():
    with app.app_context():
        # Delete old data
        OrderItem.query.delete()
        Order.query.delete()
        Product.query.delete()
        User.query.delete()
        
        
        
        # Create fake users
        users = []
        for _ in range(10):
            user = User(
                first_name=fake.first_name(),
                last_name=fake.last_name(),
                email=fake.unique.email(),
                password_hash="password",
                role_id=fake.random_element(elements=(User.ROLE_BUYER, User.ROLE_SELLER)),
                created_at=fake.date_time_this_decade()
            )
            users.append(user)
            db.session.add(user)

        db.session.commit()

        # Create fake products
        tag_choices = [
            "light roast",
            "medium roast",
            "dark roast",
            "espresso",
            "origin",
            "flavor",
            "washed processed",
            "natural process",
            "honey process",
            "arabica",
            "robusta",
            "blend",
            "organic",
            "single-origin",
            "black tea",
            "green tea",
            "white tea",
            "herbal",
            "rooibos", 
            "matcha",
            "caffeine",
            "decaf"
        ]
        products = []
        for _ in range(20):
            product = Product(
                name=fake.word().capitalize(),
                stock=fake.random_int(min=0, max=100),
                type=fake.random_element(elements=("coffee", "tea")),
                sku=fake.unique.bothify(text='????######'),
                image_url="https://www.apemockups.com/wp-content/uploads/2023/05/Free-Coffee-Bag-and-Beans-Mockup-1.png.webp",
                description=fake.sentence(80),
                tag=rc(tag_choices),
                price=fake.pyfloat(right_digits=2, positive=True, max_value=1000),
                user_id=fake.random_element(elements=[user.id for user in users if user.role_id == User.ROLE_SELLER]),
                created_at=fake.date_time_this_decade()
            )
            products.append(product)
            db.session.add(product)

        db.session.commit()

        # Create fake orders
        orders = []
        for _ in range(15):
            order = Order(
                total=fake.pyfloat(right_digits=2, positive=True, max_value=1000),
                status=fake.random_element(elements=("pending", "ordered", "shipped", "delivered")),
                discount=fake.pyfloat(right_digits=2, positive=True, max_value=.99),
                user_id=fake.random_element(elements=[user.id for user in users if user.role_id == User.ROLE_BUYER]),
                order_date=fake.date_time_this_decade()
            )
            orders.append(order)
        db.session.add_all(orders)

        db.session.commit()

        # Create fake order items
        for order in orders:
            num_items = fake.random_int(min=1, max=5)
            for _ in range(num_items):
                order_item = OrderItem(
                    quantity=fake.random_int(min=1, max=10),
                    price_at_order=fake.random_element(elements=[product.price for product in products]),
                    order_id=order.id,
                    product_id=fake.random_element(elements=[product.id for product in products]),
                    created_at=fake.date_time_this_decade()
                )
                db.session.add(order_item)

        db.session.commit()

        print("Seeding completed.")

if __name__ == "__main__":
    seed_data()
