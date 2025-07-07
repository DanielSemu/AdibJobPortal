from django.shortcuts import render # type: ignore
from rest_framework.views import APIView # type: ignore
from rest_framework.response import Response # type: ignore
from rest_framework.permissions import IsAuthenticated,AllowAny # type: ignore
from rest_framework import status # type: ignore
from django.contrib.auth.hashers import make_password # type: ignore
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView # type: ignore
from rest_framework_simplejwt.tokens import RefreshToken,TokenError # type: ignore
from .models import ApplicantUser 
from django.contrib.auth.hashers import check_password
from .backends import ApplicantJWTAuthentication
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from django.utils import timezone
from datetime import timedelta

from django.contrib.auth import get_user_model

import requests

def validate_with_ldap(username, password):
    try:
        url = 'http://192.168.6.63:2000/api/Ldap/users/validate'
        payload = {'username': username, 'password': password}
        response = requests.post(url, json=payload)

        if response.status_code == 200:
            return response.json().get('isValid', False)
        return False
    except Exception:
        return False



User = get_user_model()

class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')

        if not username or not password:
            return Response({'detail': 'Username and password are required.'}, status=status.HTTP_400_BAD_REQUEST)

        # ✅ Step 1: Check user exists locally
        try:
            user = User.objects.get(username=username)

            if not user.is_active:
                return Response({'detail': 'This user is inactive.'}, status=status.HTTP_403_FORBIDDEN)

        except User.DoesNotExist:
            return Response({'detail': 'User is not registered in this system.'}, status=status.HTTP_403_FORBIDDEN)

        # ✅ Step 2: Validate credentials via LDAP
        if not validate_with_ldap(username, password):
            return Response({'detail': 'Invalid username or password.'}, status=status.HTTP_401_UNAUTHORIZED)

        # ✅ Step 3: Generate JWT
        refresh = RefreshToken.for_user(user)
        response = Response({
            'access': str(refresh.access_token),
        })

        response.set_cookie(
            key='refresh_token',
            value=str(refresh),
            httponly=True,
            # secure=True,
            # samesite='Lax'
        )

        return response

class CustomTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        # Extract the refresh token from cookies
        refresh_token = request.COOKIES.get('refresh_token')
        if not refresh_token:
            return Response({'error': 'No refresh token found'}, status=400)
        
        # Inject the refresh token into the request data
        request.data['refresh'] = refresh_token

        # Call the parent method to refresh the access token
        response = super().post(request, *args, **kwargs)
        
        # Only send the new access token without user information
        if response.status_code == 200:
            return Response({
                'access': response.data['access']
            })
        
        return response


class UserProfileView(APIView):
    permission_classes=[IsAuthenticated]
    
    def get(self,request):
        user=request.user
        return Response({
            'full_name':user.full_name,
            'username':user.username,
            'birthdate':user.birthdate,
            'phone_number':user.phone_number,
            'gender':user.gender,
            'role':user.role
        })
        
class RegisterUserView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request, *args, **kwargs):
        data = request.data
        
        # Validate required fields
        full_name = data.get('full_name')
        email = data.get('email')
        birthdate = data.get('birthdate')
        phone_number = data.get('phone_number')
        gender = data.get('gender')
        
        password = data.get('password')
        
        if not full_name or not email or not password:
            return Response(
                {"error": "full_name, email, and password are required fields."},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        if User.objects.filter(email=email).exists():
            return Response(
                {"error": "A user with this email is already registered."},
                status=status.HTTP_409_CONFLICT
            )
        
        # Check if email already exists
        if User.objects.filter(email=email).exists():
            return Response(
                {"error": "A user with this email is already registered."},
                status=status.HTTP_409_CONFLICT
            )
        
        # Create user
        user = User.objects.create(
            full_name=full_name,
            email=email,
            birthdate=birthdate,
            phone_number=phone_number,
            gender=gender,
            
            password=make_password(password),
        )
        
        # Return a success response
        return Response(
            {   
                "success":True,
                "message": "User registered successfully.",
                "user": {
                    "id": user.id,
                    "full_name": user.full_name,
                    "email": user.email,
                },
            },
            status=status.HTTP_201_CREATED
        )
        
# class LogoutView(APIView):
#     permission_classes=[IsAuthenticated]
#     def post(self, request):
#         response = Response({'message': 'Logged out successfully'}, status=200)
#         response.delete_cookie('refresh_token')
#         return response
class LogoutView(APIView):
    """
    Handles user logout by clearing the access and refresh tokens stored in HttpOnly cookies.
    """
    def post(self, request, *args, **kwargs):
        response = Response({"message": "Logged out successfully"}, status=status.HTTP_200_OK)
        
        # Clear the access token cookie
        response.delete_cookie('access_token')
        
        # Clear the refresh token cookie if used
        response.delete_cookie('refresh_token')
        
        
        return response
    
    
    
    
    #=========================
    # Applicant User Management
    #==========================
    
    
class ApplicantTokenObtainPairView(APIView):
    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        password = request.data.get('password')

        if not email or not password:
            return Response({'detail': 'Email and password are required.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = ApplicantUser.objects.get(email=email)
        except ApplicantUser.DoesNotExist:
            return Response({'detail': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)

        # 🔒 Check lock status
        if user.locked_until and timezone.now() < user.locked_until:
            remaining = user.locked_until - timezone.now()
            return Response({
                'detail': f'Account is locked. Try again after {int(remaining.total_seconds() // 60)} minutes.'
            }, status=status.HTTP_403_FORBIDDEN)

        if not user.is_active:
            return Response({'detail': 'This user is inactive.'}, status=status.HTTP_403_FORBIDDEN)

        if not check_password(password, user.password):
            user.failed_login_attempts += 1

            # Lock account after 5 failed attempts
            if user.failed_login_attempts >= 5:
                user.locked_until = timezone.now() + timedelta(minutes=15)  # Lock for 15 minutes
                user.save()
                return Response({
                    'detail': 'Account locked due to too many failed login attempts. Try again later.'
                }, status=status.HTTP_403_FORBIDDEN)

            user.save()
            return Response({'detail': 'Invalid emailX or password.'}, status=status.HTTP_401_UNAUTHORIZED)

        # ✅ Successful login: reset counters
        user.failed_login_attempts = 0
        user.locked_until = None
        user.save()

        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)

        response = Response({
            'access': access_token
        }, status=status.HTTP_200_OK)

        # Set refresh token as HttpOnly cookie
        response.set_cookie(
            key='refreshToken',
            value=str(refresh),
            httponly=True,
            secure=False,  # True in production (HTTPS only)
            samesite='Lax',
            # max_age=7 * 24 * 60 * 60,
        )

        return response

class ApplicantTokenRefreshView(APIView):
    def post(self, request, *args, **kwargs):
        refresh_token = request.COOKIES.get('refreshToken')

        if not refresh_token:
            return Response({'error': 'No refresh token found'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            refresh = RefreshToken(refresh_token)
            access = str(refresh.access_token)

            return Response({
                'access': access
            }, status=status.HTTP_200_OK)

        except TokenError as e:
            return Response({'error': 'Invalid or expired refresh token'}, status=status.HTTP_401_UNAUTHORIZED)

    
class ApplicantRegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        data = request.data
        required_fields = ['email', 'full_name', 'password', 'confirm_password']

        # Check required fields presence
        for field in required_fields:
            if not data.get(field):
                return Response({field: 'This field is required.'}, status=status.HTTP_400_BAD_REQUEST)

        # Password confirmation check
        if data['password'] != data['confirm_password']:
            return Response({'detail': 'Passwords do not match.'}, status=status.HTTP_400_BAD_REQUEST)

        # Check if user exists
        if ApplicantUser.objects.filter(email=data['email']).exists():
            return Response({'detail': 'User with this email already exists.'}, status=status.HTTP_400_BAD_REQUEST)

        # Create user with optional fields
        user = ApplicantUser.objects.create_user(
            email=data['email'],
            full_name=data['full_name'],
            password=data['password'],
            birthdate=data.get('birthdate'),
            phone_number=data.get('phone_number', ''),
            gender=data.get('gender'),
        )
        return Response({
            'success': True,
            'message': 'Applicant registered successfully.'
        }, status=status.HTTP_201_CREATED)


   
class ApplicantProfileView(APIView):
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
            'is_active': user.is_active,
        })

class CheckUserExists(APIView):
    def post(self, request):
        email = request.data.get("email")
        phone = request.data.get("phone")
        print(phone)
        print(email)
        if not email or not phone:
            return Response({
                "success": False,
                "message": "Email and phone number are required."
            }, status=status.HTTP_400_BAD_REQUEST)

        user_exists = ApplicantUser.objects.filter(email=email, phone_number=phone).exists()
        print(user_exists)

        if user_exists:
            return Response({
                "success": True,
                "message": "User found."
            }, status=status.HTTP_200_OK)
        else:
            return Response({
                "success": False,
                "message": "User not found with provided email and phone number."
            }, status=status.HTTP_404_NOT_FOUND)
            
class ResetPasswordView(APIView):
    def post(self, request):
        email = request.data.get("email")
        phone = request.data.get("phone")
        new_password = request.data.get("new_password")

        if not email or not phone or not new_password:
            return Response({
                "success": False,
                "message": "Email, phone, and new password are required."
            }, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = ApplicantUser.objects.get(email=email, phone_number=phone)

            # Optional: Validate password strength using Django's built-in validators
            try:
                validate_password(new_password, user=user)
            except ValidationError as ve:
                return Response({
                    "success": False,
                    "message": ve.messages[0]
                }, status=status.HTTP_400_BAD_REQUEST)

            user.set_password(new_password)
            user.save()

            return Response({
                "success": True,
                "message": "Password reset successful."
            }, status=status.HTTP_200_OK)

        except ApplicantUser.DoesNotExist:
            return Response({
                "success": False,
                "message": "User not found with provided email and phone number."
            }, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response({
                "success": False,
                "message": str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


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