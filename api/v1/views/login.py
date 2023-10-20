#!/usr/bin/python3
"""login api"""

from api.v1.views import app_views
from flask import jsonify, request


@app_views.route('/login', methods=['POST'])
def login():
    """post method of login"""
