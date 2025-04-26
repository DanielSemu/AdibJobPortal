from django.shortcuts import render # type: ignore
from rest_framework.views import APIView # type: ignore
from rest_framework.response import Response # type: ignore
from rest_framework.permissions import IsAuthenticated,AllowAny # type: ignore
from rest_framework import status # type: ignore
from rest_framework.exceptions import ValidationError # type: ignore
from django.contrib.auth.hashers import make_password # type: ignore
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView # type: ignore
from rest_framework_simplejwt.tokens import RefreshToken # type: ignore
from rest_framework.exceptions import AuthenticationFailed

from django.contrib.auth import get_user_model

User = get_user_model()

class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        try:
            response = super().post(request, *args, **kwargs)
            token_data = response.data

            if 'access' in token_data and 'refresh' in token_data:
                response.set_cookie(
                    key='refresh_token',
                    value=token_data['refresh'],
                    httponly=True,
                    # secure=True, # Uncomment in production
                    # samesite='Lax'
                )
                del token_data['refresh']
            return response
        except AuthenticationFailed as e:
            # Specific message for authentication failure
            return Response(
                {'detail': 'Invalid username or password.'},
                status=status.HTTP_401_UNAUTHORIZED
            )
        except Exception as e:
            # General error handler for other exceptions
            return Response(
                {'detail': 'An error occurred during login. Please try again.'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

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
            'email':user.email,
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
