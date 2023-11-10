import requests
import json

budget = {
        "user_id": "f4bb3d63-67f5-4d3c-b8fe-aacb270e72a2",
        "client_id": "4fe04e5e-c7f7-4687-a233-10fc0252ca2d",
        "total_price": 999.0,
        "payment_method": "knoife",
        "installments": 0,
        "warranty": 9,
        "vehicle_id": "67c18765-7caf-4fb8-968e-2b86f6b3ad5f"
        }

services = [{
    "price": 999.0,
    "title": "the worst of the best days of my life",
    "vehicle_id": "67c18765-7caf-4fb8-968e-2b86f6b3ad5f",
    "user_id": "f4bb3d63-67f5-4d3c-b8fe-aacb270e72a2",
    }]

budget["services"] = services

x = requests.post("http://localhost:5000/api/v1/budget", json = budget)


print(x.text)
