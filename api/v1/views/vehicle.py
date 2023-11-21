#!usr/bin/python3
""" This module contains the routes the view of Vehicle objects """

from api.v1.views import app_views
from flask import abort, jsonify, request
from models.brand import Brand
from models.vehicle import Vehicle
from models import storage
from models.type_vehicle import TypeVehicle


def get_veh_dict(vehicle):
    """ Returns the complete vehicle dictionary """
    vehd = vehicle.to_dict()
    vehd["brand"] = storage.get(Brand, vehicle.brand).name
    vehd["type"] = storage.get(TypeVehicle, vehicle.type_vehicle_id).name
    vehd["services"] = [serv.to_dict() for serv in vehicle.services]
    vehd["budgets"] = [bdgt.to_dict() for bdgt in vehicle.budgets]
    return vehd


def check(vehicle):
    """ Carries out some checks of validation """
    if vehicle.plate in [v.plate for v in storage.all(Vehicle).values() if v.user_id == vehicle.user_id]:
        return 409
    return 0

# Mixed routes:


@app_views.route("/vehicle/<veId>/budget", methods=["GET"])
def get_vehicle_budgets(veId):
    """ Returns all the Budget objects for a specific Vehicle """
    vehicle = storage.get(Vehicle, veId)
    if not vehicle:
        abort(404, {"error": f"Vehicle {veId} not found"})

    return jsonify([bdgt.to_dict() for bdgt in vehicle.budgets]), 200


@app_views.route("/vehicle/plate/<plate>/budget", methods=["GET"])
def get_vehicle_budgets_by_plate(plate):
    """ Returns all the Budget objects for a specific Vehicle """
    vehicle = next((veh for veh in storage.all(
        Vehicle).values() if veh.plate == plate), None)
    if not vehicle:
        abort(404, {"error": f"Vehicle {plate} not found"})

    btds = []
    for bdgt in vehicle.budgets:
        btd = {
            "vehicle_type": storage.get(TypeVehicle, vehicle.type_vehicle_id).name,
            "created": bdgt.created_at,
            "total": bdgt.total_price,
            "id": bdgt.id
        }
        btds.append(btd)

    return jsonify(btds), 200


@app_views.route("/vehicle/<veId>/service", methods=["GET"])
def get_vehicle_service(veId):
    """ Returns all the Services object for a specific Vehicle """
    vehicle = storage.get(Vehicle, veId)
    if not vehicle:
        abort(404, {"error": f"Vehicle {veId} not found"})

    return jsonify([serv.to_dict() for serv in vehicle.services]), 200


# Vehicle routes:
@app_views.route("/vehicle/<veId>", methods=["GET"])
def uget_vehicle(veId):
    """ Return the requested Vehicle object if found """
    vehicle = storage.get(Vehicle, veId)
    if not vehicle:
        abort(404, {"error": f"Vehicle {veId} not found"})

    return jsonify(get_veh_dict(vehicle)), 200


@app_views.route("/vehicle/plate/<plate>", methods=["GET"])
def get_by_plate(plate):
    """ Return the resquested Vehicle object if found """
    vehicle = next((veh for veh in storage.all(
        Vehicle).values() if veh.plate == plate), None)
    if not vehicle:
        abort(404, {"error": f"Vehicle {plate} not found"})

    return jsonify(get_veh_dict(vehicle)), 200


@app_views.route("/vehicle/user/<usrId>", methods=["GET"])
def get_all_vehicles(usrId):
    """ Returns all the Vehicle objects """
    vehs = [get_veh_dict(veh) for veh in storage.all(
        Vehicle).values() if veh.user_id == usrId]

    return jsonify(vehs), 200


@app_views.route("/vehicle", methods=["POST"])
def create_vehicle():
    """ Create a Vehicle object """
    krgs = request.get_json()
    needed = ["plate", "brand", "model", "color", "mileage",
              "user_id", "client_id", "type_vehicle_id"]

    if not krgs:
        abort(400, {"error": "Couldn’t get request; not a json"})

    for arg in needed:
        if arg not in krgs:
            abort(400, {"error": f"{arg} missing"})

    if not storage.get(Brand, krgs["brand"]):
        abort(400, {"error": f"{krgs['brand']} does not exists"})

    new_veh = Vehicle(**krgs)
    if check(new_veh) != 0:
        abort(409, {"error": f"Vehicle: {new_veh.plate} already exists"})

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
        abort(404, {"error": f"Vehicle: {veId} not found"})

    krgs = request.get_json()
    if not krgs:
        abort(400, {"error": "Couldn’t get request; not a json"})

    not_keys = ["id", "brand", "model", "user_id", "type_vehicle_id"]
    for key, value in krgs.items():
        if key not in not_keys:
            setattr(vehicle, key, value)
        if "plate" in krgs and check(vehicle) == 409:
            abort(409, {"error": f"Vehicle: {vehicle.plate} already exists"})

    storage.save()
    return jsonify(vehicle.to_dict()), 200
