#!/usr/bin/python3
"""User api routes"""

from api.v1.views import app_views
from flask import abort, jsonify, request
from models.user import User
from models import storage


def check(user):
    """ Checks for the previous existence of an user object """
    if user.mail in [usr.mail for usr in storage.all(User).values()]:
        return 409
    return 0

@app_views.route("/usr/<usrId>", methods=["GET"])
def get_user(usrId):
    """Returns a specific User"""
    user = storage.get(User, usrId)
    if not user:
        abort(404, {"error": "User Object was not found"})

    return jsonify(user.to_dict())


@app_views.route("/usr", methods=["GET"])
def get_all_users():
    """Returns all the User objects"""
    list_users = [usr.to_dict() for usr in storage.all(User).values()]

    return jsonify(list_users), 200


@app_views.route("/usr", methods=["POST"])
def create_user():
    """Creates a User object"""

    if not request.get_json():
        abort(404, {"error": "Couldn’t get request; not a json"})

    to_check = ["name", "mail", "password", "phone"]
    for arg in to_check:
        if arg not in request.get_json():
            abort(404, {"error": f"{arg} missing"})

    data = request.get_json()
    new_usr = User(**data)
    if check(new_usr):
        storage.new(new_usr)
        storage.save()
        return jsonify(new_usr.to_dict()), 201

    abort(404, {"error": f"{new_usr.name} already exists"})


@app_views.route("/user/<usrId>", methods=["DELETE"])
def delete_user(usrId):
    """Deletes a User"""
    user = storage.get(User, usrId)
    if not user:
        abort(400, {"error": f"User: {usrId} instance not found"})

    storage.delete(user)
    storage.save()
    return jsonify(""), 204


@app_views.route("/user/<usrId>", methods=["PUT"])
def update_user(usrId):
    """Updates a User"""
    user = storage.get(User, usrId)
    if not user:
        abort(404, {"error": f"User: {usrId} not found"})

    if not request.get_json():
        abort(400, {"error": "Couldn’t get request; not a json"})

    data = request.get_json()
    for key, value in data.items():
        if key != "id":
            setattr(user, key, value)

    storage.save()
    return jsonify(user.to_dict()), 200
