// ------------------------------
// Productos BarberX
// ------------------------------
const products = [
  {
    id: 1,
    title: "Shampoo Nutritivo",
    price: 32000,
    category: "cabello",
    img: "../img/shampoo.jpg",
    ref: "BX-SH-01",
    desc: "Shampoo profesional que fortalece y nutre el cabello."
  },
  {
    id: 2,
    title: "Aceite para Barba",
    price: 28000,
    category: "barba",
    img: "../img/aceite.jpg",
    ref: "BX-AC-02",
    desc: "Aceite hidratante para barba con acabado suave y aroma premium."
  },
  {
    id: 3,
    title: "Aftershave Refrescante",
    price: 25000,
    category: "piel",
    img: "../img/aftershave.jpg",
    ref: "BX-AF-03",
    desc: "Loción refrescante que calma la piel después del afeitado."
  },
  {
    id: 4,
    title: "Cera para Cabello",
    price: 22000,
    category: "cabello",
    img: "../img/cera.jpg",
    ref: "BX-CE-04",
    desc: "Cera moldeadora con alta fijación y acabado natural."
  },
  {
    id: 5,
    title: "Mascarilla Facial",
    price: 30000,
    category: "piel",
    img: "../img/mascarilla.jpg",
    ref: "BX-MA-05",
    desc: "Mascarilla de limpieza profunda con carbón activado."
  },
  {
    id: 6,
    title: "Peine Premium",
    price: 15000,
    category: "barba",
    img: "../img/peine.jpg",
    ref: "BX-PE-06",
    desc: "Peine profesional antiestático ideal para todo tipo de barba."
  }
];


// ------------------------------
// Renderizado de productos
// ------------------------------
const list = document.getElementById("product-list");
const filter = document.getElementById("filterCategory");
const searchInput = document.getElementById("searchInput");

function renderProducts(items) {
  list.innerHTML = "";
  items.forEach(p => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <img src="${p.img}" alt="${p.title}">
      <h3>${p.title}</h3>
      <p class="price">${p.price.toLocaleString()} COP</p>
      <button class="btn view-btn" data-id="${p.id}">Ver más</button>
    `;

    list.appendChild(card);
  });
}

renderProducts(products);


// ------------------------------
// Filtros
// ------------------------------
filter.addEventListener("change", () => {
  applyFilters();
});

searchInput.addEventListener("input", () => {
  applyFilters();
});

function applyFilters() {
  const category = filter.value;
  const text = searchInput.value.toLowerCase();

  const filtered = products.filter(p => {
    const matchesCategory = category === "all" || p.category === category;
    const matchesText =
      p.title.toLowerCase().includes(text) ||
      p.desc.toLowerCase().includes(text);

    return matchesCategory && matchesText;
  });

  renderProducts(filtered);
}


// ------------------------------
// Modal producto
// ------------------------------
const modal = document.getElementById("productModal");
const modalBody = document.getElementById("modalBody2");
const modalClose = document.getElementById("modalClose2");

document.addEventListener("click", e => {
  if (e.target.classList.contains("view-btn")) {
    const id = e.target.dataset.id;
    openProduct(id);
  }
});

function openProduct(id) {
  const p = products.find(x => x.id == id);

  modalBody.innerHTML = `
    <img src="${p.img}" class="modal-img">
    <h2 id="modalTitle">${p.title}</h2>
    <p>${p.desc}</p>
    <p class="price">${p.price.toLocaleString()} COP</p>

    <button class="btn primary"
      onclick="location.href='../pagar/pagar.html?ref=${p.ref}&title=${encodeURIComponent(p.title)}&price=${p.price}&img=${encodeURIComponent(p.img)}'">
      Pagar en línea
    </button>
  `;

  modal.setAttribute("aria-hidden", "false");
  modal.style.display = "block";
}

modalClose.addEventListener("click", () => {
  modal.style.display = "none";
});

modal.addEventListener("click", e => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});
