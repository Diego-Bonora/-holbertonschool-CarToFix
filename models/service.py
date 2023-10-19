#!/usr/bin/python
""" Contains class Services """
from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, Boolean, ForeignKey


class Service(BaseModel, Base):
    """ Representation of Services """
    __tablename__ = 'services'
    done = Column(Boolean, default=False)
    title = Column(String(128), nullable=False)
    description = Column(String(128), nullable=True)
    note = Column(String(128), nullable=True)
    vehicle_id = Column(String(60), ForeignKey('vehicles.id'), nullable=False)
    user_id = Column(String(60), ForeignKey('users.id'), nullable=False)
    budget_id = Column(String(60), ForeignKey('budgets.id'), nullable=False)

    def __init__(self, *args, **kwargs):
        """ initializes Service """
        super().__init__(*args, **kwargs)
