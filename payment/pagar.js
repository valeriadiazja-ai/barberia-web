document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);

    const prodTitle = params.get('producto') || 'Producto';
    const prodRef = params.get('ref') || '—';
    const prodPrice = params.get('valor') || '0';

    document.getElementById('prodTitle').innerText = prodTitle;
    document.getElementById('prodRef').innerText = `Ref: ${prodRef}`;
    document.getElementById('prodPrice').innerText = `${parseInt(prodPrice).toLocaleString()} COP`;
    document.getElementById('amountLabel').value = `${parseInt(prodPrice).toLocaleString()} COP`;

    const form = document.getElementById('payForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        document.getElementById('conf').classList.remove('hidden');
        setTimeout(() => { document.getElementById('conf').classList.add('hidden'); }, 3000);
    });
});
