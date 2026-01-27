// Variables globales
let slideActual = 0;
let intervaloCarrusel; 

function cargarSeccion(seccion) {
    console.log("Cargando sección:", seccion);
    const contenedor = document.getElementById('contenedor-principal');
    if (!contenedor) return;
    
    contenedor.innerHTML = '';

    if (seccion === 'inicio') {
        contenedor.innerHTML = `
            <section id="seccion-inicio" class="fade-in">
                <div class="hero-banner">
                    <video autoplay muted loop playsinline class="hero-video">
                        <source src="assets/img/trailer.mp4" type="video/mp4">
                        Tu navegador no soporta videos.
                    </video>
                    <div class="hero-overlay">
                        <div class="hero-content">
                            <h1>Domina la Historia</h1>
                            <p class="subtitle">EDICIÓN DEFINITIVA: EL PASO DE LOS SIGLOS</p>
                        </div>
                    </div>
                </div>

                <section class="stats-seccion-completa">
                    <div class="stats-franja">
                        <div class="stat-item">
                            <h2 id="num-civs" class="stat-number">0</h2>
                            <p>CIVILIZACIONES</p>
                            <div class="stat-line"></div>
                        </div>
                        <div class="stat-item">
                            <h2 id="num-unidades" class="stat-number">0</h2>
                            <p>UNIDADES ÚNICAS</p>
                            <div class="stat-line"></div>
                        </div>
                        <div class="stat-item">
                            <h2 id="num-anios" class="stat-number">0</h2>
                            <p>AÑOS DE HISTORIA</p>
                            <div class="stat-line"></div>
                        </div>
                    </div>
                </section>

                <div class="escudos-slider-infinito">
                    <div class="escudos-track" id="escudos-track">
                        <img src="assets/img/CivIcon-Francos.webp" alt="Francos">
                        <img src="assets/img/CivIcon-Mongoles.webp" alt="Mongoles">
                        <img src="assets/img/CivIcon-Aztecas.webp" alt="Aztecas">
                        <img src="assets/img/CivIcon-sarra.webp" alt="Sarracenos">
                        <img src="assets/img/CivIcon-teuton.webp" alt="Teutones">
                        <img src="assets/img/CivIcon-briton.webp" alt="Britanos">
                        <img src="assets/img/CivIcon-poles.webp" alt="Polacos">
                        <img src="assets/img/CivIcon-lit.webp" alt="Lituanos">
                        <img src="assets/img/CivIcon-Portu.webp" alt="Portugueses">
                        <img src="assets/img/CivIcon-yur.webp" alt="Yurchens">
                        <img src="assets/img/CivIcon-Chinos.webp" alt="Chinos">
                        <img src="assets/img/CivIcon-tatars.webp" alt="Tartaros">
                        <img src="assets/img/CivIcon-cumans.webp" alt="Cumanos">
                        <img src="assets/img/CivIcon-espa.webp" alt="Espannoles">
                        <img src="assets/img/CivIcon-ita.webp" alt="Italianos">
                        <img src="assets/img/CivIcon-viet.webp" alt="Vietnamitas">
                    </div>
                </div>

                <section class="seccion-unidades-premium">
                    <h2 class="titulo-dorado">UNIDADES DE ÉLITE</h2>
                    <p class="subtitulo-rojo">EL ORGULLO DE LAS NACIONES</p>
                    <div class="contenedor-cartas-parallax">
                        <div class="card-parallax">
                            <div class="card-cuerpo">
                                <div class="escudo-wrapper"><img src="assets/img/cata.webp" class="img-parallax"></div>
                                <div class="info-unidad">
                                    <h3>Catafracta</h3>
                                    <p>Caballería pesada bizantina con armadura de placas. Ignora parte del daño adicional de la infantería.</p>
                                    <div class="etiquetas"><span class="tag-rojo">ANTI-INFANTERÍA</span><span class="tag-dorado">BARRIDO</span></div>
                                </div>
                            </div>
                        </div>
                        <div class="card-parallax">
                            <div class="card-cuerpo">
                                <div class="escudo-wrapper"><img src="assets/img/cab.webp" class="img-parallax"></div>
                                <div class="info-unidad">
                                    <h3>Caballero Teutón</h3>
                                    <p>Infantería de élite con la armadura más resistente. Lento pero imparable en combate cuerpo a cuerpo.</p>
                                    <div class="etiquetas"><span class="tag-rojo">ARMADURA++</span><span class="tag-dorado">TANQUE</span></div>
                                </div>
                            </div>
                        </div>
                        <div class="card-parallax">
                            <div class="card-cuerpo">
                                <div class="escudo-wrapper"><img src="assets/img/arch.webp" class="img-parallax"></div>
                                <div class="info-unidad">
                                    <h3>Arquero de Tiro Largo</h3>
                                    <p>Arquero con el mayor alcance de todas las unidades. Diezma ejércitos antes de que se acerquen.</p>
                                    <div class="etiquetas"><span class="tag-rojo">ALCANCE EXTREMO</span><span class="tag-dorado">PRECISIÓN</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="edades-slider-container">
                    <div class="slider-header">
                        <h2 class="titulo-siglos">EL PASO DE LOS SIGLOS</h2>
                        <p class="descubre-text">DESCUBRE LA EVOLUCIÓN TECNOLÓGICA</p>
                    </div>

                    <div class="carousel-wrapper">
                        <button class="btn-carousel prev" onclick="manualMover(-1)">&#10094;</button>
                        <div class="carousel-content">
                            <div class="edad-slide active">
                                <div class="slide-visual"><img src="assets/img/darkage.webp" alt="Edad Oscura"></div>
                                <div class="edad-info">
                                    <span class="era-tag">ERA I</span>
                                    <h3 class="edad-titulo">EDAD OSCURA</h3>
                                    <p class="edad-descripcion">El humilde comienzo de tu imperio. Reúne recursos básicos, explora el mapa y establece los cimientos de tu economía.</p>
                                    <div class="especialidades-grid">
                                        <div class="item">Recolección</div><div class="item">Madera</div>
                                        <div class="item">Milicia</div><div class="item">Campamentos</div>
                                    </div>
                                </div>
                            </div>
                            <div class="edad-slide">
                                <div class="slide-visual"><img src="assets/img/feudalage.webp" alt="Edad Feudal"></div>
                                <div class="edad-info">
                                    <span class="era-tag">ERA II</span>
                                    <h3 class="edad-titulo">EDAD FEUDAL</h3>
                                    <p class="edad-descripcion">La guerra se profesionaliza. Desbloquea estructuras militares avanzadas para comenzar el acoso a tus enemigos.</p>
                                    <div class="especialidades-grid">
                                        <div class="item">Arqueros</div><div class="item">Herrería</div>
                                        <div class="item">Comercio</div><div class="item">Murallas</div>
                                    </div>
                                </div>
                            </div>
                            <div class="edad-slide">
                                <div class="slide-visual"><img src="assets/img/castleage.webp" alt="Edad Castillos"></div>
                                <div class="edad-info">
                                    <span class="era-tag">ERA III</span>
                                    <h3 class="edad-titulo">EDAD DE CASTILLOS</h3>
                                    <p class="edad-descripcion">El apogeo de la arquitectura militar. Construye castillos y despliega maquinaria de asedio pesada.</p>
                                    <div class="especialidades-grid">
                                        <div class="item">Castillos</div><div class="item">Monjes</div>
                                        <div class="item">Caballería</div><div class="item">Asedio</div>
                                    </div>
                                </div>
                            </div>
                            <div class="edad-slide">
                                <div class="slide-visual"><img src="assets/img/imperialage.webp" alt="Edad Imperial"></div>
                                <div class="edad-info">
                                    <span class="era-tag">ERA IV</span>
                                    <h3 class="edad-titulo">EDAD IMPERIAL</h3>
                                    <p class="edad-descripcion">El cenit de la tecnología y la pólvora. Domina el campo con Trebuchets y artillería química.</p>
                                    <div class="especialidades-grid">
                                        <div class="item">Pólvora</div><div class="item">Trebuchets</div>
                                        <div class="item">Química</div><div class="item">Maravillas</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button class="btn-carousel next" onclick="manualMover(1)">&#10095;</button>
                    </div>

                    <div class="carousel-indicators-container">
                        <div class="indicator active" onclick="manualIrASlide(0)"></div>
                        <div class="indicator" onclick="manualIrASlide(1)"></div>
                        <div class="indicator" onclick="manualIrASlide(2)"></div>
                        <div class="indicator" onclick="manualIrASlide(3)"></div>
                    </div>
                </section>

                <section class="galeria-seccion fade-in">
                    <div class="slider-header">
                        <h2 class="titulo-siglos">GALERÍA DE BATALLAS</h2>
                    </div>
                    <div class="galeria-grid">
                        <div class="foto foto-grande"><img src="assets/img/asiab.webp"></div>
                        <div class="foto foto-peque"><img src="assets/img/asiaa.jpg"></div>
                        <div class="foto foto-peque"><img src="assets/img/asiac.jpg"></div>
                        <div class="foto foto-ancha"><img src="assets/img/naval.jpg"></div>
                        <div class="foto foto-alta"><img src="assets/img/castle.jpg"></div>
                    </div>
                </section>

                <section class="footer-cta">
                    <div class="cta-content">
                        <h2>¿LISTO PARA LA BATALLA?</h2>
                        <p>Únete a miles de comandantes en la experiencia definitiva.</p>
                    </div>
                </section>
            </section>
        `;

        // REINICIALIZACIÓN DE LÓGICA TRAS CARGAR HTML
        setTimeout(() => {
            slideActual = 0;
            iniciarAutoplay();
            ejecutarConteoIndividual('num-civs', 50);
            ejecutarConteoIndividual('num-unidades', 200);
            ejecutarConteoIndividual('num-anios', 25);

            const track = document.getElementById('escudos-track');
            if (track) {
                const items = track.innerHTML;
                track.innerHTML = items + items + items;
            }
        }, 100);

    } else if (seccion === 'civilizaciones') {
        detenerAutoplay();
        contenedor.innerHTML = `
            <section id="seccion-civilizaciones" class="fade-in">
                <h2>Civilizaciones</h2>
                <div class="escudos-container">
                    <img src="assets/img/CivIcon-Francos.webp" class="escudo-btn" onclick="mostrarDetalleCiv('franks')">
                    <img src="assets/img/CivIcon-Mongoles.webp" class="escudo-btn" onclick="mostrarDetalleCiv('mongols')">
                    <img src="assets/img/CivIcon-Aztecas.webp" class="escudo-btn" onclick="mostrarDetalleCiv('aztecs')">
                </div>
                <div id="detalle-civilizacion" class="detalle-box">
                    <p>Selecciona una civilización para ver sus bonificaciones.</p>
                </div>
            </section>
        `;
    }
}

// LÓGICA CARRUSEL EDADES
function moverCarrusel(direccion) {
    const slides = document.querySelectorAll('.edad-slide');
    const indicators = document.querySelectorAll('.indicator');
    if (slides.length === 0) return;

    slides[slideActual].classList.remove('active');
    if(indicators[slideActual]) indicators[slideActual].classList.remove('active');

    slideActual = (slideActual + direccion + slides.length) % slides.length;

    slides[slideActual].classList.add('active');
    if(indicators[slideActual]) indicators[slideActual].classList.add('active');
}

function manualMover(dir) {
    moverCarrusel(dir);
    reiniciarAutoplay();
}

function manualIrASlide(n) {
    const slides = document.querySelectorAll('.edad-slide');
    const indicators = document.querySelectorAll('.indicator');
    if (slides.length === 0) return;

    slides.forEach(s => s.classList.remove('active'));
    indicators.forEach(i => i.classList.remove('active'));
    
    slideActual = n;
    slides[n].classList.add('active');
    indicators[n].classList.add('active');
    reiniciarAutoplay();
}

function iniciarAutoplay() {
    detenerAutoplay();
    intervaloCarrusel = setInterval(() => moverCarrusel(1), 5000); 
}

function detenerAutoplay() {
    clearInterval(intervaloCarrusel);
}

function reiniciarAutoplay() {
    iniciarAutoplay();
}

// LÓGICA CONTEO
function ejecutarConteoIndividual(id, meta) {
    const elemento = document.getElementById(id);
    if (!elemento) return;
    let actual = 0;
    const duracion = 1500;
    const incremento = meta / (duracion / 30);
    const interval = setInterval(() => {
        actual += incremento;
        if (actual >= meta) {
            elemento.innerText = meta + (id === 'num-unidades' ? "+" : "");
            clearInterval(interval);
        } else {
            elemento.innerText = Math.floor(actual);
        }
    }, 30);
}

function mostrarDetalleCiv(civ) {
    const detalle = document.getElementById('detalle-civilizacion');
    const datosCivs = {
        'franks': { nombre: "Francos", bonos: ["Castillos -25%", "Caballería +20% HP"], unidad: "Lanzador de hachas" },
        'mongols': { nombre: "Mongoles", bonos: ["Arqueros a caballo +25% rápido"], unidad: "Mangudai" },
        'aztecs': { nombre: "Aztecas", bonos: ["Aldeanos cargan +3"], unidad: "Guerrero Jaguar" }
    };
    const s = datosCivs[civ];
    detalle.innerHTML = `<div class="info-card fade-in"><h3>${s.nombre}</h3><ul>${s.bonos.map(b => `<li>${b}</li>`).join('')}</ul><p><strong>Unidad:</strong> ${s.unidad}</p></div>`;
}

document.addEventListener("DOMContentLoaded", () => cargarSeccion('inicio'));