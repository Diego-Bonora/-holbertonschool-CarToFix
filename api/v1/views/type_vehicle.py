#!/usr/bin/python3
""" This module contains the routes for the view of TypeVehicles """

from api.v1.views import app_views
from flask import abort, jsonify, request
from models.type_vehicle import TypeVehicle
from models import storage


@app.route("/type/<tId>", methods=["GET"])
def get_type(type_name):
    """ Returns a specific Type object """
    t_veh = storage.get(TypeVehicle, tId)

    if not t_veh:
        abort(404, {"error": f"TypeVehicle {tId} not found"})

    return jsonify(t_veh.to_dict()), 200


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
