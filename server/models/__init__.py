from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property
from datetime import datetime
import re
<<<<<<< HEAD
from config import db, flask_bcrypt
=======

from config import db, flask_bcrypt
>>>>>>> e4da26e41ea11b89cb595018f7207ab06b475294
