#!/usr/bin/python3
""" This module contains unit tests to be done to all objects """

import importlib
import models
import pep8 as pycodestyle
import pkgutil
import tests
import inspect
import unittest


class TestCommon(unittest.TestCase):
    """
    Tests for pycodestyle validation,
    type annotations
    documentation and
    the order of imports to be sorted alphabetically  # not yet
    """

    def test_pycodestyle(self):
        """ Tests for proper code styling """
        style = pycodestyle.StyleGuide()
        to_check = [models, tests]
        result = style.check_files(to_check)
        self.assertEqual(result.total_errors, 0, "Pycodestyle issues found")

    def test_annotations(self):
        """ Tests models methods to be type annotated """
        for name, obj in inspect.getmembers(models):
            if inspect.isclass(obj):
                for m_name, method in inspect.getmembers(
                    obj, inspect.ismethod):
                    signature = inspect.signature(method)
                    for p_name, param in signature.parameters.items():
                        self.assertTrue(
                            param.annotation != inspect.Parameter.empty,
                            f"""
                            Class: {name},
                                Method: {m_name},
                                    Parameter: {p_name}
                                        is missing type annotation
                            """
                            )

    def test_module_documentation(self):
        """ Test for the existence of docstrings within the package modules """
        for mod in pkgutil.iter_modules(models.__path__):
            if not mod.ispkg:
                module = importlib.import_module(f"{models.__name__}.{mod.name}")
                module_doc = module.__doc__

                self.assertIsNot(module_doc, None,
                                 f"{mod.name} needs a docstring")
                self.assertIsNot(module_doc, len(module_doc) < 1,
                                 f"{mod.name} needs a docstring")
                self.test_class_documentation(module)

    def test_class_documentation(self, module):
        """ Test for the existence of docstrings within the classes of a module """
        for name, obj in inspect.getmembers(module):
            if inspect.isclass(obj):
                class_doc = obj.__doc__
                self.assertIsNotNone(class_doc, f"{module.__name__}.{name} class needs a docstring")
                self.assertGreater(len(class_doc), 0, f"{module.__name__}.{name} class needs a docstring")
                self.test_methods_documentation()
    
    def test_methods_documentation(self, cls):
        """ Test for the existence of docstrings within the methods of a class """
        for name, method in inspect.getmembers(cls, inspect.ismethod):
            method_doc = method.__doc__
            self.assertIsNotNone(method_doc, f"{cls.__name__}.{name} method needs a docstring")
            self.assertGreater(len(method_doc), 0, f"{cls.__name__}.{name} method needs a docstring")