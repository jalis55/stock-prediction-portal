from django.shortcuts import render
from .serializers import UserSerializer
from rest_framework import generics
from rest_framework.permissions import AllowAny,IsAdminUser
from django.contrib.auth.models import User

# Create your views here.

class RegisterView(generics.CreateAPIView):
    queryset= User.objects.all()
    serializer_class=UserSerializer
    permission_classes=[AllowAny]

class UserListView(generics.ListAPIView):
    queryset= User.objects.all()
    serializer_class=UserSerializer
    permission_classes=[IsAdminUser]