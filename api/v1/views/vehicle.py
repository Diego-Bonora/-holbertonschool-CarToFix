#!usr/bin/python3
""" This module contains the routes the view of Vehicle objects """

from api.v1.views import app_views
from flask import abort, jsonify, request
from models.vehicle import Vehicle
from models import storage


# Mixed routes:
@app_views.route("/vehicle/<veId>/budgets", methods=["GET"])
def get_vehicle_budgets(veId):
    """ Returns all the Budget objects for a specific Vehicle """
    vehicle = storage.get(Vehicle, veId)
    if not vehicle:
        abort(404, {"error": f"Vehicle {vehicle.id} not found"})

    return jsonify([bdgt.to_dict() for bgdt in vehicle.budget]), 200

@app_views.route("/vehicle/<veId>/service", methods=["GET"])
def get_vehicle_service(veId):
    """ Returns all the Services object for a specific Vehicle """
    vehicle = storage.get(Vehicle, veId)
    if not vehicle:
        abort(404, {"error": f"Vehicle {vehicle.id} not found"})

    return jsonify([serv.to_dict() for serv in vehicle.services]), 200


# Vehicle routes:
@app_views.route("/vehicle/<veId>", methods=["GET"])
def uget_vehicle(veId):
    """ Return the requested Vehicle object if found """
    vehicle = storage.get(Vehicle, veId)
    if vehicle:
        return jsonify(vehicle.to_dict()), 200

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
    """ Deletes a vehicle object """
    vehicle = storage.get(Vehicle, veId)
    if not vehicle:
        abort(404, {"error": f"Vehicle: {veId} instance not found"})

    storage.delete(vehicle)

    return jsonify(""), 204

@app_views.route("/vehicle/<veId>", methods=["PUT"])
def update_vehicle(veId):
    """ Updates a vehicle object """
    vehicle = storage.get(Vehicle, veId)
    if not vehicle:
    	abort (404, {"error": f"Vehicle: {veId} not found"})

    krgs = request.get_json()
    if not krgs:
    	abort(400, {"error": "Couldn’t get request; not a json"})

    not_keys = ["id", "brand", "model", "user_id", "type_vehicle_id"]
    for key, value in krgs.items():
        if key not in not_keys:
            setattr(vehicle, key, value)

    storage.save()
    return jsonify(vehicle.to_dict()), 200
