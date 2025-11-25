document.addEventListener('DOMContentLoaded', () => {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const imgEl = document.getElementById('prodImg');
    const titleEl = document.getElementById('prodTitle');
    const refEl = document.getElementById('prodRef');
    const priceEl = document.getElementById('prodPrice');
    const amountInput = document.getElementById('amountLabel');
    const conf = document.getElementById('conf');

    let total = cart.reduce((sum, p) => sum + p.price, 0);
    amountInput.value = total.toLocaleString() + ' COP';

    titleEl.textContent = cart.length > 1 ? `${cart.length} productos` : cart[0]?.title || '—';
    refEl.textContent = 'Ref: ' + (cart.length === 1 ? cart[0].id : '-');
    priceEl.textContent = total.toLocaleString() + ' COP';
    imgEl.src = cart.length === 1 ? cart[0].img : 'img/multiple-products.jpg'; // imagen general si varios

    document.getElementById('payForm').addEventListener('submit', e => {
        e.preventDefault();
        conf.style.display = 'block';
        conf.scrollIntoView({behavior:'smooth'});
        localStorage.removeItem('cart'); // Vaciar carrito al pagar
        amountInput.value = '0 COP';
        titleEl.textContent = '—';
        refEl.textContent = 'Ref: —';
        priceEl.textContent = '0 COP';
    });
});
