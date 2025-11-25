let cart = [];
const cartData = localStorage.getItem('cart');
if(cartData){
    try { cart = JSON.parse(cartData); } 
    catch(e){ console.error("Error al parsear carrito", e); }
}

const container = document.getElementById('productSummary');
let total = 0;

cart.forEach(item=>{
    total += parseInt(item.price);
    container.innerHTML += `
        <div style="display:flex; align-items:center; gap:10px; margin-bottom:10px;">
            <img src="../${item.img}" width="80" alt="${item.title}"/>
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
    // Mostrar ticket verde
    const toast = document.getElementById('toast');
    toast.innerHTML = `Pago procesado correctamente ✔️<br>
Productos: ${cart.map(i=>i.title).join(', ')}<br>
Monto total: ${total.toLocaleString()} COP<br>
Contacta vía WhatsApp para coordinar entrega.`;
    toast.classList.add('show');
    localStorage.removeItem('cart');

    setTimeout(()=>{
        toast.classList.remove('show');
        // Redirigir a WhatsApp (ejemplo)
        window.location.href = "https://wa.me/573001112233?text=Hola%20BarberX%2C%20ya%20realicé%20el%20pago%20de%20mis%20productos";
    },4000);
});
