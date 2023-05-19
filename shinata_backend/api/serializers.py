import base64

from django.core.files.base import ContentFile

from rest_framework import serializers
from rest_framework.relations import SlugRelatedField, PrimaryKeyRelatedField

from django.contrib.auth.hashers import make_password

from shinata.models import (Product, ProductsCategory, Record, Service, Category, Appointment,
                            Client, AppointmentsManager, ComplexServices)


class RecordSerializer(serializers.ModelSerializer):
    client = SlugRelatedField(slug_field='username', read_only=True)

    class Meta:
        fields = '__all__'
        model = Record

    def create(self, validated_data):
        client = validated_data.get('client')
        if client.records.exists():
            raise serializers.ValidationError(
                'У Вас уже есть запись на шиномонтаж. Отменить существующую запись можно в личном кабинете.'
            )
        record = Record.objects.create(**validated_data)
        return record


class RecordReadSerializer(serializers.ModelSerializer):
    client = SlugRelatedField(slug_field='username', read_only=True)
    appointment = SlugRelatedField(slug_field='dt', read_only=True)

    class Meta:
        fields = '__all__'
        model = Record


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = '__all__'


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = '__all__'
 
        
class ComplexServicesSerializer(serializers.ModelSerializer):
    services = ServiceSerializer(required=False, many=True)

    class Meta:
        model = ComplexServices
        fields = '__all__'


class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = ('id', 'email', 'username', 'password', 'phone', 'car_brand', 'car_model')

    def validate_password(self, value: str) -> str:
        return make_password(value)
    
    def create(self, validated_data):
        role = validated_data.get("role", 'user')
        users = {'user': {'is_staff': 0, 'is_superuser': 0},
                 'moderator': {'is_staff': 0, 'is_superuser': 0},
                 'admin': {'is_staff': 1, 'is_superuser': 0},
                 }
        return Client.objects.create(is_staff=users[role]['is_staff'],
                                   is_superuser=users[role]['is_superuser'],
                                   **validated_data)


class AppointmentsManagerSerializer(serializers.ModelSerializer):
    class Meta:
        model = AppointmentsManager
        fields = '__all__'
        

class Base64ImageField(serializers.ImageField):
    def to_internal_value(self, data):
        if isinstance(data, str) and data.startswith('data:image'):
            format, imgstr = data.split(';base64,')
            ext = format.split('/')[-1]
            data = ContentFile(base64.b64decode(imgstr), name='temp.' + ext)

        return super().to_internal_value(data)


class ProductSerializer(serializers.ModelSerializer):
    # image = Base64ImageField(required=False, allow_null=True)
    class Meta:
        model = Product
        fields = '__all__'
        

class ProductCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductsCategory
        fields = '__all__'
        
        

