#!/usr/bin/python3
""" Tests Brand for expected documentation, attributes and behavior """

from models.base_model import BaseModel
import models.brand
from models.brand import Brand
from  sqlalchemy.orm.collections import InstrumentedList
import unittest

module_doc = models.brand.__doc__


class TestBrand(unittest.TestCase):
    """ Tests Brand for the correct attrs and behavior """

    def test_inheritance(self):
        """ Tests for inheritance from basemodel """
        self.assertTrue(issubclass(Brand, BaseModel))

    def test_has_attr_types(self):  # this method is using to_dict() which will be replaced with the correspondent method once is made
        """ Tests Brand for the correct attrs and types """
        brand = Brand()
        brand.name = "name"
        self.assertIs(type(brand), Brand)
        exptd = {
            "name": str,
            "vehicles": InstrumentedList
            }

        for attr, typ in exptd.items():
            with self.subTest(attr=attr, typ=typ):
                self.assertIn(attr, brand.to_dict())
                self.assertIs(type(brand.to_dict()[attr]), typ)

if __name__ == "__main__":
    unittest.main()
