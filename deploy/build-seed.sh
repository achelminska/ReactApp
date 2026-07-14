#!/usr/bin/env bash
# Buduje czysty snapshot bazy do deployu — tylko katalog filmów, bez kont i rezerwacji.
# NIGDY nie kopiuj lokalnej cinemabox.db bezpośrednio do deploy/seed (może zawierać Twoje dane).
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SEED_DB="$ROOT/deploy/seed/cinemabox.db"

mkdir -p "$ROOT/deploy/seed"
rm -f "$SEED_DB"

export ConnectionStrings__Default="Data Source=$SEED_DB"
export Seed__AdminPassword=""
export Jwt__Key="local-seed-build-placeholder-key-32chars"
export Jwt__Issuer="CinemaBox"
export Jwt__Audience="CinemaBox"

cd "$ROOT/ReactApp.Server"
dotnet run --no-launch-profile -- --build-seed

echo "OK: $SEED_DB"
