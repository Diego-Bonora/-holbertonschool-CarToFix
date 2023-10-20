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
brand2 = Brand(name="brand-on")
user = User(name="Hozier", mail="idk@idk.com", password="F#7b9/db", phone=598984982)
vehicle = Vehicle(plate="61Octaves", brand=brand.id, model="tha_model", color="daltonism", mileage=22929, user_id=user.id, client_id=client.id, type_vehicle_id=veh_type.id)


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
budg_dict = {"title": "Kill delivery service", "description": "Summertime - George Gershwin", "note": "A piano got broken","vehicle_id": "82297bf6-1831-482f-a8b9-7d86e817e92d", "user_id": "549f245e-93b9-4cc7-a6d0-e603c15bdcf4", "budget_id": "68d0e7e1-0385-4697-89ef-38605837be2f", "total_price": 200000.0, "payment_method":"Corpse", "installments":3, "warranty":True, "confirmed":True, "sent":True, "active":True}
budget2 = Budget(**budg_dict)

veh_dict = {"plate":"T4K3M3T0CVRCH", "brand":"e3ef380a-408b-48c5-b120-4e9160d5cd2b", "model":"swingduaduaduaduaduadua", "color":"daltonism", "mileage":2929, "user_id":"549f245e-93b9-4cc7-a6d0-e603c15bdcf4", "client_id":"7b2ab78f-7be4-4063-9ac2-e2d82695e0bf", "type_vehicle_id":"d45ae293-43fa-474e-87c2-cf4cd5c8da60"}
veh = Vehicle(**veh_dict)

# Saving...
storage.new(budget2)
storage.new(veh)

storage.save()
