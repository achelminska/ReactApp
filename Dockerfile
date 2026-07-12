# === Etap 1: build frontendu (React + Vite) ===
FROM node:22-alpine AS client
WORKDIR /src
COPY reactapp.client/package.json reactapp.client/package-lock.json ./
RUN npm ci
COPY reactapp.client/ ./
RUN npm run build

# === Etap 2: publish backendu (.NET 9) ===
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS server
WORKDIR /src
COPY ReactApp.Server/ReactApp.Server.csproj ReactApp.Server/
RUN dotnet restore ReactApp.Server/ReactApp.Server.csproj -p:SkipClient=true
COPY ReactApp.Server/ ReactApp.Server/
RUN dotnet publish ReactApp.Server/ReactApp.Server.csproj -c Release -o /app/publish -p:SkipClient=true

# === Etap 3: obraz produkcyjny ===
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS final
WORKDIR /app
COPY --from=server /app/publish .
COPY --from=client /src/dist ./wwwroot

# Snapshot lokalnych danych (baza, plakaty) — entrypoint kopiuje go na trwały
# dysk przy pierwszym starcie, dzięki czemu produkcja startuje z tymi samymi
# danymi co środowisko lokalne
COPY deploy/seed /app/seed
COPY deploy/entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

ENV ASPNETCORE_ENVIRONMENT=Production
EXPOSE 8080

ENTRYPOINT ["/app/entrypoint.sh"]
