#!/usr/bin/python3
""" This module contains Service routes """

from api.v1.views import app_views
from flask import abort, jsonify, request
from models.budget import Budget
from models.mailer.Emailer import Emailer
from models.service import Service
from models import storage
from models.type_vehicle import TypeVehicle
from models.vehicle import Vehicle


emailer = Emailer()

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


@app_views.route("/service/done/<scId>", methods=["PUT"])
def update_service(scId):
    """ Updates a services to be done to true"""
    service = storage.get(Service, scId)
    if not service:
        abort (404, {"error": f"Service: {scId} not found"})

    krgs = request.get_json()
    if not krgs:
        abort(400, {"error": "Couldn’t get request; not a json"})

    budget = storage.get(Budget, service.budget_id)
    services = budget.services if isinstance(budget.services, list) else [budget.services]

    if budget.active == True and all(service.done for service in services):
        budget.active = False
        emailer.send(storage.get(Client, new_bdgt.client_id), msg="Subject: Your car is ready!\n\nYour car is ready! Please reach out to the mechanical workshop")

    for key, value in krgs.items():
        if key == "done" and value == True:
            setattr(service, key, value)

    storage.save()
    return jsonify(service.to_dict()), 200
