#!/usr/bin/python
""" Contains class Users """
from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, Integer
from sqlalchemy.orm import relationship


class User(BaseModel, Base):
    """ Representation of Users """
    __tablename__ = 'users'
    name = Column(String(128), nullable=False)
    mail = Column(String(128), nullable=False)
    password = Column(String(128), nullable=False)
    phone = Column(Integer, nullable=False)
    logo = Column(String(128), nullable=True)
    services = relationship("Service",
                            backref="users",
                            cascade="all, delete, delete-orphan")
    vehicles = relationship("Vehicle",
                            backref="users",
                            cascade="all, delete, delete-orphan")

    def __init__(self, *args, **kwargs):
        """ initializes User """
        super().__init__(*args, **kwargs)
