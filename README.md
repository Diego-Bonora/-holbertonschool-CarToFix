# api/app.py

To run it:
```
$ cd api/v1/
$ flask --app app.py run
```

## Routes
### User() Routes:
- GET /api/v1/usr/<srId>
- GET /api/v1/usr
- POST /api/v1/usr
- DELETE /api/v1/user/<usrId>
- PUT /api/v1/user/<usrId>

### Service() Routes:
- GET /api/v1/service/<scId>
- GET /api/v1/service
- POST /api/v1/service
- DELETE /api/v1/service/<scId>
- PUT /api/v1/service/<scId>

### Vehicle() Routes:
- GET /api/v1/vehicle/model/<mdlId>
- GET /api/v1/vehicle/<veId>/budgets
- GET /api/v1/vehicle/<veId>/service
- GET /api/v1/vehicle/<velId>
- GET /api/v1/vehicle
- POST /api/v1/vehicle
- DELETE /api/v1/vehicle/<veId>
- PUT /api/v1/vehicle/<veId>

### Brand() Routes:
- GET /api/v1/brand/<brand_name>
- GET /api/v1/brand
- POST /api/v1/brand
- DELETE /api/v1/brand/<brand_name>
- PUT /api/v1/brand/<brand_name>

### Client() Routes:
- GET /api/v1/client/<clnId>/vehicle
- GET /api/v1/client/<clnId>
- GET /api/v1/client
- POST /api/v1/client
- DELETE /api/v1/client/<clnId>
- PUT /api/v1/client/<clId>

### Budget() Routes:
- GET /api/v1/budget/<bdgtId>/services
- GET /api/v1/budget/<bdgtId>
- GET /api/v1/budget
- POST /api/v1/budget
- DELETE /api/v1/budget/<bdgtId>
- PUT /api/v1/budget/<bdgtId>

### Type() Routes:
- GET /api/v1/type/<type_name>
- GET /api/v1/type
- POST /api/v1/type
- DELETE /api/v1/type/<type_name>
- PUT /api/v1/type/<type_name>


For now it will return a 500 error cause functions are not implemented yet.
... that means it's workin' ;)