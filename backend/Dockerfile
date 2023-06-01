FROM python:3.10.11-slim-bullseye

ENV PYTHONUNBUFFERED 1

WORKDIR /backend

COPY requirements.txt /backend/requirements.txt

RUN pip install -r requirements.txt

COPY . /backend/

COPY ./entrypoint.sh .

ENTRYPOINT ["sh", "/backend/entrypoint.sh"]

EXPOSE 8000

