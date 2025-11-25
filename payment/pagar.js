const urlParams = new URLSearchParams(window.location.search);
const prodTitle = urlParams.get('producto');
const prodPrice = urlParams.get('valor');
const prodRef = urlParams.get('ref');
const prodImg = urlParams.get('img');

document.getElementById('prodTitle').innerText = prodTitle;
document.getElementById('prodPrice').innerText = parseInt(prodPrice).toLocaleString() + ' COP';
document.getElementById('prodRef').innerText = 'Ref: ' + prodRef;
document.getElementById('prodImg').src = prodImg;

document.getElementById('amountLabel').value = parseInt(prodPrice).toLocaleString() + ' COP';

document.getElementById('payForm').addEventListener('submit', e => {
    e.preventDefault();
    alert(`Pago procesado correctamente ✔️
Producto: ${prodTitle}
Monto: ${parseInt(prodPrice).toLocaleString()} COP
Por favor contacte por WhatsApp para coordinar entrega o domicilio.`);
    window.location.href = '../productos.html';
});
