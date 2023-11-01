from models.mailer.Emailer import Emailer
from models import storage
from models.user import User
from models.client import Client
from models.budget import Budget
from models.vehicle import Vehicle

user = User(mail="cartofixcostumers", name="cartofix", password="gjvx jqom uhpa lnpo", phone="aflkjasdlñfkj", logo="afdslkjfañj")
budget = storage.get(Budget, "132aa44f-cead-4216-b8d3-e84447724e2a")
client = storage.get(Client, storage.get(Vehicle, budget.vehicle_id).client_id)

emailer = Emailer(user)
#emailer.send(client, budget)
emailer.read()
