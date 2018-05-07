# Hero SP

## Для локального стенда:
```
	docker-compose -f docker-compose.dev.yml up --build
```

## Для работы с проектом в контейнере:
```
	docker-compose -f docker-compose.dev.yml exec app bash
```

## Создать суперпользователя
```
	docker-compose -f docker-compose.dev.yml exec app python3 manage.py createsuperuser
```