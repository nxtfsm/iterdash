import os

class Config(object):
    """set flask env config variables"""
    FLASK_ENV = "development"
    TESTING = True
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'something-totally-unguessable'
    TEMPLATES_FOLDER = 'templates'
