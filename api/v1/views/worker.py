#!/usr/bin/python3
""" This module contains Designee view routes """

from api.v1.views import app_views
from flask import abort, jsonify, request
from models.workers import Worker
from models import storage


def check(dgnee):
    """ Checks for the previous existence of a worker """
    if dgnee.name in [worker.name for worker in storage.all(Worker).values()]:
        return 409
    return 0


@app_views.route("/worker/<dsgnId>/services", methods=["GET"])
def get_designee(dsgnId):
    """ Returns all the Services for a specific Designee """
    dgnee = storage.get(Worker, dsgnId)
    if not dgnee:
        abort(404, {"error": f"Worker: {dsgnId} not found"})

    return jsonify(dgnee), 200


@app_views.route("/worker", methods=["GET"])
def get_all_designee():
    """ Returns all the known Workers """
    dgnee = [worker.to_dict() for worker in storage.all(Worker).values()]

    return jsonify(dgnee), 200


@app_views.route("/worker", methods=["POST"])
def create_designee():
    """ Creates a worker object """
    krgs = request.get_json()
    if not krgs:
        abort(400, {"error": f"Couldn't get request, not a json"})

    if "name" not in krgs:
        abort(400, {"error": "name is missing”"})

    worker = Worker(**krgs)

    if check(worker) != 0:
        abort(409, {f"The Worker {worker.name} already exists"})

    storage.new(worker)
    storage.save()
    return jsonify(worker.to_dict()), 201
