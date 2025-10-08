#!/bin/sh

# Script de inicio para PocketBase en Render
echo "🚀 Iniciando PocketBase en Render..."

# Crear directorio de datos si no existe
mkdir -p /pb/pb_data

# Ejecutar migraciones si existen
if [ -d "/pb/pb_migrations" ]; then
    echo "📦 Aplicando migraciones..."
    ./pocketbase migrate up --dir=/pb/pb_data
fi

# Configurar CORS si se especifica en variables de entorno
if [ ! -z "$ALLOWED_ORIGINS" ]; then
    echo "🌐 Configurando CORS para: $ALLOWED_ORIGINS"
    export PB_CORS_ORIGINS="$ALLOWED_ORIGINS"
fi

echo "✅ PocketBase listo en puerto $PORT"

# Iniciar PocketBase con configuración CORS
exec ./pocketbase serve --http=0.0.0.0:$PORT --dir=/pb/pb_data --origins="https://mapa-argentina-interactivo.vercel.app,http://localhost:3000"