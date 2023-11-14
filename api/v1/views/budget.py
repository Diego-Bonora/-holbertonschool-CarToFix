#!/usr/bin/python3
""" This module contains the view for budgets """


from api.v1.views import app_views
from flask import abort, jsonify, request
from models.brand import Brand
from models.budget import Budget
from models.client import Client
from models.mailer.Emailer import Emailer
from models.service import Service
from models import storage
from models.type_vehicle import TypeVehicle
from models.vehicle import Vehicle


emailer = Emailer()


def call_send(budget):
    """ Calls Emailer.send() """
    if budget.confirmed == False:
        emailer.send(storage.get(Client, budget.client_id), budget=budget)

def create_service(krgs, vehicle, user):
    """ Create a service object """
    needed = ["price", "title"]
    if not krgs:
        abort(400, {"error": "Services cannot be empty"})

    for arg in needed:
        if arg not in krgs:
    	    abort(400, {"error": f"{arg} missing"})

    krgs["vehicle_id"] = vehicle
    krgs["user_id"] = user

    new_srv = Service(**krgs)
    storage.new(new_srv)
    storage.save()
    return new_srv

def bdgt_dict_generator(bdgt):
    """ Generates the dictioary for a single budget object """
    vehicle = storage.get(Vehicle, bdgt.vehicle_id)

    services = bdgt.services if isinstance(bdgt.services, list) else [bdgt.services]
    bdict = {
        "brand": storage.get(Brand, vehicle.brand).name
        "vehicle_type": storage.get(TypeVehicle, vehicle.type_vehicle_id).name,
        "created": bdgt.created_at,
        "total": bdgt.total_price,
        "id": bdgt.id,
        "services": [serv.to_dict() for serv in services],
        "vehicle": vehicle.to_dict(),
        "sent": bdgt.sent,
        "confirmed": bdgt.active,
        "active": bdgt.confirmed
        }
    
    return bdict

@app_views.route("/budget/<bdgtId>/services", methods=["GET"])
def get_budget_services(bdgtId):
    """ Returns the services a budget contains """
    budget = storage.get(Budget, bdgtId)
    if not budget:
        abort(404, {"error": f"Budget: {bdgtId} instance not found"})

    servs = [serv.to_dict() for serv in budget.services]
    return jsonify(servs), 200


@app_views.route("/budget/<bdgtId>", methods=["GET"])
def get_budget(bdgtId):
    """ Returns a Budget based on its id """
    budget = storage.get(Budget, bdgtId)
    if not budget:
        abort(404, {"error": f"Budget: {bdgtId} instance not found"})

    return jsonify(bdgt_dict_generator(budget)), 200


@app_views.route("/budget/user/<usrId>", methods=["GET"])
def get_all_budgets(usrId):
    """ Returns all the Budget objects found """
    done = request.args.get("done", default=False)
    bdgts = []

    for bdgt in storage.all(Budget).values():
        if bdgt.user_id == usrId and (not done or all(service.done for service in budget.services)):
            bdgts.append(bdgt_dict_generator(bdgt))

    return jsonify(bdgts), 200


@app_views.route("/budget", methods=["POST"])
def create_budget():
    """ Creates a Budget object """
    krgs = request.get_json()
    needed = ["total_price", "payment_method", "user_id", "installments", "warranty", "vehicle_id", "client_id", "services"]
    if not krgs:
        abort(400, {"error": "Couldn’t get request; not a json"})

    for arg in needed:
        if arg not in krgs or (arg == "services" and len(krgs["services"]) == 0):
            abort(400, {"error": f"{arg} missing"})

    vehicle = storage.get(Vehicle, krgs["vehicle_id"])
    if vehicle.client_id != krgs["client_id"]:
        abort(409, {"error": "The provided client does not posses the provided vehicle"})
    if vehicle.user_id != krgs["user_id"]:
        abort(409, {"error": "The provided user does not posses the provided vehicle"})

    services = []
    for service in krgs["services"]:
        services.append(create_service(service, krgs["vehicle_id"], krgs["user_id"]))

    del krgs["services"]
    new_bdgt = Budget(**krgs)

    for service in services:
        service.budget_id = new_bdgt.id

    storage.new(new_bdgt)
    storage.save()

    call_send(storage.get(Budget, new_bdgt.id))

    return jsonify(bdgt_dict_generator(storage.get(Budget, new_bdgt.id))), 201


@app_views.route("/budget/<bdgtId>", methods=["DELETE"])
def delete_budget(bdgtId):
    """ Deletes a Budget object based on its id """
    bdgt = storage.get(Budget, bdgtId)
    if not bdgt:
        abort(404, {"error": f"Budget: {bdgtId} instance not found"})
    if bdgt.done == True:
        abort(409, {"error": f"Budget: {bdgtId} is already finished"})

    client = storage.get(Client, bdgt.client_id)
    msg = Emailer.message(bdgt, client, sub="Subject: Your prev budget have been deleted!\n\n")
    emailer.send(client, msg=msg)

    storage.delete(bdgt)
    storage.save()
    return jsonify(""), 204


@app_views.route("/budget/<bdgtId>", methods=["PUT"])
def update_budget(bdgtId):
    """ Updates a budget object """
    bdgt = storage.get(Budget, bdgtId)
    services = bdgt.services if isinstance(bdgt.services, list) else [bdgt.services]

    if not bdgt:
        abort(404, {"error": f"Budget: {bdgtId} not found"})
    elif all(service.done for service in services):
        abort(409, {"error": f"Budget: {bdgtId} is already finished"})

    krgs = request.get_json()
    if not krgs:
        abort(400, {"error": "Couldn’t get request; not a json"})

    for k, v in krgs.items():
        if k not in ["client_id", "user_id", "vehicle_id"]:
            setattr(bdgt, k, v)

    bdgt.sent = False
    bdgt.confirmed = False
    bdgt.active = False

    client = storage.get(Client, bdgt.client_id)
    msg = Emailer.message(bdgt, client, sub="Subject: Your prev budget have been updated!\n\n")
    emailer.send(client, msg=msg)

    storage.save()
    return jsonify(bdgt_dict_generator(bdgt)), 200


@app_views.route("/budget/confirm/<bdgtId>", methods=["PUT"])
def conf_budget(bdgtId):
    """ Updates a budget object """
    bdgt = storage.get(Budget, bdgtId)
    if bdgt.confirmed:
        abort(409, {"error": f"Budget: {bdgtId} is already confirmed"})

    for k, v in krgs.items():
        if k == "active":
            setattr(bdgt, k, v)

    bdgt.confirmed = True

    client = storage.get(Client, bdgt.client_id)
    msg = "Subject: Rejected!\n\n Your budget was rejected succesfully!\n"
    if not bdgt.active:
        msg = "Subject: Approved!\n\n Your budget was approved succesfully!\n"
    emailer.send(client, msg=msg)

    storage.save()
    return jsonify(bdgt_dict_generator(bdgt)), 200
