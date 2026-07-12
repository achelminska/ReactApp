# CinemaBox

Pełnoprawny serwis kinowy z rezerwacją biletów online i panelem administracyjnym. Projekt demonstracyjny zbudowany jako portfolio full-stack (.NET + React).

## Funkcje

### Serwis publiczny
- Przeglądanie filmów (na ekranie, nadchodzące, oferta rodzinna)
- Repertuar kin w 23 miastach Polski
- Pełny flow rezerwacji: wybór miejsc → typ biletu → podsumowanie zamówienia
- Rejestracja i logowanie użytkowników (JWT)
- Baza wiedzy (FAQ) i formularz kontaktowy
- Szybki zakup biletu (floating button)

### Panel admina (`/admin`)
- Dashboard ze statystykami sprzedaży
- CRUD filmów (plakaty, kategorie, opisy)
- Zarządzanie repertuarem (seanse, sale, godziny)
- Podgląd rezerwacji z filtrowaniem
- Zarządzanie użytkownikami (role, blokowanie)

## Stack technologiczny

| Warstwa | Technologie |
|---------|-------------|
| Backend | ASP.NET Core 9, EF Core, SQLite, Identity, JWT |
| Frontend | React 19, Vite 6, React Bootstrap, React Router 7 |
| Baza danych | SQLite (`cinemabox.db`) z automatycznym seedem |

## Wymagania

- [.NET 9 SDK](https://dotnet.microsoft.com/download)
- [Node.js 20+](https://nodejs.org/)

## Uruchomienie

```bash
# 1. Zainstaluj zależności frontendu
cd reactapp.client
npm install

# 2. Uruchom backend (automatycznie odpala też Vite dev server)
cd ../ReactApp.Server
dotnet run --launch-profile https
```

Aplikacja dostępna pod:
- **Frontend:** https://localhost:51434
- **API + Swagger:** https://localhost:7286/swagger

## Konto administratora (dev)

Skonfigurowane w `ReactApp.Server/appsettings.Development.json`:

| Pole | Wartość |
|------|---------|
| E-mail | `admin@cinemabox.pl` |
| Hasło | `Admin123!` |

Panel admina: https://localhost:51434/admin

## Architektura

```
ReactApp/
├── ReactApp.Server/     # Backend API (ASP.NET Core)
│   ├── Controllers/     # Publiczne + Admin API
│   ├── Data/            # DbContext, migracje, seeder
│   └── Models/          # Encje domenowe
└── reactapp.client/     # Frontend (React + Vite)
    ├── src/api/         # Warstwa komunikacji z API
    ├── src/pages/       # Strony publiczne + admin
    └── src/components/  # Komponenty UI
```

## Deployment (Render.com)

Projekt zawiera `Dockerfile` (multi-stage: build frontendu → publish backendu → obraz produkcyjny) oraz blueprint `render.yaml`.

**Opcja A — blueprint:** w dashboardzie Rendera wybierz *New → Blueprint* i wskaż repozytorium. Render utworzy usługę z dyskiem i zmiennymi środowiskowymi z `render.yaml`; uzupełnij tylko `Seed__AdminEmail` i `Seed__AdminPassword`.

**Opcja B — ręcznie:** *New → Web Service*, runtime **Docker**, dysk zamontowany w `/var/data` i zmienne środowiskowe:

| Zmienna | Wartość |
|---------|---------|
| `ConnectionStrings__Default` | `Data Source=/var/data/cinemabox.db` |
| `UPLOADS_PATH` | `/var/data/uploads` |
| `Jwt__Key` | długi losowy ciąg (min. 32 znaki) |
| `Seed__AdminEmail` | e-mail konta administratora |
| `Seed__AdminPassword` | hasło konta administratora |

Baza i wgrane plakaty żyją na trwałym dysku, więc przetrwają kolejne deploye. HTTPS wymusza proxy Rendera (aplikacja czyta nagłówki `X-Forwarded-*`).

### Dane startowe

Obraz zawiera snapshot lokalnej bazy (`deploy/seed/cinemabox.db`) i plakatów (`deploy/seed/uploads/`). Przy pierwszym starcie na pustym dysku entrypoint kopiuje je na `/var/data` — produkcja rusza z dokładnie tymi samymi filmami, opisami i kontami co lokalnie. Kolejne deploye **nie nadpisują** danych produkcyjnych.

Aby odświeżyć snapshot przed deployem:

```bash
rm -f deploy/seed/cinemabox.db
sqlite3 ReactApp.Server/cinemabox.db "VACUUM INTO 'deploy/seed/cinemabox.db'"
cp -R ReactApp.Server/wwwroot/uploads/ deploy/seed/uploads/ 2>/dev/null || true
```

Test obrazu lokalnie:

```bash
docker build -t cinemabox .
docker run -p 8080:8080 -e Jwt__Key="dowolny-dlugi-sekret" \
  -e Seed__AdminEmail="admin@cinemabox.pl" -e Seed__AdminPassword="Admin123!" cinemabox
```

## Uwagi

- Płatności są **symulowane** — to wersja demonstracyjna
- Baza SQLite tworzy się automatycznie przy pierwszym uruchomieniu
- Repertuar generowany jest deterministycznie na 14 dni do przodu

## Licencja

MIT — patrz [LICENSE](LICENSE)
