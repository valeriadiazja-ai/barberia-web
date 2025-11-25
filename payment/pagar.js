document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const checkoutItems = document.getElementById('checkoutItems');
    const checkoutTotal = document.getElementById('checkoutTotal');
    const amountLabel = document.getElementById('amountLabel');
    const conf = document.getElementById('conf');
    const payForm = document.getElementById('payForm');

    let total = 0;
    cart.forEach(p => {
        total += p.price;
        const li = document.createElement('li');
        li.textContent = `${p.title} - ${p.price.toLocaleString()} COP`;
        checkoutItems.appendChild(li);
    });

    checkoutTotal.textContent = total.toLocaleString();
    amountLabel.textContent = total.toLocaleString();

    payForm.addEventListener('submit', e => {
        e.preventDefault();
        conf.style.display = 'block';
        localStorage.removeItem('cart'); // vaciar carrito
    });
});
