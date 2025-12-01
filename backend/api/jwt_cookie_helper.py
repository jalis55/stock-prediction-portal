# Helper function to set the cookie
from datetime import datetime, timedelta, timezone
from django.conf import settings



def set_jwt_cookies(response, access_token, refresh_token):
    # Set Access Token Cookie
    response.set_cookie(
        key='access_token',
        value=access_token,
        expires=datetime.now(timezone.utc) + settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'],
        secure=not settings.DEBUG,  # Use secure=True in production (HTTPS only)
        httponly=True,              # Essential for HttpOnly
        samesite='Lax'              # Mitigate CSRF
    )
    # Set Refresh Token Cookie
    response.set_cookie(
        key='refresh_token',
        value=refresh_token,
        expires=datetime.now(timezone.utc) + settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'],
        secure=not settings.DEBUG,
        httponly=True,
        samesite='Lax'
    )
