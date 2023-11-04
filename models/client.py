#!/usr/bin/python
""" Contains class Clients """
from models.base_model import BaseModel, Base
<<<<<<< HEAD
from sqlalchemy import Column, String, Integer
=======
from sqlalchemy import Column, String
>>>>>>> api_main
from sqlalchemy.orm import relationship


class Client(BaseModel, Base):
    """ Representation of Client """
    __tablename__ = 'clients'
    name = Column(String(128), nullable=False)
    email = Column(String(128), nullable=False)
<<<<<<< HEAD
    phone = Column(Integer, nullable=False)
    vehicles = relationship("Vehicle",
                            backref="clients",
                            cascade="all, delete, delete-orphan")
=======
    phone = Column(String(32), nullable=False)
    vehicles = relationship("Vehicle",
                            backref="clients",
                            cascade="all, delete, delete-orphan")
    budgets = relationship("Budget",
                           backref="clients",
                           cascade="all, delete, delete-orphan")
>>>>>>> api_main

    def __init__(self, *args, **kwargs):
        """ initializes Client """
        super().__init__(*args, **kwargs)
