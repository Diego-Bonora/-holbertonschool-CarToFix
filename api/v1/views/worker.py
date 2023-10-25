#!/usr/bin/python3
""" This module contains Designee view routes """

from api.v1.views import app_views
from flask import abort, jsonify, request
from models.worker import Worker
from models import storage

@app_views.route("/worker/<dsgnId>/services", methods=["GET"])
def get_designee(dsgnId):
    """ Returns all the Services for a specific Designee """
    dgnee = storage.get(worker, dsgnId)
    if not dgnee:
        abort(404, {"error": f"Worker: {dsgnId} not found"})

    return jsonify(dgnee), 200

@app_views.route("/worker/<dsgnId>/", methods=["GET"])
def get_designee(dsgnId):
    """ Returns all the known Workers """
    dgnee = [worker.to_dict() for worker in storage.all(Worker)]

    return jsonify(dgnee), 200