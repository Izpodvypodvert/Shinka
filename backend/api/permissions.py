from rest_framework.permissions import BasePermission, SAFE_METHODS

from shinka.models import ADMIN, MODERATOR


class IsAdmin(BasePermission):

    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        if not (request.user and request.user.is_authenticated):
            return False
        return (request.user.role == ADMIN
                or request.user.is_superuser)
    
        
class IsAdminOrReadOnly(BasePermission):
    def has_permission(self, request, view):
        return bool(
            request.method in SAFE_METHODS or
            request.user.role == ADMIN or
            request.user.is_superuser
        )



class IsAdminOrModerator(BasePermission):

    def has_permission(self, request, view):
        if not (request.user and request.user.is_authenticated):
            return False
        return (request.user.role == MODERATOR
                or request.user.is_superuser)


class IsAdminOrModeratorOrAuthor(BasePermission):
    def has_permission(self, request, view):
        return (
            request.method in SAFE_METHODS
            or request.user.is_authenticated
        )

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        return (obj.author == request.user
                or request.user.role == MODERATOR
                or request.user.role == ADMIN
                or request.user.role == SUPERUSER)
        