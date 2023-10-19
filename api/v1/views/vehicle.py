#!usr/bin/python3
""" This module contains the routes the view of Vehicle objects """

from api.v1.views import app_views
from flask import abort, jsonify, request
from models.vehicle import Vehicle
from models import storage


@app_views.route("/vehicle/model/<mdlId>", methods=["GET"])  # This route should be /model/<mdlId>/vehicles instead
def get_vehicle_model(mdlId):
    pass

@app_views.route("/vehicle/<veId>/budgets", methods=["GET"])
def get_vehicle_budgets(veId):
    pass

@app_views.route("/vehicle/<veId>/service", methods=["GET"])
def get_vehicle_service(veId):
    pass

@app_views.route("/vehicle/<veId>", methods=["GET"])
def uget_vehicle(veId):
    """ Return the requested Vehicle object if found """
    vehicle = storage.get(Vehicle, veId)
    if vehicle:
        return jsonify(vehicle.to_dict())

    abort(404, {"error": f"Vehicle {vehicle.id} not found"})


@app_views.route("/vehicle", methods=["GET"])
def get_all_vehicles():
    """ Returns all the Vehicle objects """
    vehs = [veh.to_dict() for veh in storage.all(Vehicle).values()]

    return jsonify(vehs), 200


@app_views.route("/vehicle", methods=["POST"])
def create_vehicle():
    """ Create a Vehicle object """
    krgs = request.get_json()
    needed = ["plate", "brand", "model", "color", "mileage", "user_id", "client_id", "type_vehicle_id"]

    if not krgs:
        abort(400, {"error": "Couldn’t get request; not a json"})

    for arg in needed:
        if arg not in krgs:
            abort(400, {"error": f"{arg} missing"})

    new_veh = Vehicle(**krgs)
    storage.new(new_veh)
    storage.save()

    return jsonify(new_veh.to_dict()), 201


@app_views.route("/vehicle/<veId>", methods=["DELETE"])
def delete_vehicle(veId):
    pass

@app_views.route("/vehicle/<veId>", methods=["PUT"])
def update_vehicle(veId):
    pass

