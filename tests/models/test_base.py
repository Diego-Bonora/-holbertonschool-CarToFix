#!/usr/bin/python3
""" Tests Base for expected documentation, attributes and behavior """

from models.base import BaseModel
import unittest


class TestBaseModelDoc(unittest.TestCase):
    """ Tests for documentation of Base """  # It will also check pep8
    pass

class TestBaseModel(unittest.TestCase):
    """ Tests Base for the correct attrs and behavior """

    def test_has_attr_types(self):
        """ Tests Base for the correct attrs and types """
        base = BaseModel()
        self.assertIs(type(base), Base)
        inst.name = "Generic"
        #exptd = { "id": str, "now": datetime, "name": str } ??

        for attr, typ in exptd.items():
            with self.subTest(attr=attr, typ=typ):
                self.assertIn(attr, base.__dict__)
                self.assertIs(type(base.__dict__[attr]), typ)
    
        self.assertEqual(inst.name, "Generic")

    def test_now(self):  # To define
        """ Tests for changes in now attr when updated """
        pass

    # Method Testing
    def test_str(self): # To define
        """ Tests for the correct output of __str__ method """
        base = BaseModel()
        rtrnd =  f"[{base.__class__.__name__}] ({base.id}) {base.__dict__}"
        self.assertEqual(rtrnd, str(base))

    def test_to_dict(self):
        """ Tests for the correct return value of to_dict() """
        base = BaseModel()
        base_dict = base.to_dict()
        self.assertEqual(base_dit["__class__"], "BaseModel")
        #self.assertEqual(type(base_dict["now"]), str) ?? 
        #self.assertEqual(new_d["now"], bm.created_at.strftime("%Y-%m-%dT%H:%M:%S.%f")) ??

    def test_save(self):
        """ Tests ... """
        pass  # ??

