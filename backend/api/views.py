

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.response import Response
from .jwt_cookie_helper import set_jwt_cookies
from django.http import JsonResponse
from rest_framework import generics
from accounts.serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated

class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        tokens = serializer.validated_data
        
        # Instead of returning JSON, set cookies
        response = Response({"detail": "Login successful"}, status=200)
        set_jwt_cookies(response, tokens['access'], tokens['refresh'])
        return response

class CustomTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        # The refresh token is now read from the cookie by the serializer if configured correctly (see below)
        serializer = self.get_serializer(data=request.data) 
        serializer.is_valid(raise_exception=True)
        tokens = serializer.validated_data

        # Instead of returning JSON, set a new access cookie
        response = Response({"detail": "Token refreshed successful"}, status=200)
        set_jwt_cookies(response, tokens['access'], tokens['refresh']) # Update both for good measure
        return response

class VerifyAuthStatusView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        # Return the currently authenticated user object
        return self.request.user

def logout_view(request):
    response = JsonResponse({"detail": "Logout successful"}, status=200)
    response.delete_cookie('access_token')
    response.delete_cookie('refresh_token')
    return response