// Inicializar el mapa centrado en Argentina
const map = L.map("map", {
  center: [-38.4161, -63.6167], // Centro de Argentina
  zoom: 5,
  minZoom: 4,
  maxZoom: 18,
});

// Agregar la capa de ArgenMap del IGN
L.tileLayer(
  "https://wms.ign.gob.ar/geoserver/gwc/service/tms/1.0.0/capabaseargenmap@EPSG%3A3857@png/{z}/{x}/{-y}.png",
  {
    attribution:
      '© <a href="https://www.ign.gob.ar/">Instituto Geográfico Nacional</a>',
    tms: true,
    maxZoom: 18,
  }
).addTo(map);

// Icono personalizado para los marcadores
const customIcon = L.icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Función para abrir el modal con información del lugar
function abrirModal(lugar) {
  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modal-title");
  const modalDescription = document.getElementById("modal-description");
  const modalGallery = document.getElementById("modal-gallery");

  // Establecer el contenido del modal
  modalTitle.textContent = lugar.nombre;
  modalDescription.textContent = lugar.descripcion;

  // Limpiar y agregar fotos a la galería
  modalGallery.innerHTML = "";
  lugar.fotos.forEach((foto) => {
    const img = document.createElement("img");
    img.src = foto;
    img.alt = lugar.nombre;
    img.onclick = () => window.open(foto, "_blank");
    modalGallery.appendChild(img);
  });

  // Mostrar el modal
  modal.style.display = "block";
}

// Función para cerrar el modal
function cerrarModal() {
  const modal = document.getElementById("modal");
  modal.style.display = "none";
}

// Agregar marcadores para cada lugar
lugares.forEach((lugar) => {
  const marker = L.marker(lugar.coordenadas, { icon: customIcon })
    .addTo(map)
    .bindPopup(
      `<b>${lugar.nombre}</b><br><i>Haz clic en el marcador para más información</i>`
    )
    .on("click", () => abrirModal(lugar));
});

// Event listeners para el modal
document.querySelector(".close").onclick = cerrarModal;

window.onclick = function (event) {
  const modal = document.getElementById("modal");
  if (event.target == modal) {
    cerrarModal();
  }
};

// Cerrar modal con la tecla ESC
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    cerrarModal();
  }
});

// Ajustar el mapa para mostrar todos los marcadores
const group = L.featureGroup(
  lugares.map((lugar) => L.marker(lugar.coordenadas))
);
map.fitBounds(group.getBounds().pad(0.1));

console.log("✅ Mapa cargado exitosamente con", lugares.length, "lugares");
