from rest_framework.permissions import BasePermission


class IsAdminRole(BasePermission):
    
    def has_permission(self,request, view):
        return request.user.is_authenticated and request.user.role == 'admin'
class ViewJobRole(BasePermission):
    
    def has_permission(self,request, view):
        return request.user.is_authenticated and (request.user.role == 'hr_maker' or request.user.role == 'hr_checker')
    
class IsHrCheckerRole(BasePermission):
    
    def has_permission(self,request, view):
        return request.user.is_authenticated and request.user.role == 'hr_checker'