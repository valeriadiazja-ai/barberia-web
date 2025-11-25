let cart = [];
const cartData = localStorage.getItem('cart');
if(cartData){
    try {
        cart = JSON.parse(cartData);
    } catch(e){
        console.error("Error al parsear carrito", e);
    }
}

const container = document.getElementById('productSummary');
let total = 0;

cart.forEach(item=>{
    total += parseInt(item.price);
    container.innerHTML += `
        <div style="display:flex; align-items:center; gap:10px; margin-bottom:10px;">
            <img src="${item.img}" width="80" alt="${item.title}"/>
            <div>
                <p>${item.title}</p>
                <p>Ref: ${item.id}</p>
                <p>${parseInt(item.price).toLocaleString()} COP</p>
            </div>
        </div>
    `;
});

document.getElementById('amountLabel').value = total.toLocaleString() + ' COP';

document.getElementById('payForm').addEventListener('submit', e=>{
    e.preventDefault();
    alert(`Pago procesado correctamente ✔️
Productos: ${cart.map(i=>i.title).join(', ')}
Monto total: ${total.toLocaleString()} COP
Por favor contacte por WhatsApp para coordinar entrega o domicilio.`);
    localStorage.removeItem('cart');
    window.location.href = '../productos.html';
});
