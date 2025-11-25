function getParam(name) {
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}

document.addEventListener('DOMContentLoaded', () => {

  const ref = getParam('ref');
  const nombre = getParam('producto');
  const valor = parseInt(getParam('valor')) || 0;

  document.getElementById('prodTitle').textContent = nombre || "Producto";
  document.getElementById('prodPrice').textContent = `${valor.toLocaleString()} COP`;
  document.getElementById('prodRef').textContent = `Ref: ${ref}`;
  document.getElementById('amountLabel').textContent = `${valor.toLocaleString()} COP`;

  const imgMap = {
    'p1': '../img/shampoo.jpg',
    'p2': '../img/aceite.jpg'
  };

  if (imgMap[ref]) {
    document.getElementById('prodImg').src = imgMap[ref];
  }

  const form = document.getElementById('payForm');
  const toast = document.getElementById('conf');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    toast.textContent = "Pago procesado correctamente (simulado)";
    toast.classList.remove('hidden');

    setTimeout(() => {
      toast.classList.add('hidden');
      window.location.href = "/";
    }, 2000);
  });
});
