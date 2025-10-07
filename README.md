# 🇦🇷 Mapa Interactivo de Argentina y las Islas Malvinas

Proyecto de mapa interactivo utilizando **ArgenMap del IGN** (Instituto Geográfico Nacional) que permite explorar lugares de interés en Argentina con información detallada y galerías de fotos.

![Mapa Interactivo](https://img.shields.io/badge/Proyecto-Mapa%20Interactivo-blue)
![Leaflet](https://img.shields.io/badge/Leaflet-1.9.4-green)
![ArgenMap](https://img.shields.io/badge/ArgenMap-IGN-orange)

## 🌟 Características

- ✅ Mapa interactivo usando la cartografía oficial de Argentina (ArgenMap - IGN)
- ✅ Marcadores clickeables en lugares de interés
- ✅ Modal con información detallada de cada lugar
- ✅ Galería de fotos para cada ubicación
- ✅ Diseño responsive (mobile-friendly)
- ✅ Fácil personalización de lugares y fotos
- ✅ Incluye las Islas Malvinas

## 📁 Estructura del Proyecto

```
mapa-argentina-interactivo/
│
├── index.html          # Página principal
├── styles.css          # Estilos del mapa y modal
├── script.js           # Lógica del mapa y eventos
├── lugares.js          # Datos de los lugares (PERSONALIZA AQUÍ)
├── README.md           # Este archivo
│
└── imagenes/          # Carpeta para tus fotos (crear si usas fotos locales)
    ├── lugar1-foto1.jpg
    ├── lugar1-foto2.jpg
    └── ...
```

## 🚀 Cómo Usar

### 1. Abrir el Proyecto

Simplemente abre el archivo `index.html` en tu navegador web favorito (Chrome, Firefox, Edge, etc.).

### 2. Personalizar los Lugares

Edita el archivo **`lugares.js`** para agregar tus propios lugares:

```javascript
{
    id: 9,  // Número único
    nombre: "Nombre del Lugar",
    coordenadas: [-34.6037, -58.3816],  // [latitud, longitud]
    descripcion: "Descripción detallada del lugar...",
    fotos: [
        "imagenes/mi-foto1.jpg",
        "imagenes/mi-foto2.jpg",
        "imagenes/mi-foto3.jpg"
    ]
}
```

### 3. Obtener Coordenadas

Para obtener las coordenadas de un lugar:

1. Ve a [Google Maps](https://www.google.com/maps)
2. Haz clic derecho en el lugar deseado
3. Selecciona "¿Qué hay aquí?" o las coordenadas que aparecen
4. Copia las coordenadas en formato: `-34.6037, -58.3816`
5. En `lugares.js` usa: `coordenadas: [-34.6037, -58.3816]`

### 4. Agregar Tus Fotos

Tienes dos opciones:

#### Opción A: Usar fotos locales (recomendado)

1. Crea una carpeta llamada `imagenes` en el directorio del proyecto
2. Guarda tus fotos allí (formato: JPG, PNG, etc.)
3. En `lugares.js`, usa rutas relativas:

```javascript
fotos: ["imagenes/obelisco1.jpg", "imagenes/obelisco2.jpg"];
```

#### Opción B: Usar URLs de internet

```javascript
fotos: ["https://ejemplo.com/foto1.jpg", "https://ejemplo.com/foto2.jpg"];
```

## 🎨 Personalización Avanzada

### Cambiar Colores

Edita `styles.css`:

```css
/* Cambiar color del header */
header {
  background: linear-gradient(135deg, #TU_COLOR_1 0%, #TU_COLOR_2 100%);
}

/* Cambiar color del título del modal */
#modal-title {
  background: linear-gradient(135deg, #TU_COLOR_1 0%, #TU_COLOR_2 100%);
}
```

### Cambiar Posición Inicial del Mapa

Edita `script.js`:

```javascript
const map = L.map("map", {
  center: [-34.6037, -58.3816], // [latitud, longitud]
  zoom: 10, // Nivel de zoom (4-18)
});
```

### Cambiar Icono de Marcadores

En `script.js`, puedes usar diferentes colores:

- Rojo: `marker-icon-2x-red.png`
- Azul: `marker-icon-2x-blue.png`
- Verde: `marker-icon-2x-green.png`
- Naranja: `marker-icon-2x-orange.png`

## 📍 Lugares Incluidos por Defecto

El proyecto incluye 8 lugares emblemáticos de Argentina:

1. **Obelisco de Buenos Aires** - CABA
2. **Cataratas del Iguazú** - Misiones
3. **Glaciar Perito Moreno** - Santa Cruz
4. **Cerro Aconcagua** - Mendoza
5. **Ushuaia** - Tierra del Fuego
6. **Islas Malvinas - Puerto Argentino**
7. **Quebrada de Humahuaca** - Jujuy
8. **Teatro Colón** - Buenos Aires

## 🌐 Sobre ArgenMap

Este proyecto utiliza la capa cartográfica oficial **ArgenMap** del **Instituto Geográfico Nacional (IGN)** de Argentina, que proporciona:

- Cartografía oficial y actualizada
- Cobertura completa del territorio argentino
- Incluye las Islas Malvinas
- Toponimia en español
- Gratuito para uso público

**URL del servicio:**

```
https://wms.ign.gob.ar/geoserver/gwc/service/tms/1.0.0/capabaseargenmap@EPSG%3A3857@png/{z}/{x}/{-y}.png
```

## 🛠️ Tecnologías Utilizadas

- **HTML5** - Estructura
- **CSS3** - Estilos y animaciones
- **JavaScript ES6** - Lógica y funcionalidad
- **Leaflet.js 1.9.4** - Librería de mapas interactivos
- **ArgenMap (IGN)** - Capa cartográfica

## 📱 Compatibilidad

- ✅ Chrome
- ✅ Firefox
- ✅ Edge
- ✅ Safari
- ✅ Opera
- ✅ Dispositivos móviles (iOS/Android)

## 💡 Consejos

1. **Optimiza tus fotos**: Usa imágenes de 800x600px o similares para carga rápida
2. **Nombra archivos correctamente**: Sin espacios, usa guiones: `mi-foto-1.jpg`
3. **Prueba en diferentes navegadores**: Asegúrate de que funcione correctamente
4. **Backup**: Guarda una copia de `lugares.js` antes de modificar

## 🤝 Contribuir

¿Tienes sugerencias o mejoras? ¡Son bienvenidas!

## 📄 Licencia

Este proyecto es de código abierto y está disponible para uso personal y educativo.

---

**Desarrollado con ❤️ para Argentina** 🇦🇷

### Recursos Adicionales

- [Documentación de Leaflet](https://leafletjs.com/)
- [IGN Argentina](https://www.ign.gob.ar/)
- [Servicios Web del IGN](https://www.ign.gob.ar/NuestrasActividades/Geodesia/ServicioGeodesico)

---

## 🆘 Solución de Problemas

### El mapa no se carga

- Verifica tu conexión a internet
- Asegúrate de que los archivos estén en la misma carpeta
- Abre la consola del navegador (F12) para ver errores

### Las fotos no aparecen

- Verifica que las rutas de las imágenes sean correctas
- Si usas fotos locales, verifica que la carpeta `imagenes` exista
- Verifica los nombres de archivo (sensible a mayúsculas/minúsculas)

### El modal no se abre

- Verifica que `lugares.js` esté cargado antes de `script.js` en el HTML
- Abre la consola del navegador para ver errores de JavaScript

---

¡Disfruta explorando Argentina! 🗺️✨
