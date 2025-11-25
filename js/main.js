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
    const cartCount = document.getElementById('cartCount');
    const cartIcon = document.getElementById('cartIcon');
    const cartModal = document.getElementById('cartModal');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const checkoutBtn = document.getElementById('checkoutBtn');
    const closeCart = document.getElementById('closeCart');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function updateCartUI() {
        cartCount.innerText = cart.length;
        cartItems.innerHTML = '';
        let total = 0;
        cart.forEach(p => {
            const li = document.createElement('li');
            li.textContent = `${p.title} - ${p.price.toLocaleString()} COP`;
            cartItems.appendChild(li);
            total += p.price;
        });
        cartTotal.innerText = total.toLocaleString();
        localStorage.setItem('cart', JSON.stringify(cart));
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

    document.getElementById('filterCategory').addEventListener('change', (e) => {
        const category = e.target.value;
        renderProducts(category === 'all' ? products : products.filter(p => p.category === category));
    });

    document.getElementById('searchInput').addEventListener('input', (e) => {
        const text = e.target.value.toLowerCase();
        renderProducts(products.filter(p => p.title.toLowerCase().includes(text)));
    });

    // Modal previsualización
    const modal = document.getElementById('productModal');
    const modalBody = document.getElementById('modalBody');
    const modalClose = document.getElementById('modalClose');

    document.body.addEventListener('click', e => {
        const btn = e.target.closest('.open-modal-btn');
        if (btn) {
            const product = products.find(p => p.id === btn.dataset.id);
            modalBody.innerHTML = `
                <div style="display:flex;gap:20px;">
                    <img src="${product.img}" style="width:150px;"/>
                    <div>
                        <h3>${product.title}</h3>
                        <p>${product.description}</p>
                        <p>${product.price.toLocaleString()} COP</p>
                        <button id="addCartBtn">Agregar al carrito</button>
                    </div>
                </div>
            `;
            modal.style.display = 'flex';

            document.getElementById('addCartBtn').onclick = () => {
                cart.push(product);
                updateCartUI();
                alert(`${product.title} agregado al carrito`);
                modal.style.display = 'none';
            }
        }
    });

    modalClose.onclick = () => modal.style.display = 'none';

    // Carrito
    cartIcon.onclick = () => cartModal.style.display = 'flex';
    closeCart.onclick = () => cartModal.style.display = 'none';

    checkoutBtn.onclick = () => {
        // Redirigir a pagar.html pasando todo el carrito
        window.location.href = `payment/pagar.html?cart=${encodeURIComponent(JSON.stringify(cart))}`;
    };

    updateCartUI();
});
