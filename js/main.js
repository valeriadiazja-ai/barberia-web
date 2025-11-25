/* main.js — Productos + modal "Ver" + carrito integrado (versión no invasiva)
   Reemplaza completamente tu main.js con este archivo.
*/

document.addEventListener('DOMContentLoaded', () => {

  // --- Productos (tu lista)
  const products = [
    { id: 'p1', title: 'Shampoo anticaspa', price: 22000, description: 'Limpieza profunda y control de caspa.', img: 'img/shampoo.jpg', category: 'cabello' },
    { id: 'p2', title: 'Aceite para barba', price: 18000, description: 'Hidratación y brillo natural.', img: 'img/aceite.jpg', category: 'barba' },
    { id: 'p3', title: 'After Shave', price: 20000, description: 'Calma y cuida la piel después del afeitado.', img: 'img/aftershave.jpg', category: 'piel' },
    { id: 'p4', title: 'Cera para cabello', price: 25000, description: 'Fijación fuerte para estilos duraderos.', img: 'img/cera.jpg', category: 'cabello' },
    { id: 'p5', title: 'Mascarilla facial', price: 15000, description: 'Limpieza profunda para el rostro.', img: 'img/mascarilla.jpg', category: 'piel' },
    { id: 'p6', title: 'Peine profesional', price: 10000, description: 'Peine resistente y de calidad profesional.', img: 'img/peine.jpg', category: 'cabello' }
  ];

  // --- Elementos del DOM (debe existir product-list, filterCategory, searchInput en tu HTML)
  const grid = document.getElementById('product-list');
  const filterCategory = document.getElementById('filterCategory');
  const searchInput = document.getElementById('searchInput');

  // Carrito: elementos que deben existir en tu HTML (añadidos si no existen)
  // Si aún no tienes en tu HTML el cartIcon/cartModal agregalos con el HTML que te pasé antes.
  const cartIcon = document.getElementById('cartIcon');
  const cartModal = document.getElementById('cartModal');
  const cartItems = document.getElementById('cartItems');
  const cartTotal = document.getElementById('cartTotal');
  const cartCount = document.getElementById('cartCount');
  const closeCart = document.getElementById('closeCart');
  const checkoutBtn = document.getElementById('checkoutBtn');

  // --- Estado del carrito (se carga desde localStorage si existe)
  let cart = JSON.parse(localStorage.getItem('cart') || '[]');

  // --- RENDER: productos (no modifica el resto de tu DOM/CSS)
  function renderProducts(list) {
    if (!grid) return;
    grid.innerHTML = list.map(p => `
      <div class="card product-card">
        <img src="${p.img}" alt="${p.title}" />
        <h3>${p.title}</h3>
        <p>${p.price.toLocaleString()} COP</p>
        <button class="open-modal-btn" data-id="${p.id}" type="button">Ver</button>
      </div>
    `).join('');
  }

  renderProducts(products);

  // --- Filtrado por categoría
  if (filterCategory) {
    filterCategory.addEventListener('change', (e) => {
      const category = e.target.value;
      if (category === 'all') renderProducts(products);
      else renderProducts(products.filter(p => p.category === category));
    });
  }

  // --- Buscador
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase();
      renderProducts(products.filter(p => p.title.toLowerCase().includes(q)));
    });
  }

  // --- MODAL "VER" (delegación de eventos sobre grid)
  // Usa un modal preexistente si lo tienes o crea uno temporalmente (no inyecta estilos globales).
  function createModalIfNeeded() {
    let m = document.getElementById('productPreviewModal');
    if (m) return m;
    m = document.createElement('div');
    m.id = 'productPreviewModal';
    m.style.display = 'none';
    m.innerHTML = `
      <div class="preview-backdrop" id="previewBackdrop"></div>
      <div class="preview-panel" id="previewPanel" role="dialog" aria-modal="true">
        <button id="previewClose" aria-label="Cerrar">×</button>
        <div id="previewContent"></div>
      </div>
    `;
    document.body.appendChild(m);
    return m;
  }

  const previewModal = createModalIfNeeded();
  const previewBackdrop = document.getElementById('previewBackdrop');
  const previewPanel = document.getElementById('previewPanel');
  const previewContent = document.getElementById('previewContent');

  // Abrir modal con datos de producto
  function openPreview(product) {
    if (!previewModal) return;
    previewContent.innerHTML = `
      <div style="display:flex; gap:16px; align-items:flex-start;">
        <img src="${product.img}" alt="${product.title}" style="width:160px; border-radius:8px;">
        <div style="flex:1">
          <h3 style="margin:0 0 6px">${product.title}</h3>
          <p style="margin:0 0 6px">${product.description}</p>
          <p style="margin:0 0 12px; font-weight:600">${product.price.toLocaleString()} COP</p>
          <div style="display:flex; gap:8px;">
            <button id="previewAddBtn" type="button">Agregar al carrito</button>
            <button id="previewCloseBtn" type="button">Cerrar</button>
          </div>
        </div>
      </div>
    `;
    previewModal.style.display = 'flex';
    // attach handlers (remove previous to avoid duplicates)
    const addBtn = document.getElementById('previewAddBtn');
    const closeBtn = document.getElementById('previewCloseBtn');
    const closeX = document.getElementById('previewClose');

    function onAdd() {
      addToCart(product);
      previewModal.style.display = 'none';
      removeListeners();
    }
    function onClose() {
      previewModal.style.display = 'none';
      removeListeners();
    }
    function removeListeners() {
      addBtn && addBtn.removeEventListener('click', onAdd);
      closeBtn && closeBtn.removeEventListener('click', onClose);
      closeX && closeX.removeEventListener('click', onClose);
      previewBackdrop && previewBackdrop.removeEventListener('click', onClose);
    }
    addBtn && addBtn.addEventListener('click', onAdd);
    closeBtn && closeBtn.addEventListener('click', onClose);
    closeX && closeX.addEventListener('click', onClose);
    previewBackdrop && previewBackdrop.addEventListener('click', onClose);
  }

  // Delegación de click en grid para abrir preview
  if (grid) {
    grid.addEventListener('click', (e) => {
      const btn = e.target.closest('.open-modal-btn');
      if (!btn) return;
      const id = btn.dataset.id;
      const product = products.find(p => p.id === id);
      if (product) openPreview(product);
    });
  }

  // --- CARRITO (no modifica tu CSS de header; usa clases/IDs existentes)
  function addToCart(product) {
    cart.push(product);
    saveAndRenderCart();
  }
  window.addToCart = addToCart; // expuesto si lo necesitas en inline onclicks (opcional)

  function saveAndRenderCart() {
    try { localStorage.setItem('cart', JSON.stringify(cart)); } catch (err) { /* ignore */ }
    renderCart();
  }

  function renderCart() {
    if (!cartItems || !cartTotal || !cartCount) return;
    cartItems.innerHTML = '';
    let total = 0;
    cart.forEach((p, idx) => {
      total += p.price;
      const li = document.createElement('li');
      li.className = 'cart-item';
      li.innerHTML = `<span>${p.title}</span><span>${p.price.toLocaleString()} COP</span>`;
      cartItems.appendChild(li);
    });
    cartTotal.textContent = total.toLocaleString();
    cartCount.textContent = cart.length;
  }

  // Carrito UI open/close
  if (cartIcon) cartIcon.addEventListener('click', () => { if (cartModal) cartModal.style.display = 'flex'; });
  if (closeCart) closeCart.addEventListener('click', () => { if (cartModal) cartModal.style.display = 'none'; });

  // Checkout -> pasar carrito completo a pagar.html guardando en localStorage
  if (checkoutBtn) checkoutBtn.addEventListener('click', () => {
    if (!cart || cart.length === 0) { alert('Tu carrito está vacío'); return; }
    try { localStorage.setItem('cart', JSON.stringify(cart)); } catch (err) {}
    window.location.href = 'payment/pagar.html';
  });

  // carga inicial del carrito desde localStorage (si existe)
  (function loadCartFromStorage() {
    try {
      const stored = JSON.parse(localStorage.getItem('cart') || '[]');
      if (Array.isArray(stored) && stored.length > 0) cart = stored;
    } catch (err) { cart = []; }
    renderCart();
  })();

  // --- NOTA: No inyectamos estilos globales aquí. Para la apariencia del modal/carrito usa las reglas CSS que te doy.
});
