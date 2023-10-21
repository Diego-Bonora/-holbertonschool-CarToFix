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
        abort(404, {"error": f"Client {clId} not found"})

    return jsonify(client.to_dict()), 200

@app_views.route("/client", methods=["GET"])
def get_all_clients():
    """ Returns all Clients found """
    clients = [client.to_dict() for client in storage.all(Client).values()]

    return jsonify(clients), 200

@app_views.route("/api/v1/client", methods=["POST"])
def create_client():
    pass

@app_views.route("/api/v1/client/<clnId>", methods=["DELETE"])
def delete_client(clnId):
    pass

@app_views.route("/api/v1/client/<clId>", methods=["PUT"])
def update_client(clId):
    pass

