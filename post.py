import requests
import json

"""
budget = {
        "user_id": "2c2e589b-9223-40e8-bac3-f8765567f0a7",
        "client_id": "ce6dcdca-dae6-44bf-b5be-d3f56b506d7a",
        "total_price": 999.0,
        "payment_method": "knoife",
        "installments": 0,
        "warranty": 9,
        "vehicle_id": "19bf0f8a-87ef-4b44-a259-ab23502e8b73",
        "confirmed": True,
        }

services = [{
    "price": 999.0,
    "title": "the worst of the best days of my life",
    }]

budget["services"] = services
"""

client = {
        "name": "A giant nuclear furnace",
        "email": "check@gl.comm,m",
        "phone": "093284"
        }

c = requests.post("http://localhost:5000/api/v1/client", json = client).json()
vehicle = {
        "plate": "plate1093",
        "brand": "brand1093",
        "color": "color1093",
        "mileage": 109,
        "user_id": "2c2e589b-9223-40e8-bac3-f8765567f0a7",
        "client_id": c["id"],
        "type_vehicle_id": "c923f6e3-ee20-4806-b0f2-ceabb4e11c3b"
        }

v = requests.post("http://localhost:5000/api/v1/vehicle", json = vehicle).json()
print(v["client_id"])
print()
print(c["vehicles"])
