#!/usr/bin/python3
"""register api"""

from api.v1.views import app_views
from flask import abort, jsonify, request
from models.user import User
from models import storage
import bcrypt


@app_views.route('/register', methods=['POST'])
def registration():
    data = request.get_json()

    required_fields = ['name', 'mail', 'password', 'repeat_password', 'phone']
    for field in required_fields:
        if field not in data:
            error_message = 'Missing required field: {}'.format(field)
            return jsonify({'error': error_message}), 400

    name = data['name']
    mail = data['mail']
    password = data['password']
    repeat_password = data['repeat_password']
    phone = data['phone']

    if password != repeat_password:
        abort(400, 'Passwords do not match')

    if storage.get_mail(User, mail):
        abort(400, 'This email already has an account associated')

    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    new_user = User(name=name, mail=mail,
                    password=hashed_password, phone=phone)
    storage.new(new_user)
    storage.save()

    return jsonify({'message': 'User registered successfully'})
