from django.shortcuts import render # type: ignore
from rest_framework.views import APIView # type: ignore
from rest_framework.response import Response # type: ignore
from rest_framework.permissions import IsAuthenticated,AllowAny # type: ignore
from rest_framework import status # type: ignore
from django.contrib.auth.hashers import make_password # type: ignore
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView # type: ignore
from rest_framework_simplejwt.tokens import RefreshToken # type: ignore
from .models import ApplicantUser 
from django.contrib.auth.hashers import check_password

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
            
            if not user.is_active:
                return Response({'detail': 'This user is inactive.'}, status=status.HTTP_403_FORBIDDEN)

            if not check_password(password, user.password):
                return Response({'detail': 'Invalid email or password.'}, status=status.HTTP_401_UNAUTHORIZED)
            print(user)
        except ApplicantUser.DoesNotExist:
            return Response({'detail': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)

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


class ApplicantTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        refresh_token = request.COOKIES.get('refresh_token')
        if not refresh_token:
            return Response({'error': 'No refresh token found'}, status=status.HTTP_400_BAD_REQUEST)

        request.data['refresh'] = refresh_token
        response = super().post(request, *args, **kwargs)

        if response.status_code == 200:
            return Response({
                'access': response.data['access']
            })

        return response
    
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
        return Response({'detail': 'Applicant registered successfully.'}, status=status.HTTP_201_CREATED)

   
class ApplicantProfileView(APIView):
    permission_classes = [IsAuthenticated]  # Only authenticated users

    def get(self, request):
        user = request.user
        print(user)
        if not isinstance(user, ApplicantUser):
            return Response({'detail': 'Invalid user type.'}, status=status.HTTP_403_FORBIDDEN)

        return Response({
            'email': user.email,
            'full_name': user.full_name,
            'birthdate': user.birthdate,
            'phone_number': user.phone_number,
            'gender': user.gender,
            'is_active': user.is_active,
        })