FROM python:3.10.11-slim-bullseye

ENV PYTHONUNBUFFERED 1

WORKDIR /shinata_backend

COPY requirements.txt /shinata_backend/requirements.txt

RUN pip install -r requirements.txt

COPY . /shinata_backend/

EXPOSE 8000