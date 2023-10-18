#!/usr/bin/python
""" Contains class Type Vehicle """
from models.base_model import BaseModel, Base
from sqlalchemy import Column, String
from sqlalchemy.orm import relationship


class Type_vehicle(BaseModel, Base):
    """ Representation of Type Vehicle """
    __tablename__ = 'type_vehicles'
    name = Column(String(30), nullable=False)
    vehicles = relationship("Vehicle",
                            backref="type_vehicles",
                            cascade="all, delete, delete-orphan")

    def __init__(self, *args, **kwargs):
        """ initializes Type Vehicle """
        super().__init__(*args, **kwargs)
