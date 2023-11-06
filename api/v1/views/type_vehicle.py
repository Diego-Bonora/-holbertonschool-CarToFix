#!/usr/bin/python3
""" This module contains the routes for the view of TypeVehicle objects """

from api.v1.views import app_views
from flask import abort, jsonify, request
from models.type_vehicle import TypeVehicle
from models import storage



def check(tyveh):
    """ Checks for the previous existence of a TypeVehicle """
    for kind in storage.all(TypeVehicle).values():
        if kind.name == tyveh.name:
            return 409
    return 0

@app_views.route("/type/<tId>", methods=["GET"])
def get_type(type_name):
    """ Returns a specific TypeVehicle object """
    t_veh = storage.get(TypeVehicle, tId)

    if not t_veh:
        abort(404, {"error": f"TypeVehicle {tId} not found"})

    return jsonify(t_veh.to_dict()), 200


@app_views.route("/type", methods=["GET"])
def get_all_types():
    """ Returns all TypeVehicle objects """
    types = [typev.to_dict() for typev in storage.all(TypeVehicle).values()]

    return jsonify(types), 200


@app_views.route("/type", methods=["POST"])
def create_type():
    """ Creates a TypeVehicle """
    krgs = request.get_json()
    needed = ["name"]

    if not krgs:
        abort(400, {"error": "Couldn’t get request; not a json"})

    for arg in needed:
        if arg not in krgs:
    	    abort(400, {"error": f"{arg} missing"})

    new_type = TypeVehicle(**krgs)
    storage.new(new_type)
    storage.save()

    return jsonify(new_type.to_dict()), 201


@app_views.route("/type/<tId>", methods=["DELETE"])
def delete_type(tId):
    """ Deletes a specific TypeVehicle object """
    typev = storage.get(TypeVehicle, tId)
    if not typev:
        abort(400, {"error": f"Type: {type_name} instance not found"})

    storage.delete(typev)
    storage.save()
    return jsonify(""), 204


@app_views.route("/type/<tId>", methods=["PUT"])
def update_type(tId):
    """ Updates a specific TypeVehicle object """
    typev = storage.get(TypeVehicle, tId)
    if not typev:
        abort (404, {"error": f"Type: {type_name} not found"})

    krgs = request.get_json()
    if not krgs:
    	abort(400, {"error": "Couldn’t get request; not a json"})

    for key, value in krgs.items():
    	if key == "name":
            setattr(typev, key, value)

    storage.save()
    return jsonify(typev.to_dict()), 200
