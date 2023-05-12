from django.contrib.auth.forms import UserCreationForm, UserChangeForm

from shinata.models import Client


class CustomUserCreationForm(UserCreationForm):

    class Meta:
        model = Client
        fields = ('role', 'phone', 'car_brand', 'car_model')


class CustomUserChangeForm(UserChangeForm):

    class Meta:
        model = Client
        fields = ('role', 'phone', 'car_brand', 'car_model')