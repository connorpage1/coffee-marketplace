#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models.product import Product
from models.__init__ import db


if __name__ == '__main__':

    with app.app_context():
        print("Starting seed...")
        fake = Faker()
        # Seed code goes here!
        try: 
            Product.query.delete()
            
            type_choices = ["coffee", "tea"]
            tag_choices = ["light roast",
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
            "decaf"]
            
            for _ in range(5):
                product = Product(
                    name = fake.name(),
                    stock = randint(0, 100),
                    type = rc(type_choices),
                    tag = rc(tag_choices),
                    sku = fake.unique.ean8(),
                    image_url = fake.image_url(),
                    description = fake.text(),
                    user_id = randint(1, 10) 
                )
                
                db.session.add(product)
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            print(f"Failed to create Product: {e}")
            
            

