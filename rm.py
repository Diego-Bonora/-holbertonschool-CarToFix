from models.brand import Brand
from models.budget import Budget
from models.client import Client
from models.service import Service
from models.vehicle import Vehicle
from models.type_vehicle import TypeVehicle
from models.user import User
from models.workers import Worker
from models import storage

for b in storage.all(Budget).values():
    if not b.confirmed:
        storage.delete(b)
        print(b.id, "DELETED")

storage.save()
