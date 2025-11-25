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

        // Validar campos obligatorios
        const requiredFields = ['name','cedula','email','banco','tarjeta','cvv','vencimiento'];
        let valid = true;
        requiredFields.forEach(id => {
            const val = document.getElementById(id).value.trim();
            if(!val) valid = false;
        });
        if(!valid){
            alert('Por favor complete todos los campos obligatorios.');
            return;
        }

        // Mostrar toast
        const toast = document.getElementById('conf');
        toast.classList.add('show');
        setTimeout(() => { toast.classList.remove('show'); }, 4000);

        // Generar ticket
        const delivery = document.querySelector('input[name="delivery"]:checked').value;
        const direccion = document.getElementById('direccion').value.trim();
        let mensaje = `Producto: ${prodTitle}\nMonto: ${parseInt(prodPrice).toLocaleString()} COP\nEntrega: `;
        mensaje += delivery === 'local' ? 'Recoger en local' : `Enviar a domicilio: ${direccion || 'No especificada'}`;

        document.getElementById('ticketText').innerText = mensaje;
        document.getElementById('ticket').style.display = 'block';
    });
});
