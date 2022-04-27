from rest_framework.permissions import BasePermission, SAFE_METHODS
from .models import User

import logging

logger = logging.getLogger()


class IsAssistant(BasePermission):

    def has_permission(self, request, view):
        if isinstance(request.user, User) \
                and request.user.accessLevel == 'assistant':
            return True
        return False


class IsAssistantReadOnly(BasePermission):

    def has_permission(self, request, view):
        if isinstance(request.user, User) \
                and request.user.accessLevel == 'assistant' \
                and request.method in SAFE_METHODS:
            return True
        return False


class IsAdmin(BasePermission):

    def has_permission(self, request, view):
        if isinstance(request.user, User) \
                and request.user.accessLevel == 'admin':
            return True
        return False


class IsAdminReadOnly(BasePermission):

    def has_permission(self, request, view):
        if isinstance(request.user, User) \
                and request.user.accessLevel == 'admin' \
                and request.method in SAFE_METHODS:
            return True
        return False


class IsRoot(BasePermission):
    def has_permission(self, request, view):
        if isinstance(request.user, User) \
                and request.user.accessLevel == 'root':
            return True
        return False


class IsPost(BasePermission):
    def has_permission(self, request, view):
        if request.method == "POST":
            return True
        return False
