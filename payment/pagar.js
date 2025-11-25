
// Leer el carrito pasado desde la URL en JSON
const urlParams = new URLSearchParams(window.location.search);
const cartData = urlParams.get('cart');

let cart = [];
if(cartData){
    try {
        cart = JSON.parse(decodeURIComponent(cartData));
    } catch(e){
        console.error("Error al parsear carrito", e);
    }
}

// Mostrar productos y calcular total
const container = document.getElementById('productSummary');
let total = 0;

cart.forEach(item=>{
    total += parseInt(item.price);
    container.innerHTML += `
        <div>
            <img src="${item.img}" width="80" alt="${item.title}"/>
            <div>
                <p>${item.title}</p>
                <p>Ref: ${item.id}</p>
                <p>${parseInt(item.price).toLocaleString()} COP</p>
            </div>
        </div>
    `;
});

// Mostrar monto total en input
document.getElementById('amountLabel').value = total.toLocaleString() + ' COP';

// Simular pago
document.getElementById('payForm').addEventListener('submit', e=>{
    e.preventDefault();

    alert(`Pago procesado correctamente ✔️
Productos: ${cart.map(i=>i.title).join(', ')}
Monto total: ${total.toLocaleString()} COP
Por favor contacte por WhatsApp para coordinar entrega o domicilio.`);

    // Limpiar carrito y volver a productos
    localStorage.removeItem('cart');
    window.location.href = '../productos.html';
});
