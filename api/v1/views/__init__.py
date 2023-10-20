#!/usr/bin/python3

from api.v1.views.user import *
from flask import Blueprint


app_views = Blueprint("app_views", __name__, url_prefix="/api/v1")
