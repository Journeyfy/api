# Journeyfy api

## Sviluppo
Creare nella carella radice una cartella "configs" e aggiungere il file ".env".  
Il file .env deve essere così strutturato
```
NODE_ENV=development
CONNECTION_STRING=<your-connection-string-to-mysql-db>(es: mysql://root@localhost/journeyfy)
JWT_SECRET=<your-jwt-secret-string>(es: una stringa alfanumerica di 32 caratteri)

# Google OAuth params (vanno aggiunti se si vuole abilitare l'autenticazione con Google)
GOOGLE_CLIENT_ID="<your-google-app-client-id>",
GOOGLE_CLIENT_SECRET="<your-google-app-client-secret>"
```
