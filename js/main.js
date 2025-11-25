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

  function renderCart() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    cartItems.innerHTML = '';
    let total = 0;
    cart.forEach((p, index) => {
      total += p.price;
      const li = document.createElement('li');
      li.innerHTML = `${p.title} - ${p.price.toLocaleString()} COP <button data-index="${index}">Eliminar</button>`;
      cartItems.appendChild(li);
    });
    cartTotal.innerText = total.toLocaleString();
  }

  renderProducts(products);
  updateCartCount();
  renderCart();

  document.getElementById('filterCategory').addEventListener('change', e => {
    const category = e.target.value;
    renderProducts(category === 'all' ? products : products.filter(p => p.category === category));
  });

  document.getElementById('searchInput').addEventListener('input', e => {
    const text = e.target.value.toLowerCase();
    renderProducts(products.filter(p => p.title.toLowerCase().includes(text)));
  });

  // Modal de previsualización
  const modal = document.getElementById('productModal');
  const modalImg = document.getElementById('modalImg');
  const modalTitle = document.getElementById('modalTitle');
  const modalPrice = document.getElementById('modalPrice');
  const modalDesc = document.getElementById('modalDesc');
  const btnAgregarCarrito = document.getElementById('btnAgregarCarrito');
  const modalClose = modal.querySelector('.modal-close');

  document.body.addEventListener('click', e => {
    const btn = e.target.closest('.open-modal-btn');
    if (!btn) return;
    const product = products.find(p => p.id === btn.dataset.id);
    if (!product) return;

    modalImg.src = product.img;
    modalTitle.innerText = product.title;
    modalPrice.innerText = `${product.price.toLocaleString()} COP`;
    modalDesc.innerText = product.description;
    modal.style.display = 'flex';

    btnAgregarCarrito.onclick = () => {
      cart.push(product);
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartCount();
      renderCart();
      alert(`"${product.title}" agregado al carrito`);
      modal.style.display = 'none';
    };
  });

  modalClose.onclick = () => modal.style.display = 'none';
  modal.onclick = e => { if (e.target === modal) modal.style.display = 'none'; }

  // Carrito modal
  const cartModal = document.getElementById('cartModal');
  const cartIcon = document.getElementById('cartIcon');
  const cartClose = document.getElementById('cartClose');
  const btnPagarCarrito = document.getElementById('btnPagarCarrito');

  cartIcon.onclick = () => cartModal.style.display = 'flex';
  cartClose.onclick = () => cartModal.style.display = 'none';
  cartModal.onclick = e => { if (e.target === cartModal) cartModal.style.display = 'none'; }

  document.getElementById('cartItems').addEventListener('click', e => {
    if (e.target.tagName === 'BUTTON') {
      const index = e.target.dataset.index;
      cart.splice(index,1);
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartCount();
      renderCart();
    }
  });

  btnPagarCarrito.onclick = () => {
    // Pasar datos a pagar.html usando queryString
    const carritoJSON = encodeURIComponent(JSON.stringify(cart));
    window.location.href = `payment/pagar.html?cart=${carritoJSON}`;
  };
});
