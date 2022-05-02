from django.apps import AppConfig
from django.db.utils import ProgrammingError, IntegrityError
from django.contrib.auth.hashers import make_password

import logging

logger = logging.getLogger()


# class djangoApiConfig(AppConfig):
#     default_auto_field = 'django.db.models.BigAutoField'
#     name = 'Django_API'
#
#     @staticmethod
#     def db_initialized():
#         from .models import DBInitStatus
#         try:
#             if DBInitStatus.objects.count() == 0:
#                 DBInitStatus.objects.create(root_initialized=False)
#             return DBInitStatus.objects.get(id=1).root_initialized
#         except ProgrammingError as pe:
#             logger.error(pe)
#
#     @staticmethod
#     def mark_db_initialized():
#         from .models import DBInitStatus
#         try:
#             initialized = DBInitStatus.objects.get(id=1)
#             initialized.root_initialized = True
#             initialized.save()
#         except ProgrammingError as pe:
#             logger.error(pe)
#
#     def ready(self):
#         from .models import User
#         if not djangoApiConfig.db_initialized():
#             try:
#                 try:
#                     root = User.objects.create_superuser(username="root",
#                                                          password="root"
#                                                          )
#                     root.accessLevel = "root"
#                     root.is_active = False
#                     root.save()
#                     logger.info(msg="Created initial inactive root user with password root")
#                 except IntegrityError as ie:
#                     logger.error(ie)
#                 finally:
#                     djangoApiConfig.mark_db_initialized()
#             except ProgrammingError as pe:
#                 logger.error(pe)
