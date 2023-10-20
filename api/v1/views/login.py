#!/usr/bin/python3
"""login api"""

from api.v1.views import app_views
from flask import abort, jsonify, request
from models.user import User
from models import storage


@app_views.route('/login', methods=['POST'])
def login():
    """User login"""

    if not request.get_json():
        abort(400, {"error": "Couldn’t get request; not a json"})

    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not email:
        return jsonify({"error": "Missing email"}), 404
    if not password:
        return jsonify({"error": "Missing password"}), 404

    user = storage.get(User, email)
    if user is None:
        return jsonify({"error": "User not found"}), 404

    if user.password != password or user is None:
        return jsonify({"error": "Invalid email or password"}), 401

    return jsonify({"message": "Logged in successfully"})
