""" This module can be used to create a single budget (with services) """

from models.brand import Brand
from models.budget import Budget
from models.client import Client
from models.service import Service
from models.vehicle import Vehicle
from models.type_vehicle import Type_vehicle as TypeVehicle
from models.user import User
from models import storage


# Creating required instances (api for them not started yet)
veh_type = TypeVehicle(name="tha_type")
client = Client(name="ET", phone=3802348, email="email@died.com")
brand = Brand(name="tha_brand")
brand2 = Brand(name="brand-on")
user = User(name="Hozier", mail="idk@idk.com", password="F#7b9/db", phone=598984982)
vehicle = Vehicle(plate="61Octaves", brand=brand.id, model="tha_model", color="daltonism", mileage=22929, user_id=user.id, client_id=client.id, type_vehicle_id=veh_type.id)


# Creating a budget
budget = Budget(total_price=400.0, payment_method="Credit-Card", installments=0, warranty=0, confirmed=False, sent=False ,active=False, vehicle_id=vehicle.id)

# HERE ARE THE ACTUAL INSTANCES GOING TO BE USED
# Creating three services...
krgs = {
        "title": "Kill delivery service",
        "description": "Summertime - George Gershwin",
        "note": "A piano was required",
        "vehicle_id": vehicle.id,
        "user_id": user.id,
        "budget_id": budget.id,
        "price": 200000.0
        }

service1 = Service(**krgs)
service2 = Service(**krgs)
service3 = Service(**krgs)

print(service1)
print("---------")
print(service2)
print("---------")
print(service3)
print("---------\nBUDGET")

# Adding the services to the budget
budget.services.extend([service1, service2, service3])
print("---------")
print(budget)

# Saving...
storage.new(service1)
storage.new(service2)
storage.new(service3)
storage.new(budget)
storage.new(veh_type)
storage.new(client)
storage.new(brand)
storage.new(brand2)
storage.new(user)
storage.new(vehicle)

storage.save()

print("Alright")

# ONLY FOR POPULATION SAKE
veh_dict = {"plate":"T4K3M3T0CVRCH", "brand":brand2.id, "model":"swingduaduaduaduaduadua", "color":"daltonism", "mileage":2929, "user_id":user.id, "client_id":client.id, "type_vehicle_id":veh_type.id}
veh = Vehicle(**veh_dict)

budg_dict = {"title": "Kill delivery service", "description": "Summertime - George Gershwin", "note": "A piano got broken","vehicle_id": veh.id, "user_id": user.id, "total_price": 200000.0, "payment_method":"Corpse", "installments":3, "warranty":True, "confirmed":True, "sent":True, "active":True}
budget2 = Budget(**budg_dict)

# Creating three services...
krgs = {
        "title": "Kill delivery service",
        "description": "Summertime - George Gershwin",
        "note": "A piano was required",
        "vehicle_id": vehicle.id,
        "user_id": user.id,
        "budget_id": budget2.id,
        "price": 200000.0
        }

service4 = Service(**krgs)
service5 = Service(**krgs)

budget2.services.extend([service4, service5])

# Saving...
storage.new(budget2)
storage.new(veh)

storage.save()
