#!/usr/bin/python3
""" Tests Brand for expected documentation, attributes and behavior """

from models.brand import Brand
import unittest


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
