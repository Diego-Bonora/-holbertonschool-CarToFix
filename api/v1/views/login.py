#!/usr/bin/python3
"""login api"""

from api.v1.views import app_views
from flask import abort, jsonify, request
from models.user import User
from models import storage
import bcrypt
import uuid


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

    if bcrypt.checkpw(password.encode('utf-8'), user.password.encode('utf-8')):
        return jsonify({"message": "Logged in successfully"})
    else:
        return jsonify({"error": "Invalid email or password"}), 401


@app_views.route('/reset-password/request', methods=['POST'])
def request_password_reset():
    """request password reset, create a token and send email"""
    data = request.get_json()
    mail = data.get("mail")
    user = storage.get_mail(User, mail)
    if user:
        reset_token = generate_reset_token()
        store_reset_token(user.id, reset_token)
        send_reset_email(mail, reset_token)  # i need to implement this
        return jsonify({"message": "Password reset email sent."}), 200
    else:
        return jsonify({"error": "User not found."}), 404


def generate_reset_token():
    """Generate an uuid token"""
    return str(uuid.uuid4())


def store_reset_token(user_id, reset_token):
    """Store the reset token with the user in the database"""
    user = storage.get(User, user_id)
    user.reset_token = reset_token  # we need to create a reset_token on the User class
    storage.save()


@app_views.route('/reset-password/<reset_token>', methods=['POST'])
def reset_password(reset_token):
    """reset the password and delete the token"""
    user = storage.get_reset_token(User, reset_token)  # i need to create get_token in db storage

    if user:
        new_password = request.json.get('new_password')
        update_user_password(user, new_password)
        delete_reset_token(reset_token)
        return jsonify({"message": "Password reset successful."}), 200
    else:
        return jsonify({"error": "Invalid password"}), 400


def update_user_password(user_id, new_password):
    """update the password from the user class"""
    user = storage.get(user_id)
    if user:
        user.password = new_password
        storage.save()


def delete_reset_token(token):
    """delete the token from the database"""
    token_obj = storage.get_reset_token(User, token)  # i need to create get_token in db storage
    if token_obj:
        storage.delete(token_obj) #  i need to see if how to delete only the token and not the whole object
        storage.save()


"""
POST /api/logout i need to do this
"""
