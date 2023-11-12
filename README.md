# api/app.py

To run it:
```
$ cd api/v1/
$ flask run
```

## Create the required user for Emailer:
```
$ head -n 16 create0.py | tail -n 1
user = User(name="CarToFix", mail="cartofixcostumers@gmail.com", password="F#7b9/db", phone="598984982", logo="logeishon")
```
As showed, the 16th line creates an instance of User.
This special user doesn't contains the correct password, so you need to modify it, i.e:
```
$ head -n 16 create0.py | tail -n 1
user = User(name="CarToFix", mail="cartofixcostumers@gmail.com", password="CORRECTPASSWORD", phone="598984982", logo="logeishon")
```
Once that's done, you can (must), execute it.
Then, for security reasons after executing it, you'll have to mode the file to the parent directory of the repository root.
```
$ mv create0.py ..
$ ls
api  get.py  models  README.md
```

## Create a Budget:
You can create a some Budgets with vehicles related, and more, by using `create_a_budget_service.py`:
```
$ python3 create_a_budget_service.py 
[Service] (d58af18c-0dd0-4277-89a2-b65b6f1f46c5) {'_sa_instance_state': <sqlalchemy.orm.state.InstanceState object at 0x7f8d0e8ee710>, 'title': 'House burn down', 'description': "Arsonist's Lullabye - Hozier", 'note': 'A piano was required', 'vehicle_id': 'ce6fd674-2cf9-4036-a906-129f2fc5efda', 'user_id': 'a39c6129-3855-48fd-9d71-d0ba1c0ef35c', 'budget_id': 'fe04c58b-a574-4bf1-b218-819394942b50', 'price': 4.9, 'created_at': datetime.datetime(2023, 10, 31, 20, 46, 58, 243731), 'id': 'd58af18c-0dd0-4277-89a2-b65b6f1f46c5'}
---------
[Service] (6f4707dc-2d86-497d-9344-d2a3bc2d0f5a) {'_sa_instance_state': <sqlalchemy.orm.state.InstanceState object at 0x7f8d0e8ee780>, 'title': 'Electrify a hammock', 'description': "It Don't Mean a Thing (If It Ain't Got That Swing)", 'note': 'Worker died in the process', 'vehicle_id': 'ce6fd674-2cf9-4036-a906-129f2fc5efda', 'user_id': 'a39c6129-3855-48fd-9d71-d0ba1c0ef35c', 'budget_id': 'fe04c58b-a574-4bf1-b218-819394942b50', 'price': 0.0, 'created_at': datetime.datetime(2023, 10, 31, 20, 46, 58, 243792), 'id': '6f4707dc-2d86-497d-9344-d2a3bc2d0f5a'}
---------
[Service] (e5f99ee9-bda5-4587-a869-f16444f87cde) {'_sa_instance_state': <sqlalchemy.orm.state.InstanceState object at 0x7f8d0e8ee7f0>, 'title': 'Kill delivery service', 'description': 'Summertime - George Gershwin', 'note': 'A piano was required', 'vehicle_id': 'ce6fd674-2cf9-4036-a906-129f2fc5efda', 'user_id': 'a39c6129-3855-48fd-9d71-d0ba1c0ef35c', 'budget_id': 'fe04c58b-a574-4bf1-b218-819394942b50', 'price': 200000.0, 'created_at': datetime.datetime(2023, 10, 31, 20, 46, 58, 243845), 'id': 'e5f99ee9-bda5-4587-a869-f16444f87cde'}
---------
BUDGET
---------
[Budget] (fe04c58b-a574-4bf1-b218-819394942b50) {'_sa_instance_state': <sqlalchemy.orm.state.InstanceState object at 0x7f8d0e8ee6a0>, 'user_id': 'a39c6129-3855-48fd-9d71-d0ba1c0ef35c', 'total_price': 400.0, 'payment_method': 'Credit-Card', 'installments': 0, 'warranty': 0, 'vehicle_id': 'ce6fd674-2cf9-4036-a906-129f2fc5efda', 'confirmed': False, 'sent': False, 'active': False, 'created_at': datetime.datetime(2023, 10, 31, 20, 46, 58, 243629), 'id': 'fe04c58b-a574-4bf1-b218-819394942b50', 'services': [<models.service.Service object at 0x7f8d0e8ee748>, <models.service.Service object at 0x7f8d0e8ee7b8>, <models.service.Service object at 0x7f8d0e8ee828>]}
Alright
```
At the end of the file:
* It will also create another budget, and vehicle... for population and variety purposes.
	* The dictionaries used to create them were provided, so they can be used, to post or update request.
* It will also create instances of some other objects, which were required;
	* 2(Brand)
	* 3(Service) and 2(Service) | almost the same data, for both of the budgets
	* Client
	* User
        * Type_vehicle
	* 2(Vehicle)
	* 2(Budget)
	* Some workers
	* Some more clients, budgets, vehicles ...


## Routes
### User() Routes:
- [x] GET /api/v1/usr/\<usrId> | get a specific user
- [x] GET /api/v1/usr | get all users
- [x] POST /api/v1/usr | create an user
- [x] DELETE /api/v1/user/\<usrId> | delete a specific user
- [x] PUT /api/v1/user/\<usrId> | update a specific user

### Service() Routes:
- [x] GET /api/v1/service/\<scId> | get a specific service
- [x] GET /api/v1/service/user/\<usrId> | get all services
- [ ] POST /api/v1/service | create a service
- [x] DELETE /api/v1/service/\<scId> | delete a specific service
- [x] PUT /service/dwn/\<scId> | update a s pecific service only to done = True, a worker or a note
	- To update any other attr of service budget repost verb must be used.
- [x] PUT /service/\<scId> | update a srvice (not ["done", "worker", "done", "vehicle_id", "user_id", "budget_id", "note"])

### Vehicle() Routes:
- [x] GET /api/v1/vehicle/\<veId>/service | get all services for a specific vehicle
- [x] GET /api/v1/vehicle/\<veId>/budget | get all budgets for a specific vehicle
- [x] GET /api/v1/vehicle/plate/\<plate>/budget | get all the budgets for a specific vehicle
- [x] GET /api/v1/vehicle/\<velId> | get a specific vehicle by id
- [x] GET /api/v1/vehicle/plate/\<plate> | get a specific vehicle by plate
- [x] GET /api/v1/vehicle/user/\<usrId> | get all vehicles by user Id
- [x] POST /api/v1/vehicle | create a vehicle
- [x] DELETE /api/v1/vehicle/\<veId> | delete a specific vehicle
- [x] PUT /api/v1/vehicle/\<veId> | update a specific vehicle

### Brand() Routes:
- [x] GET /api/v1/brand/\<brId> | get a specific brand
- [x] GET /api/v1/brand | get all brands
- [x] POST /api/v1/brand | create a brand
- [x] DELETE /api/v1/brand/\<brId> | delete a specific brand
- [x] PUT /api/v1/brand/\<brId> | update a specific brand

### Client() Routes:
- [x] GET /api/v1/client/\<clnId>/vehicle | get all vehicles for a specific client
- [x] GET /api/v1/client/\<clnId> | get a specific client
- [x] GET /api/v1/client | get all clients
- [x] POST /api/v1/client | create a client
- [x] DELETE /api/v1/client/\<clnId> | delete a specific client
- [x] PUT /api/v1/client/\<clId> | update a specific client

### Budget() Routes:
- [x] GET /api/v1/budget/\<bdgtId>/services | get all services for a specific budget
- [x] GET /api/v1/budget/\<bdgtId> | get a specific budget
- [x] GET /api/v1/budget/\<usrId> | get all budgets
	- [x] this route recieves an optional parameter `done`, if `True` all the "done" budgets will be returned
- [x] POST /api/v1/budget | create a budget
- [x] DELETE /api/v1/budget/\<bdgtId> | delete a budget
- [ ] REPOST /api/v1/budget/\<bdgtId> | update a budget (the object will be destroyed and re-made)
 - `services` key is optional, but if present;
  - `action` key must be specified in each one of them;
   - `action` can be `0`, `1`, or `2` for creating, updating and deleting a service respectively
    - for `1` and `2` the `id` of an existing service must be passed

- [ ] PUT /api/v1/budget/\<bdgtId> | update a budget | NO Its services

### TypeVehicle() Routes:
- [x] GET /api/v1/type/\<tId> | get a specific type of vehicle
- [x] GET /api/v1/type/name/\<name> | get a specific vehicle type by name
- [x] GET /api/v1/type | get all types of vehicle
- [x] POST /api/v1/type | create a new type of vehicle
- [x] DELETE /api/v1/type/\<tId> | delete a specific type of vehicle
- [x] PUT /api/v1/type/\<tId> | update a specific type of vehicle

### Workers() Routes:
- [x] GET /api/v1/worker | get all workers
- [x] GET /api/v1/worker/\<dsgnId>/services | get all the services for a specific designee
- [x] GET /api/v1/worker | create a worker

### Other Routes:
- [x] GET /api/v1/dashboard/\<usrId> | get all the information required for the dashboard

No route should fail upon proper request.

- [ ] checks previous existence of all the objects that a user has

#### Latest:
- [x] budget calls `Emailer` each time a budget is created
- [x] dashboard route added
- [x] create 0 now creates more instances (even workers).
- [x] get a vehicle by plate
- [x] get all vehicles is now get all vehicles by `user.id`
- [x] Not necessary to look for the user `CarToFix` to initialize Emailer;
	- However, the user must be already correctly created
- [x] No more get all services but get all services by usrId
- [x] No more get all budgets but get all budgets by usrId
- [x] Now you can get the budgets for a vehicle by plate
- [x] If the all the services of a budget is done, it cannot be updated
- [x] Get a vehicle type by name
- [x] Cannot create a vehicle type that already exists
- [x] Create a worker
- [x] Cannot create a worker that already exists
- [x] Use `get.py` to print all the `budgets.id` and `client.names`
- [x] Vehicle by id now returns the name of its type
- [x] Cannot create a user that already exists
- [x] Get all the done budgets
- [x] API prints its version
- [x] Print a more understandable error when user not set correctly
- [x] Cannot create a vehicle that already exists
- [x] Budget `REPOST` knows when to add, update or delete a service.
- [x] user and vehicle ignored for services when posting
- [x] Delete budget now notifies the costumer when a budget was deleted
- [x] `Vehicle.user_id` and provided user must match when posting a budget
- [x] `Vehicle.client_id` and provided client must match when posting a budget
- [x] `total_price` of budget is modified when `price` of service is too
