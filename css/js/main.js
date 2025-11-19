document.getElementById("formCita").addEventListener("submit", function(e) {
    e.preventDefault();

    let fecha = document.getElementById("fecha").value;

    if (fecha === "") {
        alert("Selecciona una fecha");
        return;
    }

    localStorage.setItem("cita", fecha);

    document.getElementById("mensaje").innerText =
        "✔️ Cita registrada para el día: " + fecha;
});
