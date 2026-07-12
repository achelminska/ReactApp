#!/bin/sh
# Przy pierwszym starcie na świeżym dysku kopiujemy snapshot lokalnych danych
# (baza + wgrane plakaty). Kolejne deploye nie nadpisują danych produkcyjnych.
set -e

DB_PATH="${ConnectionStrings__Default#Data Source=}"

if [ -n "$DB_PATH" ] && [ "$DB_PATH" != "$ConnectionStrings__Default" ]; then
    if [ ! -f "$DB_PATH" ] && [ -f /app/seed/cinemabox.db ]; then
        mkdir -p "$(dirname "$DB_PATH")"
        cp /app/seed/cinemabox.db "$DB_PATH"
        echo "Seed: skopiowano snapshot bazy do $DB_PATH"
    fi
fi

if [ -n "$UPLOADS_PATH" ] && [ -d /app/seed/uploads ]; then
    mkdir -p "$UPLOADS_PATH"
    # -n: nie nadpisuj plików, które już są na dysku
    cp -Rn /app/seed/uploads/. "$UPLOADS_PATH"/ 2>/dev/null || true
fi

export ASPNETCORE_URLS="http://0.0.0.0:${PORT:-8080}"
exec dotnet ReactApp.Server.dll
