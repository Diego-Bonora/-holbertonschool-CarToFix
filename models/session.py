#!/usr/bin/python
""" Contains class Sessions """
from models.base_model import BaseModel, Base
from sqlalchemy import Column, LargeBinary, DateTime, String
from datetime import datetime, timedelta
import uuid


class Session(BaseModel, Base):
    """ Representation of Services """
    __tablename__ = 'sessions'
    session_id = Column(String(60), primary_key=True,
                        default=lambda: str(uuid.uuid4()))
    data = Column(LargeBinary)
    expiry = Column(DateTime, default=lambda: datetime.now() +
                    timedelta(hours=24))

    def __init__(self, *args, **kwargs):
        """ initializes session """
        super().__init__(*args, **kwargs)
        if not self.session_id:
            self.session_id = str(uuid.uuid4())
