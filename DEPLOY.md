# 🚀 Guía de Deploy del Backend (PocketBase) en Railway

Esta guía te permitirá desplegar el backend de PocketBase en Railway con persistencia completa de datos.

## 📋 Prerrequisitos

1. ✅ Cuenta en [Railway](https://railway.app) (gratuita)
2. ✅ Cuenta en GitHub
3. ✅ Tu proyecto subido a GitHub

## 🔧 Pasos para el Deploy

### 1. Preparar el Repositorio

Asegúrate de que tu repositorio contenga estos archivos (ya creados):

- `Dockerfile` - Configuración de Docker para PocketBase
- `.dockerignore` - Archivos a ignorar en el build
- `start.sh` - Script de inicio
- `pb_migrations/` - Carpeta con las migraciones
- `.env.example` - Ejemplo de variables de entorno

### 2. Deploy en Railway

1. **Accede a Railway**: Ve a [railway.app](https://railway.app) e inicia sesión
2. **Nuevo Proyecto**: Click en "New Project"
3. **Deploy desde GitHub**: Selecciona "Deploy from GitHub repo"
4. **Conectar Repo**: Autoriza Railway y selecciona tu repositorio
5. **Configurar Variables**:
   - Ve a la pestaña "Variables" de tu proyecto
   - Agrega estas variables:
     ```
     PORT=8090
     ALLOWED_ORIGINS=https://tu-frontend-url.com
     PB_ENCRYPTION_KEY=tu-clave-secreta-muy-larga-y-segura
     ```

### 3. Configurar Volumen Persistente (IMPORTANTE)

Para que los datos no se pierdan:

1. **Crear Volumen**: En tu proyecto Railway, ve a "Settings" → "Volumes"
2. **Add Volume**:
   - **Mount Path**: `/pb/pb_data`
   - **Size**: 1GB (es suficiente para empezar)
3. **Save**: Confirma la creación del volumen

### 4. Configurar Dominio

1. **Generar Dominio**: En "Settings" → "Domains"
2. **Generate Domain**: Railway te dará una URL como `https://tu-proyecto.up.railway.app`
3. **Anotar URL**: Necesitarás esta URL para el frontend

### 5. Actualizar Frontend

En tu frontend, actualiza la URL de PocketBase:

```javascript
// En script.js, cambia esta línea:
const POCKETBASE_URL =
  window.POCKETBASE_URL || "https://tu-proyecto.up.railway.app";
```

O mejor aún, usa variables de entorno en tu frontend:

```javascript
const POCKETBASE_URL =
  import.meta.env.VITE_POCKETBASE_URL || "https://tu-proyecto.up.railway.app";
```

## 🔧 Configuración de CORS

Después del deploy, configura CORS en PocketBase:

1. Accede al panel admin: `https://tu-proyecto.up.railway.app/_/`
2. Crea una cuenta de administrador
3. Ve a "Settings" → "Application"
4. En "Allowed origins" agrega: `https://tu-frontend-url.com`

## 📊 Monitoreo y Logs

- **Ver Logs**: En Railway, pestaña "Logs" para ver el estado
- **Métricas**: En "Metrics" puedes ver uso de CPU, memoria, etc.
- **Restart**: Si necesitas reiniciar, usa el botón "Restart" en "Deployments"

## 💰 Costos

- **Plan Gratuito**: 500 horas/mes ($5 de crédito)
- **Volumen**: Incluido en el plan gratuito (hasta 1GB)
- **Tráfico**: 100GB/mes incluidos

## ⚠️ Notas Importantes

1. **Backup**: Railway maneja backups automáticos del volumen
2. **SSL**: HTTPS viene configurado automáticamente
3. **Escalado**: Railway puede escalar automáticamente si necesitas más recursos
4. **Migraciones**: Se ejecutan automáticamente al desplegar

## 🆘 Troubleshooting

### Error: "No se conecta el frontend"

- Verifica que las URLs en `ALLOWED_ORIGINS` sean correctas
- Chequea que el frontend use `https://tu-proyecto.up.railway.app`

### Error: "Build failed"

- Revisa los logs en Railway
- Asegúrate de que el `Dockerfile` esté en la raíz del proyecto

### Error: "Datos perdidos"

- Verifica que el volumen esté montado en `/pb/pb_data`
- Chequea en Railway "Settings" → "Volumes"

## ✅ Verificación Final

Tu backend estará funcionando correctamente cuando:

1. ✅ Railway muestre "Deploy successful"
2. ✅ Puedas acceder a `https://tu-proyecto.up.railway.app/_/`
3. ✅ El frontend se conecte sin errores CORS
4. ✅ Los datos se guarden y persistan entre deploys

---

**¡Listo!** Tu backend de PocketBase está desplegado con persistencia completa de datos en Railway. 🎉
