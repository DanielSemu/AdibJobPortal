from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status
from django.contrib.auth.hashers import make_password, check_password
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from .models import ApplicantUser
from .backends import ApplicantJWTAuthentication
from .permissions import IsAdminRole
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from django.utils import timezone
from datetime import timedelta
from django.contrib.auth import get_user_model
import requests

User = get_user_model()

# ==========================
# Utility Functions
# ==========================

def validate_with_ldap(username, password):
    """Validate user credentials against an LDAP server."""
    try:
        url = 'http://192.168.6.63:2000/api/Ldap/users/validate'
        payload = {'username': username, 'password': password}
        response = requests.post(url, json=payload)
        return response.status_code == 200 and response.json().get('isValid', False)
    except Exception:
        return False

# ==========================
# Internal User Views
# ==========================

class InternalTokenObtainPairView(TokenObtainPairView):
    """Handle JWT token generation for internal users (username-based)."""
    def post(self, request, *args, **kwargs):
        username = request.data.get('username', '').lower()
        password = request.data.get('password')

        if not username or not password:
            return Response(
                {'detail': 'Username and password are required.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Check if user exists locally
        try:
            user = User.objects.get(username=username)
            if not user.is_active:
                return Response(
                    {'detail': 'This user is inactive.'},
                    status=status.HTTP_403_FORBIDDEN
                )
        except User.DoesNotExist:
            return Response(
                {'detail': 'User is not registered in this system.'},
                status=status.HTTP_403_FORBIDDEN
            )

        # Validate credentials via LDAP
        if not validate_with_ldap(username, password):
            return Response(
                {'detail': 'Invalid username or password.'},
                status=status.HTTP_401_UNAUTHORIZED
            )

        # Generate JWT tokens
        refresh = RefreshToken.for_user(user)
        response = Response({'access': str(refresh.access_token)})
        response.set_cookie(
            key='refresh_token',
            value=str(refresh),
            httponly=True,
            secure=False,  # Set to True in production
            samesite='Lax'
        )
        return response

class InternalTokenRefreshView(TokenRefreshView):
    """Refresh JWT access token for internal users."""
    def post(self, request, *args, **kwargs):
        refresh_token = request.COOKIES.get('refresh_token')
        if not refresh_token:
            return Response(
                {'error': 'No refresh token found'},
                status=status.HTTP_400_BAD_REQUEST
            )

        request.data['refresh'] = refresh_token
        response = super().post(request, *args, **kwargs)
        if response.status_code == 200:
            return Response({'access': response.data['access']})
        return response

class InternalUserView(APIView):
    """Manage internal users (username-based): register, list, and update applicant roles."""
    permission_classes = [IsAuthenticated,IsAdminRole]  # Restricted to authenticated users


    def post(self, request):
        """Register a new internal user."""
        data = request.data
        username = data.get('username')
        full_name = data.get('full_name')
        phone_number = data.get('phone_number')
        birthdate = data.get('birthdate')
        gender = data.get('gender')
        role = data.get('role')
        email = data.get('email')
        department = data.get('department')
        # Validate required fields
        if not all([username, full_name, phone_number]):
            return Response(
                {"error": "Username, full_name, and phone number are required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Check if user already exists
        if User.objects.filter(username=username).exists():
            return Response(
                {"error": "User already registered"},
                status=status.HTTP_409_CONFLICT
            )

        # Validate role
        valid_roles = [choice[0] for choice in User.ROLE_CHOICES]
        if role and role not in valid_roles:
            return Response(
                {"error": f"Invalid role. Must be one of: {', '.join(valid_roles)}"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Validate gender
        valid_genders = [choice[0] for choice in User.GENDER_CHOICES]
        if gender and gender not in valid_genders:
            return Response(
                {"error": f"Invalid gender. Must be one of: {', '.join(valid_genders)}"},
                status=status.HTTP_400_BAD_REQUEST
            )

        
        try:
            # Prepare extra fields
            extra_fields = {
                'birthdate': birthdate,
                'phone_number': phone_number,
                'gender': gender,
                'role': role or 'user',
                'email': email,
                'department': department
            }
            extra_fields = {k: v for k, v in extra_fields.items() if v is not None}

            # Create user 
            user = User.objects.create_user(
                username=username,
                full_name=full_name,
                **extra_fields
            )

            # Prepare response data
            response_data = {
                'username': user.username,
                'full_name': user.full_name,
                'department': getattr(user, 'department', 'Not provided'),
                'role': user.role,
                'is_active': user.is_active,
                'email': user.email,
                'birthdate': user.birthdate,
                'phone_number': user.phone_number,
                'gender': user.gender
            }

            return Response(
                {"message": "User created successfully", "data": response_data},
                status=status.HTTP_201_CREATED
            )
        except ValueError as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )
        except Exception as e:
            return Response(
                {"error": f"An error occurred during registration: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
            
    def get(self, request):
        """Retrieve a list of all internal and applicant users."""
        try:
            # Fetch internal users
            internal_users = User.objects.all().values(
                'username', 'full_name','department', 'role', 'is_active', 'email',
                'birthdate', 'phone_number', 'gender','last_login',
            )
            # # Fetch applicant users
            # applicant_users = ApplicantUser.objects.all().values(
            #     'email', 'full_name', 'is_active', 'birthdate', 'phone_number', 'gender'
            # )

            # Combine and format response
            response_data = {
                'internal_users': list(internal_users),
                # 'applicant_users': list(applicant_users)
            }
            return Response(
                {"message": "Users retrieved successfully", "data": response_data},
                status=status.HTTP_200_OK
            )
        except Exception as e:
            return Response(
                {"error": f"An error occurred while retrieving users: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def put(self, request):
        """Update the role of an applicant user."""
        data = request.data
        username = data.get('username')
        new_role = data.get('role')

        # Validate required fields
        if not username or not new_role:
            return Response(
                {"error": "Username and role are required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Validate role
        valid_roles = [choice[0] for choice in User.ROLE_CHOICES]
        if new_role not in valid_roles:
            return Response(
                {"error": f"Invalid role. Must be one of: {', '.join(valid_roles)}"},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            # Find applicant user by email
            user = User.objects.get(username=username)
            user.role = new_role
            user.save()

            # Prepare response data
            response_data = {
                'email': user.email,
                'full_name': user.full_name,
                'role': user.role,
                'is_active': user.is_active,
                'birthdate': user.birthdate,
                'phone_number': user.phone_number,
                'gender': user.gender
            }
            return Response(
                {"message": "User role updated successfully", "data": response_data},
                status=status.HTTP_200_OK
            )
        except User.DoesNotExist:
            return Response(
                {"error": "User with this username not found"},
                status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return Response(
                {"error": f"An error occurred while updating role: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class InternalUserProfileView(APIView):
    """Retrieve profile details for internal users."""
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({
            'full_name': user.full_name,
            'username': user.username,
            'birthdate': user.birthdate,
            'phone_number': user.phone_number,
            'gender': user.gender,
            'role': user.role
        })

# ==========================
# Applicant User Views
# ==========================

class ApplicantTokenObtainPairView(APIView):
    """Handle JWT token generation for applicants (email-based)."""
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        password = request.data.get('password')

        if not email or not password:
            return Response(
                {'detail': 'Email and password are required.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            user = ApplicantUser.objects.get(email=email)
        except ApplicantUser.DoesNotExist:
            return Response(
                {'detail': 'User not found.'},
                status=status.HTTP_404_NOT_FOUND
            )

        # Check lock status
        if user.locked_until and timezone.now() < user.locked_until:
            remaining = user.locked_until - timezone.now()
            return Response(
                {'detail': f'Account is locked. Try again after {int(remaining.total_seconds() // 60)} minutes.'},
                status=status.HTTP_403_FORBIDDEN
            )

        if not user.is_active:
            return Response(
                {'detail': 'This user is inactive.'},
                status=status.HTTP_403_FORBIDDEN
            )

        if not check_password(password, user.password):
            user.failed_login_attempts += 1
            if user.failed_login_attempts >= 5:
                user.locked_until = timezone.now() + timedelta(minutes=15)
                user.save()
                return Response(
                    {'detail': 'Account locked due to too many failed login attempts. Try again later.'},
                    status=status.HTTP_403_FORBIDDEN
                )
            user.save()
            return Response(
                {'detail': 'Invalid email or password.'},
                status=status.HTTP_401_UNAUTHORIZED
            )

        # Successful login: reset counters
        user.failed_login_attempts = 0
        user.locked_until = None
        user.save()

        # Generate JWT tokens
        refresh = RefreshToken.for_user(user)
        response = Response({'access': str(refresh.access_token)})
        response.set_cookie(
            key='refreshToken',
            value=str(refresh),
            httponly=True,
            secure=False,  # Set to True in production
            samesite='Lax'
        )
        return response

class ApplicantTokenRefreshView(APIView):
    """Refresh JWT access token for applicants."""
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        refresh_token = request.COOKIES.get('refreshToken')
        if not refresh_token:
            return Response(
                {'error': 'No refresh token found'},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            refresh = RefreshToken(refresh_token)
            access = str(refresh.access_token)
            return Response({'access': access}, status=status.HTTP_200_OK)
        except TokenError:
            return Response(
                {'error': 'Invalid or expired refresh token'},
                status=status.HTTP_401_UNAUTHORIZED
            )

class ApplicantRegisterView(APIView):
    """Register new applicants (email-based, public-facing)."""
    permission_classes = [AllowAny]

    def post(self, request):
        data = request.data
        required_fields = ['email', 'full_name', 'password', 'confirm_password']

        # Validate required fields
        for field in required_fields:
            if not data.get(field):
                return Response(
                    {field: 'This field is required.'},
                    status=status.HTTP_400_BAD_REQUEST
                )

        # Password confirmation check
        if data['password'] != data['confirm_password']:
            return Response(
                {'detail': 'Passwords do not match.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Check if user exists
        if ApplicantUser.objects.filter(email=data['email']).exists():
            return Response(
                {'detail': 'User with this email already exists.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            # Validate password strength
            validate_password(data['password'])
        except ValidationError as ve:
            return Response(
                {'detail': ve.messages[0]},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            # Create user
            user = ApplicantUser.objects.create_user(
                email=data['email'],
                full_name=data['full_name'],
                password=data['password'],
                birthdate=data.get('birthdate'),
                phone_number=data.get('phone_number', ''),
                gender=data.get('gender')
            )
            return Response(
                {'success': True, 'message': 'Applicant registered successfully.'},
                status=status.HTTP_201_CREATED
            )
        except Exception as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class ApplicantProfileView(APIView):
    """Retrieve profile details for applicants."""
    authentication_classes = [ApplicantJWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({
            'email': user.email,
            'full_name': user.full_name,
            'birthdate': user.birthdate,
            'phone_number': user.phone_number,
            'gender': user.gender,
            'is_active': user.is_active
        })

class LogoutView(APIView):
    """Handle logout for applicants by clearing tokens."""
    authentication_classes = [ApplicantJWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        response = Response(
            {'success': True, 'message': 'Logged out successfully.'},
            status=status.HTTP_200_OK
        )
        response.delete_cookie('refreshToken')
        response.delete_cookie('access_token')
        return response

class CheckUserExistsView(APIView):
    """Check if an applicant exists by email and phone number."""
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')
        phone = request.data.get('phone')
        if not email or not phone:
            return Response(
                {'success': False, 'message': 'Email and phone number are required.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        user_exists = ApplicantUser.objects.filter(email=email, phone_number=phone).exists()
        if user_exists:
            return Response(
                {'success': True, 'message': 'User found.'},
                status=status.HTTP_200_OK
            )
        return Response(
            {'success': False, 'message': 'User not found with provided email and phone number.'},
            status=status.HTTP_404_NOT_FOUND
        )

class ResetPasswordView(APIView):
    """Reset password for applicants using email and phone number."""
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')
        phone = request.data.get('phone')
        new_password = request.data.get('new_password')

        if not all([email, phone, new_password]):
            return Response(
                {'success': False, 'message': 'Email, phone, and new password are required.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            user = ApplicantUser.objects.get(email=email, phone_number=phone)
            validate_password(new_password, user=user)
            user.set_password(new_password)
            user.save()
            return Response(
                {'success': True, 'message': 'Password reset successful.'},
                status=status.HTTP_200_OK
            )
        except ApplicantUser.DoesNotExist:
            return Response(
                {'success': False, 'message': 'User not found with provided email and phone number.'},
                status=status.HTTP_404_NOT_FOUND
            )
        except ValidationError as ve:
            return Response(
                {'success': False, 'message': ve.messages[0]},
                status=status.HTTP_400_BAD_REQUEST
            )
        except Exception as e:
            return Response(
                {'success': False, 'message': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    
class ApplicantLogoutView(APIView):

    def post(self, request):
        response = Response({
            'success': True,
            'message': 'Logged out successfully.'
        }, status=status.HTTP_200_OK)
        response.delete_cookie('refreshToken')
        # Clear cookies
        response.delete_cookie(
            key='refreshToken',
        )
        response.delete_cookie('access_token')  # if you ever set it
         # if you ever set it

        return response