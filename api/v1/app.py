#!/usr/bin/python3
""" This module initializes the server """

from api.v1.views import app_views
from flask import Flask

app = Flask(__name__)
app.url_map.strict_slashes = False

app.register_blueprint(app_views)


# Type() Routes:
@app.route("/api/v1/type/<type_name>", methods=["GET"])
def get_type(type_name):
    pass

@app.route("/api/v1/type", methods=["GET"])
def get_all_types():
    pass

@app.route("/api/v1/type", methods=["POST"])
def create_type():
    pass

@app.route("/api/v1/type/<type_name>", methods=["DELETE"])
def delete_type(type_name):
    pass

@app.route("/api/v1/type/<type_name>", methods=["PUT"])
def update_type(type_name):
    pass

if __name__ == "__main__":
    app.run(debug=True)


if __name__ == "__main__":
    app.run(debug=True)
