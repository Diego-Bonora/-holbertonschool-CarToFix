from models.brand import Brand
from models.budget import Budget
from models.client import Client
from models.service import Service
from models.vehicle import Vehicle
from models.type_vehicle import TypeVehicle
from models.user import User
from models.workers import Worker
from models import storage

print([c.vehicles for c in storage.all(Client).values() if c.id == "6df69ae1-d79c-46f9-80ee-2fb20a1179b4"])
#print("User:", [b.user_id for b in storage.all(Budget).values() if storage.get(Client, b.client_id).email == "emanueltrias9@gmail.com"][0])
#print("Vehicle:", [c.id for c in storage.all(Vehicle).values() if storage.get(Client, c.client_id).email == "emanueltrias9@gmail.com"][0])

#for u in storage.all(User).values():
#    if u.mail == "cartofixcostumers@gmail.com":
#        u.password = ""

#storage.save()
