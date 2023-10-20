# api/app.py

To run it:
```
$ cd api/v1/
$ flask run
```

## Create a basic fake Budget:
You can also create multiple Budgets (without services related) using `create_a_budget.py` multiple times:
```
$ python3 create_a_budget.py
[Budget] (83b59781-0861-4442-8764-07ff7a8207be) {'_sa_instance_state': <sqlalchemy.orm.state.InstanceState object at 0x7f9ec2a48da0>, 'total_price': 400.0, 'payment_method': 'Credit-Card', 'installments': 0, 'warranty': 0, 'confirmed': False, 'sent': False, 'active': False, 'created_at': datetime.datetime(2023, 10, 18, 21, 16, 16, 238591), 'id': '83b59781-0861-4442-8764-07ff7a8207be'}
```

## Create a Budget:
You can create a single Budget with vehicles related using `create_a_budget_service.py`:
```
$ python3 create_a_budget_service.py 
[Service] (cd6c0f80-c037-4674-9dc6-cbe37f3e0cd4) {'_sa_instance_state': <sqlalchemy.orm.state.InstanceState object at 0x7f4496c41630>, 'done': False, 'title': 'Kill delivery service', 'description': 'Summertime - George Gershwin', 'note': 'A piano was required', 'vehicle_id': '0c5fc03b-e145-4bd2-8a88-499933efeff9', 'user_id': '6b96b94e-3623-4ac7-8994-082a0913244c', 'budget_id': 'a9f83602-9bd7-4464-843f-af320853ad43', 'created_at': datetime.datetime(2023, 10, 19, 3, 58, 24, 440185), 'id': 'cd6c0f80-c037-4674-9dc6-cbe37f3e0cd4'}
---------
[Service] (3790f672-5d63-4e12-a069-f3ddb9213516) {'_sa_instance_state': <sqlalchemy.orm.state.InstanceState object at 0x7f4496c416a0>, 'done': False, 'title': 'Kill delivery service', 'description': 'Summertime - George Gershwin', 'note': 'A piano was required', 'vehicle_id': '0c5fc03b-e145-4bd2-8a88-499933efeff9', 'user_id': '6b96b94e-3623-4ac7-8994-082a0913244c', 'budget_id': 'a9f83602-9bd7-4464-843f-af320853ad43', 'created_at': datetime.datetime(2023, 10, 19, 3, 58, 24, 440421), 'id': '3790f672-5d63-4e12-a069-f3ddb9213516'}
---------
[Service] (3c06fc08-ca02-4177-b359-1a6fc6f85209) {'_sa_instance_state': <sqlalchemy.orm.state.InstanceState object at 0x7f4496c41710>, 'done': False, 'title': 'Kill delivery service', 'description': 'Summertime - George Gershwin', 'note': 'A piano was required', 'vehicle_id': '0c5fc03b-e145-4bd2-8a88-499933efeff9', 'user_id': '6b96b94e-3623-4ac7-8994-082a0913244c', 'budget_id': 'a9f83602-9bd7-4464-843f-af320853ad43', 'created_at': datetime.datetime(2023, 10, 19, 3, 58, 24, 440619), 'id': '3c06fc08-ca02-4177-b359-1a6fc6f85209'}
---------
BUDGET
[Budget] (a9f83602-9bd7-4464-843f-af320853ad43) {'_sa_instance_state': <sqlalchemy.orm.state.InstanceState object at 0x7f449cbd12e8>, 'total_price': 400.0, 'payment_method': 'Credit-Card', 'installments': 0, 'warranty': 0, 'confirmed': False, 'sent': False, 'active': False, 'created_at': datetime.datetime(2023, 10, 19, 3, 58, 24, 353658), 'id': 'a9f83602-9bd7-4464-843f-af320853ad43', 'services': [<models.service.Service object at 0x7f4496c41668>, <models.service.Service object at 0x7f4496c416d8>, <models.service.Service object at 0x7f4496c41748>]}
Alright
```
At the end of the file:
* It will also create another budget, and vehicle... for population and variety purposes.
	* The dictionaries used to create them were provided, so they can be used, to post or update request.
* It will also create instances of some other objects, which were required;
	* 2(Brand)
	* 3(service)
	* Client

## Routes
### User() Routes:
- [x] GET /api/v1/usr/<usrId> | get a specific user
- [x] GET /api/v1/usr | get all users
- [x] POST /api/v1/usr | create an user
- [x] DELETE /api/v1/user/<usrId> | delete a specific user
- [x] PUT /api/v1/user/<usrId> | update a specific user

### Service() Routes:
- [x] GET /api/v1/service/<scId> | get a specific service
- [x] GET /api/v1/service | get all services 
- [x] POST /api/v1/service | create a service
- [x] DELETE /api/v1/service/<scId> | delete a specific service
- [x] PUT /api/v1/service/<scId> | update a specific service

### Vehicle() Routes:
- [x] GET /api/v1/vehicle/<veId>/service | get all services for a specific vehicle
- [x] GET /api/v1/vehicle/<veId>/budget | get all budgets for a specific vehicle
- [x] GET /api/v1/vehicle/<velId> | get a specific vehicle
- [x] GET /api/v1/vehicle | get all vehicles
- [x] POST /api/v1/vehicle | create a vehicle
- [x] DELETE /api/v1/vehicle/<veId> | delete a specific vehicle
- [x] PUT /api/v1/vehicle/<veId> | update a specific vehicle

### Brand() Routes:
- [x] GET /api/v1/brand/<brId> | get a specific brand
- [x] GET /api/v1/brand | get all brands
- [x] POST /api/v1/brand | create a brand
- [x] DELETE /api/v1/brand/<brId> | delete a specific brand
- [x] PUT /api/v1/brand/<brId> | update a specific brand

### Client() Routes:
- [x] GET /api/v1/client/<clnId>/vehicle | get all vehicles for a specific client
- [ ] GET /api/v1/client/<clnId>
- [ ] GET /api/v1/client
- [ ] POST /api/v1/client
- [ ] DELETE /api/v1/client/<clnId>
- [ ] PUT /api/v1/client/<clId>

### Budget() Routes:
- [x] GET /api/v1/budget/<bdgtId>/services | get all services for a specific budget
- [x] GET /api/v1/budget/<bdgtId> | get a specific budget
- [x] GET /api/v1/budget | get all budgets
- [x] POST /api/v1/budget | create a budget
- [x] DELETE /api/v1/budget/<bdgtId> | delete a budget
- [x] PUT /api/v1/budget/<bdgtId> | update a budget

### Type() Routes:
- [ ] GET /api/v1/type/<type_name>
- [ ] GET /api/v1/type
- [ ] POST /api/v1/type
- [ ] DELETE /api/v1/type/<type_name>
- [ ] PUT /api/v1/type/<type_name>

For now some routes will return a 500 error cause not all functions are not implemented yet.
... that means they're workin' ;
