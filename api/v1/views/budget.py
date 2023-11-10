#!/usr/bin/python3
""" This module contains the view for budgets """


from api.v1.views import app_views
from flask import abort, jsonify, request
from models.budget import Budget
from models.mailer.Emailer import Emailer
from models import storage
from models.type_vehicle import TypeVehicle
from models.vehicle import Vehicle


emailer = Emailer()

def call_send(budget):
    """ Calls Emailer.send() """
    if budget.confirmed == False:
        emailer.send(storage.get(Client, budget.client_id), budget=budget)

def create_service(krgs):
    """ Create a service object """
    needed = ["price", "title", "description", "vehicle_id", "user_id", "budget_id"]
    if not krgs:
        abort(400, {"error": "Couldn’t get request; not a json"})

    for arg in needed:
        if arg not in krgs:
    	    abort(400, {"error": f"{arg} missing"})

    new_srv = Service(**krgs)
    storage.new(new_srv)
    storage.save()

def bdgt_dict_generator(bdgt):
    """ Generates the dictioary for a single budget object """
    vehicle = storage.get(Vehicle, bdgt.vehicle_id)

    bdict = bdgt.to_dict()
    bdict = {
        "vehicle_type": storage.get(TypeVehicle, vehicle.type_vehicle_id).name,
        "created": bdgt.created_at,
        "total": bdgt.total_price,
        "id": bdgt.id,
        "services": [serv.to_dict() for serv in bdgt.services],
        "vehicle": vehicle.to_dict()
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

    for service in krgs["services"]:
        create_service(service)

    new_bdgt = Budget(**krgs)
    call_send(budget)
    storage.new(new_bdgt)
    storage.save()

    return jsonify(bdgt_dict_generator(new_bdgt)), 201


@app_views.route("/budget/<bdgtId>", methods=["DELETE"])
def delete_budget(bdgtId):
    """ Deletes a Budget object based on its id """
    bdgt = storage.get(Budget, bdgtId)
    if not bdgt:
        abort(404, {"error": f"Budget: {bdgtId} instance not found"})
    if bdgt.done == True:
        abort(409, {"error": f"Budget: {bdgtId} is already finished"})

    storage.delete(bdgt)
    storage.save()
    return jsonify(""), 204


#@app_views.route("/budget/<bdgtId>", methods=["REPOST"])
def update_budget(bdgtId):
    """ Creates a new Budget object based on the given one's id """
    # Getting the Budget object
    prev = storage.get(Budget, bdgtId)
    services = prev.services if isinstance(prev.services, list) else [prev.services]

    if not prev:
        abort(404, {"error": f"Budget: {bdgtId} not found"})
    elif all(prev.done for service in prev.services):
        abort(409, {"error": f"Budget: {bdgtId} is already finished"})

    # Extending the ditionary with previous instance attrs

    krgs = request.get_json().pop("id", None)
    if not krgs:
        abort(400, {"error": "Couldn’t get request; not a json"})

    krgs.update(prev.to_dict().pop("id", None))

    needed = ["total_price", "payment_method", "user_id", "installments", "warranty", "vehicle_id", "client_id"]

    for arg in needed:
        if arg not in krgs:
            abort(400, {"error": f"{arg} missing"})

    # Creating a new instance
    new_bdgt = Budget(**krgs.pop("services", None))
    call_send(new_bdgt)
    storage.new(new_bdgt)
    storage.save()
    return jsonify(new_bdgt.to_dict()), 200
