#!/usr/bin/env bash
set -euo pipefail

# --- config: adjust if your service/user/db names differ ---
SERVICE="postgres"
DB_USER="cinecall_user"
DB_NAME="cinecall"
OUT_DIR="backups"
# -------------------------------------------------------------

mkdir -p "$OUT_DIR"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
OUT_FILE="$OUT_DIR/backup_${TIMESTAMP}.sql"

echo "Dumping data from Categories, WeeklyCycles, Nominations..."

{
  echo 'TRUNCATE TABLE "Nominations", "WeeklyCycles", "Categories" RESTART IDENTITY CASCADE;'
  echo

  docker compose exec -T "$SERVICE" pg_dump \
    -U "$DB_USER" \
    -d "$DB_NAME" \
    --data-only \
    --inserts \
    --column-inserts \
    --no-owner \
    --no-privileges \
    -t '"Categories"' \
    -t '"WeeklyCycles"' \
    -t '"Nominations"'
} > "$OUT_FILE"

echo "Backup written to $OUT_FILE"
echo "To restore later:"
echo "  docker compose exec -T $SERVICE psql -U $DB_USER -d $DB_NAME < $OUT_FILE"
echo "Or copy its contents directly into init.sql to reseed on next rebuild."
