FROM python:3.10.11-slim-bullseye

ENV PYTHONUNBUFFERED 1

WORKDIR /shinata_backend

COPY requirements.txt /shinata_backend/requirements.txt

RUN pip install -r requirements.txt



COPY . /shinata_backend/

# RUN python manage.py makemigrations
# RUN python manage.py migrate --no-input
# RUN python manage.py collectstatic --no-input

# RUN python manage.py scv_script

# COPY . /shinata_backend/
# RUN python manage.py collectstatic --no-input

COPY ./entrypoint.sh .
ENTRYPOINT ["sh", "/shinata_backend/entrypoint.sh"]
EXPOSE 8000

