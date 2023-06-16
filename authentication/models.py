from django.db import models
from django.contrib.auth.models import User

from rest_framework.authtoken.models import Token


class MyToken(Token):
    pass


class Token(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    refresh_token = models.TextField()
    access_token = models.TextField()
    access_token_expiration = models.DateTimeField()
    refresh_token_expiration = models.DateTimeField()
