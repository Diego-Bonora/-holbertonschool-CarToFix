from api.v1.views import app_views
from flask import abort, jsonify, request
from models.budget import Budget
from models.mailer.Emailer import Emailer
from models import storage
from models.user import User
from models.client import Client


for client in storage.all(Client).values():
    print(client.name)
