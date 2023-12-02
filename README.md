# Django API

This branch contains the django API

## Run the server
```
$ cd api/v1/CarToFix
$ python manage.py runserver
Watching for file changes with StatReloader
Performing system checks...

System check identified no issues (0 silenced).

You have 18 unapplied migration(s). Your project may not work properly until you apply the migrations for app(s): admin, auth, contenttypes, sessions.
Run 'python manage.py migrate' to apply them.
December 01, 2023 - 02:35:18
Django version 3.2.23, using settings 'CarToFix.settings'
Starting development server at http://127.0.0.1:8000/
Quit the server with CONTROL-C.
```

### Routes
Take into account the serer wil be (ceteris paribus) running in: `http://localhost:8000`
- [X] / -> Root route it will return `"Welcome to CarToFix"`.

#### Client routes:
- [X] client -> Returns a list of all clients
