document.addEventListener('DOMContentLoaded', () => {

    const products = [
        { id: 'p1', title: 'Shampoo anticaspa', price: 22000, description: 'Limpieza profunda y control de caspa.', img: 'img/shampoo.jpg', category: 'cabello' },
        { id: 'p2', title: 'Aceite para barba', price: 18000, description: 'Hidratación y brillo natural.', img: 'img/aceite.jpg', category: 'barba' },
        { id: 'p3', title: 'After Shave', price: 20000, description: 'Calma y cuida la piel después del afeitado.', img: 'img/aftershave.jpg', category: 'piel' },
        { id: 'p4', title: 'Cera para cabello', price: 25000, description: 'Fijación fuerte para estilos duraderos.', img: 'img/cera.jpg', category: 'cabello' },
        { id: 'p5', title: 'Mascarilla facial', price: 15000, description: 'Limpieza profunda para el rostro.', img: 'img/mascarilla.jpg', category: 'piel' },
        { id: 'p6', title: 'Peine profesional', price: 10000, description: 'Peine resistente y de calidad profesional.', img: 'img/peine.jpg', category: 'cabello' }
    ];

    const grid = document.getElementById('product-list');

    function renderProducts(list) {
        grid.innerHTML = list.map(p => `
            <div class="card product-card">
                <img src="${p.img}" alt="${p.title}" />
                <h3>${p.title}</h3>
                <p>${p.price.toLocaleString()} COP</p>
                <button class="open-modal-btn" data-id="${p.id}" data-img="${p.img}" data-price="${p.price}" data-title="${p.title}">Ver</button>
            </div>
        `).join('');
    }

    renderProducts(products);

    // Filtrar
    document.getElementById('filterCategory').addEventListener('change', e => {
        const category = e.target.value;
        if(category === 'all') return renderProducts(products);
        renderProducts(products.filter(p => p.category === category));
    });

    // Buscador
    document.getElementById('searchInput').addEventListener('input', e => {
        const text = e.target.value.toLowerCase();
        renderProducts(products.filter(p => p.title.toLowerCase().includes(text)));
    });

    // Modal
    document.body.addEventListener('click', e => {
        const btn = e.target.closest('.open-modal-btn');
        if(btn) openProductModal(btn);
    });

    function openProductModal(btn) {
        const id = btn.dataset.id;
        const title = btn.dataset.title;
        const price = btn.dataset.price;
        const img = btn.dataset.img;

        let modal = document.querySelector('.product-modal');
        if(modal) modal.remove();

        modal = document.createElement('div');
        modal.className = 'product-modal';
        modal.innerHTML = `
            <div class="product-modal-backdrop"></div>
            <div class="product-modal-panel">
                <button class="modal-close">×</button>
                <div class="product-modal-content" style="display:flex; gap:20px;">
                    <div class="product-modal-left"><img src="${img}" alt="${title}" style="width:100%; max-width:350px; border-radius:10px;"></div>
                    <div class="product-modal-right">
                        <h2>${title}</h2>
                        <p>${parseInt(price).toLocaleString()} COP</p>
                        <p>${products.find(p=>p.id===id).description}</p>
                        <div style="margin-top:18px; display:flex; gap:8px; flex-wrap:wrap;">
                            <button class="btn" id="btnComprar">Comprar</button>
                            <button class="btn success" id="btnPagar">Pagar en línea</button>
                            <button class="btn ghost" id="btnCerrar">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        modal.querySelector('.product-modal-backdrop').onclick = () => modal.remove();
        modal.querySelector('.modal-close').onclick = () => modal.remove();
        modal.querySelector('#btnCerrar').onclick = () => modal.remove();

        modal.querySelector('#btnComprar').onclick = () => {
            alert(`Has añadido "${title}" al carrito.`);
            modal.remove();
        };

        modal.querySelector('#btnPagar').onclick = () => {
            const url = `payment/pagar.html?ref=${id}&producto=${encodeURIComponent(title)}&valor=${price}&img=${encodeURIComponent(img)}`;
            window.location.href = url;
        };
    }
});
