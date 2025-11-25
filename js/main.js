document.addEventListener('DOMContentLoaded', () => {

    // ⭐ Aquí van TODOS tus productos reales ⭐
    const products = [
        { id: 'p1', title: 'Shampoo anticaspa', price: 22000, description: 'Limpieza profunda y control de caspa.', img: 'img/shampoo.jpg', category: 'cabello' },
        { id: 'p2', title: 'Aceite para barba', price: 18000, description: 'Hidratación y brillo natural.', img: 'img/aceite.jpg', category: 'barba' },
        { id: 'p3', title: 'After Shave', price: 20000, description: 'Calma y cuida la piel después del afeitado.', img: 'img/aftershave.jpg', category: 'piel' },
        { id: 'p4', title: 'Cera para cabello', price: 25000, description: 'Fijación fuerte para estilos duraderos.', img: 'img/cera.jpg', category: 'cabello' },
        { id: 'p5', title: 'Mascarilla facial', price: 15000, description: 'Limpieza profunda para el rostro.', img: 'img/mascarilla.jpg', category: 'piel' },
        { id: 'p6', title: 'Peine profesional', price: 10000, description: 'Peine resistente y de calidad profesional.', img: 'img/peine.jpg', category: 'cabello' }
    ];

    // 📌 Renderizar productos
    const grid = document.getElementById('product-list');

    function renderProducts(list) {
        grid.innerHTML = list.map(p => `
            <div class="card product-card">
                <img src="${p.img}" alt="${p.title}" />
                <h3>${p.title}</h3>
                <p>${p.price.toLocaleString()} COP</p>
                <button class="open-modal-btn" data-id="${p.id}">Ver</button>
            </div>
        `).join('');
    }

    renderProducts(products);

    // 📌 FILTRO por categoría
    document.getElementById('filterCategory').addEventListener('change', (e) => {
        const category = e.target.value;
        if (category === 'all') return renderProducts(products);
        renderProducts(products.filter(p => p.category === category));
    });

    // 📌 BUSCADOR
    document.getElementById('searchInput').addEventListener('input', (e) => {
        const text = e.target.value.toLowerCase();
        const filtered = products.filter(p => p.title.toLowerCase().includes(text));
        renderProducts(filtered);
    });

    // 📌 CLICK para abrir modal
    document.body.addEventListener('click', (e) => {
        const btn = e.target.closest('.open-modal-btn');
        if (btn) openProductModal(btn.dataset.id);
    });

    // ⭐ Modal de producto ⭐
    function openProductModal(id) {
        const product = products.find(p => p.id === id);
        if (!product) return;

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

                        <div style="margin-top:18px; display:flex; gap:8px; flex-wrap:wrap">
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

        modal.querySelector('.product-modal-backdrop').onclick = () => modal.remove();
        modal.querySelector('.modal-close').onclick = () => modal.remove();
        modal.querySelector('#btnCerrar').onclick = () => modal.remove();

        // ❗ Botón COMPRAR (opcional)
        modal.querySelector('#btnComprar').onclick = () => {
            alert(`Has añadido "${product.title}" al carrito.`);
            modal.remove();
        };

        // ❗ Botón PAGAR EN LÍNEA
        modal.querySelector('#btnPagar').onclick = () => {
            window.location.href = `payment/pagar.html?ref=${product.id}&producto=${encodeURIComponent(product.title)}&valor=${product.price}`;
        };
    }

    // ⭐ Estilos del modal ⭐
    function injectModalStyles() {
        if (document.getElementById('product-modal-styles')) return;

        const style = document.createElement('style');
        style.id = 'product-modal-styles';
        style.textContent = `
            .product-modal { position: fixed; inset: 0; display:flex; justify-content:center; align-items:center; z-index:9999; }
            .product-modal-backdrop { position:absolute; inset:0; background:rgba(0,0,0,0.5); }
            .product-modal-panel { position:relative; background:white; padding:20px; border-radius:10px; width:90%; max-width:1000px; display:flex; }
            .product-modal-content { display:flex; gap:20px; }
            .product-modal-left img { width:100%; max-width:350px; border-radius:10px; }
            .btn { padding:10px 16px; border-radius:8px; border:none; cursor:pointer; background:#000; color:white; }
            .btn.success { background:linear-gradient(90deg,#f59e0b,#ef4444); font-weight:bold; }
            .btn.ghost { background:white; border:1px solid #ddd; color:#222; }
            .modal-close { position:absolute; top:10px; right:10px; background:none; border:none; font-size:24px; cursor:pointer; }
        `;
        document.head.appendChild(style);
    }
});
