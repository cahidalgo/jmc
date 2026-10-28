const header = document.getElementById("header");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.getElementById("lightboxClose");

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 24);
});

menuToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

const recordSearch = document.getElementById("recordSearch");
const recordType = document.getElementById("recordType");
const recordRows = [...document.querySelectorAll("#recordTableBody tr")];
const recordCount = document.getElementById("recordCount");
const recordEmpty = document.getElementById("recordEmpty");

function normalizeText(value) {
  return value
    .toLocaleLowerCase("es")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function filterRecords() {
  const query = normalizeText(recordSearch.value.trim());
  const type = recordType.value;
  let visibleCount = 0;

  recordRows.forEach((row) => {
    const matchesQuery = !query || normalizeText(row.textContent).includes(query);
    const matchesType = type === "all" || row.dataset.type === type;
    const visible = matchesQuery && matchesType;
    row.hidden = !visible;
    if (visible) visibleCount += 1;
  });

  recordCount.textContent = String(visibleCount);
  recordEmpty.hidden = visibleCount !== 0;
}

recordSearch.addEventListener("input", filterRecords);
recordType.addEventListener("change", filterRecords);

function closeLightbox() {
  lightbox.hidden = true;
  lightboxImage.src = "";
  document.body.style.overflow = "";
}

document.querySelectorAll(".gallery-item").forEach((item) => {
  item.addEventListener("click", () => {
    lightboxImage.src = item.dataset.image;
    lightboxImage.alt = item.dataset.alt;
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
  });
});

lightboxClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !lightbox.hidden) closeLightbox();
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
