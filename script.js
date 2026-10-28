const header = document.getElementById("header");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.getElementById("lightboxClose");
let lastFocusedElement;

function updateHeader() {
  header.classList.toggle("scrolled", window.scrollY > 24);
}

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

menuToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menú");
  });
});

const recordSearch = document.getElementById("recordSearch");
const recordType = document.getElementById("recordType");
const recordRows = [...document.querySelectorAll("#recordTableBody tr")].map((row) => ({
  element: row,
  searchText: normalizeText(row.textContent)
}));
const recordCount = document.getElementById("recordCount");
const recordEmpty = document.getElementById("recordEmpty");
const recordTableWrap = document.querySelector(".record-table-wrap");
const recordMore = document.getElementById("recordMore");
let recordsExpanded = false;

function normalizeText(value) {
  return value
    .toLocaleLowerCase("es")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function filterRecords() {
  if (!recordsExpanded) {
    recordsExpanded = true;
    recordTableWrap.classList.remove("record-table-compact");
    recordMore.setAttribute("aria-expanded", "true");
    updateRecordButton();
  }
  const query = normalizeText(recordSearch.value.trim());
  const type = recordType.value;
  let visibleCount = 0;

  recordRows.forEach(({ element, searchText }) => {
    const matchesQuery = !query || searchText.includes(query);
    const matchesType = type === "all" || element.dataset.type === type;
    const visible = matchesQuery && matchesType;
    element.hidden = !visible;
    if (visible) visibleCount += 1;
  });

  recordCount.textContent = String(visibleCount);
  recordEmpty.hidden = visibleCount !== 0;
}

function updateRecordButton() {
  recordMore.setAttribute("aria-expanded", String(recordsExpanded));
  recordMore.innerHTML = recordsExpanded
    ? 'Mostrar primeras 5 obras <span>↑</span>'
    : 'Ver todas las obras <span>↓</span>';
}

function resetRecords() {
  recordsExpanded = false;
  recordSearch.value = "";
  recordType.value = "all";
  recordTableWrap.classList.add("record-table-compact");
  recordRows.forEach(({ element }, index) => {
    element.hidden = index >= 5;
  });
  recordCount.textContent = "5";
  recordEmpty.hidden = true;
  updateRecordButton();
}

function toggleRecords() {
  if (recordsExpanded) {
    resetRecords();
    return;
  }

  recordsExpanded = true;
  recordTableWrap.classList.remove("record-table-compact");
  filterRecords();
  updateRecordButton();
}

recordMore.addEventListener("click", toggleRecords);
recordSearch.addEventListener("input", filterRecords);
recordType.addEventListener("change", filterRecords);

function closeLightbox() {
  lightbox.hidden = true;
  lightboxImage.src = "";
  document.body.classList.remove("lightbox-open");
  if (lastFocusedElement) {
    lastFocusedElement.focus();
    lastFocusedElement = null;
  }
}

document.querySelectorAll(".gallery-item").forEach((item) => {
  item.addEventListener("click", () => {
    lastFocusedElement = document.activeElement;
    lightboxImage.src = item.dataset.image;
    lightboxImage.alt = item.dataset.alt;
    lightbox.hidden = false;
    document.body.classList.add("lightbox-open");
    lightboxClose.focus();
  });
});

lightboxClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !lightbox.hidden) closeLightbox();
});

document.addEventListener("click", (event) => {
  if (navLinks.classList.contains("open")
    && !navLinks.contains(event.target)
    && !menuToggle.contains(event.target)) {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menú");
  }
});

document.getElementById("contactForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const subject = encodeURIComponent(`Solicitud de cotización - ${data.get("nombre")}`);
  const body = encodeURIComponent([
    `Nombre: ${data.get("nombre")}`,
    `Empresa: ${data.get("empresa") || "No indicada"}`,
    `Correo: ${data.get("correo")}`,
    `Teléfono: ${data.get("telefono") || "No indicado"}`,
    `Servicio: ${data.get("servicio")}`,
    `Ubicación: ${data.get("ubicacion") || "No indicada"}`,
    `Necesidad: ${data.get("mensaje") || "No indicada"}`
  ].join("\n"));
  window.location.href = `mailto:c.jmcsas@hotmail.com?subject=${subject}&body=${body}`;
});
