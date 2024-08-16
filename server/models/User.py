
from models.__init__ import db, SerializerMixin, hybrid_property, flask_bcrypt, validates, re
class User(db.Model, SerializerMixin):
    
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String)
    email = db.Column(db.String, nullable=False, unique=True)
    _password_hash = db.Column('password', db.String, nullable=False)
    role = db.Column(db.String, nullable=False)
    
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    
    orders = db.relationship('Order', back_populates="user")
    
    def __init__(self, email, password_hash=None, **kwargs):
        super().__init__(email=email, **kwargs)
        if password_hash:
            self.password_hash = password_hash


    serialize_rules = ("-_password_hash", "-orders.user")
    
    @hybrid_property
    def password_hash(self):
        raise AttributeError("Passwords are private")
    
    @password_hash.setter
    def password_hash(self, new_pw):
        hashed_pw = flask_bcrypt.generate_password_hash(new_pw).decode("utf-8")
        self._password_hash = hashed_pw
        
    def authenticate(self, pw_to_check):
        return flask_bcrypt.check_password_hash(self._password_hash, pw_to_check)
    
    @validates('first_name', 'last_name')
    def validate_name(self, _, name):
        if not isinstance(name, str):
            raise TypeError("Names must be strings")
        elif len(name) > 50:
            raise ValueError("Names must be less than 50 characters long")
        return name
    
    @validates('email')
    def validate_email(self, _, email):
        if not isinstance(email, str):
            raise TypeError("Email must be a string")
        elif not re.match(r"^[\w\.-]+@([\w]+\.)+[\w-]{2,}$", email):
            raise ValueError("Email must be in a proper format")
        return email