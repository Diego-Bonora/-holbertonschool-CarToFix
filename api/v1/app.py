#!/usr/bin/python3
""" This module initializes the server """

from api.v1.views import app_views
from flask import Flask
from flask_cors import CORS
from models.mailer.Emailer import Emailer
from models import storage
import os
from threading import Thread

app = Flask(__name__)
app.url_map.strict_slashes = False

cors = CORS(app, resources={r"/api/v1/*": {"origins": "*"}})
app.register_blueprint(app_views)


emailer = Emailer()

def run_emailer():
    """ Runs emailer.read() """
    while True:
        try:
            emailer.read()
        except Exception as e:
            print("Error: User CarToFix probably not set correctly")
            os._exit(1)

# Start the emailer thread
emailer_thread = Thread(target=run_emailer)
emailer_thread.daemon = True
emailer_thread.start()

@app.teardown_appcontext
def close(E):
    """Calls storage.close() when server stops"""
    storage.close()

print("version: 1.14")


if __name__ == "__main__":
    app.run(threaded=True)
