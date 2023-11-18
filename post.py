import requests
import json

budget = {
        "user_id": "2c2e589b-9223-40e8-bac3-f8765567f0a7",
        "client_id": "undefined",
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

x = requests.post("http://localhost:5000/api/v1/budget", json = budget)


print(x.text)
