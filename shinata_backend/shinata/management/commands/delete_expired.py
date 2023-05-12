from django.utils.timezone import now
from django.core.management import BaseCommand

from shinata.models import Appointment




class Command(BaseCommand):
    """Удаление устаревших назначений кроме зарезервированных клиентом."""

    def handle(self, *args, **kwargs):
        Appointment.objects.filter(dt__lt=now()).exclude(reserved=True).delete()
       
        self.stdout.write(self.style.SUCCESS('Устаревшие назначения успешно удалены!'))
        