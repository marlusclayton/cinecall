Configure you infra/conf/.env based on the example

docker compose up -d --build

access your waha dashboard and make sure to connect / scan with your phone

connect to the app and enjoy :)


-- few reference commands --

# build backend
docker compose build --no-cache backend

#list all tables
docker compose exec postgres psql -U <user> -d <db> -c '\dt'

#full reset
docker compose exec -T postgres psql -U <user> -d <db> < init.sql