#!/usr/bin/python3
""" This module initializes the server """

from api.v1.views import app_views
from flask_cors import CORS
from flask import Flask
from flask_bcrypt import Bcrypt
from flask_session import Session
from api.v1.views.config import ApplicationConfig
from models.engine.db_storage import DBStorage

app = Flask(__name__)
app.config.from_object(ApplicationConfig)

app.url_map.strict_slashes = False
app.register_blueprint(app_views)

bcrypt = Bcrypt(app)
CORS(app, supports_credentials=True)
server_session = Session(app)
with app.app_context():
    app.config['SESSION_SQLALCHEMY_TABLE'] = 'sessions'


if __name__ == "__main__":
    app.run(debug=True)
