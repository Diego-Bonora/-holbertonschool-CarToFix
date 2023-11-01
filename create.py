from models.brand import Brand
from models.budget import Budget
from models.client import Client
from models.service import Service
from models.vehicle import Vehicle
from models.type_vehicle import TypeVehicle
from models.user import User
from models import storage

# Creating required instances (api for them not started yet)
veh_type = TypeVehicle(name="tha_type")
client = Client(name="ET", phone="3802348", email="emanueltrias9@gmail.com")
brand = Brand(name="tha_brand")
brand2 = Brand(name="brand-on")
user = User(name="Hozier", mail="idk@idk.com", password="F#7b9/db", phone="598984982", logo="logeishon")
vehicle = Vehicle(plate="61Octaves", brand=brand.id, model="tha_model", color="daltonism", mileage=22929, user_id=user.id, client_id=client.id, type_vehicle_id=veh_type.id)

# HERE ARE THE ACTUAL INSTANCES GOING TO BE USED
# Creating three services...
krgs1 = {
    "title": "House burn down",
    "description": "Arsonist's Lullabye - Hozier",
    "note": "A piano was required",
    "vehicle_id": vehicle.id,
    "user_id": user.id,
    "price": 4.9
}
krgs2 = {
    "title": "Electrify a hammock",
    "description": "It Don't Mean a Thing (If It Ain't Got That Swing)",
    "note": "Worker died in the process",
    "vehicle_id": vehicle.id,
    "user_id": user.id,
    "price": 0.0
}

service1 = Service(**krgs1)
service2 = Service(**krgs2)

# Print services for verification
print(service1)
print("---------")
print(service2)
print("---------\nBUDGET")

# Creating a budget
budget = Budget(
    user_id=user.id,
    total_price=400.0,
    payment_method="Credit-Card",
    installments=0,
    warranty=0,
    vehicle_id=vehicle.id,
    client_id=client.id,
    services=[service1, service2]
)

# Saving instances to the storage
storage.new(service1)
storage.new(service2)
storage.new(budget)
storage.new(veh_type)
storage.new(client)
storage.new(brand)
storage.new(brand2)
storage.new(user)
storage.new(vehicle)

# Commit changes to the storage
storage.save()

print("Alright")

# Creating additional instances for population
veh_dict = {"plate": "T4K3M3T0CVRCH", "brand": brand2.id, "model": "swingduaduaduaduaduadua", "color": "daltonism",
            "mileage": 2929, "user_id": user.id, "client_id": client.id, "type_vehicle_id": veh_type.id}
veh = Vehicle(**veh_dict)

krgs = {
    "title": "Kill delivery service",
    "description": "Summertime - George Gershwin",
    "note": "A piano was required",
    "vehicle_id": vehicle.id,
    "user_id": user.id,
    "price": 200000.0
}

service3 = Service(**krgs)
service4 = Service(**krgs)

# Creating a budget with additional services
budg_dict = {
    "title": "Kill delivery service",
    "description": "Summertime - George Gershwin",
    "note": "A piano got broken",
    "user_id": user.id,
    "total_price": 200000.0,
    "payment_method": "Corpse",
    "installments": 3,
    "warranty": 9,
    "vehicle_id": vehicle.id,
    "client_id": client.id,
    "services": [service3, service4]
}
budget2 = Budget(**budg_dict)

# Saving instances to the storage
storage.new(service3)
storage.new(service4)
storage.new(budget2)
storage.new(veh)

# Commit changes to the storage
storage.save()

print("_____\nAGAIN\n_____")

# Retrieving and printing services associated with the first budget
print(storage.get(Budget, budget.id).services)

# Retrieving and printing services associated with the second budget
print(storage.get(Budget, budget2.id).services)

