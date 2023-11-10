from models.user import User
from models import storage
user = User(name="No NO car", mail="emanueltrias9@gmail.com", password="adfklj", phone="599999997", logo="logeishon")

# Save user instance before referencing it in other instances
storage.new(user)
storage.save()
