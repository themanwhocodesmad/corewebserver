from datetime import timedelta
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.utils import timezone
from rest_framework_simplejwt.tokens import RefreshToken


@login_required
def generate_token(request):
    user = request.user
    refresh = RefreshToken.for_user(user)

    # Set the expiration time for the tokens
    access_token_lifetime = timedelta(days=2)
    refresh_token_lifetime = refresh.access_token.lifetime

    # Calculate the expiration datetime for the tokens
    access_token_expiration = timezone.now() + access_token_lifetime
    refresh_token_expiration = timezone.now() + refresh_token_lifetime

    response = {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
        'access_token_expiration': access_token_expiration,
        'refresh_token_expiration': refresh_token_expiration,
    }

    # You can add custom claims to the token response if needed
    # response['claim_key'] = 'claim_value'

    return JsonResponse(response)
