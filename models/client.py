#!/usr/bin/python
""" Contains class Clients """
import models
from models.base_model import BaseModel, Base
import sqlalchemy
from sqlalchemy import Column, String, Integer
from sqlalchemy.orm import relationship


class Client(BaseModel, Base):
    """ Representation of Client """
    __tablename__ = 'clients'
    name = Column(String(128), nullable=False)
    email = Column(String(128), nullable=False)
    phone = Column(Integer, nullable=False)
    vehicles = relationship("Vehicle",
                            backref="clients",
                            cascade="all, delete, delete-orphan")

    def __init__(self, *args, **kwargs):
        """ initializes Client """
        super().__init__(*args, **kwargs)
