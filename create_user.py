from models.user import User
from models import storage
import bcrypt

user_data = {
    "name": "Santiago",
    "mail": "santiago@gmail.com",
    "password": "santiago",
    "phone": "99696969"
}

password = user_data["password"].encode('utf-8')
hashed_password = bcrypt.hashpw(password, bcrypt.gensalt())

user_data["password"] = hashed_password.decode('utf-8')

new_user = User(**user_data)
storage.new(new_user)
storage.save()
