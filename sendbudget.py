from models.mailer.Emailer import Emailer
from models import storage
from models.user import User
from models.client import Client
from models.budget import Budget
from models.vehicle import Vehicle

user = User(mail="cartofixcostumers", name="cartofix", password="gjvx jqom uhpa lnpo", phone="aflkjasdlñfkj", logo="afdslkjfañj")
budget = storage.get(Budget, "7fee9c7f-5085-424f-a51a-a8a7e595c0d0")
client = storage.get(Client, storage.get(Vehicle, budget.vehicle_id).client_id)

emailer = Emailer(user)
emailer.send(client, budget)
