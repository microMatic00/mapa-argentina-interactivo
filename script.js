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

  if (placeForumTitle) {
    placeForumTitle.textContent = `Foro de ${lugar.nombre}`;
  }

  if (placeMessageInput) {
    placeMessageInput.placeholder = `Comparte tus experiencias en ${lugar.nombre}`;
    placeMessageInput.value = "";
  }

  if (placeFeedback && pbClient) {
    setFeedback(placeFeedback, "");
  }

  if (placeSection) {
    placeSection.hidden = true;
  }

  if (openPlaceForumButton) {
    openPlaceForumButton.hidden = false;
  }

  currentPlaceId = String(lugar.id);

  if (pbClient && placeForm) {
    Array.from(placeForm.elements).forEach((element) => {
      element.disabled = false;
    });
  }

  // Mostrar el modal
  modal.style.display = "block";
}

// Función para cerrar el modal
function cerrarModal() {
  const modal = document.getElementById("modal");
  modal.style.display = "none";

  currentPlaceId = null;
  if (placeMessageInput) {
    placeMessageInput.value = "";
  }
  if (placeFeedback) {
    setFeedback(placeFeedback, "");
  }
  if (placeSection) {
    placeSection.hidden = true;
  }
  if (openPlaceForumButton) {
    openPlaceForumButton.hidden = false;
  }
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

// -------- Foro PocketBase --------
const GENERAL_PLACE_ID = "general";
// URL del backend desplegado en Render
const POCKETBASE_URL =
  window.POCKETBASE_URL || "https://mapa-argentina-interactivo.onrender.com";
const FORUM_COLLECTION = "forum_posts";

const generalMessagesContainer = document.getElementById(
  "general-forum-messages"
);
const generalForm = document.getElementById("general-forum-form");
const generalNameInput = document.getElementById("general-name");
const generalMessageInput = document.getElementById("general-message");
const generalFeedback = document.getElementById("general-forum-feedback");
const generalForumPanel = document.getElementById("general-forum-panel");
const openGeneralForumButton = document.getElementById("open-general-forum");
const generalCloseElements = document.querySelectorAll("[data-close-general]");

const placeSection = document.getElementById("modal-forum");
const placeMessagesContainer = document.getElementById("place-forum-messages");
const placeForm = document.getElementById("place-forum-form");
const placeNameInput = document.getElementById("place-name");
const placeMessageInput = document.getElementById("place-message");
const placeFeedback = document.getElementById("place-forum-feedback");
const placeForumTitle = document.getElementById("place-forum-title");
const openPlaceForumButton = document.getElementById("open-place-forum");
const placeCloseElements = document.querySelectorAll("[data-close-place]");

let currentPlaceId = null;
let pbClient = null;

if (typeof PocketBase !== "undefined") {
  try {
    pbClient = new PocketBase(POCKETBASE_URL);
  } catch (error) {
    console.error("❌ Error al inicializar PocketBase", error);
  }
} else {
  console.warn(
    "PocketBase SDK no está disponible. Asegúrate de incluir el script correspondiente."
  );
}

function setFeedback(labelElement, message, type = "info") {
  if (!labelElement) return;
  labelElement.textContent = message;
  labelElement.dataset.type = type;
}

function createPlaceholderElement(message, isError = false) {
  const placeholder = document.createElement("p");
  placeholder.className = `forum__empty${
    isError ? " forum__empty--error" : ""
  }`;
  placeholder.textContent = message;
  return placeholder;
}

function formatDate(dateISO) {
  try {
    return new Intl.DateTimeFormat("es-AR", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(dateISO));
  } catch (error) {
    console.error("Error formateando la fecha", error);
    return "";
  }
}

function renderMessages(container, messages) {
  if (!container) return;
  container.innerHTML = "";

  if (!messages || messages.length === 0) {
    container.appendChild(createPlaceholderElement("Todavía no hay mensajes."));
    return;
  }

  messages.forEach((message) => {
    const article = document.createElement("article");
    article.className = "forum__message";
    article.setAttribute("role", "listitem");
    const authorInitial =
      (message.authorName || "Anónimo").trim().charAt(0).toUpperCase() || "A";
    article.dataset.initial = authorInitial;

    const header = document.createElement("div");
    header.className = "forum__message-header";

    const author = document.createElement("span");
    author.className = "forum__message-author";
    author.textContent = message.authorName || "Anónimo";

    const date = document.createElement("span");
    date.className = "forum__message-date";
    date.textContent = formatDate(message.created);

    const content = document.createElement("p");
    content.className = "forum__message-content";
    content.textContent = message.content;

    header.appendChild(author);
    header.appendChild(date);

    article.appendChild(header);
    article.appendChild(content);

    container.appendChild(article);
  });
}

async function fetchMessages(placeId) {
  if (!pbClient) throw new Error("PocketBase no está inicializado");

  const result = await pbClient.collection(FORUM_COLLECTION).getList(1, 200, {
    sort: "-created",
    filter: `placeId = "${placeId}"`,
  });

  return result.items;
}

async function loadGeneralForum() {
  if (!generalMessagesContainer) return;

  generalMessagesContainer.innerHTML = "";
  generalMessagesContainer.appendChild(
    createPlaceholderElement("Cargando mensajes...")
  );

  try {
    const messages = await fetchMessages(GENERAL_PLACE_ID);
    renderMessages(generalMessagesContainer, messages);
  } catch (error) {
    console.error("Error cargando foro general", error);
    generalMessagesContainer.innerHTML = "";
    generalMessagesContainer.appendChild(
      createPlaceholderElement(
        "No pudimos conectar con PocketBase. Verifica que el servidor esté en ejecución.",
        true
      )
    );
  }
}

async function loadPlaceForum(placeId) {
  if (!placeMessagesContainer) return;

  placeMessagesContainer.innerHTML = "";
  placeMessagesContainer.appendChild(
    createPlaceholderElement("Cargando comentarios del lugar...")
  );

  try {
    const messages = await fetchMessages(placeId);
    renderMessages(placeMessagesContainer, messages);
  } catch (error) {
    console.error("Error cargando foro del lugar", error);
    placeMessagesContainer.innerHTML = "";
    placeMessagesContainer.appendChild(
      createPlaceholderElement(
        "No pudimos conectar con PocketBase. Revisa tu servidor e inténtalo nuevamente.",
        true
      )
    );
  }
}

function disableForumForms() {
  [generalForm, placeForm].forEach((form) => {
    if (!form) return;
    Array.from(form.elements).forEach((element) => {
      element.disabled = true;
    });
  });
  if (generalMessagesContainer) {
    generalMessagesContainer.innerHTML = "";
    generalMessagesContainer.appendChild(
      createPlaceholderElement(
        "PocketBase no está disponible. Inicia el backend para participar del foro.",
        true
      )
    );
  }
  if (placeMessagesContainer) {
    placeMessagesContainer.innerHTML = "";
    placeMessagesContainer.appendChild(
      createPlaceholderElement(
        "PocketBase no está disponible. Inicia el backend para participar del foro.",
        true
      )
    );
  }
  setFeedback(
    generalFeedback,
    "PocketBase no está disponible. Inicia el backend para habilitar el foro.",
    "error"
  );
  setFeedback(
    placeFeedback,
    "PocketBase no está disponible. Inicia el backend para habilitar el foro.",
    "error"
  );
}

async function handleGeneralSubmit(event) {
  event.preventDefault();
  if (!pbClient) return;

  const message = generalMessageInput.value.trim();
  if (message.length < 5) {
    setFeedback(
      generalFeedback,
      "El mensaje debe tener al menos 5 caracteres.",
      "error"
    );
    return;
  }

  const submitButton = generalForm.querySelector("button[type='submit']");
  submitButton.disabled = true;
  setFeedback(generalFeedback, "Publicando tu mensaje...");

  try {
    await pbClient.collection(FORUM_COLLECTION).create({
      placeId: GENERAL_PLACE_ID,
      content: message,
      authorName: generalNameInput.value.trim() || "Anónimo",
    });

    generalMessageInput.value = "";
    setFeedback(
      generalFeedback,
      "¡Gracias! Tu mensaje ya está visible.",
      "success"
    );
    await loadGeneralForum();
  } catch (error) {
    console.error("Error al publicar en el foro general", error);
    setFeedback(
      generalFeedback,
      "No pudimos publicar tu mensaje. Intenta nuevamente.",
      "error"
    );
  } finally {
    submitButton.disabled = false;
  }
}

async function handlePlaceSubmit(event) {
  event.preventDefault();
  if (!pbClient || !currentPlaceId) return;

  const message = placeMessageInput.value.trim();
  if (message.length < 5) {
    setFeedback(
      placeFeedback,
      "El mensaje debe tener al menos 5 caracteres.",
      "error"
    );
    return;
  }

  const submitButton = placeForm.querySelector("button[type='submit']");
  submitButton.disabled = true;
  setFeedback(placeFeedback, "Publicando tu comentario...");

  try {
    await pbClient.collection(FORUM_COLLECTION).create({
      placeId: currentPlaceId,
      content: message,
      authorName: placeNameInput.value.trim() || "Anónimo",
    });

    placeMessageInput.value = "";
    setFeedback(
      placeFeedback,
      "Tu aporte se sumó a la conversación.",
      "success"
    );
    await loadPlaceForum(currentPlaceId);
  } catch (error) {
    console.error("Error al publicar en el foro del lugar", error);
    setFeedback(
      placeFeedback,
      "No pudimos publicar tu comentario. Intenta nuevamente.",
      "error"
    );
  } finally {
    submitButton.disabled = false;
  }
}

function openGeneralForumPanel() {
  if (!generalForumPanel) return;
  generalForumPanel.hidden = false;
  document.body.classList.add("no-scroll");
  if (openGeneralForumButton) {
    openGeneralForumButton.setAttribute("aria-expanded", "true");
  }
  if (pbClient) {
    loadGeneralForum();
  }
  if (generalNameInput && !generalNameInput.disabled) {
    generalNameInput.focus({ preventScroll: false });
  } else if (generalMessageInput && !generalMessageInput.disabled) {
    generalMessageInput.focus({ preventScroll: false });
  }
}

function closeGeneralForumPanel() {
  if (!generalForumPanel) return;
  generalForumPanel.hidden = true;
  document.body.classList.remove("no-scroll");
  if (openGeneralForumButton) {
    openGeneralForumButton.setAttribute("aria-expanded", "false");
    openGeneralForumButton.focus({ preventScroll: false });
  }
}

function openPlaceForumSection() {
  if (!placeSection) return;
  placeSection.hidden = false;
  if (openPlaceForumButton) {
    openPlaceForumButton.setAttribute("aria-expanded", "true");
    openPlaceForumButton.hidden = true;
  }
  if (pbClient && currentPlaceId) {
    loadPlaceForum(currentPlaceId);
  }
  if (placeNameInput && !placeNameInput.disabled) {
    placeNameInput.focus({ preventScroll: false });
  } else if (placeMessageInput && !placeMessageInput.disabled) {
    placeMessageInput.focus({ preventScroll: false });
  }
}

function closePlaceForumSection() {
  if (!placeSection) return;
  placeSection.hidden = true;
  if (openPlaceForumButton) {
    openPlaceForumButton.hidden = false;
    openPlaceForumButton.setAttribute("aria-expanded", "false");
    openPlaceForumButton.focus({ preventScroll: false });
  }
  if (placeMessageInput) {
    placeMessageInput.value = "";
  }
  if (pbClient) {
    setFeedback(placeFeedback, "");
  }
}

if (!pbClient) {
  disableForumForms();
} else {
  if (generalForm) {
    generalForm.addEventListener("submit", handleGeneralSubmit);
  }

  if (placeForm) {
    placeForm.addEventListener("submit", handlePlaceSubmit);
  }
}

if (openGeneralForumButton) {
  openGeneralForumButton.addEventListener("click", openGeneralForumPanel);
}

generalCloseElements.forEach((element) => {
  element.addEventListener("click", closeGeneralForumPanel);
});

if (generalForumPanel) {
  generalForumPanel.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeGeneralForumPanel();
    }
  });
}

if (openPlaceForumButton) {
  openPlaceForumButton.addEventListener("click", openPlaceForumSection);
}

placeCloseElements.forEach((element) => {
  element.addEventListener("click", closePlaceForumSection);
});

document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    generalForumPanel &&
    !generalForumPanel.hidden
  ) {
    closeGeneralForumPanel();
  }
});
