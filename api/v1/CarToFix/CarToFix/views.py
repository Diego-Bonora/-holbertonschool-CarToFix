#!/usr/bin/python3

""" This module contains the main routes """

from django.http import HttpResponse

def root(request):
    """ API's root route """
    return HttpResponse("Welcome to CarToFix\n")
