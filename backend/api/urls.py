from django.urls import path
from accounts import views as UserViews

# from rest_framework_simplejwt.views import (
#     TokenObtainPairView,
#     TokenRefreshView,
# )

from .views import CustomTokenObtainPairView, CustomTokenRefreshView,logout_view,VerifyAuthStatusView

urlpatterns = [
    
    # path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),
    path('verify-auth/', VerifyAuthStatusView.as_view(), name='verify_auth_status'),
    path('register/',UserViews.RegisterView.as_view()),
    path('logout/', logout_view, name='logout'),
    path('users/',UserViews.UserListView.as_view()),
     
]
