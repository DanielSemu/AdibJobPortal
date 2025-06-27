from django.contrib.auth import get_user_model
from django_auth_ldap.backend import LDAPBackend
from ldap import LDAPError
import logging

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
