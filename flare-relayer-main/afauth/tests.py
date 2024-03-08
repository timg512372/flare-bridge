from django.test import TestCase


class ExampleTest(TestCase):
    def setUp(self):
        # Setup run before every test method.
        pass

    def tearDown(self):
        # Clean up run after every test method.
        pass

    def test_example(self):
        self.assertTrue(True)
