# ========================
# Build Stage
# ========================
FROM node:20-alpine AS build

WORKDIR /app

# Copia package.json e package-lock.json
COPY package*.json ./

# Instala dependências
RUN npm ci

# Copia todo o código
COPY . .

# Build para produção
RUN npm run build

# ========================
# Production Stage (Nginx)
# ========================
FROM nginx:alpine

# Variável de ambiente que o Railway usa
ENV PORT=8080

# Copia build final para o Nginx
COPY --from=build /app/dist/professor-app-frontend/browser /usr/share/nginx/html

# Copia nginx.conf customizado
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expondo a porta do container
EXPOSE 8080

# Start Nginx no foreground
CMD ["nginx", "-g", "daemon off;"]
