#!/usr/bin/python3
""" This module initializes the server """

from api.v1.views import app_views
from flask import Flask

app = Flask(__name__)
app.url_map.strict_slashes = False

cors = CORS(app, resources={r"/api/v1/*": {"origins": "*"}})
app.register_blueprint(app_views)


@app.teardown_appcontext
def close(E):
    """Calls storage.close() when server stops"""
    storage.close()

if __name__ == "__main__":
    app.run(threaded=True)
