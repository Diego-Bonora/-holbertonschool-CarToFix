#!/usr/bin/python3
""" Tests Brand for expected documentation, attributes and behavior """

import inspect
from models.base_model import BaseModel
import models.brand
from models.brand import Brand
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

    def test_annotations(self):
        """ Tests Brand methods to be type annotated """
        base = BaseModel()
        methods = inspect.getmembers(base, predicate=inspect.ismethod)

        for m_name, method in methods:
            if m_name != "__init__":
                type_hints = get_type_hints(method)
                self.assertTrue(
                        type_hints, f"{m_name} is missing type annotations")

    def test_module_documentation(self):
        """Test for the existence of module docstring"""
        self.assertIsNot(module_doc, None,
                         "brand.py needs a docstring")
        self.assertIsNot(module_doc, len(module_doc) < 1,
                         "brand.py needs a docstring")

    def test_class_documentation(self):
        """Test for the Brnad class docstring"""
        self.assertIsNot(BaseModel.__doc__, None,
                         "Brand class needs a docstring")
        self.assertFalse(len(BaseModel.__doc__) < 1,
                         "Brand class needs a docstring")


class TestBrand(unittest.TestCase):
    """ Tests Brand for the correct attrs and behavior """

    def test_inheritance(self):
        """ Tests for inheritance from basemodel """
        self.assertTrue(issubclass(Brand, BaseModel))

    def test_has_attr_types(self):
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
