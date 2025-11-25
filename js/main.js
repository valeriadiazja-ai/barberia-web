document.addEventListener('DOMContentLoaded', () => {

  const products = [
    {
      id: 'p1',
      title: 'Shampoo anticaspa',
      price: 22000,
      description: 'Limpieza profunda y control de caspa.',
      img: 'img/shampoo.jpg'
    },
    {
      id: 'p2',
      title: 'Aceite para barba',
      price: 18000,
      description: 'Hidratación y brillo natural.',
      img: 'img/aceite.jpg'
    }
  ];

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

  document.body.addEventListener('click', (e) => {
    const btn = e.target.closest('.open-modal-btn');
    if (btn) {
      const id = btn.getAttribute('data-id');
      openProductModal(id);
    }
  });

  window.openProductModal = function openProductModal(id) {
    const product = products.find(p => p.id === id);
    if (!product) return console.warn('Producto no encontrado', id);

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
    injectModalStyles();

    modal.querySelector('.product-modal-backdrop').onclick =
    modal.querySelector('#btnCerrar').onclick =
    modal.querySelector('.modal-close').onclick =
      () => modal.remove();

    modal.querySelector('#btnComprar').onclick = () => {
      alert(`Has añadido "${product.title}" al carrito (simulado).`);
      modal.remove();
    };

    modal.querySelector('#btnPagar').onclick = () => {
      const referencia = encodeURIComponent(product.id);
      const nombre = encodeURIComponent(product.title);
      const valor = product.price;

      window.location.href =
        `/payment/pagar.html?ref=${referencia}&producto=${nombre}&valor=${valor}`;
    };
  };

  function injectModalStyles() {
    if (document.getElementById('product-modal-styles')) return;
    const style = document.createElement('style');
    style.id = 'product-modal-styles';
    style.innerHTML = `
      .product-modal { position:fixed; inset:0; display:flex; justify-content:center; align-items:center; z-index:9999; }
      .product-modal-backdrop{ position:absolute; inset:0; background:rgba(0,0,0,.45); }
      .product-modal-panel{ position:relative; background:#fff; width:90%; max-width:1100px; border-radius:12px; padding:24px; display:flex; }
      .product-modal-content{ display:flex; gap:20px; width:100%; }
      .product-modal-left img{ max-width:420px; width:100%; border-radius:10px; }
      .product-modal-right{ flex:1; }
      .modal-close{ position:absolute; right:14px; top:10px; font-size:24px; background:transparent; border:0; cursor:pointer; }
      .btn{ padding:10px 16px; border-radius:10px; border:0; cursor:pointer; }
      .btn.success{ background:linear-gradient(90deg,#f59e0b,#ef4444); color:white; font-weight:700; }
      .btn.ghost{ background:#fff; border:1px solid #e6e6e6; }
    `;
    document.head.appendChild(style);
  }
});
