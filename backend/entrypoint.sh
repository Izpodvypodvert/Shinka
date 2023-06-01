#!/bin/sh

echo "Collect static files"
python manage.py collectstatic --no-input

echo "Apply database migrations"
python manage.py migrate --no-input

echo "Add data to database"
python manage.py scv_script

echo "Starting server"
gunicorn backend.wsgi:application --bind 0.0.0.0:8000