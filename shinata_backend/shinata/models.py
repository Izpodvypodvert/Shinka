from datetime import time
from django.dispatch import receiver

from django.utils import timezone
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db.models.signals import pre_delete 
from django.core.exceptions import ValidationError

from phonenumber_field.modelfields import PhoneNumberField

from api.utils import get_datetimes


ADMIN = 'admin'
MODERATOR = 'moderator'
USER = 'user'
SUPERUSER = 'superuser'

ROLES_CHOICES = [
    (ADMIN, ADMIN),
    (MODERATOR, MODERATOR),
    (USER, USER),
    (SUPERUSER, SUPERUSER),
]


class Client(AbstractUser):
    role = models.CharField(
        'Роль',
        max_length=9,
        choices=ROLES_CHOICES,
        default='user',
    )
    phone = PhoneNumberField('Телефон', null=False, blank=False, unique=True)
    car_brand = models.CharField('Марка автомобиля', max_length=200)
    car_model = models.CharField('Модель автомобиля', max_length=200)

    def __str__(self):
        return (f'Клиент: {self.username}, Телефон: {self.phone}, Почта: {self.email} '
                f'Марка авто: {self.car_brand}, Модель авто: {self.car_model}')

    class Meta:
        verbose_name = 'Клиент'
        verbose_name_plural = 'Клиенты'


class Appointment(models.Model):
    dt = models.DateTimeField(
        'Дата приёма', unique=True
    )
    reserved = models.BooleanField('Зарезервировано клиентом', default=False)
    manager = models.ForeignKey(
        'AppointmentsManager', on_delete=models.CASCADE, related_name='appointments'
    )
    expired = models.BooleanField(default=False)

    def __str__(self):
        if self.reserved:
            return f'{self.dt.strftime("%d/%m/%Y %H:%M")} Зарезервировано клиентом.'
        return f'{self.dt.strftime("%d/%m/%Y %H:%M")}'

    class Meta:
        verbose_name = 'Назначение'
        verbose_name_plural = 'Назначения'
        ordering = ['dt']


class AppointmentsManager(models.Model):
    title = models.CharField('Описание', max_length=200)
    interval = models.IntegerField('Интервал между назначениями', default=30)
    start_time = models.TimeField('Время начала работы', default=time(9, 0, 0))
    finish_time = models.TimeField(
        'Время конца работы', default=time(21, 0, 0))
    start_dt = models.DateField(
        'Дата c которой создаем назначения')
    finish_dt = models.DateField(
        'Дата по которую создаем назначения включительно')

    def save(self, *args, **kwargs):
        super(AppointmentsManager, self).save(*args, **kwargs)
        datetimes = get_datetimes(self.start_dt,
                                  self.finish_dt,
                                  self.start_time,
                                  self.finish_time,
                                  self.interval)

        Appointment.objects.bulk_create(
            [Appointment(dt=dt, manager=self) for dt in datetimes])
        super(AppointmentsManager, self).save(*args, **kwargs)

    def __str__(self):
        return (f'{self.title}. C {self.start_dt} по {self.finish_dt}.'
                f'Время работы {self.start_time} - {self.finish_time}')

    class Meta:
        verbose_name = 'Управление назначениями'
        verbose_name_plural = 'Управление назначениями'


class Category(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    description = models.TextField()

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Категория услуг'
        verbose_name_plural = 'Категории услуг'


class Service(models.Model):
    title = models.CharField(max_length=200)
    created = models.DateTimeField(
        'Дата создания услуги', auto_now_add=True
    )
    price = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    category = models.ForeignKey(
        Category, on_delete=models.SET_NULL,
        related_name='services', blank=True, null=True
    )
    description = models.TextField()

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Услуга'
        verbose_name_plural = 'Услуги'


class ComplexServices(models.Model):
    title = models.CharField(max_length=200)
    created = models.DateTimeField(
        'Дата создания услуги', auto_now_add=True
    )
    price = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    category = models.ForeignKey(
        Category, on_delete=models.SET_NULL,
        related_name='complex_services', blank=True, null=True
    )
    description = models.TextField()
    services = models.ManyToManyField(
        Service, through='ComplexServicesService')

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Комплексная услуга'
        verbose_name_plural = 'Комплексные услуги'


class Record(models.Model):
    description = models.TextField(null=True, blank=True)
    created = models.DateTimeField(
        'Дата создания записи', auto_now_add=True
    )
    client = models.ForeignKey(
        Client, on_delete=models.CASCADE, related_name='records'
    )
    expired = models.BooleanField(default=False)
    services = models.ManyToManyField(Service, through='RecordService')
    complex_services = models.ManyToManyField(
        ComplexServices, through='ComplexServicesRecord')
    appointment = models.OneToOneField(
        Appointment, on_delete=models.DO_NOTHING)

    def __str__(self):
        return (f'Клиент: {self.client.username}, Телефон: {self.client.phone}, '
                f'Марка авто: {self.client.car_brand}, Модель авто: {self.client.car_model}, '
                f'Дата приёма: {self.appointment.dt.strftime("%d/%m/%Y %H:%M")}')

    def save(self, *args, **kwargs):

        if self.appointment.dt <= timezone.now():
            raise ValidationError("Дата приёма не может быть в прошлом!")
        self.appointment.reserved = True
        self.appointment.save()
        super(Record, self).save(*args, **kwargs)
                
    class Meta:
        verbose_name = 'Запись'
        verbose_name_plural = 'Записи'


@receiver(pre_delete, sender=Record)
def mymodel_delete(sender, instance, **kwargs):
    instance.appointment.reserved = False
    instance.appointment.save()


class RecordService(models.Model):
    record = models.ForeignKey(Record, on_delete=models.CASCADE)
    service = models.ForeignKey(Service, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.record} {self.service}'

    class Meta:
        verbose_name = 'Услуга'
        verbose_name_plural = 'Услуги'


class ComplexServicesRecord(models.Model):
    complex_services = models.ForeignKey(
        ComplexServices, on_delete=models.CASCADE)
    record = models.ForeignKey(Record, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.complex_services} {self.record}'

    class Meta:
        verbose_name = 'Комплексная услуга'
        verbose_name_plural = 'Комплексные услуги'


class ComplexServicesService(models.Model):
    complex_services = models.ForeignKey(
        ComplexServices, on_delete=models.CASCADE)
    service = models.ForeignKey(Service, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.complex_services} {self.service}'


class ProductsCategory(models.Model):
    title = models.CharField('Название категории товара', max_length=200, unique=True)
    description = models.TextField('Описание')

    class Meta:
        verbose_name = 'Категория товара'
        verbose_name_plural = 'Категории товаров'
    
    def __str__(self):
        return self.title


class Order(models.Model):
    total_price = models.DecimalField(
        'Итоговая стоимость заказа',
        max_digits=7,
        decimal_places=2,
        null=True,
        blank=True)
    created = models.DateTimeField(
        'Дата создания заказа', auto_now_add=True
    )
    client = models.ForeignKey(
        Client, on_delete=models.CASCADE, related_name='orders'
    )


class OrderItem(models.Model):
    quantity = models.IntegerField('Количество товара в заказе', blank=True)
    price = models.DecimalField(
        'Цена строки заказа',
        max_digits=7,
        decimal_places=2,
        null=True,
        blank=True)
    order = models.ForeignKey(
        Order,
        on_delete=models.CASCADE,
        related_name='orederitems',
        blank=True,
        null=True
    )


class Product(models.Model):
    brand = models.CharField('Название товара', max_length=200)
    price = models.DecimalField(
        'Цена товара',
        max_digits=7, decimal_places=2,
        null=True,
        blank=True)
    product_category = models.ForeignKey(
        ProductsCategory,
        on_delete=models.SET_NULL,
        related_name='products',
        verbose_name='категория товара',
        blank=True,
        null=True
    )
    order_item = models.ForeignKey(
        OrderItem,
        on_delete=models.SET_NULL,
        related_name='products_order_item',
        verbose_name='Номер позиции в заказе',
        blank=True,
        null=True
    )
    description = models.TextField('Описание')
    image = models.ImageField(
        'Изображение товара',
        upload_to='shinata/',
        blank=True
    )
    in_stock = models.IntegerField('В наличии', default=0)

    class Meta:
        verbose_name = 'Товар'
        verbose_name_plural = 'Товары'
        
    def __str__(self):
        return f'{self.brand} {self.description}'