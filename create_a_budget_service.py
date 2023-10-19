""" This module can be used to create a single budget (with services) """

from models.brand import Brand
from models.budget import Budget
from models.client import Client
from models.service import Service
from models.vehicle import Vehicle
from models.type_vehicle import Type_vehicle as TypeVehicle
from models.user import User
from models import storage


# Creating a budget
budget = Budget(total_price=400.0, payment_method="Credit-Card", installments=0, warranty=0, confirmed=False, sent=False ,active=False)

# Creating required instances (api for them not started yet)
veh_type = TypeVehicle(name="tha_type")
client = Client(name="ET", phone=3802348, email="email@died.com")
brand = Brand(name="tha_brand")
user = User(name="Hozier", mail="idk@idk.com", password="F#7b9/db", phone=598984982)
vehicle = Vehicle(plate="61Octaves", brand=brand.id, model="tha_model", color="daltonism", mileage=22929, user_id=user.id, client_id=client.id, type_vehicle_id=veh_type.id)


# HERE ARE THE ACTUAL INSTANCES GOING TO BE USED
# Creating three services...
krgs = {
        "done": False,
        "title": "Kill delivery service",
        "description": "Summertime - George Gershwin",
        "note": "A piano was required",
        "vehicle_id": vehicle.id,
        "user_id": user.id,
        "budget_id": budget.id
        }

service1 = Service(**krgs)
service2 = Service(**krgs)
service3 = Service(**krgs)

print(service1)
print("---------")
print(service2)
print("---------")
print(service3)
print("---------")

# Adding the services to the budget
budget.services.extend([service1, service2, service3])

print(budget)

# Saving...
storage.new(service1)
storage.new(service2)
storage.new(service3)
storage.new(budget)
storage.new(veh_type)
storage.new(client)
storage.new(brand)
storage.new(user)
storage.new(vehicle)

storage.save()

print("Alright")
