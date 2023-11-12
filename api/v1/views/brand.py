#!/usr/bin/python3
""" This module contains the routes for the view of Brand objects """

from api.v1.views import app_views
from flask import abort, jsonify, request
from models.brand import Brand
from models import storage


def check(brand):
    """ Carries out some checks of validation """
    if brand.name in [brand.name for brand in storage.all(Brand).values()]:
        return 409
    return 0


@app_views.route("/brand/<brId>", methods=["GET"])
def get_brand(brId):
    """ Returns the requested brand """
    brand = storage.get(Brand, brId)
    if not brand:
        abort(404, {"error": f"Brand: {brId} not found"})

    return jsonify(brand.to_dict()), 200


@app_views.route("/brand", methods=["GET"])
def get_all_brands():
    """ Return all brand objects """
    brands = [brand.to_dict() for brand in storage.all(Brand).values()]

    return jsonify(brands), 200


@app_views.route("/brand", methods=["POST"])
def create_brand():
    """ Creates a brand object """
    krgs = request.get_json()
    if not krgs:
        abort(400, {"error": f"Couldn't get request, not a json"})

    if "name" not in krgs:
        abort(400, {"error": "name is missing”"})

    brand = Brand(**krgs)

    if check(brand) == 0:
        storage.new(brand)
        storage.save()
        return jsonify(brand.to_dict()), 201
    else:
        abort(409, {f"The Brand {krgs['name']} already exists"})


@app_views.route("/brand/<brId>", methods=["DELETE"])
def delete_brand(brId):
    """ Deletes a brand object """
    brand = storage.get(Brand, brId)
    if not brand:
        abort(404, {"error": f"Brand: {brId} not found"})

    storage.delete(brand)
    storage.save()

    return jsonify(""), 204


@app_views.route("/brand/<brId>", methods=["PUT"])
def update_brand(brId):
    """ Updates a brand object """
    brand = storage.get(Brand, brId)
    if not brand:
        abort(404, {"error": f"Brand: {brId} not found"})

    krgs = request.get_json()
    if not krgs:
        abort(400, {"error": "Couldn’t get request; not a json"})

    for key, value in krgs.items():
        if key == "name":
            if check(brand) == 0:
                setattr(brand, key, value)
            else:
                abort(404, {"error": f"Brand: {brId} not found"})

    storage.save()
    return jsonify(brand.to_dict()), 200
