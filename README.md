# Shinata  WORK IN PROGRESS
## Using Django and Djangorestframework for backend and React plus Mantine for frontend
### tire service app


## Setting up

### Add environmental files
```
$  ./backend/.env
DEBUG=False
SECRET_KEY=<secret_key>
DJANGO_ALLOWED_HOSTS=<domain_name> <ip_addr> localhost 127.0.0.1 [::1]
CORS_ORIGIN_WHITELIST=http://<domain_name>:3000 http://localhost:3000
```

```
$ vi ./frontend/.env
REACT_APP_HOST=http://localhost or http://<domain_name>
```

## Start production
```
$ docker-compose up -d --build
```

## Local build

### Backend: Django
```
$ cd ./backend
$ python3 -m venv venv
$ source venv/bin/activate
(venv) $ pip install --upgrade pip
(venv) $ pip install -r requirements.txt
(venv) $ python manage.py runserver
(venv) $ deactivate
```

### Frontend: React
```
$ cd ./frontend
$ npm install
$ npm start
$ npm run build
```