# api/app.py

To run it:
```
$ cd api/v1/
$ flask run
```

## Create a basic fake Budget:
You can also create multiple Budgets (without services related) using `create_an_only_budget.py` multiple times:
```
$ python3 create_an_only_budget.py
[Budget] (83b59781-0861-4442-8764-07ff7a8207be) {'_sa_instance_state': <sqlalchemy.orm.state.InstanceState object at 0x7f9ec2a48da0>, 'total_price': 400.0, 'payment_method': 'Credit-Card', 'installments': 0, 'warranty': 0, 'confirmed': False, 'sent': False, 'active': False, 'created_at': datetime.datetime(2023, 10, 18, 21, 16, 16, 238591), 'id': '83b59781-0861-4442-8764-07ff7a8207be'}
```

## Routes
### User() Routes:
- [ ] GET /api/v1/usr/<srId>
- [ ] GET /api/v1/usr
- [ ] POST /api/v1/usr
- [ ] DELETE /api/v1/user/<usrId>
- [ ] PUT /api/v1/user/<usrId>

### Service() Routes:
- [ ] GET /api/v1/service/<scId>
- [ ] GET /api/v1/service
- [ ] POST /api/v1/service
- [ ] DELETE /api/v1/service/<scId>
- [ ] PUT /api/v1/service/<scId>

### Vehicle() Routes:
- [ ] GET /api/v1/vehicle/model/<mdlId>
- [ ] GET /api/v1/vehicle/<veId>/budgets
- [ ] GET /api/v1/vehicle/<veId>/service
- [ ] GET /api/v1/vehicle/<velId>
- [ ] GET /api/v1/vehicle
- [ ] POST /api/v1/vehicle
- [ ] DELETE /api/v1/vehicle/<veId>
- [ ] PUT /api/v1/vehicle/<veId>

### Brand() Routes:
- [ ] GET /api/v1/brand/<brand_name>
- [ ] GET /api/v1/brand
- [ ] POST /api/v1/brand
- [ ] DELETE /api/v1/brand/<brand_name>
- [ ] PUT /api/v1/brand/<brand_name>

### Client() Routes:
- [ ] GET /api/v1/client/<clnId>/vehicle
- [ ] GET /api/v1/client/<clnId>
- [ ] GET /api/v1/client
- [ ] POST /api/v1/client
- [ ] DELETE /api/v1/client/<clnId>
- [ ] PUT /api/v1/client/<clId>

### Budget() Routes:
- [x] GET /api/v1/budget/<bdgtId>/services
- [x] GET /api/v1/budget/<bdgtId>
- [x] GET /api/v1/budget
- [x] POST /api/v1/budget
- [x] DELETE /api/v1/budget/<bdgtId>
- [x] PUT /api/v1/budget/<bdgtId>

### Type() Routes:
- [ ] GET /api/v1/type/<type_name>
- [ ] GET /api/v1/type
- [ ] POST /api/v1/type
- [ ] DELETE /api/v1/type/<type_name>
- [ ] PUT /api/v1/type/<type_name>


For now some routes will return a 500 error cause not all functions are not implemented yet.
... that means they're workin' ;)
