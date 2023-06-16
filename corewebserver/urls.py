from django.contrib import admin
from django.urls import path, include
from .views import generate_token

urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include("allauth.urls")),
    path('generate-token/', generate_token, name='generate_token'),
    path('',include('authentication.urls'))
]
