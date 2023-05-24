import csv

from django.db.utils import IntegrityError
from django.conf import settings
from django.core.management import BaseCommand

from shinata.models import (ServiceCategory, Client, Service, Product, ProductsCategory, ServiceGroup)

SERVICES = [
    'Снятие и установка 1 колеса',
    'Демонтаж',
    'Монтаж',
    'Балансировка',
    'Сумма за 4 колеса 55 проф. и выше',
    'Сумма за 4 колеса 50 и ниже  +15%',
    'Готовый комплект + балансировка',
]


class Command(BaseCommand):
    """Загрузка данных из папки static/data."""

    def handle(self, *args, **kwargs):
        category = ServiceCategory.objects.get(pk=1)
        for group_id in range(1, 4):
            for serv in SERVICES:
                for i in range(13, 25):
                    try:
                        price = len(serv) * i/10 * 100
                        group = ServiceGroup.objects.get(pk=group_id)
                        Service.objects.create(
                            title=serv, group=group, description=f'R{i}', category=category, price=price
                           )
                    except IntegrityError:
                        self.stdout.write(self.style.ERROR_OUTPUT('данные уже были загружены! Или ошибки в csv файлах!'))
                        continue
            self.stdout.write(self.style.SUCCESS('Все данные загружены'))
