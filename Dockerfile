FROM node:22-alpine

WORKDIR /app

# Instalar pnpm
RUN npm install -g pnpm

# Copiar archivos de dependencias
COPY package.json pnpm-lock.yaml* ./

# Instalar dependencias
RUN pnpm install

# Copiar el código fuente
COPY . .

EXPOSE 3001

# Iniciar la aplicación
CMD ["pnpm", "start"]
