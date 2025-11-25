document.addEventListener('DOMContentLoaded', () => {
    const products = [
        { id: 'p1', title: 'Shampoo anticaspa', price: 22000, description: 'Limpieza profunda y control de caspa.', img: 'shampoo.jpg', category: 'cabello' },
        { id: 'p2', title: 'Aceite para barba', price: 18000, description: 'Hidratación y brillo natural.', img: 'aceite.jpg', category: 'barba' },
        { id: 'p3', title: 'After Shave', price: 20000, description: 'Calma y cuida la piel después del afeitado.', img: 'aftershave.jpg', category: 'piel' },
        { id: 'p4', title: 'Cera para cabello', price: 25000, description: 'Fijación fuerte para estilos duraderos.', img: 'cera.jpg', category: 'cabello' },
        { id: 'p5', title: 'Mascarilla facial', price: 15000, description: 'Limpieza profunda para el rostro.', img: 'mascarilla.jpg', category: 'piel' },
        { id: 'p6', title: 'Peine profesional', price: 10000, description: 'Peine resistente y de calidad profesional.', img: 'peine.jpg', category: 'cabello' }
    ];

    const grid = document.getElementById('product-list');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCartCount();

    function renderProducts(list) {
        grid.innerHTML = list.map(p => `
            <div class="card product-card">
                <img src="img/${p.img}" alt="${p.title}" />
                <h3>${p.title}</h3>
                <p>${p.price.toLocaleString()} COP</p>
                <button class="open-modal-btn" data-id="${p.id}" data-img="${p.img}" data-price="${p.price}" data-title="${p.title}">Ver</button>
            </div>
        `).join('');
    }

    renderProducts(products);

    document.getElementById('filterCategory').addEventListener('change', e => {
        const category = e.target.value;
        renderProducts(category==='all'?products:products.filter(p=>p.category===category));
    });

    document.getElementById('searchInput').addEventListener('input', e => {
        const text = e.target.value.toLowerCase();
        renderProducts(products.filter(p=>p.title.toLowerCase().includes(text)));
    });

    function updateCartCount(){
        document.getElementById('cartCount').innerText = cart.length;
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    document.querySelector('.cart-icon').onclick = (e) => {
        e.preventDefault();
        openCartModal();
    };

    function openCartModal() {
        let modal = document.querySelector('.cart-modal');
        if(modal) modal.remove();

        modal = document.createElement('div');
        modal.className = 'cart-modal';
        modal.innerHTML = `
            <div class="cart-backdrop"></div>
            <div class="cart-panel">
                <button class="modal-close">×</button>
                <h2>Carrito de Compras</h2>
                <div class="cart-items">
                    ${cart.map((p,i)=>`
                        <div class="cart-item">
                            <img src="img/${p.img}" width="50"/>
                            <span>${p.title}</span>
                            <span>${parseInt(p.price).toLocaleString()} COP</span>
                            <button data-index="${i}" class="removeItem">Eliminar</button>
                        </div>
                    `).join('')}
                </div>
                <div class="cart-total">
                    Total: ${cart.reduce((acc,p)=>acc+parseInt(p.price),0).toLocaleString()} COP
                </div>
                <button id="checkoutBtn" class="btn success">Pagar</button>
            </div>
        `;
        document.body.appendChild(modal);

        modal.querySelector('.cart-backdrop').onclick = () => modal.remove();
        modal.querySelector('.modal-close').onclick = () => modal.remove();

        modal.querySelectorAll('.removeItem').forEach(btn=>{
            btn.onclick=()=>{ cart.splice(btn.dataset.index,1); updateCartCount(); openCartModal(); };
        });

        modal.querySelector('#checkoutBtn').onclick = () => {
            if(cart.length===0){ alert("Carrito vacío"); return; }
            let query = cart.map(p=>`ref[]=${p.id}&producto[]=${encodeURIComponent(p.title)}&valor[]=${p.price}&img[]=img/${p.img}`).join('&');
            window.location.href = `payment/pagar.html?${query}`;
        };
    }

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
                    <div class="product-modal-left">
                        <img src="img/${img}" alt="${title}" style="width:100%; max-width:350px; border-radius:10px;">
                    </div>
                    <div class="product-modal-right">
                        <h2>${title}</h2>
                        <p>${parseInt(price).toLocaleString()} COP</p>
                        <p>${products.find(p=>p.id===id).description}</p>
                        <div style="margin-top:18px; display:flex; gap:8px; flex-wrap:wrap;">
                            <button class="btn" id="btnComprar">Agregar al carrito</button>
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
            cart.push({id,title,price,img});
            updateCartCount();
            alert(`Has añadido "${title}" al carrito.`);
            modal.remove();
        };
    }
});
