document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const cartJSON = params.get('cart');
  const cart = cartJSON ? JSON.parse(cartJSON) : [];

  const prodImg = document.getElementById('prodImg');
  const prodTitle = document.getElementById('prodTitle');
  const prodRef = document.getElementById('prodRef');
  const prodPrice = document.getElementById('prodPrice');
  const amountLabel = document.getElementById('amountLabel');
  const payForm = document.getElementById('payForm');
  const ticket = document.getElementById('ticket');
  const ticketProductos = document.getElementById('ticketProductos');
  const ticketTotal = document.getElementById('ticketTotal');
  const whatsappLink = document.getElementById('whatsappLink');

  // Mostrar la primera imagen como referencia
  if (cart.length > 0) {
    prodImg.src = cart[0].img;
    prodTitle.innerText = `${cart.length} productos en carrito`;
    prodRef.innerText = `Ref: múltiples`;
  } else {
    prodImg.src = '';
    prodTitle.innerText = 'No hay productos';
    prodRef.innerText = 'Ref: —';
  }

  // Calcular total
  let total = 0;
  cart.forEach(p => total += p.price);
  prodPrice.innerText = `${total.toLocaleString()} COP`;
  amountLabel.value = `${total.toLocaleString()} COP`;

  payForm.addEventListener('submit', e => {
    e.preventDefault();
    if (cart.length === 0) {
      alert('No hay productos en el carrito.');
      return;
    }

    // Mostrar ticket
    ticket.style.display = 'block';
    ticketProductos.innerText = cart.map(p => p.title).join(', ');
    ticketTotal.innerText = total.toLocaleString();

    // WhatsApp (link de ejemplo)
    const waMessage = encodeURIComponent(`Hola, he pagado ${total.toLocaleString()} COP por los productos: ${cart.map(p => p.title).join(', ')}`);
    whatsappLink.href = `https://wa.me/573001234567?text=${waMessage}`;

    // Limpiar carrito después de pagar
    localStorage.removeItem('cart');
  });
});
