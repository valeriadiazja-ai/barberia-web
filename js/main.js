// js/main.js
// Contiene productos, renderizado, modal y lógica de citas.
// Asegúrate de enlazarlo como "js/main.js" desde tus HTML.

const PRODUCTS = [
    {
        id: 'p1',
        title: 'Cera para cabello',
        price: 25000,
        category: 'cabello',
        img: 'img/cera.jpg',
        desc: 'Textura fuerte, acabado mate. 100ml.'
    },
    {
        id: 'p2',
        title: 'Aceite para barba',
        price: 30000,
        category: 'barba',
        img: 'img/aceite.jpg',
        desc: 'Suaviza, protege y da brillo natural.'
    },
    {
        id: 'p3',
        title: 'Shampoo anticaspa',
        price: 22000,
        category: 'cabello',
        img: 'img/shampoo.jpg',
        desc: 'Limpieza profunda y control de caspa.'
    },
    {
        id: 'p4',
        title: 'Bálsamo aftershave',
        price: 18000,
        category: 'piel',
        img: 'img/aftershave.jpg',
        desc: 'Calma la piel tras el afeitado.'
    },
    {
        id: 'p5',
        title: 'Peine de madera',
        price: 12000,
        category: 'barba',
        img: 'img/peine.jpg',
        desc: 'Peine ergonómico, ideal para barbas.'
    },
    {
        id: 'p6',
        title: 'Mascarilla capilar',
        price: 35000,
        category: 'cabello',
        img: 'img/mascarilla.jpg',
        desc: 'Hidratación profunda y restauración.'
    }
];
// utilities
const $ = sel => document.querySelector(sel);
const $$ = sel => Array.from(document.querySelectorAll(sel));

// NAV toggle (mobile)
(function navToggle(){
    const btn = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.main-nav');
    if (!btn || !nav) return;
    btn.addEventListener('click', ()=>{
        const expanded = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', String(!expanded));
        nav.classList.toggle('show');
    });
})();

// Format price
function formatPrice(n){ return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + ' COP'; }

// Render products into a container
function renderProducts(targetId, items){
    const container = document.getElementById(targetId);
    if (!container) return;
    container.innerHTML = items.map(p => `
        <article class="product-card" data-id="${p.id}">
            <img src="${p.img}" alt="${p.title}">
            <h3>${p.title}</h3>
            <div class="price">${formatPrice(p.price)}</div>
            <p class="muted small">${p.desc}</p>
            <div class="product-actions">
                <button class="btn" data-action="view" data-id="${p.id}">Ver</button>
                <button class="btn ghost" data-action="contact" data-id="${p.id}">Contacto</button>
            </div>
        </article>
    `).join('');
    // attach view listeners
    $$('#' + targetId + ' [data-action="view"]').forEach(btn=>{
        btn.addEventListener('click', e => {
            const id = btn.dataset.id;
            openProductModal(id);
        });
    });
    $$('#' + targetId + ' [data-action="contact"]').forEach(btn=>{
        btn.addEventListener('click', () => {
            // ejemplo: abrir WhatsApp con texto (puedes personalizar)
            const p = PRODUCTS.find(x => x.id === btn.dataset.id);
            const text = encodeURIComponent(`Hola, quiero información sobre: ${p.title}`);
            window.open(`https://wa.me/57?text=${text}`, '_blank');
        });
    });
}

// Show featured (first 4)
(function initFeatured(){
    const featured = PRODUCTS.slice(0,4);
    renderProducts('featured-products', featured);
})();

// If product-list exists, render all + add filters
(function initProductsPage(){
    if (!document.getElementById('product-list')) return;
    renderProducts('product-list', PRODUCTS);
    const filter = document.getElementById('filterCategory');
    const search = document.getElementById('searchInput');

    function applyFilters(){
        const cat = filter.value;
        const q = (search.value || '').toLowerCase().trim();
        const filtered = PRODUCTS.filter(p=>{
            const byCat = (cat === 'all') || (p.category === cat);
            const byQ = !q || p.title.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q);
            return byCat && byQ;
        });
        renderProducts('product-list', filtered);
    }

    if (filter) filter.addEventListener('change', applyFilters);
    if (search) search.addEventListener('input', applyFilters);
})();

// PRODUCT MODAL
function openProductModal(id){
    const product = PRODUCTS.find(p => p.id === id);
    if (!product) return;
    const modal = document.getElementById('productModal');
    const modalBody = modal.querySelector('#modalBody') || modal.querySelector('#modalBody2');
    modalBody.innerHTML = `
        <div style="display:flex;gap:18px;flex-wrap:wrap">
            <div style="flex:1;min-width:260px">
                <img src="${product.img}" alt="${product.title}" style="width:100%;border-radius:8px;object-fit:cover;max-height:420px">
            </div>
            <div style="flex:1;min-width:260px">
                <h2 id="modalTitle">${product.title}</h2>
                <div style="font-weight:700;margin:8px 0">${formatPrice(product.price)}</div>
                <p>${product.desc}</p>
                <div style="margin-top:18px;display:flex;gap:8px">
                    <button class="btn" id="btnComprar">Comprar</button>
                    <button class="btn ghost" id="btnCerrar">Cerrar</button>
                </div>
            </div>
        </div>
    `;
    // open
    modal.setAttribute('aria-hidden','false');
    // close handlers
    const closeModal = ()=>{
        modal.setAttribute('aria-hidden','true');
    };
    modal.querySelector('#btnCerrar').addEventListener('click', closeModal);
    modal.querySelector('#btnComprar').addEventListener('click', ()=>{
        // ejemplo: abrir WhatsApp pedir compra
        const text = encodeURIComponent(`Hola, quiero comprar: ${product.title} - ${formatPrice(product.price)}`);
        window.open(`https://wa.me/57?text=${text}`, '_blank');
    });
    const btnClose = modal.querySelector('.modal-close');
    if (btnClose) btnClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e)=>{
        if (e.target === modal) closeModal();
    });
}

// Citas: guardar en localStorage y gestión
(function citasLogic(){
    const form = document.getElementById('formCita');
    if (!form) return;

    const nombre = document.getElementById('nombre');
    const telefono = document.getElementById('telefono');
    const fecha = document.getElementById('fecha');
    const hora = document.getElementById('hora');
    const servicio = document.getElementById('servicio');
    const mensaje = document.getElementById('mensaje');
    const listaSection = document.getElementById('listaCitas');
    const citasUl = document.getElementById('citasUl');
    const verCitas = document.getElementById('verCitas');
    const clearBtn = document.getElementById('clearCitas');

    function loadCitas(){
        const raw = localStorage.getItem('barberx_citas');
        return raw ? JSON.parse(raw) : [];
    }
    function saveCitas(arr){ localStorage.setItem('barberx_citas', JSON.stringify(arr)); }

    function renderCitas(){
        const arr = loadCitas();
        if (!citasUl) return;
        if (arr.length === 0){
            citasUl.innerHTML = '<li>No hay citas guardadas</li>';
            return;
        }
        citasUl.innerHTML = arr.map((c, idx) => `
            <li>
                <strong>${c.nombre}</strong> — ${c.servicio} <br/>
                ${c.fecha} ${c.hora} · ${c.telefono}
                <div style="margin-top:6px"><button data-index="${idx}" class="btn ghost small remove">Eliminar</button></div>
            </li>
        `).join('');
        $$('#citasUl .remove').forEach(btn=>{
            btn.addEventListener('click', (ev)=>{
                const i = Number(btn.dataset.index);
                const arr = loadCitas();
                arr.splice(i,1);
                saveCitas(arr);
                renderCitas();
            });
        });
    }

    form.addEventListener('submit', (e)=>{
        e.preventDefault();
        // basic validation
        if (!nombre.value.trim() || !telefono.value.trim() || !fecha.value || !hora.value) {
            mensaje.innerText = 'Por favor completa todos los campos.';
            mensaje.style.color = 'crimson';
            return;
        }
        // create appointment
        const cita = {
            nombre: nombre.value.trim(),
            telefono: telefono.value.trim(),
            fecha: fecha.value,
            hora: hora.value,
            servicio: servicio.value
        };
        const arr = loadCitas();
        arr.push(cita);
        saveCitas(arr);
        mensaje.innerText = `✔️ Cita registrada para ${cita.fecha} a las ${cita.hora}`;
        mensaje.style.color = 'green';
        form.reset();
        renderCitas();
    });

    verCitas.addEventListener('click', ()=>{
        listaSection.classList.toggle('hidden');
        renderCitas();
    });

    if (clearBtn) clearBtn.addEventListener('click', ()=>{
        if (!confirm('¿Borrar todas las citas?')) return;
        localStorage.removeItem('barberx_citas');
        renderCitas();
    });

    // initial render if section visible
    if (!listaSection.classList.contains('hidden')) renderCitas();
})();

// If there are multiple modals in page, close buttons bind (safety)
window.addEventListener('DOMContentLoaded', ()=>{
    $$('.modal .modal-close').forEach(btn=>{
        btn.addEventListener('click', ()=>{
            const modal = btn.closest('.modal');
            if (modal) modal.setAttribute('aria-hidden','true');
        });
    });
});
