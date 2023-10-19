#!/usr/bin/python3
""" This module initializes the server """

from api.v1.views import app_views
from flask import Flask

app = Flask(__name__)
app.url_map.strict_slashes = False

app.register_blueprint(app_views)


# User() Routes:
@app.route("/api/v1/usr/<srId>", methods=["GET"])
def get_user(srId):
    pass

@app.route("/api/v1/usr", methods=["GET"])
def get_all_users():
    pass

@app.route("/api/v1/usr", methods=["POST"])
def create_user():
    pass

@app.route("/api/v1/user/<usrId>", methods=["DELETE"])
def delete_user(usrId):
    pass

@app.route("/api/v1/user/<usrId>", methods=["PUT"])
def update_user(usrId):
    pass

# Brand() Routes:
@app.route("/api/v1/brand/<brand_name>", methods=["GET"])
def get_brand(brand_name):
    pass

@app.route("/api/v1/brand", methods=["GET"])
def get_all_brands():
    pass

@app.route("/api/v1/brand", methods=["POST"])
def create_brand():
    pass

@app.route("/api/v1/brand/<brand_name>", methods=["DELETE"])
def delete_brand(brand_name):
    pass

@app.route("/api/v1/brand/<brand_name>", methods=["PUT"])
def update_brand(brand_name):
    pass

# Client() Routes:
@app.route("/api/v1/client/<clnId>/vehicle", methods=["GET"])
def get_client_vehicles(clnId):
    pass

@app.route("/api/v1/client/<clnId>", methods=["GET"])
def get_client(clnId):
    pass

@app.route("/api/v1/client", methods=["GET"])
def get_all_clients():
    pass

@app.route("/api/v1/client", methods=["POST"])
def create_client():
    pass

@app.route("/api/v1/client/<clnId>", methods=["DELETE"])
def delete_client(clnId):
    pass

@app.route("/api/v1/client/<clId>", methods=["PUT"])
def update_client(clId):
    pass

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
