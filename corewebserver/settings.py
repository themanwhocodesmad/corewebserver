
import os
from datetime import timedelta
from pathlib import Path

import authentication.apps

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-xe$qgh2!y+j+m5!&=m_@pu_*wlv0a!(-z6e&kvemsrt0z^uxco'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['*']


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.sites',  # Add this

    'rest_framework',
    'rest_framework_simplejwt',

    'allauth',
    'allauth.account',
    'allauth.socialaccount',
    # include the providers you want to enable:
    'allauth.socialaccount.providers.google',

    # My apps
    'authentication',

]

SITE_ID = 2

SOCIALACCOUNT_PROVIDERS = {
    'google': {
        'SCOPE': [
            'profile',
            'email',
        ],
        'AUTH_PARAMS': {
            'access_type': 'online',
            'device_id': '',
            'device_name': '',
        },
        'APP': {
            'client_id': '802414300058-0lnt7gojasm3145c9eln6s5beq27j4l3.apps.googleusercontent.com',
            'secret': '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',
            'key': ''
        },
        'EXCHANGE_AUTH_TOKEN': True,
        'ACCESS_TOKEN_METHOD': 'POST',
        'REQUEST_TOKEN_METHOD': 'POST',
    }
}

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'corewebserver.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates']
        ,
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

# Django Rest Framework
# Django Rest Framework
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        # 'rest_framework.authentication.BasicAuthentication',
        # 'rest_framework.authentication.SessionAuthentication',
        # 'rest_framework.authentication.TokenAuthentication',
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
    'DEFAULT_RENDERER_CLASSES': [
        'rest_framework.renderers.JSONRenderer',
        'rest_framework.renderers.AdminRenderer',
    ]
}

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=60),  # Set the desired lifetime for the access token
    'REFRESH_TOKEN_LIFETIME': timedelta(days=30),  # Set the desired lifetime for the refresh token
}

WSGI_APPLICATION = 'corewebserver.wsgi.application'

CSRF_TRUSTED_ORIGINS = [
    'https://corewebserver-production.up.railway.app'
]



# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

# social app custom settings
LOGIN_REDIRECT_URL = 'http://corewebserver-production.up.railway.app/generate-token/'
LOGIN_URL = 'http://corewebserver-production.up.railway.app/google/login/?process=login'

# Additional configuration settings
SOCIALACCOUNT_QUERY_EMAIL = True
SOCIALACCOUNT_QUERY_PASSWORD = True
ACCOUNT_LOGOUT_ON_GET= True
ACCOUNT_UNIQUE_EMAIL = True
ACCOUNT_EMAIL_REQUIRED = True

AUTHENTICATION_BACKENDS = [
    'django.contrib.auth.backends.ModelBackend',
    'allauth.account.auth_backends.AuthenticationBackend'
]

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'railway',
        'USER': 'postgres',
        'PASSWORD': 'n7PMj0IKUMFFAG8yn04T',
        'HOST': 'containers-us-west-188.railway.app',
        'PORT': '6977',
    }
}


# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/

STATIC_URL = 'static/'
STATICFILES_DIRS = [os.path.join(BASE_DIR, 'static')]
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
