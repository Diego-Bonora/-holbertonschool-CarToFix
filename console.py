#!/usr/bin/python3
""" console """

import cmd
from models.user import User
from models.client import Client
from models.service import Service
from models.vehicle import Vehicle
from models.budget import Budget
from models.type_vehicle import TypeVehicle
from models.brand import Brand
from models.workers import Worker

classes = {
    "Client": Client,
    "Service": Service,
    "Vehicle": Vehicle,
    "User": User,
    "Budget": Budget,
    "TypeVehicle": TypeVehicle,
    "Brand": Brand,
    "Worker": Worker
}


class HBNBCommand(cmd.Cmd):
    """ HBNH console """
    prompt = '(hbnb) '

    def do_EOF(self, arg):
        """Exits console"""
        return True

    def emptyline(self):
        """ overwriting the emptyline method """
        return False

    def do_quit(self, arg):
        """Quit command to exit the program"""
        return True


if __name__ == '__main__':
    HBNBCommand().cmdloop()
