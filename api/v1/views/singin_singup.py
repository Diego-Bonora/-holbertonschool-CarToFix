#!/usr/bin/python3
""" This module contains Service routes """

from api.v1.views import app_views
from flask import abort, jsonify, request
from models.user import User
from models import storage
from flask_bcrypt import Bcrypt

bcrypt = Bcrypt()


def validate_phone(phone):
    if len(phone) == 9 and phone.isdigit():
        return True
    else:
        return None


def get_by_mail(email):
    users = storage.all(User)
    for user in users.values():
        if user.mail == email:
            return user
    return None


def check_password(password):
    if len(password) >= 8 and any(caracter.isupper() for caracter in password):
        return None
    return True


@app_views.route("/signup", methods=['POST'])
def signup():
    krgs = request.get_json()
    krgs.pop('0')

    needed = ["name", "mail", "phone",
              "password", "password2"]
    if not krgs:
        abort(400, {"error": "Couldn’t get request; not a json"})

    for arg in needed:
        if arg not in krgs:
            abort(400, {"error": f"{arg} missing"})

    user = get_by_mail(krgs["mail"])
    if user:
        return jsonify(""), 409

    if not validate_phone(krgs["phone"]):
        return jsonify({"error": "bad phone number"}), 422

    if check_password(krgs["password"]):
        return jsonify({"error": "bad password"}), 422

    if krgs["password"] != krgs["password2"]:
        return jsonify({"error": "bad password"}), 422

    krgs.pop('password2')
    krgs["password"] = bcrypt.generate_password_hash(
        krgs["password"]).decode('utf-8')
    new_usr = User(**krgs)
    storage.new(new_usr)
    storage.save()
    return jsonify(new_usr.id), 201


@app_views.route("/signin", methods=['POST'])
def signin():
    krgs = request.get_json()
    krgs.pop('0')

    needed = ["mail", "password"]
    if not krgs:
        abort(400, {"error": "Couldn’t get request; not a json"})

    for arg in needed:
        if arg not in krgs:
            abort(400, {"error": f"{arg} missing"})

    user = get_by_mail(krgs["mail"])
    if not user:
        return jsonify(""), 401

    if not bcrypt.check_password_hash(user.password, krgs["password"]):
        return jsonify(""), 401

    return jsonify(user.id), 201
