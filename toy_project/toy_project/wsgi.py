import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'toy_project.settings_mysql')

application = get_wsgi_application()
