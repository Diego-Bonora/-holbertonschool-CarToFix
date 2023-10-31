#!/usr/bin/python
""" Contains class Budget """
from datetime import datetime, timedelta
from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, Integer, Float, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship


class Budget(BaseModel, Base):
    """ Representation of Budget """
    __tablename__ = 'budgets'
    user_id = Column(String(60), ForeignKey('users.id'), nullable=False)
    client_id = Column(String(60), ForeignKey('clients.id'), nullable=False)
    total_price = Column(Float, nullable=False)
    payment_method = Column(String(128), nullable=False)
    installments = Column(Integer, nullable=False)
    warranty = Column(Integer, nullable=False)
    vehicle_id = Column(String(60), ForeignKey('vehicles.id'), nullable=False)
    issue_date = Column(DateTime, default=datetime.utcnow())
    due_date = Column(DateTime, default=datetime.utcnow() + timedelta(days=7))
    confirmed = Column(Boolean, default=False)
    sent = Column(Boolean, defaul=False)
    active = Column(Boolean, default=False)
    services = relationship("Service",
                            backref="budgets",
                            cascade="all, delete, delete-orphan")

    def __init__(self, *args, **kwargs):
        """ initializes Budget """
        super().__init__(*args, **kwargs)
