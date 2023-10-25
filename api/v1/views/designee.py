#!/usr/bin/python3
""" This module contains Designee view routes """

from api.v1.views import app_views
from flask import abort, jsonify, request
from models.designee import Designee
from models import storage

@app_views.route("/designee/<dsgnId>/services", methods=["GET"])
def get_designee(dsgnId):
    """ Returns all the Services for a specific Designee """
    dgnee = storage.get(Designee, dsgnId)
    if not dngee:
        abort(404, {"error": f"Designee: {dsgnId} not found"})

    return jsonify(dgnee), 200