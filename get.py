from api.v1.views import app_views
from flask import abort, jsonify, request
from models.budget import Budget
from models.mailer.Emailer import Emailer
from models import storage
from models.user import User


print(storage.get(User, "bf66f456-c2a0-44d3-aba4-2dff0afb1694").name)
