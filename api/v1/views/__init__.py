#!/usr/bin/python3

from flask import Blueprint


app_views = Blueprint("app_views", __name__, url_prefix="/api/v1")

from api.v1.views.singin_singup import *  # nopep8
from api.v1.views.budget import *  # nopep8
from api.v1.views.service import *  # nopep8
from api.v1.views.vehicle import *  # nopep8
from api.v1.views.brand import *  # nopep8
from api.v1.views.user import *  # nopep8
from api.v1.views.client import *  # nopep8
from api.v1.views.type_vehicle import *  # nopep8
from api.v1.views.worker import *  # nopep8
from api.v1.views.dashboard import *  # nopep8
