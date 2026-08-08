## CineCall a Confia na Call movie night manager

Configure you infra/conf/.env based on the example

```
docker compose up -d --build
```

access your waha dashboard and make sure to connect / scan with your phone

connect to the app and enjoy :)


# few reference commands

- build backend
docker compose build --no-cache backend

- list all tables
docker compose exec postgres psql -U <user> -d <db> -c '\dt'

- frontend reset
docker compose build --no-cache frontend
docker compose up -d

- backend reset
docker compose build --no-cache backend
docker compose up -d
docker compose exec -T postgres psql -U <user> -d <db> < init.sql

- full reset
docker compose build --no-cache
docker compose up -d
docker compose logs backend
docker compose exec -T postgres psql -U <user> -d <db> < init.sql