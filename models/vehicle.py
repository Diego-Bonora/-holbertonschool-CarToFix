#!/usr/bin/python
""" Contains class Vehicle """
from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.orm import relationship


class Vehicle(BaseModel, Base):
    """ Representation of Vehicle """
    __tablename__ = 'vehicles'
    plate = Column(String(128), nullable=False)
    brand = Column(String(128), ForeignKey('brands.id'), nullable=False)
    model = Column(String(128), nullable=False)
    color = Column(String(128), nullable=False)
    mileage = Column(Integer, nullable=False)
    user_id = Column(String(60), ForeignKey('users.id'), nullable=False)
    client_id = Column(String(60), ForeignKey('clients.id'), nullable=False)
    type_vehicle_id = Column(String(60), ForeignKey(
        'type_vehicles.id'), nullable=False)
    services = relationship("Service",
                            backref="vehicles",
                            cascade="all, delete, delete-orphan")

    def __init__(self, *args, **kwargs):
        """ initializes Vehicle """
        super().__init__(*args, **kwargs)
