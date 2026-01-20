

// Función para cargar contenido dinámicamente (Simulación SPA)
function cargarSeccion(seccion) {
    const contenedor = document.getElementById('contenedor-principal');
    
    // Limpiamos el contenido actual para cargar el nuevo
    contenedor.innerHTML = '';

    if (seccion === 'inicio') {
        contenedor.innerHTML = `
            <section id="seccion-inicio">
                <h2>Bienvenido, Estratega</h2>
                <p>Explora las unidades, tecnologías y bonificaciones de las civilizaciones más poderosas.</p>
                <div class="hipermedia-container">
                    <img src="assets/king-aoe2.png" alt="Rey de Age of Empires II" id="imagen-guia" style="width: 200px;">
                    <br>
                    <button id="btn-interaccion">Mostrar Información de Unidad</button>
                    <p id="info-extra" style="display: none; border: 1px solid #ccc; padding: 10px; margin-top: 10px;">
                        El Rey es una unidad civil única que aparece en los modos de juego de Regicida.
                    </p>
                </div>
            </section>
        `;
        // Volvemos a asignar el evento al botón de la página de inicio
        asignarEventoInteraccion();

    } else if (seccion === 'civilizaciones') {
        contenedor.innerHTML = `
            <section id="seccion-civilizaciones">
                <h2>Civilizaciones Destacadas</h2>
                <ul>
                    <li><strong>Francos:</strong> Especialidad en caballería y castillos económicos.</li>
                    <li><strong>Britanos:</strong> Maestros del arco largo y gran alcance.</li>
                    <li><strong>Mayas:</strong> Excelentes arqueros y recursos duraderos.</li>
                </ul>
                <img src="assets/castle.png" alt="Castillo AoE2" style="width: 300px;">
            </section>
        `;

    } else if (seccion === 'calculadora') {
        contenedor.innerHTML = `
            <section id="seccion-calculadora">
                <h2>Calculadora de Recursos (Próximamente)</h2>
                <p>Esta sección se desarrollará en la Fase 2.</p>
            </section>
        `;
    }
}

// Función para manejar la interacción de hipermedia (Mostrar/Ocultar)
function asignarEventoInteraccion() {
    const btn = document.getElementById('btn-interaccion');
    const info = document.getElementById('info-extra');

    if (btn && info) {
        btn.onclick = function() {
            // Lógica simple de toggle para cambiar visibilidad
            if (info.style.display === "none") {
                info.style.display = "block";
                btn.textContent = "Ocultar Información";
            } else {
                info.style.display = "none";
                btn.textContent = "Mostrar Información de Unidad";
            }
        };
    }
}

// Inicializar el evento al cargar la página por primera vez
window.onload = function() {
    asignarEventoInteraccion();
};