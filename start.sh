#!/bin/sh

# Script de inicio para PocketBase en Railway
echo "🚀 Iniciando PocketBase en Railway..."

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

# Iniciar PocketBase
exec ./pocketbase serve --http=0.0.0.0:$PORT --dir=/pb/pb_data