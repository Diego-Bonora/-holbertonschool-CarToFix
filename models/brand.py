#!/usr/bin/python
""" Contains class Brand """
import models
from models.base_model import BaseModel, Base
import sqlalchemy
from sqlalchemy import Column, String
from sqlalchemy.orm import relationship


class Brand(BaseModel, Base):
    """ Representation of Brand """
    __tablename__ = 'brands'
    name = Column(String(128), nullable=False)
    vehicles = relationship("Vehicle",
                            backref="brands",
                            cascade="all, delete, delete-orphan")

    def __init__(self, *args, **kwargs):
        """ initializes  Brand """
        super().__init__(*args, **kwargs)
