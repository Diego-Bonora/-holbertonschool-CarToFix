#!/usr/bin/python3
""" This module initializes the server """

from api.v1.views import app_views
from flask_cors import CORS
from flask import Flask
from flask_bcrypt import Bcrypt
from flask_session import Session
from api.v1.views.config import ApplicationConfig
from models.user import User
from models.engine.db_storage import DBStorage

app = Flask(__name__)

app.url_map.strict_slashes = False

app.secret_key = 'secret_key'

CORS(app, supports_credentials=True)
bcrypt = Bcrypt(app)

app.register_blueprint(app_views)

app.config.from_object(ApplicationConfig)
storage = DBStorage()
storage.reload()
app.config['SESSION_SQLALCHEMY_TABLE'] = 'sessions'
Session(app)


if __name__ == "__main__":
    app.run(debug=True)
