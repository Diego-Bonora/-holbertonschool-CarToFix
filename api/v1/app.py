#!/usr/bin/python3
""" This module initializes the server """

from flask import Flask

app = Flask(__name__)

#!/usr/bin/python3
""" This module initializes the server """

from flask import Flask

app = Flask(__name__)

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

# Service() Routes:
@app.route("/api/v1/service/<scId>", methods=["GET"])
def get_service(scId):
    pass

@app.route("/api/v1/service", methods=["GET"])
def get_all_services():
    pass

@app.route("/api/v1/service", methods=["POST"])
def create_service():
    pass

@app.route("/api/v1/service/<scId>", methods=["DELETE"])
def delete_service(scId):
    pass

@app.route("/api/v1/service/<scId>", methods=["PUT"])
def update_service(scId):
    pass

# Vehicle() Routes:
@app.route("/api/v1/vehicle/model/<mdlId>", methods=["GET"])
def get_vehicle_model(mdlId):
    pass

@app.route("/api/v1/vehicle/<veId>/budgets", methods=["GET"])
def get_vehicle_budgets(veId):
    pass

@app.route("/api/v1/vehicle/<veId>/service", methods=["GET"])
def get_vehicle_service(veId):
    pass

@app.route("/api/v1/vehicle/<velId>", methods=["GET"])
def get_vehicle(velId):
    pass

@app.route("/api/v1/vehicle", methods=["GET"])
def get_all_vehicles():
    pass

@app.route("/api/v1/vehicle", methods=["POST"])
def create_vehicle():
    pass

@app.route("/api/v1/vehicle/<veId>", methods=["DELETE"])
def delete_vehicle(veId):
    pass

@app.route("/api/v1/vehicle/<veId>", methods=["PUT"])
def update_vehicle(veId):
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

# Budget() Routes:
@app.route("/api/v1/budget/<bdgtId>/services", methods=["GET"])
def get_budget_services(bdgtId):
    pass

@app.route("/api/v1/budget/<bdgtId>", methods=["GET"])
def get_budget(bdgtId):
    pass

@app.route("/api/v1/budget", methods=["GET"])
def get_all_budgets():
    pass

@app.route("/api/v1/budget", methods=["POST"])
def create_budget():
    pass

@app.route("/api/v1/budget/<bdgtId>", methods=["DELETE"])
def delete_budget(bdgtId):
    pass

@app.route("/api/v1/budget/<bdgtId>", methods=["PUT"])
def update_budget(bdgtId):
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
