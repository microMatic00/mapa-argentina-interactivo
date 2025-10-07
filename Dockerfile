# Dockerfile para PocketBase
FROM alpine:3.19

# Instalar dependencias necesarias
RUN apk add --no-cache \
    ca-certificates \
    unzip \
    wget \
    tzdata

# Crear directorio de trabajo
WORKDIR /pb

# Descargar la última versión de PocketBase para Linux
RUN wget https://github.com/pocketbase/pocketbase/releases/download/v0.22.20/pocketbase_0.22.20_linux_amd64.zip \
    && unzip pocketbase_0.22.20_linux_amd64.zip \
    && chmod +x pocketbase \
    && rm pocketbase_0.22.20_linux_amd64.zip

# Copiar archivos de migración y script de inicio
COPY pb_migrations ./pb_migrations
COPY start.sh ./start.sh

# Hacer ejecutable el script de inicio
RUN chmod +x start.sh

# Crear directorio para datos persistentes
RUN mkdir -p pb_data

# Exponer puerto
EXPOSE 8090

# Variables de entorno
ENV PB_DATA=/pb/pb_data
ENV PORT=8090

# Comando para iniciar PocketBase con el script
CMD ["./start.sh"]