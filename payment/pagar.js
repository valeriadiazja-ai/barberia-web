const urlParams = new URLSearchParams(window.location.search);
const refs = urlParams.getAll('ref');
const productos = urlParams.getAll('producto');
const valores = urlParams.getAll('valor');
const imgs = urlParams.getAll('img');

const container = document.getElementById('productSummary');
let total = 0;
productos.forEach((p,i)=>{
    total += parseInt(valores[i]);
    container.innerHTML += `
        <div style="display:flex; align-items:center; gap:10px; margin-bottom:10px;">
            <img src="${imgs[i]}" width="80"/>
            <div>
                <p>${p}</p>
                <p>Ref: ${refs[i]}</p>
                <p>${parseInt(valores[i]).toLocaleString()} COP</p>
            </div>
        </div>
    `;
});

document.getElementById('amountLabel').value = total.toLocaleString() + ' COP';

document.getElementById('payForm').addEventListener('submit', e => {
    e.preventDefault();
    alert(`Pago procesado correctamente ✔️
Productos: ${productos.join(', ')}
Monto total: ${total.toLocaleString()} COP
Por favor contacte por WhatsApp para coordinar entrega o domicilio.`);
    localStorage.removeItem('cart');
    window.location.href = '../productos.html';
});
