#!/usr/bin/python3
""" This module initializes the server """

from api.v1.views import app_views
from flask import Flask

app = Flask(__name__)
app.url_map.strict_slashes = False

app.register_blueprint(app_views)


if __name__ == "__main__":
    app.run(debug=True)
