import requests
import json

# Your API endpoint
url = "http://localhost:5000/api/v1/budget/1671ba0d-fd60-4960-b61a-92d7b428fd50"

# Your JSON data
data = {
    "user_id": "f4bb3d63-67f5-4d3c-b8fe-aacb270e72a2",
    "client_id": "4fe04e5e-c7f7-4687-a233-10fc0252ca2d",
    "total_price": 9.0,
    "payment_method": "knoife",
    "installments": 0,
    "warranty": 9,
    "vehicle_id": "67c18765-7caf-4fb8-968e-2b86f6b3ad5f"
}

# Convert data to JSON
json_data = json.dumps(data)

# Set headers
headers = {"Content-Type": "application/json"}

# Make the PUT request
response = requests.put(url, data=json_data, headers=headers)

# Print the response
print(response.status_code)
print(response.json())

