# 🚀 Guía de Deploy del Backend (PocketBase) en Render

Esta guía te permitirá desplegar el backend de PocketBase en Render con persistencia completa de datos de forma **COMPLETAMENTE GRATUITA**.

## 📋 Prerrequisitos

1. ✅ Cuenta en [Render](https://render.com) (gratuita - 750 horas/mes)
2. ✅ Cuenta en GitHub
3. ✅ Tu proyecto subido a GitHub

## 🔧 Pasos para el Deploy

### 1. Preparar el Repositorio

Asegúrate de que tu repositorio contenga estos archivos (ya creados):

- `Dockerfile` - Configuración de Docker para PocketBase
- `.dockerignore` - Archivos a ignorar en el build
- `start.sh` - Script de inicio
- `render.yaml` - Configuración específica de Render
- `pb_migrations/` - Carpeta con las migraciones
- `.env.example` - Ejemplo de variables de entorno

### 2. Deploy en Render

1. **Acceder a Render**: Ve a [render.com](https://render.com) e inicia sesión
2. **Nuevo Web Service**: Click en "New" → "Web Service"
3. **Conectar GitHub**: Autoriza Render y selecciona tu repositorio
4. **Configuración automática**: Render detectará el `render.yaml` y configurará todo automáticamente
5. **Personalizar variables** (opcional):
   - En "Environment Variables" puedes cambiar:
     ```
     ALLOWED_ORIGINS=https://tu-frontend-url.com
     PB_ENCRYPTION_KEY=se-genera-automáticamente
     ```

### 3. Disco Persistente (Se configura automáticamente)

✅ **Ya configurado** en `render.yaml`:

- **Mount Path**: `/pb/pb_data`
- **Size**: 1GB gratuito
- **Persistent**: Los datos se mantienen entre deploys

### 4. Obtener URL del Backend

1. **URL automática**: Render te asignará una URL como `https://tu-proyecto.onrender.com`
2. **Personalizar dominio** (opcional): Puedes usar tu propio dominio
3. **Anotar URL**: Necesitarás esta URL para conectar el frontend

### 5. Actualizar Frontend

En tu frontend, actualiza la URL de PocketBase:

```javascript
// En script.js, cambia esta línea:
const POCKETBASE_URL =
  window.POCKETBASE_URL || "https://tu-proyecto.onrender.com";
```

O mejor aún, usa variables de entorno en tu frontend:

```javascript
const POCKETBASE_URL =
  import.meta.env.VITE_POCKETBASE_URL || "https://tu-proyecto.onrender.com";
```

## 🔧 Configuración de CORS

Después del deploy, configura CORS en PocketBase:

1. Accede al panel admin: `https://tu-proyecto.onrender.com/_/`
2. Crea una cuenta de administrador
3. Ve a "Settings" → "Application"
4. En "Allowed origins" agrega: `https://tu-frontend-url.com`

## 📊 Monitoreo y Logs

- **Ver Logs**: En Render Dashboard → "Logs" para ver el estado en tiempo real
- **Métricas**: En "Metrics" puedes ver uso de CPU, memoria, etc.
- **Manual Deploy**: Si necesitas redeploy, usa "Manual Deploy"
- **Auto Deploy**: Se redepliegja automáticamente con cada push a GitHub

## 💰 Costos (¡GRATIS!)

- **Plan Gratuito**: 750 horas/mes (más que suficiente)
- **Disco Persistente**: 1GB incluido gratis
- **Ancho de banda**: 100GB/mes incluidos
- **SSL**: Certificados HTTPS automáticos y gratuitos

## ⚠️ Notas Importantes

1. **Backup**: Render maneja backups automáticos del disco persistente
2. **SSL**: HTTPS viene configurado automáticamente con Let's Encrypt
3. **Sleep Mode**: El servicio se "duerme" después de inactividad (se despierta automáticamente)
4. **Migraciones**: Se ejecutan automáticamente al desplegar

## 🆘 Troubleshooting

### Error: "No se conecta el frontend"

- Verifica que las URLs en `ALLOWED_ORIGINS` sean correctas
- Chequea que el frontend use `https://tu-proyecto.onrender.com`

### Error: "Build failed"

- Revisa los logs en Render Dashboard
- Asegúrate de que el `Dockerfile` esté en la raíz del proyecto

### Error: "Datos perdidos"

- Verifica que el disco persistente esté montado en `/pb/pb_data`
- Chequea en Render "Settings" → "Disks"

### Error: "Servicio lento al despertar"

- Normal en plan gratuito: el servicio se "duerme" tras inactividad
- Primera carga puede tardar 30-60 segundos
- Siguientes cargas son inmediatas

## ✅ Verificación Final

Tu backend estará funcionando correctamente cuando:

1. ✅ Render muestre "Deploy live" (verde)
2. ✅ Puedas acceder a `https://tu-proyecto.onrender.com/_/`
3. ✅ El frontend se conecte sin errores CORS
4. ✅ Los datos se guarden y persistan entre deploys

---

**¡Listo!** Tu backend de PocketBase está desplegado **100% GRATIS** con persistencia completa de datos en Render. 🎉
