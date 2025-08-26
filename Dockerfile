# Étape de build
FROM node:22.12-alpine AS build

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de configuration
COPY package*.json ./
COPY jest.config.js ./
COPY tsconfig.json ./
COPY tsconfig.app.json ./
COPY tsconfig.spec.json ./

# Installer les dépendances
RUN npm ci --legacy-peer-deps

# Copier le code source
COPY . .

# Builder l'application
RUN npm run build -- --configuration production

# Étape de production
FROM nginx:1.25-alpine

# Copier les fichiers buildés
COPY --from=build /app/dist/gestion-commercial/browser /usr/share/nginx/html
    
# Copier la configuration nginx
COPY nginx.conf /etc/nginx/nginx.conf
    
# Exposer le port
EXPOSE 80

# Démarrer nginx
CMD ["nginx", "-g", "daemon off;"]