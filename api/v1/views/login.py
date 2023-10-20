#!/usr/bin/python3
"""login api"""

from api.v1.views import app_views
from flask import abort, jsonify, request
from models.user import User
from models import storage

test_user_email = "santiago@gmail.com"
test_user_password = "santiago"
test_user = User(email=test_user_email, password=test_user_password)


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

    if user.email == test_user_email and password == test_user_password:
        return jsonify({"message": "Logged in successfully"})
    else:
        return jsonify({"error": "Invalid email or password"}), 401


if __name__ == "__main__":
    app_views.run(host="0.0.0.0", port="5000")
