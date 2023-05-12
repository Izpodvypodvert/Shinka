import csv

from django.conf import settings
from django.core.management import BaseCommand

from shinata.models import (Category, Client, ComplexServices, Service, ComplexServicesService, Product, ProductsCategory)


TABLES = {
    ProductsCategory: 'productscategory.csv',
    Client: 'client.csv',
    Category: 'category.csv',
    Product: 'product.csv',
    Service: 'service.csv',
    ComplexServices: 'complexservices.csv',
    ComplexServicesService: 'complexservicesservice.csv'
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
                model.objects.bulk_create(
                    model(**data) for data in reader)
        self.stdout.write(self.style.SUCCESS('Все данные загружены'))
