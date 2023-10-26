#!/usr/bin/python3
""" Tests Brand for expected documentation, attributes and behavior """

import inspect
from models.base_model import BaseModel
import models.brand
from models.brand import Brand
from models import storage
import pep8 as pycodestyle
from sqlalchemy.orm.collections import InstrumentedList
from typing import get_type_hints
import unittest

module_doc = models.brand.__doc__


class TestBrandDoc(unittest.TestCase):
    """
    Tests for Brand to be documentated,
    type annotated and pycodestyle valid
    """

    def test_pycodestyle(self):
        """ Tests for proper code styling """
        for path in ['models/brand.py',
                     'tests/test_models/test_brand.py']:
            with self.subTest(path=path):
                errors = pycodestyle.Checker(path).check_all()
                self.assertEqual(errors, 0)

    def test_module_documentation(self):
        """Test for the existence of module docstring"""
        self.assertIsNot(module_doc, None,
                         "brand.py needs a docstring")
        self.assertIsNot(module_doc, len(module_doc) < 1,
                         "brand.py needs a docstring")

    def test_class_documentation(self):
        """Test for the Brnad class docstring"""
        self.assertIsNot(Brand.__doc__, None,
                         "Brand class needs a docstring")
        self.assertFalse(len(Brand.__doc__) < 1,
                         "Brand class needs a docstring")

    def test_methods_documentation(self):
        """Test for the presence of docstrings in Brand methods"""
        base = Brand()
        methods = inspect.getmembers(base, predicate=inspect.ismethod)

        for m_name, method in methods:
            docstring = method.__doc__
            self.assertIsNotNone(
                    docstring, f"{m_name} is missing documentation")


class TestBrand(unittest.TestCase):
    """ Tests Brand for the correct attrs and behavior """

    def setUp(self):
        """ Initializes a Brand() and other required instances """
        from models.budget import Budget
        from models.client import Client
        from models.service import Service
        from models.vehicle import Vehicle
        from models.type_vehicle import TypeVehicle
        from models.user import User


        self.veh_type = TypeVehicle(name="tha_type")
        self.client = Client(name="ET", phone=3802348, email="email@died.com")
        self.brand = Brand(name="tha_brand")
        self.user = User(name="Hozier", mail="idk@idk.com", password="F#7b9/db", phone=598984982)
        self.vehicle = Vehicle(plate="61Octaves", brand=self.brand.id, model="tha_model", color="daltonism", mileage=22929, user_id=self.user.id, client_id=self.client.id, type_vehicle_id=self.veh_type.id)

        for inst in [self.veh_type, self.client, self.brand, self.user, self.vehicle]:
            storage.new(inst)

    def test_inheritance(self):
        """ Tests for inheritance from basemodel """
        self.assertTrue(issubclass(Brand, BaseModel))

    def test_has_attr_types(self):
        """ Tests Brand for the correct attrs and types """
        self.assertIs(type(self.brand), Brand)
        exptd = {
            "name": str,
            "vehicles": InstrumentedList
            }

        for attr, typ in exptd.items():
            with self.subTest(attr=attr, typ=typ):
                self.assertTrue(hasattr(self.brand, attr))
                self.assertIs(type(getattr(self.brand, attr)), typ)

if __name__ == "__main__":
    unittest.main()
