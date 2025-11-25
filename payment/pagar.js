document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);

    const prodTitle = params.get('producto') || 'Producto';
    const prodRef = params.get('ref') || '—';
    const prodPrice = params.get('valor') || '0';
    const prodImg = params.get('img') || '';

    document.getElementById('prodTitle').innerText = prodTitle;
    document.getElementById('prodRef').innerText = `Ref: ${prodRef}`;
    document.getElementById('prodPrice').innerText = `${parseInt(prodPrice).toLocaleString()} COP`;
    document.getElementById('amountLabel').value = `${parseInt(prodPrice).toLocaleString()} COP`;
    document.getElementById('prodImg').src = prodImg;

    const form = document.getElementById('payForm');
    form.addEventListener('submit', e => {
        e.preventDefault();

        // Validar campos
        const required = ['name','cedula','email','banco','tarjeta','cvv','vencimiento'];
        let valid = true;
        required.forEach(id => {
            if(!document.getElementById(id).value.trim()) valid = false;
        });
        if(!valid){ alert('Complete todos los campos obligatorios'); return; }

        // Mostrar toast
        const toast = document.getElementById('conf');
        toast.classList.add('show');
        setTimeout(()=>toast.classList.remove('show'),4000);

        // Generar ticket
        const delivery = document.querySelector('input[name="delivery"]:checked').value;
        const direccion = document.getElementById('direccion').value.trim();
        let mensaje = `Producto: ${prodTitle}\nMonto: ${parseInt(prodPrice).toLocaleString()} COP\nEntrega: `;
        mensaje += delivery==='local' ? 'Recoger en local' : `Domicilio: ${direccion || 'No especificada'}`;

        document.getElementById('ticketText').innerText = mensaje;
        document.getElementById('ticket').style.display='block';
    });
});
