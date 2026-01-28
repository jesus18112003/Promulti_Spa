// main.js - Age of Empires II: Definitive Edition Hub
let slideActual = 0;
let intervaloCarrusel; 

// BASE DE DATOS LOCAL (Para la Enciclopedia / Evaluación 2)

const civilizacionesAoE = [
    { 
        id: 'franks', 
        nombre: "LOS FRANCOS", 
        icono: "assets/img/CivIcon-Francos.webp",
        imgCastillo: "assets/img/castillos/frank.webp",
        tipo: "Civilización de caballería",
        audio: "assets/audio/mongols-theme.mp3",
        bonos: ["Castillos cuestan un -10%/-15% de piedra en castillo/imperial.", "Caballería tiene +20% de HP.", "Recolección de bayas un 15% más rápida.","Mejora de Granjas gratis."],
        unidad: "Lanzador de Hachas",
        imgUnidad: "assets/img/unidades/frank.webp",
        imgMaravilla: "assets/img/maravilla/frank.webp",
        nombreMaravilla: "Catedral de Chartres",
        tecsUnicas: [
            {
                nombre: "Hacha de Arista",
                efecto: "+2 de rango al lanzador de hachas",
                img: "assets/img/unidades/tec.webp"
            },
            {
                nombre: "Caballeria",
                efecto: "El asedio se mueve un 50% más rápido.",
                img: "assets/img/unidades/tec.webp"
            }
        ]
    },
    { 
        id: 'mongols', 
        nombre: "LOS MONGOLES", 
        icono: "assets/img/CivIcon-Mongoles.webp",
        imgCastillo: "assets/img/castillos/mongol.webp",
        tipo: "Civilización de arqueros a caballo",
        audio: "assets/audio/mongol.mp3",
        bonos: ["Arqueros a caballo disparan 25% más rápido.", "Cazadores trabajan un 40% más rápido.", "Caballería ligera 20/30 % PR más en la Edad de los Castillos y la Edad Imperial","La línea de caballería de exploración recibe +2 de campo de visión"],
        unidad: "Mangudai",
        imgUnidad: "assets/img/unidades/mangu.webp",
        imgMaravilla: "assets/img/maravilla/mongol.webp",
        nombreMaravilla: "Gran Tienda de Genghis Khan",
        tecsUnicas: [
            {
                nombre: "Nomadas",
                efecto: "Mantiene la población aunque no haya casas.",
                img: "assets/img/unidades/tec.webp"
            },
            {
                nombre: "Instrucción militar",
                efecto: "El asedio se mueve un 50% más rápido.",
                img: "assets/img/unidades/tec.webp"
            }
        ]
    },
    { 
        id: 'aztecs', 
        nombre: "LOS AZTECAS", 
        icono: "assets/img/CivIcon-Aztecas.webp",
        imgCastillo: "assets/img/castillos/aztec.webp",
        tipo: "Civilización de infantería",
        audio: "assets/audio/aztec.mp3",
        bonos: [" Comienzas con +50 de oro","Aldeanos cargan +3 de recursos.", "Unidades militares se crean 11% más rápido.","los monjes obtienen +5 PR por cada tecnología de monasterio investigada","Las reliquias generan un 33 % más de oro"],
        unidad: "Guerrero Jaguar",
        imgUnidad: "assets/img/unidades/jaguar.webp",
        imgMaravilla: "assets/img/maravilla/aztec.webp",
        nombreMaravilla: "Templo Mayor",
        tecsUnicas: [
            {
                nombre: "Nomadas",
                efecto: "Mantiene la población aunque no haya casas.",
                img: "assets/img/unidades/tec.webp"
            },
            {
                nombre: "Instrucción militar",
                efecto: "El asedio se mueve un 50% más rápido.",
                img: "assets/img/unidades/tec.webp"
            }
        ]
    }
];

const unidadesData = [
    { 
        id: 'milicia', 
        nombre: 'Línea de Milicia', 
        imagen: 'assets/img/unidades/mili.webp',
        tipo: 'Infanteria', 
        hp: 40, atk: 4, arm: '0/1', 
        desc: 'Unidad básica de infantería. Evoluciona hasta Campeón.',
        evoluciones: [
            { nombre: 'Hombre de Armas', costo: '100A 40O', mejora: '+5 HP, +2 ATK', stats: '<i class="fas fa-heart stat-hp"></i> 45 <i class="fas fa-fist-raised stat-atk"></i> 6 <i class="fas fa-shield-alt stat-def"></i> 0/1', img:'assets/img/unidades/maa.webp' },
            { nombre: 'Espadachín Largo', costo: '150A 65O', mejora: '+15 HP, +3 ATK',stats: '<i class="fas fa-heart stat-hp"></i> 60 <i class="fas fa-fist-raised stat-atk"></i> 9 <i class="fas fa-shield-alt stat-def"></i> 1/1', img:'assets/img/unidades/sword.webp' },
            { nombre: 'Mandoble', costo: '300A 100O', mejora: '+10 HP, +3 ATK', stats: '<i class="fas fa-heart stat-hp"></i> 65 <i class="fas fa-fist-raised stat-atk"></i> 12 <i class="fas fa-shield-alt stat-def"></i> 1/1', img:'assets/img/unidades/man.webp' },
            { nombre: 'Campeón', costo: '750A 350O', mejora: '+5 HP, +2 ATK', stats: '<i class="fas fa-heart stat-hp"></i> 70 <i class="fas fa-fist-raised stat-atk"></i> 14 <i class="fas fa-shield-alt stat-def"></i> 1/1', img:'assets/img/unidades/camp.webp' },
            { 
            nombre: 'Legionario', 
            costo: '800A 400O', 
            mejora: 'Reemplaza al Campeón', 
            stats: '<i class="fas fa-heart stat-hp"></i> 75 <i class="fas fa-fist-raised stat-atk"></i> 12 <i class="fas fa-shield-alt stat-def"></i> 2/2 (+ Atk vs Infantería)', 
            img:'assets/img/unidades/legi.webp',
            especial: 'ÚNICA: ROMANOS' 
        }
        ]
    },
    {
        id: 'guerrero_aguila', 
        tipo: 'Infanteria', // Corregido: tipo e Infanteria con mayúscula
        nombre: 'Guerrero Águila',
        imagen: 'assets/img/unidades/agui.webp', 
        hp: 50, atk: 7, arm: '0/2',
        desc: 'Infantería veloz con gran radio de visión. Resistente a la conversión.',
        evoluciones: [
            { nombre: 'Explorador Águila', costo: 'Básico', mejora: 'Unidad Base,', stats: '<i class="fas fa-heart stat-hp"></i> 50 <i class="fas fa-fist-raised stat-atk"></i> 7 <i class="fas fa-shield-alt stat-def"></i> 0/2', img: 'assets/img/unidades/agui.webp' },
            { nombre: 'G. Águila', costo: '200A 300O', mejora: '+5 HP, +2 ATK', stats: '<i class="fas fa-heart stat-hp"></i> 55 <i class="fas fa-fist-raised stat-atk"></i> 7 <i class="fas fa-shield-alt stat-def"></i> 0/2', img: 'assets/img/unidades/agui2.webp' },
            { nombre: 'G. Águila de Élite', costo: '800A 500O', mejora: '+5 HP, +1 ATK, +1 Armadura', stats: '<i class="fas fa-heart stat-hp"></i> 60 <i class="fas fa-fist-raised stat-atk"></i> 9 <i class="fas fa-shield-alt stat-def"></i> 0/4', img: 'assets/img/unidades/agui3.webp' }
        ]
    },

    { 
        id: 'lancero', 
        nombre: 'Línea de Lancero', 
        imagen: 'assets/img/unidades/lan.webp',
        tipo: 'Infanteria', 
        hp: 45, atk: 3, arm: '0/0', 
        desc: 'Especialista contra caballería. Débil contra otras unidades de infantería.',
        evoluciones: [
            { nombre: 'Lancero', costo: 'Básico', mejora: 'Unidad Base, Bonus vs Cab pequeño.', stats: '<i class="fas fa-heart stat-hp"></i> 45 <i class="fas fa-fist-raised stat-atk"></i> 3 <i class="fas fa-shield-alt stat-def"></i> 0/0', img:'assets/img/unidades/lan.webp' },
            { nombre: 'Piquero', costo: '215A 90O', mejora: '+10 HP, +1 ATK, Bonus vs Cab mejorado.', stats: '<i class="fas fa-heart stat-hp"></i> 55 <i class="fas fa-fist-raised stat-atk"></i> 4 <i class="fas fa-shield-alt stat-def"></i> 0/0', img:'assets/img/unidades/lan2.webp' },
            { nombre: 'Alabardero', costo: '300A 600O', mejora: '+5 HP, +2 ATK, Máximo Bonus', stats: '<i class="fas fa-heart stat-hp"></i> 60 <i class="fas fa-fist-raised stat-atk"></i> 6 <i class="fas fa-shield-alt stat-def"></i> 0/0', img:'assets/img/unidades/lan3.webp' }
        ]
    },
    { 
        id: 'lancero_incendiario', 
        nombre: 'Lancero Incendiario', 
        imagen: 'assets/img/unidades/lanc.webp',
        tipo: 'Infanteria', 
        hp: 65, atk: 9, arm: '1/0', 
        desc: 'Unidad de choque única de Asia. Dispara 3 proyectiles. Buena contra caballeria y polivalente.',
        evoluciones: [
            { 
                nombre: 'Lancero Incendiario', 
                costo: 'Edad de los Castillos', 
                mejora: 'Unidad Base', 
                stats: '<i class="fas fa-heart stat-hp"></i> 65 <i class="fas fa-fist-raised stat-atk"></i> 9 <i class="fas fa-shield-alt stat-def"></i> 1/0', 
                img:'assets/img/unidades/lanc.webp' 
            },
            { 
                nombre: 'L. Incendiario de Élite', 
                costo: '1000A 800O', 
                mejora: '+20 HP, +2 ATK, +Daño de Área', 
                stats: '<i class="fas fa-heart stat-hp"></i> 85 <i class="fas fa-fist-raised stat-atk"></i> 10 <i class="fas fa-shield-alt stat-def"></i> 2/1', 
                img:'assets/img/unidades/lancc.webp' 
            }
        ]
    },

    { 
        id: 'milicia_flamenca', 
        nombre: 'Milicia Flamenca', 
        imagen: 'assets/img/unidades/flemi.webp', // Asegúrate de subir esta imagen
        tipo: 'Infanteria', 
        hp: 60, atk: 11, arm: '1/1', 
        desc: 'Unidad de infantería robusta con bonus contra caballería. Unica para los Borgoñeses.',
        evoluciones: [
            { 
                nombre: 'Milicia Flamenca', 
                costo: '30A 25O', 
                mejora: 'Unidad de Élite', 
                stats: '<i class="fas fa-heart stat-hp"></i> 60 <i class="fas fa-fist-raised stat-atk"></i> 11 <i class="fas fa-shield-alt stat-def"></i> 1/1', 
                img: 'assets/img/unidades/flemi.webp' 
            }
        ]
    },
    { 
        id: 'condotiero', 
        nombre: 'Condotiero', 
        imagen: 'assets/img/unidades/condo.webp', // Asegúrate de subir esta imagen
        tipo: 'Infanteria', 
        hp: 80, atk: 10, arm: '1/0', 
        desc: 'Infantería veloz con un gran bonus de ataque contra unidades de pólvora disponible para el equipo de un italiano.',
        evoluciones: [
            { 
                nombre: 'Condotiero', 
                costo: 'Edad Imperial', 
                mejora: 'Unidad Mercenaria', 
                stats: '<i class="fas fa-heart stat-hp"></i> 80 <i class="fas fa-fist-raised stat-atk"></i> 10 <i class="fas fa-shield-alt stat-def"></i> 1/0', 
                img: 'assets/img/unidades/condo.webp' 
            }
        ]
    },
    {
        id: 'catafracta',
        nombre: 'Catafracta',
        imagen: 'assets/img/unidades/cata.webp',
        tipo: 'Caballeria',
        hp: 110, 
        atk: 9, 
        arm: '2/1',
        especial: 'ÚNICA: BIZANTINOS',
        desc: 'Caballería pesada bizantina con armadura de placas. Excelente contra infantería.',
        evoluciones: [
            { 
                nombre: 'Catafracta', 
                costo: '60A 75O', 
                mejora: 'Unidad Base', 
                stats: '110 HP / 9 ATK', 
                img: 'assets/img/unidades/cata.webp' 
            },
            { 
                nombre: 'Catafracta de Élite', 
                costo: '1600A 800O', 
                mejora: '+40 HP, +3 ATK', 
                stats: '150 HP / 12 ATK', 
                img: 'assets/img/unidades/cata2.webp' 
            },
            { 
                nombre: 'Logística', 
                costo: '1000A 600O', 
                mejora: 'Daño por pisoteo', 
                stats: 'Daño en área', 
                img: 'assets/img/unidades/tec.webp',
                especial: 'TECNOLOGÍA ÚNICA' 
            }
        ]
    },
    {
        id: 'coustiller',
        nombre: 'Coustillier',
        imagen: 'assets/img/unidades/cous.webp',
        tipo: 'Caballeria',
        hp: 115, 
        atk: 8, 
        arm: '2/2',
        especial: 'ÚNICA: BORGOÑESES',
        desc: 'Caballería media borgoñes con un ataque de carga. Excelente contra infantería y arqueros.',
        evoluciones: [
            { 
                nombre: 'Coustillier', 
                costo: '60A 75O', 
                mejora: 'Unidad Base', 
                stats: '115 HP / 8 ATK', 
                img: 'assets/img/unidades/cous.webp' 
            },
            { 
                nombre: 'Coustillier de Élite', 
                costo: '1600A 800O', 
                mejora: '+30 HP, +3 ATK', 
                stats: '145 HP / 11 ATK', 
                img: 'assets/img/unidades/cous2.webp' 
            },
        ]
    },
    {
        id: 'pagoda',
        nombre: 'Pagoda de hierro',
        imagen: 'assets/img/unidades/iron.webp',
        tipo: 'Caballeria',
        hp: 115, 
        atk: 12, 
        arm: '1/3',
        especial: 'ÚNICA: YURCHENS',
        desc: 'Caballería pesada yurchen bloquea 1 ataque cada cierto tiempo. Excelente contra arqueros y otras caballerías.',
        evoluciones: [
            { 
                nombre: 'Pagoda de hierro', 
                costo: '60A 75O', 
                mejora: 'Unidad Base', 
                stats: '115 HP / 12 ATK', 
                img: 'assets/img/unidades/iron.webp' 
            },
            { 
                nombre: 'Pagoda de hierro de Élite', 
                costo: '1600A 800O', 
                mejora: '+25 HP, +1 ATK', 
                stats: '140 HP / 13 ATK', 
                img: 'assets/img/unidades/iron2.webp' 
            },
        ]
    },    

    { 
        id: 'jinete', 
        nombre: 'Línea de Jinete',
        imagen: 'assets/img/unidades/kt.webp', 
        tipo: 'Caballeria', 
        hp: 100, atk: 10, arm: '2/2', 
        desc: 'Caballería pesada rápida y resistente.',
        evoluciones: [
            { nombre: 'Jinete', costo: 'Básico', mejora: 'Unidad Base',stats: '<i class="fas fa-heart stat-hp"></i> 100 <i class="fas fa-fist-raised stat-atk"></i> 10 <i class="fas fa-shield-alt stat-def"></i> 2/2', img:'assets/img/unidades/kt.webp' },
            { nombre: 'Caballero', costo: '300A 175O', mejora: '+20 HP, +2 ATK, +1/1 ARM',stats: '<i class="fas fa-heart stat-hp"></i> 120 <i class="fas fa-fist-raised stat-atk"></i> 12 <i class="fas fa-shield-alt stat-def"></i> 3/3', img:'assets/img/unidades/kt2.webp' },
            { nombre: 'Paladín', costo: '1300A 750O', mejora: '+40 HP, +2 ATK, +1/1 ARM',stats: '<i class="fas fa-heart stat-hp"></i> 160 <i class="fas fa-fist-raised stat-atk"></i> 14 <i class="fas fa-shield-alt stat-def"></i> 4/4', img:'assets/img/unidades/kt3.webp' },
            { 
            nombre: 'Savar', 
            costo: '1300A 750O', 
            mejora: 'Reemplaza al Paladín', 
            stats: '<i class="fas fa-heart stat-hp"></i> 145 <i class="fas fa-fist-raised stat-atk"></i> 14 <i class="fas fa-shield-alt stat-def"></i> 3/4 (+ Atk vs Arqueros)', 
            img:'assets/img/unidades/savar.webp',
            especial: 'ÚNICA: PERSAS' 
        }
        ]
    },
    { 
        id: 'camello', 
        nombre: 'Línea de Camello', 
        imagen: 'assets/img/unidades/camel.webp',
        tipo: 'Caballeria', 
        hp: 100, atk: 6, arm: '0/0', 
        desc: 'Unidad de caballería especialista en cazar otros jinetes. Tiene un gran bonus contra caballería.',
        evoluciones: [
            { nombre: 'Camello', costo: 'Básico', stats: '<i class="fas fa-heart stat-hp"></i> 100 <i class="fas fa-fist-raised stat-atk"></i> 6 <i class="fas fa-shield-alt stat-def"></i> 0/0', mejora: 'Unidad Base', img:'assets/img/unidades/camel.webp' },
            { nombre: 'Camello Pesado', costo: '325A 360O', stats: '<i class="fas fa-heart stat-hp"></i> 120 <i class="fas fa-fist-raised stat-atk"></i> 7 <i class="fas fa-shield-alt stat-def"></i> 0/0', mejora: '+20 HP, +1 ATK', img:'assets/img/unidades/camel2.webp' },
            { 
            nombre: 'Camello Imperial', 
            costo: '1000A 500O', 
            mejora: 'Nueva Mejora', 
            stats: '<i class="fas fa-heart stat-hp"></i> 145 <i class="fas fa-fist-raised stat-atk"></i> 14 <i class="fas fa-shield-alt stat-def"></i> 3/4 (+ Atk, vida y velocidad)', 
            img:'assets/img/unidades/camel3.webp',
            especial: 'ÚNICA: INDOSTANOS' 
        }
        ]
    },
    { 
        id: 'lancero_estepario', 
        nombre: 'Lancero Estepario', 
        imagen: 'assets/img/unidades/lancer.webp',
        tipo: 'Caballeria', 
        hp: 60, atk: 9, arm: '0/1', 
        desc: 'Caballería mediana disponible para las civ esteparias con una lanza que le permite atacar con distancia (rango 1).',
        evoluciones: [
            { nombre: 'L. Estepario', costo: 'Básico', stats: '<i class="fas fa-heart stat-hp"></i> 60 <i class="fas fa-fist-raised stat-atk"></i> 9 <i class="fas fa-shield-alt stat-def"></i> 0/1', mejora: 'Unidad Base', img:'assets/img/unidades/lancer.webp' },
            { nombre: 'L. Estepario Élite', costo: '900A 550O', stats: '<i class="fas fa-heart stat-hp"></i> 80 <i class="fas fa-fist-raised stat-atk"></i> 11 <i class="fas fa-shield-alt stat-def"></i> 0/2', mejora: '+20 HP, +2 ATK', img:'assets/img/unidades/lancer2.webp' }
        ]
    },
    { 
        id: 'hei_guang', 
        nombre: 'Caballería Hei Guang', 
        imagen: 'assets/img/unidades/hei.webp',
        tipo: 'Caballeria', 
        hp: 60, atk: 12, arm: '2/2', 
        desc: 'Unidad de élite blindada. Muy resistente a las flechas y devastadora en carga frontal.',
        evoluciones: [
            { nombre: 'Hei Guang', costo: 'Basico', stats: '<i class="fas fa-heart stat-hp"></i> 60 <i class="fas fa-fist-raised stat-atk"></i> 12 <i class="fas fa-shield-alt stat-def"></i> 3/4', mejora: 'Unidad base', img:'assets/img/unidades/hei.webp' },
            { nombre: 'Cab. pesada Hei Guang', costo: '350A 250O', stats: '<i class="fas fa-heart stat-hp"></i> 80 <i class="fas fa-fist-raised stat-atk"></i> 12 <i class="fas fa-shield-alt stat-def"></i> 3/4', mejora: 'Unidad de Élite', img:'assets/img/unidades/hei2.webp' }
        ]
    },
    { 
        id: 'elefante_combate', 
        nombre: 'Elefante de Combate', 
        imagen: 'assets/img/unidades/elec.webp',
        tipo: 'Caballeria', 
        hp: 250, atk: 12, arm: '1/2', 
        desc: 'Unidad de caballería masiva y lenta con muchísima resistencia. Causa daño de área.',
        evoluciones: [
            { nombre: 'Elefante Combate', costo: 'Básico', stats: '<i class="fas fa-heart stat-hp"></i> 250 <i class="fas fa-fist-raised stat-atk"></i> 12 <i class="fas fa-shield-alt stat-def"></i> 1/2', mejora: 'Unidad Base', img:'assets/img/unidades/elec.webp' },
            { nombre: 'Elefante Élite', costo: '1100A 750O', stats: '<i class="fas fa-heart stat-hp"></i> 300 <i class="fas fa-fist-raised stat-atk"></i> 14 <i class="fas fa-shield-alt stat-def"></i> 1/3', mejora: '+50 HP, +2 ATK', img:'assets/img/unidades/elec2.webp' }
        ]
    },
    { 
        id: 'caballeria_ligera', 
        nombre: 'Línea de Caballería Ligera', 
        imagen: 'assets/img/unidades/sc.webp',
        tipo: 'Caballeria', 
        hp: 45, atk: 3, arm: '0/2', 
        desc: 'Rápida y con gran radio de visión. Excelente para explorar.',
        evoluciones: [
            { nombre: 'Explorador', costo: 'Básico', stats: '<i class="fas fa-heart stat-hp"></i> 45 <i class="fas fa-fist-raised stat-atk"></i> 3 <i class="fas fa-shield-alt stat-def"></i> 0/2', mejora: 'Unidad Inicial', img:'assets/img/unidades/sc.webp' },
            { nombre: 'Cab. Ligera', costo: '150A 50O', stats: '<i class="fas fa-heart stat-hp"></i> 60 <i class="fas fa-fist-raised stat-atk"></i> 7 <i class="fas fa-shield-alt stat-def"></i> 0/2', mejora: '+15 HP, +4 ATK', img:'assets/img/unidades/sc2.webp' },
            { nombre: 'Húsar', costo: '500A 600O', stats: '<i class="fas fa-heart stat-hp"></i> 75 <i class="fas fa-fist-raised stat-atk"></i> 7 <i class="fas fa-shield-alt stat-def"></i> 0/2', mejora: '+15 HP, Mayor Visión', img:'assets/img/unidades/sc3.webp' },
            { 
            nombre: 'Húsar Alado', 
            costo: '600A 800O', 
            mejora: 'Nueva Mejora', 
            stats: '<i class="fas fa-heart stat-hp"></i> 80 <i class="fas fa-fist-raised stat-atk"></i> 9 <i class="fas fa-shield-alt stat-def"></i> 1/2 (+ Atk vs Polvora)', 
            img:'assets/img/unidades/sc4.webp',
            especial: 'ÚNICA: POLACOS Y LITUANOS' 
        }
        ]
    },

    { 
        id: 'arquero', 
        nombre: 'Línea de Arquero', 
        imagen: 'assets/img/unidades/arch.webp',
        tipo: 'Arqueros', 
        hp: 30, atk: 4, arm: '0/0', 
        desc: 'Unidad de ataque a distancia.',
        evoluciones: [
            { nombre: 'Arquero', costo: 'Básico', mejora: 'Unidad Base', img:'assets/img/unidades/arch.webp' },
            { nombre: 'Ballestero', costo: '125A 75O', mejora: '+5 HP, +1 ATK, +1 Rango', img:'assets/img/unidades/ball.webp' },
            { nombre: 'Arbalesta', costo: '350A 300O', mejora: '+5 HP, +1 ATK', img:'assets/img/unidades/arbs.webp' }
        ]
    },
    { 
        id: 'guerrilla', 
        nombre: 'Línea de Guerrilla', 
        imagen: 'assets/img/unidades/guerri.webp',
        tipo: 'Arqueros', 
        hp: 30, atk: 2, arm: '0/3', 
        desc: 'Unidad de proyectiles defensiva. Tiene un gran bonus de ataque contra otros arqueros.',
        evoluciones: [
            { nombre: 'Guerrilla', costo: 'Básico', stats: '<i class="fas fa-heart stat-hp"></i> 30 <i class="fas fa-fist-raised stat-atk"></i> 2 <i class="fas fa-shield-alt stat-def"></i> 0/3', mejora: 'Unidad Base', img: 'assets/img/unidades/guerri.webp' },
            { nombre: 'Guerrilla de Élite', costo: '230A 130O', stats: '<i class="fas fa-heart stat-hp"></i> 35 <i class="fas fa-fist-raised stat-atk"></i> 3 <i class="fas fa-shield-alt stat-def"></i> 0/4', mejora: '+5 HP, +1 ATK', img: 'assets/img/unidades/guerri2.webp' },
            { 
            nombre: 'Guerrilla Imperial', 
            costo: '300N 300O', 
            mejora: 'Nueva Mejora', 
            stats: '<i class="fas fa-heart stat-hp"></i> 35 <i class="fas fa-fist-raised stat-atk"></i> 4 <i class="fas fa-shield-alt stat-def"></i> 0/5 (+ Atk vs Arqueros extra)', 
            img:'assets/img/unidades/guerri3.webp',
            especial: 'ÚNICA: VIETNAMITAS Y SU EQUIPO' 
        }
        ]
    },
    { 
        id: 'arquero_caballo', 
        nombre: 'Arquero a Caballo', 
        imagen: 'assets/img/unidades/ca.webp',
        tipo: 'Arqueros', 
        hp: 50, atk: 6, arm: '0/0', 
        desc: 'Arquero montado veloz. Ideal para tácticas de golpear y correr (Hit & Run).',
        evoluciones: [
            { nombre: 'Arq. a Caballo', costo: 'Básico', stats: '<i class="fas fa-heart stat-hp"></i> 50 <i class="fas fa-fist-raised stat-atk"></i> 6 <i class="fas fa-shield-alt stat-def"></i> 0/0', mejora: 'Unidad Base', img:'assets/img/unidades/ca.webp' },
            { nombre: 'Arq. Cab. Pesado', costo: '325A 225O', stats: '<i class="fas fa-heart stat-hp"></i> 60 <i class="fas fa-fist-raised stat-atk"></i> 7 <i class="fas fa-shield-alt stat-def"></i> 1/0', mejora: '+10 HP, +1 ATK, +1 ARM', img:'assets/img/unidades/ca2.webp' }
        ]
    },
    { 
        id: 'artillero_manual', 
        nombre: 'Artillero Manual', 
        imagen: 'assets/img/unidades/hc.webp',
        tipo: 'Arqueros', 
        hp: 35, atk: 17, arm: '1/0', 
        desc: 'Unidad de pólvora potente pero poco precisa a larga distancia. Bonus contra infantería.',
        evoluciones: [
            { nombre: 'Artillero Manual', costo: 'Edad Imperial', stats: '<i class="fas fa-heart stat-hp"></i> 35 <i class="fas fa-fist-raised stat-atk"></i> 17 <i class="fas fa-shield-alt stat-def"></i> 1/0', mejora: 'Unidad de Pólvora', img:'assets/img/unidades/hc.webp' },
        ]
    },
    { 
        id: 'granadero', 
        nombre: 'Granadero', 
        imagen: 'assets/img/unidades/gran.webp',
        tipo: 'Arqueros', 
        hp: 60, atk: 13, arm: '0/2', 
        desc: 'Unidad única de los Yurchens. Lanza granadas que causan daño de área.',
        evoluciones: [
            { nombre: 'Granadero', costo: 'Edad Imperial', stats: '<i class="fas fa-heart stat-hp"></i> 60 <i class="fas fa-fist-raised stat-atk"></i> 13 <i class="fas fa-shield-alt stat-def"></i> 0/2', mejora: 'Daño de área', img:'assets/img/unidades/gran.webp' }
        ]
    },
    { 
        id: 'genitour', 
        nombre: 'Escaramuzador Zenete', 
        imagen: 'assets/img/unidades/zen.webp',
        tipo: 'Arqueros', 
        hp: 50, atk: 3, arm: '0/3', 
        desc: 'Unidad única bereber que comparte con su equipo. Un guerrillero montado que comparte los bonus de la guerrilla.',
        evoluciones: [
            { nombre: 'Zenete', costo: 'Edad Castillos', stats: '<i class="fas fa-heart stat-hp"></i> 50 <i class="fas fa-fist-raised stat-atk"></i> 3 <i class="fas fa-shield-alt stat-def"></i> 0/3', mejora: 'Unidad Base', img:'assets/img/unidades/zen.webp' },
            { nombre: 'Zenete de Élite', costo: '500A 450O', stats: '<i class="fas fa-heart stat-hp"></i> 55 <i class="fas fa-fist-raised stat-atk"></i> 4 <i class="fas fa-shield-alt stat-def"></i> 0/4', mejora: '+5 HP, +1 ATK', img:'assets/img/unidades/zen2.webp' }
        ]
    },
    { 
        id: 'arquero_elefante', 
        nombre: 'Arquero en Elefante', 
        imagen: 'assets/img/unidades/ele.webp',
        tipo: 'Arqueros', 
        hp: 200, atk: 6, arm: '0/2', 
        desc: 'Unidad de arquería masiva con muchísima vida. Muy resistente pero lenta.',
        evoluciones: [
            { nombre: 'Arq. Elefante', costo: 'Básico', stats: '<i class="fas fa-heart stat-hp"></i> 230 <i class="fas fa-fist-raised stat-atk"></i> 6 <i class="fas fa-shield-alt stat-def"></i> 0/2', mejora: 'Unidad Base', img:'assets/img/unidades/ele.webp' },
            { nombre: 'Arq. Elefante Élite', costo: '1000A 800O', stats: '<i class="fas fa-heart stat-hp"></i> 280 <i class="fas fa-fist-raised stat-atk"></i> 7 <i class="fas fa-shield-alt stat-def"></i> 0/3', mejora: '+50 HP, +1 ATK', img:'assets/img/unidades/ele2.webp' }
        ]
    },

    { 
        id: 'ariete', 
        nombre: 'Línea de Ariete', 
        imagen: 'assets/img/unidades/ram.webp',
        tipo: 'Asedio', 
        hp: 175, atk: 2, arm: '-3/180', 
        desc: 'Eficaz para derribar edificios y absorber flechas. Prácticamente inmune al ataque a distancia.',
        evoluciones: [
            { nombre: 'Ariete', costo: 'Básico', stats: '<i class="fas fa-heart stat-hp"></i> 175 <i class="fas fa-fist-raised stat-atk"></i> 2 <i class="fas fa-shield-alt stat-def"></i> -3/180', mejora: 'Unidad Base', img:'assets/img/unidades/ram.webp' },
            { nombre: 'Ariete de Cubierta', costo: '300A', stats: '<i class="fas fa-heart stat-hp"></i> 200 <i class="fas fa-fist-raised stat-atk"></i> 3 <i class="fas fa-shield-alt stat-def"></i> -3/190', mejora: '+25 HP, +Bonus Edif.', img:'assets/img/unidades/ram2.webp' },
            { nombre: 'Ariete de Asedio', costo: '1000A', stats: '<i class="fas fa-heart stat-hp"></i> 270 <i class="fas fa-fist-raised stat-atk"></i> 4 <i class="fas fa-shield-alt stat-def"></i> -3/195', mejora: 'Daño de Área Masivo', img:'assets/img/unidades/ram3.webp' }
        ]
    },
    { 
        id: 'mangonel', 
        nombre: 'Línea de Catapulta', 
        imagen: 'assets/img/unidades/manga.webp',
        tipo: 'Asedio', 
        hp: 50, atk: 40, arm: '0/6', 
        desc: 'Lanza piedras que causan daño de área. Excelente contra grupos de arqueros y edificios.',
        evoluciones: [
            { nombre: 'Mangonel', costo: 'Básico', stats: '<i class="fas fa-heart stat-hp"></i> 50 <i class="fas fa-fist-raised stat-atk"></i> 40 <i class="fas fa-shield-alt stat-def"></i> 0/6', mejora: 'Unidad Base', img:'assets/img/unidades/manga.webp' },
            { nombre: 'Onagro', costo: '800A 500O', stats: '<i class="fas fa-heart stat-hp"></i> 60 <i class="fas fa-fist-raised stat-atk"></i> 50 <i class="fas fa-shield-alt stat-def"></i> 0/7', mejora: '+10 HP, +10 ATK', img:'assets/img/unidades/manga2.webp' },
            { nombre: 'Onagro de Asedio', costo: '1450A 1000O', stats: '<i class="fas fa-heart stat-hp"></i> 70 <i class="fas fa-fist-raised stat-atk"></i> 75 <i class="fas fa-shield-alt stat-def"></i> 0/8', mejora: 'Destruye Árboles', img:'assets/img/unidades/manga3.webp' }
        ]
    },
    { 
        id: 'escorpion', 
        nombre: 'Línea de Escorpión', 
        imagen: 'assets/img/unidades/scor.webp',
        tipo: 'Asedio', 
        hp: 40, atk: 12, arm: '0/7', 
        desc: 'Lanza virotes que atraviesan a varias unidades. Ideal contra grandes grupos de infantería.',
        evoluciones: [
            { nombre: 'Escorpión', costo: 'Básico', stats: '<i class="fas fa-heart stat-hp"></i> 40 <i class="fas fa-fist-raised stat-atk"></i> 12 <i class="fas fa-shield-alt stat-def"></i> 0/7', mejora: 'Unidad Base', img:'assets/img/unidades/scor.webp' },
            { nombre: 'Escorpión Pesado', costo: '1000A 1100O', stats: '<i class="fas fa-heart stat-hp"></i> 50 <i class="fas fa-fist-raised stat-atk"></i> 16 <i class="fas fa-shield-alt stat-def"></i> 0/8', mejora: '+10 HP, +4 ATK', img:'assets/img/unidades/scor2.webp' }
        ]
    },
    { 
        id: 'carro_cohete', 
        nombre: 'Carro de cohetes', 
        imagen: 'assets/img/unidades/rocke.webp',
        tipo: 'Asedio', 
        hp: 75, atk: 12, arm: '0/3', 
        desc: 'Unidad de asedio asiatica. Lanza múltiples flechas de fuego a gran velocidad.',
        evoluciones: [
            { nombre: 'Carro de Guerra', costo: 'Edad Castillos', stats: '<i class="fas fa-heart stat-hp"></i> 75 <i class="fas fa-fist-raised stat-atk"></i> 12 <i class="fas fa-shield-alt stat-def"></i> 0/3', mejora: 'Unidad Base', img:'assets/img/unidades/rocke.webp' },
            { nombre: 'Carro de Élite', costo: '1000A 800O', stats: '<i class="fas fa-heart stat-hp"></i> 90 <i class="fas fa-fist-raised stat-atk"></i> 15 <i class="fas fa-shield-alt stat-def"></i> 0/4', mejora: '+15 HP, +3 ATK', img:'assets/img/unidades/rocke2.webp' }
        ]
    },
    { 
        id: 'torre_asedio', 
        nombre: 'Torre de Asedio', 
        imagen: 'assets/img/unidades/siege.webp',
        tipo: 'Asedio', 
        hp: 220, atk: 0, arm: '-2/100', 
        desc: 'Permite que la infantería salte murallas enemigas. No posee ataque propio.',
        evoluciones: [
            { nombre: 'Torre de Asedio', costo: 'Básico', stats: '<i class="fas fa-heart stat-hp"></i> 220 <i class="fas fa-fist-raised stat-atk"></i> 0 <i class="fas fa-shield-alt stat-def"></i> -2/100', mejora: 'Transporte Único', img:'assets/img/unidades/siege.webp' }
        ]
    },
    { 
        id: 'cañon_asedio', 
        nombre: 'Cañón de Asedio', 
        imagen: 'assets/img/unidades/bbc.webp',
        tipo: 'Asedio', 
        hp: 80, atk: 40, arm: '2/1', 
        desc: 'Arma de pólvora de largo alcance. Devastadora contra torres, castillos y murallas.',
        evoluciones: [
            { nombre: 'Cañón de Asedio', costo: 'Edad Imperial', stats: '<i class="fas fa-heart stat-hp"></i> 80 <i class="fas fa-fist-raised stat-atk"></i> 40 <i class="fas fa-shield-alt stat-def"></i> 2/1', mejora: 'Unidad Base', img:'assets/img/unidades/bbc.webp' },
            { 
            nombre: 'Obùs de Asedio', 
            costo: '1100A 800O', 
            mejora: 'Nueva Mejora', 
            stats: '<i class="fas fa-heart stat-hp"></i> 90 <i class="fas fa-fist-raised stat-atk"></i> 50 <i class="fas fa-shield-alt stat-def"></i> 2/6 (+ Daño en area)', 
            img:'assets/img/unidades/bbc2.webp',
            especial: 'ÚNICA: BOHEMIOS' 
        }
        ]
    },
    { 
        id: 'lanzapiedras', 
        nombre: 'Lanzapiedras', 
        imagen: 'assets/img/unidades/treb.webp',
        tipo: 'Asedio', 
        hp: 150, atk: 200, arm: '2/8', 
        desc: 'El arma de asedio definitiva. Debe desplegarse para disparar a grandes distancias. Capaz de demoler castillos rápidamente.',
        evoluciones: [
            { 
                nombre: 'Modo Empaquetado', 
                costo: '75A 75O', 
                stats: '<i class="fas fa-heart stat-hp"></i> 150 <i class="fas fa-fist-raised stat-atk"></i> 0 <i class="fas fa-shield-alt stat-def"></i> 2/8', 
                mejora: 'Alta movilidad, no puede atacar.', 
                img: 'assets/img/unidades/treb2.webp' 
            },
            { 
                nombre: 'Modo Desplegado', 
                costo: 'Fase de Armado', 
                stats: '<i class="fas fa-heart stat-hp"></i> 150 <i class="fas fa-fist-raised stat-atk"></i> 200 <i class="fas fa-shield-alt stat-def"></i> 2/8', 
                mejora: 'Rango: 16. Destruye edificios.', 
                img: 'assets/img/unidades/treb.webp' 
            }
        ]
    },
];

// --- NUEVAS FUNCIONES PARA EL MODAL DE EVOLUCIONES ---
window.abrirModalEvoluciones = function(idUnidad) {
    const unidad = unidadesData.find(u => u.id === idUnidad);
    if (!unidad) return;

    const overlay = document.createElement('div');
    overlay.id = 'modal-overlay';
    overlay.className = 'modal-overlay fade-in';
    overlay.onclick = (e) => { if(e.target === overlay) window.cerrarModal(); };

    overlay.innerHTML = `
        <div class="modal-content-premium fade-in-up">
            <button class="btn-cerrar-modal" onclick="window.cerrarModal()">×</button>
            <h2 class="titulo-dorado">${unidad.nombre}</h2>
            <p class="subtitulo-rojo-enc">LÍNEA DE MEJORA ESTRATÉGICA</p>
            
            <div class="evoluciones-flex-container">
                ${unidad.evoluciones.map((evo, i) => {
                    // Lógica para detectar si es una unidad única (como el Savar)
                    const esEspecial = evo.especial ? 'evo-especial' : '';
                    const etiquetaUnica = evo.especial ? `<span class="placa-unica-tag">${evo.especial}</span>` : '';

                    return `
                        <div class="evo-column ${esEspecial}">
                            ${etiquetaUnica}
                            <span class="evo-step-number">${i + 1}</span>
                            <div class="evo-image-frame">
                                <img src="${evo.img || 'assets/img/shield_gold.png'}" alt="${evo.nombre}" class="evo-unit-img">
                            </div>
                            <div class="evo-data">
                                <h4>${evo.nombre}</h4>
                                <p class="evo-stats-total">${evo.stats || ''}</p> 
                                <p class="evo-cost">💰 ${evo.costo}</p>
                                <p class="evo-bonus">📈 ${evo.mejora}</p>
                            </div>
                        </div>
                        ${i < unidad.evoluciones.length - 1 ? '<div class="evo-connector">➔</div>' : ''}
                    `;
                }).join('')}
            </div>
        </div>
    `;
    document.body.appendChild(overlay);
};

window.cerrarModal = function() {
    const modal = document.getElementById('modal-overlay');
    if (modal) {
        modal.classList.remove('fade-in');
        modal.classList.add('fade-out'); // Opcional si tienes la animación
        setTimeout(() => modal.remove(), 200);
    }
};

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
                            <p class="subtitle">EDICIÓN DEFINITIVA: EL PASO DE LOS SIGLOS<br>
                            Age of Empires II no es solo un juego, es historia, estrategia y precisión.</p>
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
                        <img src="assets/img/CivIcon-Lit.webp" alt="Lituanos">
                        <img src="assets/img/CivIcon-Portu.webp" alt="Portugueses">
                        <img src="assets/img/CivIcon-yur.webp" alt="Yurchens">
                        <img src="assets/img/CivIcon-Chinos.webp" alt="Chinos">
                        <img src="assets/img/CivIcon-tatars.webp" alt="Tartaros">
                        <img src="assets/img/CivIcon-cumans.webp" alt="Cumanos">
                        <img src="assets/img/CivIcon-Espa.webp" alt="Espannoles">
                        <img src="assets/img/CivIcon-Ita.webp" alt="Italianos">
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
                                    <p>Caballería pesada bizantina con armadura de placas.</p>
                                    <div class="etiquetas"><span class="tag-rojo">ANTI-INFANTERÍA</span><span class="tag-dorado">BARRIDO</span></div>
                                </div>
                            </div>
                        </div>
                        <div class="card-parallax">
                            <div class="card-cuerpo">
                                <div class="escudo-wrapper"><img src="assets/img/Cab.webp" class="img-parallax"></div>
                                <div class="info-unidad">
                                    <h3>Caballero Teutón</h3>
                                    <p>Infantería de élite con la armadura más resistente.</p>
                                    <div class="etiquetas"><span class="tag-rojo">ARMADURA++</span><span class="tag-dorado">TANQUE</span></div>
                                </div>
                            </div>
                        </div>
                        <div class="card-parallax">
                            <div class="card-cuerpo">
                                <div class="escudo-wrapper"><img src="assets/img/arch.webp" class="img-parallax"></div>
                                <div class="info-unidad">
                                    <h3>Arquero de Tiro Largo</h3>
                                    <p>Arquero con el mayor alcance de todas las unidades.</p>
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
    <div class="slider-header"><h2 class="titulo-siglos">GALERÍA DE BATALLAS</h2></div>
    <div class="galeria-grid">
        <div class="foto foto-grande"><img src="assets/img/asiab.webp"></div>
        
        <div class="foto foto-peque"><img src="assets/img/asiaa.jpg"></div>
        
        <div class="foto foto-ancha video-item">
            <video autoplay muted loop playsinline>
                <source src="assets/img/batle2.mp4" type="video/mp4">
            </video>
            <div class="video-overlay"><span>CLIP</span></div>
        </div>

        <div class="foto foto-peque"><img src="assets/img/asiac.jpg"></div>

        <div class="foto foto-ancha"><img src="assets/img/naval.jpg"></div>

        <div class="foto foto-ancha video-item">
            <video autoplay muted loop playsinline>
                <source src="assets/img/batle.mp4" type="video/mp4">
            </video>
            <div class="video-overlay"><span>GAMEPLAY</span></div>
        </div>

        <div class="foto foto-alta"><img src="assets/img/castle.jpg"></div>

        <div class="foto foto-relleno"><img src="assets/img/eup.jpg"></div>
    </div>
</section>

                <section class="recursos-seccion fade-in">
    <div class="slider-header">
        <h2 class="titulo-siglos">GESTIÓN DE RECURSOS</h2>
        <p class="subtitulo-dorado">LOS PILARES DE TU ECONOMÍA</p>
    </div>

    <div class="recursos-grid">
        <div class="recurso-card">
            <div class="recurso-icon">
                <img src="assets/img/tree.png" alt="Madera">
            </div>
            <h3>MADERA</h3>
            <p>Esencial para la construcción de edificios, barcos y unidades de asedio.</p>
        </div>

        <div class="recurso-card">
            <div class="recurso-icon">
                <img src="assets/img/cesped.png" alt="Alimento">
            </div>
            <h3>ALIMENTO</h3>
            <p>Fundamental para entrenar aldeanos, infantería y avanzar de edad.</p>
        </div>

        <div class="recurso-card">
            <div class="recurso-icon">
                <img src="assets/img/gold.png" alt="Oro">
            </div>
            <h3>ORO</h3>
            <p>Requerido para unidades avanzadas, tecnologías superiores y comercio.</p>
        </div>

        <div class="recurso-card">
            <div class="recurso-icon">
                <img src="assets/img/stone.png" alt="Piedra">
            </div>
            <h3>PIEDRA</h3>
            <p>Vital para la construcción de castillos, murallas y torres defensivas.</p>
        </div>
    </div>
</section>

                <section class="escena-competitiva fade-in">
                    <div class="contenedor-negro-central">
                        <h2 class="titulo-dorado">ESCENA COMPETITIVA</h2>
                        <div class="linea-roja-decorativa"></div>
                        <div class="competitivo-grid">
                            <div class="info-item"><h3>E-SPORTS DE ÉLITE</h3><p>Torneos globales con premios masivos.</p></div>
                            <div class="info-item border-x"><h3>COMUNIDAD ACTIVA</h3><p>Legión de jugadores apasionados.</p></div>
                            <div class="info-item"><h3>ACTUALIZACIONES</h3><p>Equilibrio constante y nuevo contenido.</p></div>
                        </div>
                    </div>
                </section>
            </section>
        `;

        setTimeout(() => {
            slideActual = 0;
            iniciarAutoplay();
            ejecutarConteoIndividual('num-civs', 50);
            ejecutarConteoIndividual('num-unidades', 200);
            ejecutarConteoIndividual('num-anios', 25);
            const track = document.getElementById('escudos-track');
            if (track) { track.innerHTML += track.innerHTML; }
        }, 100);

    } else if (seccion === 'civilizaciones') {
    detenerAutoplay();
    
    // Generar las cartas desde el array
    const cardsHTML = civilizacionesAoE.map(civ => `
        <div class="civ-card" onclick="mostrarDetalleCiv('${civ.id}')">
            <img src="${civ.icono}" alt="${civ.nombre}">
            <span>${civ.nombre.replace('LOS ', '')}</span>
        </div>
    `).join('');

    contenedor.innerHTML = `
        <section id="seccion-civilizaciones" class="fade-in">
            <div class="enciclopedia-header">
                <h2 class="titulo-dorado-enc">ENCICLOPEDIA DE CIVILIZACIONES</h2>
                <p class="subtitulo-rojo-enc">SELECCIONA TU LINAJE PARA LA VICTORIA</p>
            </div>
            
            <div class="civ-grid">
                ${cardsHTML}
            </div>

            <div id="side-panel-civ" class="side-panel">
                <button type="button" class="btn-cerrar-panel" onclick="cerrarPanelCiv()">&times;</button>
                <div id="contenido-panel-civ"></div>
            </div>
            
            <div id="overlay-negro" class="overlay-hidden" onclick="cerrarPanelCiv()"></div>
        </section>
    `;
} else if (seccion === 'unidades') {
        detenerAutoplay();
        contenedor.innerHTML = `
            <div class="enciclopedia-container fade-in">
                <aside class="enciclopedia-sidebar">
                    <h3 class="sidebar-label">CATEGORÍAS</h3>
                    <nav class="categoria-list">
                        <button class="cat-item active" onclick="filtrarPorTipo('Infanteria', this)">🛡️ INFANTERÍA</button>
                        <button class="cat-item" onclick="filtrarPorTipo('Arqueros', this)">🏹 ARQUEROS</button>
                        <button class="cat-item" onclick="filtrarPorTipo('Caballeria', this)">🐎 CABALLERÍA</button>
                        <button class="cat-item" onclick="filtrarPorTipo('Asedio', this)">💣 ASEDIO</button>
                    </nav>
                </aside>
                <main class="enciclopedia-main">
                    <header class="enciclopedia-header">
                        <div class="header-titles">
                            <h1 class="titulo-dorado-enc">ENCICLOPEDIA DE UNIDADES</h1>
                            <p class="subtitulo-rojo-enc">EL ARSENAL DE LA HISTORIA</p>
                        </div>
                        <div class="search-box-wrapper">
                            <input type="text" id="busqueda-unidades" placeholder="BUSCAR UNIDAD..." oninput="manejarBusquedaEnciclopedia(this.value)">
                            <p id="feedback-interactivo" class="feedback-text"></p>
                        </div>
                    </header>
                    <div id="grid-unidades" class="unidades-grid-scroll"></div>
                </main>
            </div>
        `;
        setTimeout(() => filtrarPorTipo('Infanteria'), 50);
    }
}
function abrirModalEvoluciones(idUnidad) {
    const unidad = unidadesData.find(u => u.id === idUnidad);
    if (!unidad || !unidad.evoluciones) return;

    const overlay = document.createElement('div');
    overlay.id = 'modal-overlay';
    overlay.className = 'modal-overlay fade-in';
    overlay.onclick = (e) => { if(e.target === overlay) cerrarModal(); };

    overlay.innerHTML = `
        <div class="modal-content-premium fade-in-up">
            <button class="btn-cerrar-modal" onclick="cerrarModal()">×</button>
            <h2 class="titulo-dorado">${unidad.nombre}</h2>
            <p class="subtitulo-rojo-enc">LÍNEA DE MEJORA HISTÓRICA</p>
            <div class="evoluciones-flex">
                ${unidad.evoluciones.map((evo, i) => `
                    <div class="evo-item">
                        <div class="evo-circle">${i+1}</div>
                        <h4>${evo.nombre}</h4>
                        <p class="evo-cost">💰 ${evo.costo}</p>
                        <p class="evo-bonus">📈 ${evo.mejora}</p>
                    </div>
                    ${i < unidad.evoluciones.length - 1 ? '<div class="evo-arrow">→</div>' : ''}
                `).join('')}
            </div>
        </div>
    `;
    document.body.appendChild(overlay);
}

function cerrarModal() { document.getElementById('modal-overlay').remove(); }

// FUNCIONES AUXILIARES (SE MANTIENEN IGUAL)
function manejarBusquedaEnciclopedia(valor) {
    const grid = document.getElementById('grid-unidades');
    const feedback = document.getElementById('feedback-interactivo');
    if (!grid || !feedback) return;

    const query = valor.trim().toLowerCase();

    // 1. Si el buscador está vacío
    if (query === "") {
        feedback.innerText = "";
        filtrarPorTipo('Infanteria'); 
        return;
    }

    // 2. Feedback visual mientras escribe
    if (query.length < 3) {
        feedback.innerText = "Sigue escribiendo...";
        feedback.style.color = "#c5a059";
        // No filtramos aún para no saturar el DOM
        return; 
    }

    // 3. Ejecutar búsqueda
    feedback.innerText = "Buscando en registros...";
    feedback.style.color = "#ff0000";

    const filtrados = unidadesData.filter(u => 
        u.nombre.toLowerCase().includes(query)
    );

    // 4. Lógica de resultados
    if (filtrados.length === 0) {
        feedback.innerText = "0 coincidencias encontradas";
        grid.innerHTML = `
            <div class="no-results fade-in" style="grid-column: 1/-1; text-align: center; padding: 50px;">
                <img src="assets/img/unidades/mili.webp" style="width: 80px; opacity: 0.3; filter: grayscale(1);">
                <p style="color: var(--dorado); margin-top: 20px; font-family: 'Cinzel', serif;">
                    "Wololo! No hay registros de esa unidad, mi señor."
                </p>
                <button onclick="document.getElementById('busqueda-unidades').value=''; filtrarPorTipo('Infanteria');" 
                        class="cat-item" style="margin: 20px auto; display: inline-block; border: 1px solid var(--dorado);">
                    RESETEAR ARCHIVOS
                </button>
            </div>
        `;
    } else {
        feedback.innerText = `${filtrados.length} unidades encontradas`;
        feedback.style.color = "#c5a059";
        renderizarCartasEnciclopedia(filtrados);
    }
}

function filtrarPorTipo(tipo, elemento = null) {
    // Manejo de clase activa en botones
    if (elemento) {
        document.querySelectorAll('.cat-item').forEach(btn => btn.classList.remove('active'));
        elemento.classList.add('active');
    }
    
    const filtrados = unidadesData.filter(u => u.tipo === tipo);
    renderizarCartasEnciclopedia(filtrados);
}


function renderizarCartasEnciclopedia(lista) {
    const grid = document.getElementById('grid-unidades');
    if (!grid) return;
    
    grid.innerHTML = lista.map(u => {
        // Si la unidad tiene el campo 'especial', aplicamos estilos VIP
        const claseEspecial = u.especial ? 'unidad-especial-card' : '';
        const badgeUnica = u.especial ? `<div class="badge-card-unica">${u.especial}</div>` : '';

        return `
        <div class="unidad-card-parallax ${claseEspecial}" onmousemove="efectoParallax(event, this)" onmouseleave="resetParallax(this)" onclick="window.abrirModalEvoluciones('${u.id}')">
            <div class="card-bg"></div>
            
            ${badgeUnica}
            
            <div class="unidad-render-container">
                <img src="${u.imagen || 'assets/img/units/milicia.png'}" class="unidad-render" alt="${u.nombre}">
            </div>

            <div class="card-info-overlay">
                <h3 class="titulo-unidad-parallax">${u.nombre}</h3>
                <div class="stats-grid-parallax">
                    <span><i class="fas fa-heart stat-hp"></i>${u.hp}</span>
                    <span><i class="fas fa-fist-raised stat-atk"></i>${u.atk}</span>
                    <span><i class="fas fa-shield-alt stat-def"></i>${u.arm}</span>
                </div>
                <p class="desc-parallax">${u.desc}</p>
                <div class="footer-action-parallax">
                    <span class="ver-mejoras-txt">${u.especial ? 'TECNOLOGÍA ÚNICA ★' : 'VER MEJORAS ★'}</span>
                </div>
            </div>
        </div>
        `;
    }).join('');
}
// LÓGICA CARRUSEL Y AUXILIARES (SE MANTIENEN IGUAL)
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

function manualMover(dir) { moverCarrusel(dir); reiniciarAutoplay(); }
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

function iniciarAutoplay() { detenerAutoplay(); intervaloCarrusel = setInterval(() => moverCarrusel(1), 5000); }
function detenerAutoplay() { clearInterval(intervaloCarrusel); }
function reiniciarAutoplay() { iniciarAutoplay(); }

function ejecutarConteoIndividual(id, meta) {
    const elemento = document.getElementById(id);
    if (!elemento) return;
    let actual = 0;
    const interval = setInterval(() => {
        actual += meta / 50;
        if (actual >= meta) {
            elemento.innerText = meta + (id === 'num-unidades' ? "+" : "");
            clearInterval(interval);
        } else { elemento.innerText = Math.floor(actual); }
    }, 30);
}

function mostrarDetalleCiv(idCiv) {
    const panel = document.getElementById('side-panel-civ');
    const overlay = document.getElementById('overlay-negro');
    const contenido = document.getElementById('contenido-panel-civ');
    
    // Buscamos la civilización en el array
    const s = civilizacionesAoE.find(c => c.id === idCiv);
    if (!s) return;

    // Rellenamos el contenido usando una sola estructura para evitar que se borren elementos
    contenido.innerHTML = `
        <div class="panel-scroll">
            <div class="civ-portrait-box">
                <img src="${s.icono}" class="img-portrait-large">
            </div>
            
            <h2 class="panel-titulo">${s.nombre}</h2>
            <p class="panel-subtitulo">${s.tipo}</p>

            <div class="audio-player-container">
                <div class="audio-label">TEMA MUSICAL</div>
                <audio controls controlsList="nodownload" class="mini-audio">
                    <source src="${s.audio || ''}" type="audio/mpeg">
                    Tu navegador no soporta el audio.
                </audio>
            </div>

            <div class="panel-seccion castillo-visual-container">
    <h4>ARQUITECTURA ÚNICA</h4>
    <div class="castillo-frame">
        <img src="${s.imgCastillo}" class="img-castillo-display">
    </div>
</div>
            
            <div class="panel-seccion">
                <h4>BONIFICACIONES</h4>
                <ul class="panel-list">
                    ${(s.bonos || []).map(b => `<li>${b}</li>`).join('')}
                </ul>
            </div>

            <div class="panel-seccion">
                <h4>UNIDAD ÚNICA</h4>
                <div class="unidad-box-premium">
                    <div class="unidad-img-wrapper">
                        <img src="${s.imgUnidad}" alt="${s.unidad}" class="unidad-thumbnail">
                    </div>
                    <div class="unidad-info">
                        <span class="unidad-nombre">${s.unidad}</span>
                        <p class="unidad-descripcion">Unidad de élite de los ${s.nombre.replace('LOS ', '')}.</p>
                    </div>
                </div>
            </div>

           <div class="panel-seccion">
                <h4>TECNOLOGÍAS ÚNICAS</h4>
                <div class="tecs-container">
                    ${(s.tecsUnicas || []).map(tec => `
                        <div class="tec-item-premium">
                            <div class="tec-img-wrapper">
                                <img src="${tec.img}" class="tec-thumbnail">
                            </div>
                            <div class="tec-info">
                                <span class="tec-nombre">${tec.nombre}</span>
                                <p class="tec-efecto">${tec.efecto}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="panel-seccion">
    <h4>MARAVILLA</h4>
    <div class="maravilla-frame">
        <img src="${s.imgMaravilla}" class="img-maravilla-display">
        <div class="maravilla-caption">${s.nombreMaravilla || 'Maravilla Imperial'}</div>
    </div>
</div>

            <div class="espaciador-final" style="height: 150px; width: 100%;"></div>
        </div> `;

    // ACTIVACIÓN: Forzamos la visualización y animaciones
    panel.style.display = "block"; 
    setTimeout(() => {
        panel.classList.add('active');
        overlay.classList.add('overlay-visible');
        overlay.classList.remove('overlay-hidden');
    }, 10);
}

// Función para cerrar el panel
function cerrarPanelCiv() {
    const panel = document.getElementById('side-panel-civ');
    const overlay = document.getElementById('overlay-negro');

    const audio = panel.querySelector('audio');
    if (audio) {
        audio.pause();
        audio.currentTime = 0;
    }
    
    panel.classList.remove('active');
    overlay.classList.remove('overlay-visible');
    overlay.classList.add('overlay-hidden');
    
    // Opcional: ocultar del DOM tras la animación
    setTimeout(() => {
        if (!panel.classList.contains('active')) {
            panel.style.display = "none";
        }
    }, 500);
}
document.addEventListener("DOMContentLoaded", () => cargarSeccion('inicio'));

function efectoParallax(e, card) {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Ángulos de rotación
    const rotateX = (centerY - y) / 10;
    const rotateY = (x - centerX) / 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    
    // Mover el personaje un poco más para efecto de profundidad
    const render = card.querySelector('.unidad-render');
    if (render) {
        render.style.transform = `translateX(${(x - centerX) / 15}px) translateY(${(y - centerY) / 15}px) scale(1.1)`;
    }
}

function resetParallax(card) {
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
    const render = card.querySelector('.unidad-render');
    if (render) render.style.transform = `translateX(0) translateY(0) scale(1)`;
}

