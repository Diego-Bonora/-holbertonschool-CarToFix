#!/usr/bin/python
""" Contains class Workers """
from models.base_model import BaseModel, Base
from sqlalchemy import Column, String
from sqlalchemy.orm import relationship


class Worker(BaseModel, Base):
    """ Representation of Workers """
    __tablename__ = 'workers'
    name = Column(String(128), nullable=False)
    services = relationship("Service",
                            backref="workers",
                            cascade="all, delete, delete-orphan")

    def __init__(self, *args, **kwargs):
        """ initializes Client """
        super().__init__(*args, **kwargs)
