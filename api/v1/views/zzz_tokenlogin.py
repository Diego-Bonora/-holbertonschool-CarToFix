#!/usr/bin/python3
"""login api"""

from api.v1.views import app_views
from flask import abort, jsonify, request, current_app
from models.user import User
from models import storage
import bcrypt
import jwt
from datetime import datetime, timedelta


@app_views.route('/login', methods=['POST'])
def login():
    """User login"""

    if not request.get_json():
        return jsonify({"error": "Content type must be application/json"}), 400

    data = request.get_json()
    mail = data.get("mail")
    password = data.get("password")

    if not mail or not password:
        return jsonify({"error": "Missing email or password"}), 400

    user = storage.get_mail(User, mail)
    if user is None:
        return jsonify({"error": "User not found"}), 404

    expiration_time = (datetime.utcnow() + timedelta(hours=24)).isoformat()

    if bcrypt.checkpw(password.encode('utf-8'), user.password.encode('utf-8')):
        token = jwt.encode({
            'user_id': user.id,
            'expiration': expiration_time,
        }, current_app.config['SECRET_KEY'], algorithm='HS256')
        return jsonify({"message": "Logged in successfully", "token": token})
    else:
        return jsonify({"error": "Invalid email or password"}), 401
