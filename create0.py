from models.brand import Brand
from models.budget import Budget
from models.client import Client
from models.service import Service
from models.vehicle import Vehicle
from models.type_vehicle import TypeVehicle
from models.user import User
from models.workers import Worker
from models import storage

user = User(name="CarToFix", mail="cartofixcostumers@gmail.com", password="adfklj", phone="598984982", logo="logeishon")
storage.new(user)
storage.save()

# Creating required instances (api for them not started yet)
veh_type = TypeVehicle(name="tha_type")
client = Client(name="ET", phone="3802348", email="emanueltrias9@gmail.com")
brand = Brand(name="tha_brand")
brand2 = Brand(name="brand-on")
user = User(name="No NO car", mail="emanueltrias9@gmail.com", password="adfklj", phone="599999997", logo="logeishon")

# Save user instance before referencing it in other instances
storage.new(user)
storage.save()

vehicle = Vehicle(plate="61Octaves", brand=brand.id, model="tha_model", color="daltonism", mileage=22929,
                  user_id=user.id, client_id=client.id, type_vehicle_id=veh_type.id)

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
print("---------\nBUDGET\n---------")

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
storage.new(vehicle)

# Commit changes to the storage
storage.save()

print("Alright")

# Creating additional instances for population
veh_dict = {"plate": "T4K3M3T0CVRCH", "brand": brand2.id, "model": "swingduaduaduaduaduadua", "color": "daltonism",
            "mileage": 2929, "user_id": user.id, "client_id": client.id, "type_vehicle_id": veh_type.id}
veh = Vehicle(**veh_dict)

krgs = {
    "title": "Sign your soul away",
    "description": "Monsermash",
    "note": "A piano got broken",
    "vehicle_id": vehicle.id,
    "user_id": user.id,
    "price": 200000.0
}

service3 = Service(**krgs)
service4 = Service(**krgs)

# Creating a budget with additional services
budg_dict = {
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


# Retrieving and printing services associated with the first budget
print(storage.get(Budget, budget.id).services)
# Retrieving and printing services associated with the second budget
print(storage.get(Budget, budget2.id).services)

# ONE MORE BUDGET, SERVICE, SOME USERS, SOME WORKERS, SOME VEHICLES, SOME, CLIENTS
#CLIENTS
client1 = Client(name="Macksim", phone="fdsfa48", email="emanueltrias9@gmail.com")
client2 = Client(name="Pablo", phone="fdadsfadsf8", email="emanueltrias9@gmail.com")
#USERS
user1 = User(name="Auto-destroy", mail="emanueltrias9@gmail.com", password="F#7b9/dbvv", phone="592222284982", logo="logeisbbhon")
user2 = User(name="Skynet", mail="emanueltrias9@gmail.com", password="F#7b9/dbvv", phone="22284982", logo="lisbbhon")
# VEHICLES
vehicle = Vehicle(plate="FADSF987es", brand=brand.id, model="tha_model2", color="krasni", mileage=22931,
                  user_id=user1.id, client_id=client1.id, type_vehicle_id=veh_type.id)
vehicle1 = Vehicle(plate="098dafas", brand=brand.id, model="onceuponadeath", color="blind-green", mileage=9941,
                  user_id=user2.id, client_id=client2.id, type_vehicle_id=veh_type.id)
# WORKERS
worker = Worker(name="Zombie Mickey Mouse")
worker2 = Worker(name="Edward Scissorhands")
# SERVICES
krgs = {
    "title": "Burn down a graveyard",
    "description": "Zombie-apocalypse",
    "note": "Worker turned into zombie in the process",
    "vehicle_id": vehicle.id,
    "user_id": user1.id,
    "price": 0.291,
    "worker": worker.id
}
service = Service(**krgs)
krgs2 = {
    "title": "Building contract",
    "description": "Everyone's happy",
    "note": "People trapped in the elevator",
    "vehicle_id": vehicle1.id,
    "user_id": user2.id,
    "price": 100000,
    "worker": worker.id
}
service2 = Service(**krgs2)

krgs3 = {
    "title": "Itching poison",
    "description": "Crazy Maria",
    "note": "Christianity",
    "vehicle_id": vehicle.id,
    "user_id": user1.id,
    "price": 0.2023,
    "worker": worker2.id
}
service3 = Service(**krgs)
krgs4 = {
    "title": "Stiff Cows",
    "description": "NO suspects",
    "note": "People trapped inside",
    "vehicle_id": vehicle1.id,
    "user_id": user2.id,
    "price": 0.2028,
    "worker": worker2.id
}
service4 = Service(**krgs2)
# BUDGETS
budg_dict = {
    "user_id": user1.id,
    "total_price": 200000.0,
    "payment_method": "Boiling water",
    "installments": 1000,
    "warranty": 0,
    "vehicle_id": vehicle1.id,
    "client_id": client1.id,
    "services": [service2, service]
}
budg_dict2 = {
    "user_id": user2.id,
    "total_price": 200000.0,
    "payment_method": "Boiling water",
    "installments": 1000,
    "warranty": 0,
    "vehicle_id": vehicle.id,
    "client_id": client2.id,
    "services": [service3, service4]
}
budget = Budget(**budg_dict)
budget2 = Budget(**budg_dict2)
# SAVING...
for instance in [user1, user2, client1, client2, vehicle, vehicle1, worker, worker2, service, service2, service3, service4, budget, budget2]:
    storage.new(instance)

storage.save()

# ONE MORE BUDGET, SERVICE, SOME USERS, SOME WORKERS, SOME VEHICLES, SOME, CLIENTS
#CLIENTS
client1 = Client(name="Annya", phone="09asdf", email="emanueltrias9@gmail.com")
client2 = Client(name="Hozier", phone="nidealaverdad", email="emanueltrias9@gmail.com")
#USERS
user1 = User(name="Wheelson", mail="emanueltrias9@gmail.com", password="F#7b9/dbvv", phone="((9dsa", logo="LOGOASFASD")
user2 = User(name="Icecream shop", mail="emanueltrias9@gmail.com", password="F#7b9/dbvv", phone="22889900", logo="http:/JYSHshnxFAIEU")
# VEHICLES
vehicle = Vehicle(plate="25**2", brand=brand.id, model="unregistered", color="malaria", mileage=22931,
                  user_id=user1.id, client_id=client1.id, type_vehicle_id=veh_type.id)
vehicle1 = Vehicle(plate="sapfsadmv", brand=brand.id, model="onceuponadeath", color="rottengrey", mileage=3321,
                  user_id=user2.id, client_id=client2.id, type_vehicle_id=veh_type.id)
# WORKERS
worker = Worker(name="Freddy Krueger")
worker2 = Worker(name="The Last Wheel Bender")
# SERVICES
krgs = {
    "title": "Burn down a hospital",
    "description": "Hot summer",
    "note": "let lightning strike you",
    "vehicle_id": vehicle.id,
    "user_id": user1.id,
    "price": 0.98211,
    "worker": worker.id
}
service = Service(**krgs)
krgs2 = {
    "title": "Cat feeding",
    "description": "Happy cats",
    "note": "Someone lost they fingers",
    "vehicle_id": vehicle1.id,
    "user_id": user2.id,
    "price": 100,
    "worker": worker.id
}
service2 = Service(**krgs2)

# SERVICES
krgs3 = {
    "title": "Flying Broom",
    "description": "Flying lessons",
    "note": "Old woman died",
    "vehicle_id": vehicle.id,
    "user_id": user1.id,
    "price": 123283,
    "worker": worker2.id
}
service3 = Service(**krgs3)

krgs4 = {
    "title": "headless headless",
    "description": "Still leaves",
    "note": "Under the sea",
    "vehicle_id": vehicle1.id,
    "user_id": user2.id,
    "price": 12908,
    "worker": worker2.id
}
service4 = Service(**krgs4)

# BUDGETS
budg_dict = {
    "user_id": user1.id,
    "total_price": 200000.0,
    "payment_method": "four stickers",
    "installments": 1000,
    "warranty": 0,
    "vehicle_id": vehicle1.id,
    "client_id": client1.id,
    "services": [service2, service]
}
budg_dict2 = {
    "user_id": user2.id,
    "total_price": 200000.0,
    "payment_method": "charred money",
    "installments": 1000,
    "warranty": 0,
    "vehicle_id": vehicle.id,
    "client_id": client2.id,
    "services": [service3, service4],
    "confirmed": True,
    "active": True
}
budget = Budget(**budg_dict)
budget2 = Budget(**budg_dict2)
# SAVING...
for instance in [user1, user2, client1, client2, vehicle, vehicle1, worker, worker2, service, service2, service3, service4, budget, budget2]:
    storage.new(instance)

storage.save()

