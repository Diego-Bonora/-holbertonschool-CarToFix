#!/usr/bin/python3
""" This module contains the view routes for Client """

from api.v1.views import app_views
from flask import abort, jsonify, request
from models.client import Client
from models import storage


@app_views.route("/client/<clnId>/vehicle", methods=["GET"])
def get_client_vehicles(clnId):
    """ Returns all the vehicles for a specific CLient """
    client = client.get(Client, veId)
    if not vehicle:
        abort(404, {"error": f"Client {clId} not found"})

    return jsonify([clnt.to_dict() for clnt in client.vehicles]), 200


@app_views.route("/client/<clnId>", methods=["GET"])
def get_client(clnId):
    """ Returns an specific Client object """
    client = storage.get(Client,clnId)
    if not client:
        abort(404, {"error": f"Client {clnId} not found"})

    return jsonify(client.to_dict()), 200

@app_views.route("/client", methods=["GET"])
def get_all_clients():
    """ Returns all Clients found """
    clients = [client.to_dict() for client in storage.all(Client).values()]

    return jsonify(clients), 200

@app_views.route("/client", methods=["POST"])
def create_client():
    """ Creates a specific Client object """
    krgs = request.get_json()
    needed = ["name", "email", "phone", "vehicles"]
    if not krgs:
        abort(400, {"error": "Couldn’t get request; not a json"})

    for arg in needed:
        if arg not in krgs:
            abort(400, {"error": f"{arg} missing"})

    new_clnt = Client(**krgs)
    storage.save(new_clnt)

    return jsonify(new_clnt.to_dict()), 201

@app_views.route("/client/<clnId>", methods=["DELETE"])
def delete_client(clnId):
    """ Deletes a specific Client object """
    clnt = storage.get(Client, clnId)
    if not clnt:
        abort(400, {"error": f"Client: {clnId} instance not found"})
	
    storage.delete(clnt)
    storage.save()
    return jsonify(""), 204


@app_views.route("/api/v1/client/<clId>", methods=["PUT"])
def update_client(clId):
    """ Updates a Client object """
    clnt = storage.get(Client, clId)
    if not clnt:
        abort (404, {"error": f"Client: {clId} not found"})

    krgs = request.get_json()
    if not krgs:
    	abort(400, {"error": "Couldn’t get request; not a json"})

    for key, value in krgs.items():
    	if key is not "id":
            setattr(clnt, key, value)

    storage.save()
    return jsonify(clnt.to_dict()), 200

