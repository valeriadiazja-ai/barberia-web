/* pagar.js - comportamiento interactivo */
document.addEventListener('DOMContentLoaded', () => {
  const qs = new URLSearchParams(location.search);
  const ref = qs.get('ref') || 'N/A';
  const producto = qs.get('producto') ? decodeURIComponent(qs.get('producto')) : 'Producto';
  const valor = qs.get('valor') ? Number(qs.get('valor')) : 0;

  // Mapear producto => imagen si quieres (opcional)
  const imgMap = {
    'p1': '../imagen/shampoo.jpg',
    'p2': '../imagen/aceite.jpg'
  };

  document.getElementById('prodTitle').textContent = producto;
  document.getElementById('prodPrice').textContent = valor.toLocaleString() + ' COP';
  document.getElementById('prodRef').textContent = 'Ref: ' + ref;
  document.getElementById('amountLabel').textContent = valor.toLocaleString() + ' COP';
  const prodImg = document.getElementById('prodImg');
  if (imgMap[ref]) prodImg.src = imgMap[ref];

  // Form handling
  const form = document.getElementById('payForm');
  const toast = document.getElementById('conf');
  form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    // Validación simple (puedes mejorar)
    const name = document.getElementById('cardName').value.trim();
    const email = document.getElementById('email').value.trim();
    if (!name || !email) return showToast('Completa nombre y correo.');

    // Animación de "procesando"
    const btn = document.getElementById('payNow');
    btn.disabled = true;
    btn.textContent = 'Procesando...';

    // Simulamos llamada a backend / gateway
    setTimeout(() => {
      // Simular éxito (aquí podrías POST a un endpoint real)
      btn.textContent = 'Pago realizado';
      showToast('Pago exitoso. Redirigiendo recibo...', 3500);

      // Redirigir a confirmación con query params
      const confUrl = `/payment/confirm.html?ref=${encodeURIComponent(ref)}&producto=${encodeURIComponent(producto)}&valor=${valor}&email=${encodeURIComponent(email)}`;
      setTimeout(() => location.href = confUrl, 1600);
    }, 1600);
  });

  function showToast(msg, time = 2200) {
    toast.classList.remove('hidden');
    toast.textContent = msg;
    setTimeout(() => {
      toast.classList.add('hidden');
    }, time);
  }

  // Input masking básico tarjeta y expiración
  const cardInput = document.getElementById('cardNumber');
  cardInput.addEventListener('input', (e) => {
    let v = e.target.value.replace(/\D/g, '').slice(0,16);
    v = v.replace(/(\d{4})/g, '$1 ').trim();
    e.target.value = v;
  });
  const expInput = document.getElementById('cardExp');
  expInput.addEventListener('input', (e) => {
    let v = e.target.value.replace(/\D/g, '').slice(0,4);
    if (v.length >= 3) v = v.slice(0,2) + '/' + v.slice(2);
    e.target.value = v;
  });
});
