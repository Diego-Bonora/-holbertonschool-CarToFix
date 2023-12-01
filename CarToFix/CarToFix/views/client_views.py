from django.http import JsonResponse
from models.client import Client
from models import storage

def get_all(request):
    """ Returns all the Client Objects """
    return JsonResponse(storage.all(Client))
