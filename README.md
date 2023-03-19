# Schülerinnen und Schüler Fahrgemeinschaften der SuS-AG

## Wie kann das Projekt gestartet werden?

### Voraussetzungen

- [Node.js](https://nodejs.org/en/) (Version 18.12.1)
- [Yarn](https://yarnpkg.com/) (Version 1.22.19)
- [SQLite](https://www.prisma.io/dataguide/sqlite/setting-up-a-local-sqlite-database#setting-up-sqlite-on-windows)

### Starten

1. `yarn install` ausführen um die Abhängigkeiten zu installieren.
2. Eine Datei namens `.env` im Projektverzeichnis anlegen und folgende Inhalte hinzufügen:
    ```dotenv
    # When adding additional env variables, the schema in /env/schema.mjs should be updated accordingly
    # Prisma
    DATABASE_URL=file:./db.sqlite

    # Next Auth
    # You can generate the secret via 'openssl rand -base64 32' on Linux
    # More info: https://next-auth.js.org/configuration/options#secret
    NEXTAUTH_SECRET='<insert the secret generated as stated above here>'
    NEXTAUTH_URL=http://localhost:3000
    ```
3. Anpassen der `prisma.schema` Datei im Projektverzeichnis.
   1. Entfernen der Zeile 6 (`previewFeatures = ["ReferentialIntegrity"]`).
   2. Ändern der Zeile 10 (`provider = "mysql"` => `provider = "sqlite"`).
   3. Entfernen der Zeile 16 (`relationMode = "prisma"`).
   4. Jedes `@db.Text` auskommentieren.
4. `yarn prisma db push` ausführen um die Datenbank zu erstellen.
5. `yarn dev` ausführen um das Projekt zu starten.