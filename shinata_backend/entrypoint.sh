#!/bin/sh


# echo "Apply database migrations"
# python manage.py migrate --no-input
# python manage.py migrate --fake shinata zero
# python manage.py migrate shinata --no-input
# python manage.py scv_script
echo "Collect static files"
python manage.py collectstatic --no-input

echo "Starting server"
gunicorn shinata_backend.wsgi:application --bind 0.0.0.0:8000