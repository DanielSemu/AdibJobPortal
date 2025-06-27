from django.contrib.auth import get_user_model
from django_auth_ldap.backend import LDAPBackend
from ldap import LDAPError
import logging
from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import ApplicantUser

from rest_framework_simplejwt.settings import api_settings

class ApplicantJWTAuthentication(JWTAuthentication):
    def get_user(self, validated_token):
        try:
            user_id_claim = api_settings.USER_ID_CLAIM
            user_id = validated_token[user_id_claim]
            return ApplicantUser.objects.get(id=user_id)
        except ApplicantUser.DoesNotExist:
            return None


logger = logging.getLogger(__name__)
UserModel = get_user_model()

class RegisteredLDAPBackend(LDAPBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        if not username or not password:
            return None

        try:
            # ✅ Try LDAP authentication first
            ldap_user = super().authenticate(request, username, password, **kwargs)

            if ldap_user is None:
                logger.warning(f"LDAP authentication failed for {username}")
                return None

            # ✅ Now check if this user exists in the DB (don't auto-create)
            try:
                user = UserModel.objects.get(username=username)
                logger.info(f"User '{username}' authenticated and found in DB.")
                return user
            except UserModel.DoesNotExist:
                logger.warning(f"User '{username}' is authenticated by LDAP but not registered in DB.")
                return None

        except LDAPError as e:
            logger.error(f"LDAP error while authenticating '{username}': {e}")
            return None

        except Exception as e:
            logger.error(f"Unexpected error during authentication: {e}")
            return None




