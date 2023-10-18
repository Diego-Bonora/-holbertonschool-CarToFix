#!/usr/bin/python
""" Contains class Budget """
from datetime import datetime
from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, Integer, Float, Boolean, DateTime
from sqlalchemy.orm import relationship


class Budget(BaseModel, Base):
    """ Representation of Budget """
    __tablename__ = 'budgets'
    total_price = Column(Float, nullable=False)
    payment_method = Column(String(128), nullable=False)
    installments = Column(Integer, nullable=False)
    warranty = Column(Integer, nullable=False)
    issue_date = Column(DateTime, default=datetime.utcnow)
    due_date = Column(DateTime, default=datetime.utcnow)
    confirmed = Column(Boolean, nullable=False)
    sent = Column(Boolean, nullable=False)
    active = Column(Boolean, nullable=False)
    services = relationship("Service",
                            backref="budgets",
                            cascade="all, delete, delete-orphan")

    def __init__(self, *args, **kwargs):
        """ initializes Budget """
        super().__init__(*args, **kwargs)
