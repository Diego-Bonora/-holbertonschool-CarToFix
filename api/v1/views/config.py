from dotenv import load_dotenv
from os import getenv, environ

load_dotenv()


class ApplicationConfig:
    SECRET_KEY = environ["SECRET_KEY"]
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ECHO = True
    SQLALCHEMY_DATABASE_URI = 'mysql+mysqldb://{user}:{pwd}@{host}/{db}'.format(
        user=getenv('HBNB_MYSQL_USER'),
        pwd=getenv('HBNB_MYSQL_PWD'),
        host=getenv('HBNB_MYSQL_HOST'),
        db=getenv('HBNB_MYSQL_DB')
    )
    SESSION_TYPE = "sqlalchemy"
    SESSION_PERMANENT = False
    SESSION_USE_SIGNER = True
