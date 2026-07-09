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

## Uwagi

- Płatności są **symulowane** — to wersja demonstracyjna
- Baza SQLite tworzy się automatycznie przy pierwszym uruchomieniu
- Repertuar generowany jest deterministycznie na 14 dni do przodu

## Licencja

MIT — patrz [LICENSE](LICENSE)
