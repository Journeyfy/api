# Journeyfy api

## Sviluppo
Creare nella carella radice una cartella "configs" e aggiungere il file ".env".  
Il file .env deve essere così strutturato
```
NODE_ENV=development
CONNECTION_STRING=<your-connection-string-to-mysql-db>(es: mysql://root@localhost/journeyfy)
COOKIE_DOMAIN=localhost

# Jwt
JWT_SECRET=<your-jwt-secret-string> #(es: una stringa alfanumerica di 32 caratteri)
JWT_ISS=http://localhost:3000
JWT_AUD=http://localhost:3000 #(è possibile concatenare più indirizzi utilizzado il ';')
JWT_VALID_ISS=http://localhost:3000 #(è possibile concatenare più indirizzi utilizzado il ';')
JWT_VALID_AUD=http://localhost:3000 #(è possibile concatenare più indirizzi utilizzado il ';')

# Google OAuth params (vanno aggiunti se si vuole abilitare l'autenticazione con Google)
GOOGLE_CLIENT_ID="<your-google-app-client-id>",
GOOGLE_CLIENT_SECRET="<your-google-app-client-secret>"
```
