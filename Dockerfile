# Etapa de build
FROM node:22 AS build
WORKDIR /app

# Copia configs e instala dependências
COPY package*.json ./
RUN npm ci

# Copia o restante e builda com Vite
COPY . .
RUN npm run build

# Etapa de runtime (Nginx para servir os arquivos estáticos gerados pelo Vite)
FROM nginx:stable-alpine AS runtime
WORKDIR /usr/share/nginx/html

# Copia os arquivos gerados no build (Vite gera em dist/)
COPY --from=build /app/dist . 

# Copia uma config customizada do nginx (opcional)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
