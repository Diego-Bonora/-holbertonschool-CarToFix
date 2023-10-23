from models.user import User
from models import storage

new_user = User(name="Taller Santiago", mail="santiago@gmail.com",
                password="santiago", phone="99696969")

storage.new(new_user)
storage.save()
