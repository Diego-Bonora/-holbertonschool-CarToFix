#!/usr/bin/python3
""" Tests Base for expected documentation, attributes and behavior """

from models.base_model import BaseModel
from datetime import datetime
from typing import get_type_hints
import models.base_model
import unittest

module_doc = models.base_model.__doc__

class TestBaseModel(unittest.TestCase):
    """ Tests Base for the correct attrs and behavior """

    def test_has_attr_types(self):
        """ Tests Base for the correct attrs and types """
        base = BaseModel()
        self.assertIs(type(base), BaseModel)
        base.name = "Generic"
        exptd = {"id": str, "created_at": datetime, "name": str}

        for attr, typ in exptd.items():
            with self.subTest(attr=attr, typ=typ):
                self.assertIn(attr, base.__dict__)
                self.assertIs(type(base.__dict__[attr]), typ)

        self.assertEqual(base.name, "Generic")

    # Method Testing
    def test_str(self):
        """ Tests for the correct output of __str__ method """
        base = BaseModel()
        rtrnd = f"[{base.__class__.__name__}] ({base.id}) {base.__dict__}"
        self.assertEqual(rtrnd, str(base))

    def test_to_dict(self):
        """ Tests for the correct return value of to_dict() """
        base = BaseModel()
        base_dict = base.to_dict()
        self.assertEqual(base_dict["__class__"], "BaseModel")
        self.assertEqual(type(base_dict["created_at"]), str)
        self.assertEqual(
                base_dict["created_at"],
                base.created_at.strftime("%Y-%m-%dT%H:%M:%S.%f"))

if __name__ == "__main__":
    unittest.main()
