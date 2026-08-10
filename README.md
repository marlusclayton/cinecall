## CineCall a Confia na Call movie night manager

Configure you infra/conf/.env based on the example

```
docker compose up -d --build
```

access your waha dashboard and make sure to connect / scan with your phone

connect to the app and enjoy :)


# few reference commands

- restore backup
docker compose exec -T postgres psql -U <user> -d <db> < backups/backup_yyyymmdd_HHMMSS.sql

- build backend
docker compose build --no-cache backend
docker compose up -d

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

--local only
docker compose down

docker compose up -d postgres waha
cd backend
export ConnectionStrings__DefaultConnection="Host=localhost;Port=5432;Database=<db>>;Username=<user>>;Password=<password>"
export WAHA_URL="http://localhost:3000"
export ASPNETCORE_URLS="http://localhost:5000"
dotnet run

dotnet tool install --global dotnet-ef   # if not already installed
dotnet ef database update

cd frontend
echo "NEXT_PUBLIC_API_URL=http://localhost:5000" > .env.local
npm install
npm run dev