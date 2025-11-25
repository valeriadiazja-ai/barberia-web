/* main.js - Reemplazar todo este archivo */
document.addEventListener('DOMContentLoaded', () => {
  // Ejemplo de productos. Si ya tienes un array/JSON en tu repo,
  // intenta mantener la misma estructura y ajustar la propiedad `id`.
  const products = [
    { id: 'p1', title: 'Shampoo anticaspa', price: 22000, description: 'Limpieza profunda y control de caspa.', img: 'imagen/shampoo.jpg' },
    { id: 'p2', title: 'Aceite para barba', price: 18000, description: 'Hidratación y brillo natural.', img: 'imagen/aceite.jpg' },
    // agrega/ajusta según tu data real
  ];

  // Render simple de productos (si ya tienes HTML, puedes omitir esta sección)
  const grid = document.querySelector('.products-grid');
  if (grid) {
    grid.innerHTML = products.map(p => `
      <div class="card product-card" data-id="${p.id}">
        <img src="${p.img}" alt="${p.title}" />
        <h3>${p.title}</h3>
        <p>${p.price.toLocaleString()} COP</p>
        <button class="open-modal-btn" data-id="${p.id}">Ver</button>
      </div>
    `).join('');
  }

  // Asignar listeners a los botones para abrir modal
  document.body.addEventListener('click', (e) => {
    const btn = e.target.closest('.open-modal-btn');
    if (btn) {
      const id = btn.getAttribute('data-id');
      openProductModal(id);
    }
  });

  // Función principal: abre modal con la info del producto.
  window.openProductModal = function openProductModal(id) {
    const product = products.find(p => p.id === id);
    if (!product) return console.warn('Producto no encontrado', id);

    // Crear modal (si ya existe, lo reemplazamos)
    let modal = document.querySelector('.product-modal');
    if (modal) modal.remove();

    modal = document.createElement('div');
    modal.className = 'product-modal';
    modal.innerHTML = `
      <div class="product-modal-backdrop"></div>
      <div class="product-modal-panel" role="dialog" aria-modal="true">
        <button class="modal-close" aria-label="Cerrar">×</button>
        <div class="product-modal-content">
          <div class="product-modal-left">
            <img src="${product.img}" alt="${product.title}" />
          </div>
          <div class="product-modal-right">
            <h2>${product.title}</h2>
            <p class="price">${product.price.toLocaleString()} COP</p>
            <p class="desc">${product.description}</p>

            <div style="margin-top:18px;display:flex;gap:8px;flex-wrap:wrap">
              <button class="btn" id="btnComprar">Comprar</button>
              <button class="btn success" id="btnPagar">Pagar en línea</button>
              <button class="btn ghost" id="btnCerrar">Cerrar</button>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    // estilos rápidos (si tu CSS ya controla, omite)
    injectModalStyles();

    const backdrop = modal.querySelector('.product-modal-backdrop');
    const btnCerrar = modal.querySelector('#btnCerrar');
    const closeX = modal.querySelector('.modal-close');

    backdrop.addEventListener('click', () => modal.remove());
    btnCerrar.addEventListener('click', () => modal.remove());
    closeX.addEventListener('click', () => modal.remove());

    // BOTÓN COMPRAR (puedes personalizar)
    const btnComprar = modal.querySelector('#btnComprar');
    btnComprar.addEventListener('click', () => {
      alert(`Has añadido "${product.title}" al carrito (simulado).`);
      modal.remove();
    });

    // PAGAR EN LÍNEA -> abre la pasarela de pago con parámetros en querystring
    const btnPagar = modal.querySelector('#btnPagar');
    btnPagar.addEventListener('click', () => {
      const referencia = encodeURIComponent(product.id);
      const nombre = encodeURIComponent(product.title);
      const valor = product.price;
      // Ruta local en tu repo: /payment/pagar.html
      window.location.href = `/payment/pagar.html?ref=${referencia}&producto=${nombre}&valor=${valor}`;
    });
  };

  // Inyecta estilos mínimos para el modal si no los tienes
  function injectModalStyles() {
    if (document.getElementById('product-modal-styles')) return;
    const style = document.createElement('style');
    style.id = 'product-modal-styles';
    style.innerHTML = `
    .product-modal { position: fixed; inset:0; z-index:9999; display:flex; align-items:center; justify-content:center; }
    .product-modal-backdrop{ position: absolute; inset:0; background: rgba(0,0,0,0.45); }
    .product-modal-panel{ position: relative; width: 90%; max-width: 1100px; background: #fff; border-radius: 12px; padding: 24px; box-shadow: 0 8px 40px rgba(0,0,0,0.4); display:flex; align-items:center; }
    .product-modal-content{ display:flex; gap: 20px; width:100%; }
    .product-modal-left img{ width: 100%; max-width:420px; border-radius:10px; object-fit:contain; }
    .product-modal-left{ flex:1; display:flex; align-items:center; justify-content:center; }
    .product-modal-right{ flex:1; padding: 8px 12px; }
    .product-modal-right h2{ margin:0 0 10px 0; font-size:28px; }
    .product-modal-right .price{ font-weight:700; margin:6px 0 12px 0; }
    .product-modal-right .desc{ color:#444; margin-bottom:12px; }
    .modal-close{ position:absolute; right:14px; top:10px; background:transparent;border:0;font-size:24px;cursor:pointer; }
    .btn{ padding:10px 16px; border-radius:10px; border:0; cursor:pointer; background:#0b1720; color:#fff; }
    .btn.ghost{ background:#fff; border:1px solid #e6e6e6; color:#222; }
    .btn.success{ background: linear-gradient(90deg,#f59e0b,#ef4444); color:#fff; font-weight:700; }
    @media(max-width:800px){
      .product-modal-panel{ padding:12px; }
      .product-modal-content{ flex-direction:column; }
      .product-modal-left img{ max-width: 320px; }
    }
    `;
    document.head.appendChild(style);
  }
});

