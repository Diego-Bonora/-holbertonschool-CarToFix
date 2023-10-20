#!/usr/bin/python3
"""login api"""

from api.v1.views import app_views
from flask import jsonify, request
import MySQLdb


db = MySQLdb.connect(
    host="localhost",
    user="CarToFix_dev",
    password="CarToFix_dev_pwd",
    database="CarToFix_dev_db"
)

cursor = db.cursor()


@app_views.route('/login', methods=['POST'])
def login():
    """post method of login"""
    data = request.get_json()
    email = data.get('mail')
    password = data.get('password')

    if not email:
        return jsonify({'error': 'Email is required'}), 400
    if not password:
        return jsonify({'error': 'Password is required'}), 400

    query = "SELECT * FROM users WHERE email = %s AND password = %s"
    cursor.execute(query, (email, password))
    result = cursor.fetchall()

    if result:
        return jsonify({'message': 'Login successful'})
    else:
        return jsonify({'error': 'Email or password are incorrect'}), 401


db.close()
