#!/usr/bin/python3
""" To test the message method of Emailer """


from models import storage
from models.budget import Budget
from models.client import Client
from models.vehicle import Vehicle
from models.service import Service
from models.user import User
from models.mailer.Emailer import Emailer

emailer = Emailer()

budget = storage.get(Budget, "0c20333f-76c4-46d5-879e-f4001f7a691f")
client = storage.get(Client, storage.get(Vehicle, budget.vehicle_id).client_id)
user = storage.get(User, storage.get(Service, budget.services[0].id).user_id)
"""
print(emailer.message(budget, client))

emailer.sendbdgt(user, budget, client)
"""

print(emailer.read(user))
