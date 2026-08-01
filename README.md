# build backend
docker compose build --no-cache backend

#list all tables
docker compose exec postgres psql -U cinecall_user -d cinecall -c '\dt'

#full reset
docker compose exec -T postgres psql -U <user> -d <db> < init.sql