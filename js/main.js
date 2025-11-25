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
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');

    function updateCartCount() {
        document.getElementById('cartCount').innerText = cart.length;
    }

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
    updateCartCount();

    document.getElementById('filterCategory').addEventListener('change', e => {
        const category = e.target.value;
        renderProducts(category === 'all' ? products : products.filter(p => p.category === category));
    });

    document.getElementById('searchInput').addEventListener('input', e => {
        const text = e.target.value.toLowerCase();
        renderProducts(products.filter(p => p.title.toLowerCase().includes(text)));
    });

    document.body.addEventListener('click', e => {
        const btn = e.target.closest('.open-modal-btn');
        if (btn) openProductModal(btn.dataset.id);
        if (e.target.id === 'cartIcon') openCartModal();
    });

    function openProductModal(id) {
        const product = products.find(p => p.id === id);
        if (!product) return;

        const modal = document.getElementById('productModal');
        modal.innerHTML = `
            <div class="modal-backdrop" style="position:fixed; inset:0; background:rgba(0,0,0,0.5);"></div>
            <div class="modal-panel" style="position:fixed; top:50%; left:50%; transform:translate(-50%, -50%); background:white; padding:20px; border-radius:10px; width:90%; max-width:400px;">
                <button id="modalClose" style="position:absolute; top:10px; right:10px; border:none; background:none; font-size:24px; cursor:pointer;">×</button>
                <img src="${product.img}" alt="${product.title}" style="width:100%; border-radius:8px; margin-bottom:10px;" />
                <h2>${product.title}</h2>
                <p>${product.price.toLocaleString()} COP</p>
                <p>${product.description}</p>
                <button id="btnComprar">Agregar al carrito</button>
            </div>
        `;
        modal.style.display = 'block';

        modal.querySelector('#modalClose').onclick = () => modal.style.display = 'none';
        modal.querySelector('#btnComprar').onclick = () => {
            cart.push(product);
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            alert(`"${product.title}" agregado al carrito`);
            modal.style.display = 'none';
        };
    }

    function openCartModal() {
        if (cart.length === 0) { alert("Carrito vacío"); return; }
        const modal = document.getElementById('productModal');
        let total = cart.reduce((sum, p) => sum + p.price, 0);
        modal.innerHTML = `
            <div class="modal-backdrop" style="position:fixed; inset:0; background:rgba(0,0,0,0.5);"></div>
            <div class="modal-panel" style="position:fixed; top:50%; left:50%; transform:translate(-50%, -50%); background:white; padding:20px; border-radius:10px; width:90%; max-width:400px; max-height:70vh; overflow-y:auto;">
                <button id="modalClose" style="position:absolute; top:10px; right:10px; border:none; background:none; font-size:24px; cursor:pointer;">×</button>
                <h2>Carrito</h2>
                ${cart.map(p=>`<p>${p.title} - ${p.price.toLocaleString()} COP</p>`).join('')}
                <p><b>Total: ${total.toLocaleString()} COP</b></p>
                <button id="checkoutBtn">Pagar en línea</button>
            </div>
        `;
        modal.style.display = 'block';
        modal.querySelector('#modalClose').onclick = () => modal.style.display = 'none';
        modal.querySelector('#checkoutBtn').onclick = () => {
            localStorage.setItem('cart', JSON.stringify(cart));
            window.location.href = 'payment/pagar.html';
        };
    }
});
