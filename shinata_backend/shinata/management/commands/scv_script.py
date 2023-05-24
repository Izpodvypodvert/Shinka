import csv

from django.db.utils import IntegrityError
from django.conf import settings
from django.core.management import BaseCommand

from shinata.models import (ServiceCategory, Client, Service, Product, ProductsCategory, ServiceGroup)


TABLES = {
    ProductsCategory: 'productscategory.csv',
    # Client: 'client.csv',
    Product: 'product.csv',
    ServiceCategory: 'category.csv',
    Service: 'service.csv',
    ServiceGroup: 'group.csv'
    # ComplexServices: 'complexservices.csv',
    # ComplexServicesService: 'complexservicesservice.csv'
}


class Command(BaseCommand):
    """Загрузка данных из папки static/data."""

    def handle(self, *args, **kwargs):
        for model, csv_f in TABLES.items():
            with open(
                    f'{settings.BASE_DIR}/static/data/{csv_f}',
                    'r',
                    encoding='utf-8'
            ) as csv_file:
                reader = csv.DictReader(csv_file)
                try:
                    model.objects.bulk_create(
                        model(**data) for data in reader)
                except IntegrityError:
                    self.stdout.write(self.style.ERROR_OUTPUT('данные уже были загружены! Или ошибки в csv файлах!'))
                    continue
        self.stdout.write(self.style.SUCCESS('Все данные загружены'))
