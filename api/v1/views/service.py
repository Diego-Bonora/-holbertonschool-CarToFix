#!/usr/bin/python3
""" This module contains Service routes """

from api.v1.views import app_views
from flask import abort, jsonify, request
from models.budget import Budget
from models.service import Service
from models import storage
from models.type_vehicle import TypeVehicle
from models.vehicle import Vehicle


def custom_get_serv(all_servs):
    servs = []

    for serv in all_servs:
        veh = storage.get(Vehicle, serv.vehicle_id)
        servd = {
                "vehId": veh.id,
                "vehType": storage.get(TypeVehicle, veh.type_vehicle_id).name,
                "vehPlate": veh.plate,
                "title": serv.title,
                "created": serv.created_at,
                "active": storage.get(Budget, serv.budget_id).active
                }
        servs.append(servd)

    return servs

@app_views.route("/service/<scId>", methods=["GET"])
def get_service(scId):
    """ Returns a Service object based on its id """
    service = storage.get(Service, scId)
    if not service:
        abort (404)

    return jsonify(service.to_dict()), 200


@app_views.route("/service/user/<usrId>", methods=["GET"])
def get_all_services(usrId):
    """ Returns all Service objects """
    servs = [serv for serv in storage.all(Service).values() if serv.user_id == usrId]

    return jsonify(custom_get_serv(servs)), 200


@app_views.route("/service", methods=["POST"])
def create_service():
    """ Creates astorage.get(Budget, serv.budget_id).active Service object """
    krgs = request.get_json()
    needed = ["price", "title", "description", "vehicle_id", "user_id", "budget_id"]
    if not krgs:
        abort(400, {"error": "Couldn’t get request; not a json"})

    for arg in needed:
        if arg not in krgs:
    	    abort(400, {"error": f"{arg} missing"})

    new_srv = Service(**krgs)
    storage.new(new_srv)
    storage.save()

    return jsonify(new_srv.to_dict()), 201


@app_views.route("/service/<scId>", methods=["DELETE"])
def delete_service(scId):
    """ Deletes a service """
    service = storage.get(Service, scId)
    if not service:
    	abort(404, {"error": f"Service: {veId} instance not found"})

    storage.delete(service)
    storage.save()
    return jsonify(""), 204


@app_views.route("/service/<scId>", methods=["PUT"])
def update_service(scId):
    """ Updates a service """
    service = storage.get(Service, scId)
    if not service:
        abort (404, {"error": f"Service: {scId} not found"})

    krgs = request.get_json()
    if not krgs:
        abort(400, {"error": "Couldn’t get request; not a json"})

    for key, value in krgs.items():
        if key != "id":
            setattr(service, key, value)

    storage.save()
    return jsonify(service.to_dict()), 200

