// main.js - Age of Empires II: Definitive Edition Hub
let slideActual = 0;
let intervaloCarrusel;

// BASE DE DATOS LOCAL (Para la Enciclopedia / Evaluación 2)


const civilizacionesAoE = [
    {
        id: 'franks',
        nombre: "LOS FRANCOS",
        region: "Europa Occidental",
        icono: "assets/img/CivIcon-Francos.webp",
        imgCastillo: "assets/img/castillos/frank.webp",
        tipo: "Civilización de caballería",
        audio: "assets/audio/frank.mp3",
        bonos: ["Castillos cuestan un -10%/-15% de piedra en castillo/imperial.", "Caballería tiene +20% de HP.", "Recolección de bayas un 15% más rápida.", "Mejora de Granjas gratis.", "La línea de caballeros gana +2 de campo de visión"],
        unidadesUnicas: [{ nombre: "Lanzador de Hachas", img: "assets/img/unidades/frank.webp" }],
        imgMaravilla: "assets/img/maravilla/frank.webp",
        nombreMaravilla: "Catedral de Chartres",
        dificultad: 1,
        stats: { militar: 90, economia: 85, defensa: 70, tecnologia: 60, naval: 50 },
        tecsUnicas: [
            { nombre: "Hacha de Arista", efecto: "+2 de rango al lanzador de hachas", img: "assets/img/unidades/tec.webp" },
            { nombre: "Caballeria", efecto: "los establos trabajan un 40% más rápido.", img: "assets/img/unidades/tec.webp" }
        ],
        estrategia: {
            pico: "Edad de los Castillos",
            mapa: "Mapas Terrestres / Abiertos",
            composicion: "Paladines + Lanzadores de Hachas",
            rol: "Pocket (Caballería)"
        }
    },
    {
        id: 'mongols',
        nombre: "LOS MONGOLES",
        region: "Asia del Este",
        icono: "assets/img/CivIcon-Mongoles.webp",
        imgCastillo: "assets/img/castillos/mongol.webp",
        tipo: "Civilización de arqueros a caballo",
        audio: "assets/audio/mongol.mp3",
        bonos: ["Arqueros a caballo disparan 25% más rápido.", "Cazadores trabajan un 40% más rápido.", "Caballería ligera 20/30 % PR más en la Edad de los Castillos y la Edad Imperial", "La línea de caballería de exploración recibe +2 de campo de visión"],
        unidadesUnicas: [{ nombre: "Mangudai", img: "assets/img/unidades/mangu.webp" }],
        imgMaravilla: "assets/img/maravilla/mongol.webp",
        nombreMaravilla: "Gran Tienda de Genghis Khan",
        dificultad: 1,
        stats: { militar: 95, economia: 75, defensa: 40, tecnologia: 70, naval: 40 },
        tecsUnicas: [
            { nombre: "Nomadas", efecto: "Mantiene la población aunque no haya casas.", img: "assets/img/unidades/tec.webp" },
            { nombre: "Instrucción militar", efecto: "El asedio se mueve un 50% más rápido.", img: "assets/img/unidades/tec.webp" }
        ],
        estrategia: {
            pico: "Edad Imperial (Late Game)",
            mapa: "Mapas Abiertos",
            composicion: "Mangudai + Asedio + Húsares",
            rol: "Pocket / Flank"
        },
        ubicacion: {
            region: "Estepas de Asia Central",
            coords: "46.8625° N, 103.8467° E",
            pos: { top: "35%", left: "75%" }
        }
    },
    {
        id: 'aztecs',
        nombre: "LOS AZTECAS",
        region: "America",
        icono: "assets/img/CivIcon-Aztecas.webp",
        imgCastillo: "assets/img/castillos/aztec.webp",
        tipo: "Civilización de infantería",
        audio: "assets/audio/aztec.mp3",
        bonos: [" Comienzas con +50 de oro", "Aldeanos cargan +3 de recursos.", "Unidades militares se crean 11% más rápido.", "los monjes obtienen +5 PR por cada tecnología de monasterio investigada", "Las reliquias generan un 33 % más de oro"],
        unidadesUnicas: [{ nombre: "Guerrero Jaguar", img: "assets/img/unidades/jaguar.webp" }],
        imgMaravilla: "assets/img/maravilla/aztec.webp",
        nombreMaravilla: "Templo Mayor",
        dificultad: 3,
        stats: { militar: 60, economia: 80, defensa: 60, tecnologia: 70, naval: 30 },
        tecsUnicas: [
            { nombre: "Atlatl", efecto: "+1 ataque, +1 alcance para guerrilleros.", img: "assets/img/unidades/tec.webp" },
            { nombre: "Guerras florales", efecto: "+4 ataque para infantería.", img: "assets/img/unidades/tec.webp" }
        ],
        estrategia: {
            pico: "Edad de los Castillos",
            mapa: "Cualquier mapa terrestre",
            composicion: "Guerreros Jaguar/Guerreros Águila + Monjes",
            rol: "Flank"
        }
    },
    {
        id: 'britons',
        nombre: "LOS BRITANOS",
        region: "Europa Occidental",
        icono: "assets/img/CivIcon-britanos.webp",
        imgCastillo: "assets/img/castillos/briton.webp",
        tipo: "Civilización de arqueros de largo alcance",
        audio: "assets/audio/britons.mp3",
        bonos: ["Centros Urbanos cuestan 50% menos de madera desde la Edad de los Castillos.", "Arqueros a pie (excepto hostigadores) tienen +1/+2 de alcance en Castillos/Imperial.", "Pastores trabajan un 25% más rápido.", "Las galerías de tiro con arco funcionan un +10 % más rápido"],
        unidadesUnicas: [{ nombre: "Longbowman", img: "assets/img/unidades/long.webp" }],
        imgMaravilla: "assets/img/maravilla/briton.webp",
        nombreMaravilla: "Catedral de Chichester",
        dificultad: 2,
        stats: { militar: 85, economia: 70, defensa: 75, tecnologia: 80, naval: 60 },
        tecsUnicas: [
            { nombre: "Yeomen", efecto: "Arqueros a pie +1 de alcance y Torres +2 de ataque.", img: "assets/img/unidades/tec.webp" },
            { nombre: "Lobo de Guerra", efecto: "Lanzapiedras hacen daño en área y son más precisos.", img: "assets/img/unidades/tec.webp" }
        ],
        estrategia: {
            pico: "Edad de los Castillos / Imperial",
            mapa: "Cualquier mapa terrestre",
            composicion: "Arqueros de tiro largo + Alabarderos",
            rol: "Flank (Arqueros)"
        }
    },
    {
        id: 'goths',
        nombre: "LOS GODOS",
        region: "Europa Central",
        icono: "assets/img/CivIcon-goths.webp",
        imgCastillo: "assets/img/castillos/goth.webp",
        tipo: "Civilización de infantería masiva",
        audio: "assets/audio/goth.mp3",
        bonos: ["Infantería cuesta menos en cada edad.", "Infantería inflige más daño a edificios.", "Telar se investiga instantáneamente.", "+10 de población máxima en la Edad Imperial.", "Los cuarteles funcionan un 20 % más rápido"],
        unidadesUnicas: [{ nombre: "Huskarle", img: "assets/img/unidades/husca.webp" }],
        imgMaravilla: "assets/img/maravilla/goth.webp",
        nombreMaravilla: "Mausoleo de Teodorico",
        dificultad: 3,
        stats: { militar: 95, economia: 60, defensa: 30, tecnologia: 50, naval: 40 },
        tecsUnicas: [
            { nombre: "Anarquía", efecto: "Permite crear Huskarles en los Cuarteles.", img: "assets/img/unidades/tec.webp" },
            { nombre: "Movilización", efecto: "Cuarteles trabajan 100% más rápido.", img: "assets/img/unidades/tec.webp" }
        ],
        estrategia: {
            pico: "Edad Imperial",
            mapa: "Mapas cerrados",
            composicion: "Huskarles + alabarderos",
            rol: "Pocket"
        }
    },
    {
        id: 'vikings',
        nombre: "LOS VIKINGOS",
        region: "Europa Central",
        icono: "assets/img/CivIcon-viking.webp",
        imgCastillo: "assets/img/castillos/viking.webp",
        tipo: "Civilización de infantería y naval",
        audio: "assets/audio/viking.mp3",
        bonos: ["La infantería gana un 20 % PR mas a partir de la Edad Feudal.",
            "Carreta y Carro de Mano gratis.",
            "Los barcos de guerra cuestan un 15 % menos/15/20 % en la Edad Feudal, la Edad de los Castillos y la Edad Imperial",
            "Los muelles cuestan un 15 % menos."
        ],
        unidadesUnicas: [
            { nombre: "Berserker", img: "assets/img/unidades/berserk.webp" },
            { nombre: "Barco Dragón", img: "assets/img/unidades/dragon.webp" }
        ],
        imgMaravilla: "assets/img/maravilla/viking.webp",
        nombreMaravilla: "Iglesia de Borgund",
        dificultad: 3,
        stats: { militar: 85, economia: 90, defensa: 50, tecnologia: 65, naval: 95 },
        tecsUnicas: [
            { nombre: "Hersir", efecto: "la infantería gana +5 de ataque contra la caballería y +4 contra las unidades a camello y genera +5 de oro al matar aldeanos, unidades de comercio y monjes", img: "assets/img/unidades/tec.webp" },
            { nombre: "Bogsveigar", efecto: "los arqueros y los drakkar ganan +1 de ataque", img: "assets/img/unidades/tec.webp" }
        ],
        estrategia: {
            pico: "Edad Imperial",
            mapa: "Cualquier mapa terrestre",
            composicion: "Berserkers + arqueros",
            rol: "Flank (Arqueros)"
        }
    },
    {
        id: 'japanese',
        nombre: "LOS JAPONESES",
        region: "Asia del Este",
        icono: "assets/img/CivIcon-jap.webp",
        imgCastillo: "assets/img/castillos/jap.webp",
        tipo: "Civilización de infantería",
        audio: "assets/audio/jap.mp3",
        bonos: ["Infantería ataca 33% más rápido desde la Edad Feudal.", "Edificios económicos cuestan 50% menos.", "Pescadores trabajan más rápido.", "Los arqueros a caballo ganan +2 de ataque contra los soldados a distancia", "Las galeras tienen +4 de campo de visión."],
        unidadesUnicas: [{ nombre: "Samurai", img: "assets/img/unidades/samurai.webp" }],
        imgMaravilla: "assets/img/maravilla/jap.webp",
        nombreMaravilla: "Todai Ji",
        dificultad: 3,
        stats: { militar: 80, economia: 85, defensa: 85, tecnologia: 70, naval: 80 },
        tecsUnicas: [
            { nombre: "Yasama", efecto: "Torres disparan flechas adicionales.", img: "assets/img/unidades/tec.webp" },
            { nombre: "Kataparuto", efecto: "Lanzapiedras se despliegan y disparan más rápido.", img: "assets/img/unidades/tec.webp" }
        ],
        estrategia: {
            pico: "Edad de los Castillos/Imperial",
            mapa: "Mapas hibridos/abiertos",
            composicion: "Samurais + alabarderos/Arqueros a caballo/Lanzapiedras",
            rol: "Flank (Arqueros)"
        }
    },
    {
        id: 'teutons',
        nombre: "LOS TEUTONES",
        region: "Europa Central",
        icono: "assets/img/CivIcon-teu.webp",
        imgCastillo: "assets/img/castillos/teu.webp",
        tipo: "Civilización caballeria e infantería pesada",
        audio: "assets/audio/teu.mp3",
        bonos: ["Granjas cuestan 40% menos.", "Las unidades de los cuarteles y de los establos ganan +1/+2 de armadura.", "Los centros urbanos tienen +10 de capacidad de guarnición, y las torres, +5.", " Los monjes ganan un 100 % de alcance de curación", " Matacanes, Hierba medicinal gratuitas", "Las unidades se vuelven más resistentes a la conversión"],
        unidadesUnicas: [{ nombre: "Teutonic Knight", img: "assets/img/unidades/teu.webp" }],
        imgMaravilla: "assets/img/maravilla/teu.webp",
        nombreMaravilla: "Abadía de Maria Laach",
        dificultad: 2,
        stats: { militar: 92, economia: 88, defensa: 95, tecnologia: 75, naval: 30 },
        tecsUnicas: [
            { nombre: "Acorazado", efecto: "las armas de asedio ganan +4 de armadura cuerpo a cuerpo.", img: "assets/img/unidades/tec.webp" },
            { nombre: "Almenas", efecto: "los castillos ganan +3 de alcance y la infantería guarecida dispara flechas.", img: "assets/img/unidades/tec.webp" }
        ],
        estrategia: {
            pico: "Edad Imperial",
            mapa: "Mapas cerrados",
            composicion: "Caballeria pesada + alabarderos/Armas de asedio",
            rol: "Pocket"
        }
    },
    {
        id: 'huns',
        nombre: "LOS HUNOS",
        region: "Europa Central",
        icono: "assets/img/CivIcon-hun.webp",
        imgCastillo: "assets/img/castillos/hun.webp",
        tipo: "Civilización de caballería Y Arqueros montados",
        audio: "assets/audio/huns.mp3",
        bonos: ["No necesitan casas.", "Los arqueros a caballo cuestan un 10 % menos en la Edad de los Castillos y un 20 % menos en la Edad Imperial", "Lanzapiedras más precisos.", "Los establos funcionan un 20 % más rápido"],
        unidadesUnicas: [{ nombre: "Tarkan", img: "assets/img/unidades/tarkan.webp" }],
        imgMaravilla: "assets/img/maravilla/hun.webp",
        nombreMaravilla: "Arco de Constantino",
        dificultad: 2,
        stats: { militar: 90, economia: 75, defensa: 70, tecnologia: 70, naval: 30 },
        tecsUnicas: [
            { nombre: "Razzias", efecto: "Tarcanos se crean en Establos.", img: "assets/img/unidades/tec.webp" },
            { nombre: "Ateísmo", efecto: "Reduce el impacto de Reliquias y Maravillas enemigas.", img: "assets/img/unidades/tec.webp" }
        ],
        estrategia: {
            pico: "Edad de los Castillos/Imperial",
            mapa: "Mapas abiertos",
            composicion: "Arqueros a caballo + Husares/Armas de asedio/Tarcanos",
            rol: "Flank (Arqueros a caballo)/Pocket"
        }
    },
    {
        id: 'spanish',
        nombre: "LOS ESPAÑOLES",
        region: "Mediterraneo",
        icono: "assets/img/CivIcon-Espa.webp",
        imgCastillo: "assets/img/castillos/espa.webp",
        tipo: "Civilización de pólvora y monjes",
        audio: "assets/audio/spanish.mp3",
        bonos: ["Los constructores trabajan un +30 % más rápido.", "Mejoras de herrería no cuestan oro.", " Las unidades de pólvora atacan un +18 % más rápido.", " Los galeones artillados disparan con mayor precisión a los objetivos en movimiento"],
        unidadesUnicas: [{ nombre: "Conquistador", img: "assets/img/unidades/conqui.webp" },
        { nombre: "Misionero", img: "assets/img/unidades/monb.webp" }
        ],
        imgMaravilla: "assets/img/maravilla/espa.webp",
        nombreMaravilla: "Torre del Oro",
        dificultad: 2,
        stats: { militar: 88, economia: 80, defensa: 80, tecnologia: 90, naval: 85 },
        tecsUnicas: [
            { nombre: "Inquisición", efecto: "los monjes y los misioneros convierten más rápido; los misioneros ganan +1 de alcance", img: "assets/img/unidades/tec.webp" },
            { nombre: "Supremacía", efecto: "Aldeanos se vuelven unidades militares fuertes.", img: "assets/img/unidades/tec.webp" }
        ],
        estrategia: {
            pico: "Edad Imperial",
            mapa: "Mapas Cerrados",
            composicion: "Conquistadores + husares/Armas de asedio/Galeones artillados",
            rol: "Flank (polvora)/Pocket"
        }
    },
    {
        id: 'celts',
        nombre: "LOS CELTAS",
        region: "Europa Occidental",
        icono: "assets/img/CivIcon-celt.webp",
        imgCastillo: "assets/img/castillos/celt.webp",
        tipo: "Civilización de infantería y asedio",
        audio: "assets/audio/celt.mp3",
        bonos: [
            "La infantería se mueve un 5/10/15/20 % más rápido en la Edad Oscura, la Edad Feudal, la Edad de los Castillos y la Edad Imperial.",
            "Armas de asedio disparan 25% más rápido.",
            "Aldeanos recolectan madera 15% más rápido.",
            "Los talleres de maquinaria de asedio funcionan un 20 % más rápido"
        ],
        unidadesUnicas: [
            { nombre: "Incursor Azul", img: "assets/img/unidades/woad.webp" }
        ],
        imgMaravilla: "assets/img/maravilla/celt.webp",
        nombreMaravilla: "Newgrange",
        dificultad: 3,
        stats: { militar: 90, economia: 85, defensa: 45, tecnologia: 70, naval: 40 },
        tecsUnicas: [
            { nombre: "Bastión", efecto: "los castillos y la línea de atalayas atacan un 33 % más rápido; los castillos curan a la infantería aliada en un radio de 7 casillas", img: "assets/img/unidades/tec.webp" },
            { nombre: "Furor Celta", efecto: "Asedio tiene +40% de vida.", img: "assets/img/unidades/tec.webp" }
        ],
        estrategia: {
            pico: "Edad Imperial",
            mapa: "Mapas Cerrados",
            composicion: "Infanteria/Incursor azul/Armas de asedio/",
            rol: "Flank (infanteria)/Pocket"
        }
    },
    {
        id: 'magyars',
        nombre: "LOS MAGIARES",
        region: "Europa del Este",
        icono: "assets/img/CivIcon-magy.webp",
        imgCastillo: "assets/img/castillos/magy.webp",
        tipo: "Civilización de caballería y Arqueros montados",
        audio: "assets/audio/magy.mp3",
        bonos: [
            "Los aldeanos eliminan a los lobos de un golpe.",
            "La línea de caballería de exploración cuesta un 15 % menos",
            "Mejoras de ataque cuerpo a cuerpo gratis",
        ],
        unidadesUnicas: [
            { nombre: "Húsar Magyar", img: "assets/img/unidades/magy.webp" }
        ],
        imgMaravilla: "assets/img/maravilla/magy.webp",
        nombreMaravilla: "Basílica de Esztergom",
        dificultad: 2,
        stats: { militar: 90, economia: 70, defensa: 50, tecnologia: 70, naval: 40 },
        tecsUnicas: [
            { nombre: "Ejercito Corvinio", efecto: "Húsares Magyar no cuestan oro.", img: "assets/img/unidades/tec.webp" },
            { nombre: "Arcos Recurvos", efecto: "Arqueros a caballo +1 de alcance y ataque.", img: "assets/img/unidades/tec.webp" }
        ],
        estrategia: {
            pico: "Edad de los castillos/Edad Imperial",
            mapa: "Mapas Abiertos",
            composicion: "Arqueros a caballo/Húsar Magyar/Paladines/Armas de asedio/",
            rol: "Flank (Arqueros a caballo)/Pocket"
        }
    },
    {
        id: 'bohemians',
        nombre: "LOS BOHEMIOS",
        region: "Europa del Este",
        icono: "assets/img/CivIcon-bohe.webp",
        imgCastillo: "assets/img/castillos/bohe.webp",
        tipo: "Civilización de pólvora y monjes",
        audio: "assets/audio/bohe.mp3",
        bonos: [
            "Mineros trabajan más rápido.",
            "Tecnologías de pólvora están disponibles antes.",
            "Monjes son más baratos."
        ],
        unidadesUnicas: [
            { nombre: "Carreta de Guerra Hussita", img: "assets/img/unidades/wago.webp" }
        ],
        imgMaravilla: "assets/img/maravilla/bohe.webp",
        nombreMaravilla: "Torre de la Pólvora de Praga",
        dificultad: 3,
        stats: { militar: 90, economia: 85, defensa: 50, tecnologia: 80, naval: 40 },
        tecsUnicas: [
            { nombre: "Tácticas de fuerte de carretas", efecto: "las unidades de pólvora se mueven un 15 % más rápido.", img: "assets/img/unidades/tec.webp" },
            { nombre: "Reformas husitas", efecto: "el coste de oro de los monjes y de las tecnologías del monasterio se reemplaza por comida.", img: "assets/img/unidades/tec.webp" }
        ],
        estrategia: {
            pico: "Edad Imperial",
            mapa: "Mapas Cerrados",
            composicion: "Alabarderos + Houfnice + Carretas de Guerra Hussita",
            rol: "Flank (Polora)/Pocket"
        }
    },
    {
        id: 'poles',
        nombre: "LOS POLACOS",
        region: "Europa del Este",
        icono: "assets/img/CivIcon-poles.webp",
        imgCastillo: "assets/img/castillos/poles.webp",
        tipo: "Civilización de caballería",
        audio: "assets/audio/poles.mp3",
        bonos: [
            " El folwark sustituye al molino.",
            " Los aldeanos regeneran 10/15/20 PR en las edades Feudal/de los Castillos/Imperial",
            "Los canteros generan oro además de piedra.",
            "Las mejoras Pureza de sangre y la línea de caballería de exploración cuestan un 50 % menos de comida",
            "La línea de caballería de exploración recibe +1 de ataque contra los soldados a distancia."
        ],
        unidadesUnicas: [
            { nombre: "Obuch", img: "assets/img/unidades/obuch.webp" },
            { nombre: "Hùsar Alado", img: "assets/img/unidades/sc4.webp" }
        ],
        imgMaravilla: "assets/img/maravilla/poles.webp",
        nombreMaravilla: "Castillo de Wawel",
        dificultad: 4,
        stats: { militar: 90, economia: 90, defensa: 50, tecnologia: 90, naval: 40 },
        tecsUnicas: [
            { nombre: "Privilegios de szlachta ", efecto: "la línea de caballeros cuesta un 60 % menos de oro.", img: "assets/img/unidades/tec.webp" },
            { nombre: "Legado lequítico", efecto: "la línea de caballería de exploración arrasa a su paso.", img: "assets/img/unidades/tec.webp" }
        ],
        estrategia: {
            pico: "Edad de los castillos/Edad Imperial",
            mapa: "Mapas Abiertos/Cerrados",
            composicion: "Husares alados/Caballeros + obuch + asedio",
            rol: "Pocket"
        }
    },
    {
        id: 'lithuanians',
        nombre: "LOS LITUANOS",
        region: "Europa del Este",
        icono: "assets/img/CivIcon-Lit.webp",
        imgCastillo: "assets/img/castillos/lit.webp",
        tipo: "Civilización de caballería y monjes",
        audio: "assets/audio/lit.mp3",
        bonos: [
            "Cada centro urbano proporciona +100 de comida",
            "Los lanceros y guerrilleros se mueven un 10 % más rápido.",
            "Caballería gana ataque por cada reliquia.",
            "Monasterios trabajan más rápido."
        ],
        unidadesUnicas: [
            { nombre: "Leitis", img: "assets/img/unidades/leiti.webp" },
            { nombre: "Hùsar Alado", img: "assets/img/unidades/sc4.webp" }
        ],
        imgMaravilla: "assets/img/maravilla/lit.webp",
        nombreMaravilla: "Castillo de Trakai",
        dificultad: 3,
        stats: { militar: 90, economia: 90, defensa: 50, tecnologia: 90, naval: 40 },
        tecsUnicas: [
            { nombre: "Fuertes en las colinas", efecto: "centros urbanos: +3 de alcance.", img: "assets/img/unidades/tec.webp" },
            { nombre: " Escudo rectangular ", efecto: "lanceros y guerrilleros: +2 de armadura.", img: "assets/img/unidades/tec.webp" }
        ],
        estrategia: {
            pico: "Edad de los castillos/Edad Imperial",
            mapa: "Mapas Abiertos/Cerrados",
            composicion: "Husares alados/Paladines/Leitis + asedio",
            rol: "Pocket"
        }
    },
    {
        id: 'slavs',
        nombre: "LOS ESLAVOS",
        region: "Europa del Este",
        icono: "assets/img/CivIcon-slavs.webp",
        imgCastillo: "assets/img/castillos/slavs.webp",
        tipo: "Civilización de infantería y caballería",
        audio: "assets/audio/slavs.mp3",
        bonos: [
            "Aldeanos granjeros trabajan 15% más rápido.",
            " Incendiarismo y gambesones gratis",
            " Las unidades del taller de maquinaria de asedio son un 15 % más baratas",
            " Los monjes se mueven un 20 % más rápido",
            "Cada edificio militar proporciona +5 de espacio de población."
        ],
        unidadesUnicas: [
            { nombre: "Boyardo", img: "assets/img/unidades/boyar.webp" }
        ],
        imgMaravilla: "assets/img/maravilla/slavs.webp",
        nombreMaravilla: "Iglesia de San Jorge",
        dificultad: 4,
        stats: { militar: 80, economia: 100, defensa: 70, tecnologia: 80, naval: 40 },
        tecsUnicas: [
            { nombre: "Detinets", efecto: "sustituye por madera el 40 % del coste de piedra de castillos y atalayas.", img: "assets/img/unidades/tec.webp" },
            { nombre: "Druzhina", efecto: "la infantería inflige daño de arrollamiento", img: "assets/img/unidades/tec.webp" }
        ],
        estrategia: {
            pico: "Edad de los castillos/Edad Imperial",
            mapa: "Mapas Abiertos/Cerrados",
            composicion: "Boyardos/Alabarderos + Asedio + Monjes",
            rol: "Pocket"
        }
    },
    {
        id: 'bulgarians',
        nombre: "LOS BÚLGAROS",
        region: "Europa del Este",
        icono: "assets/img/CivIcon-bulg.webp",
        imgCastillo: "assets/img/castillos/bulg.webp",
        tipo: "Civilización de caballería e infanteria",
        audio: "assets/audio/bulg.mp3",
        bonos: [
            "Mejoras gratis para la línea de milicia.",
            " Tecnologías del herrero y del taller de maquinaria de asedio cuestan un 50 % menos de comida.",
            "Los centros urbanos cuestan un 50 % menos de piedra.",
            " Se puede construir el krepost en la Edad de los Castillos."
        ],
        unidadesUnicas: [
            { nombre: "Konnik", img: "assets/img/unidades/konni.webp" }
        ],
        imgMaravilla: "assets/img/maravilla/bulg.webp",
        nombreMaravilla: "Iglesia Redonda",
        dificultad: 4,
        stats: { militar: 80, economia: 70, defensa: 70, tecnologia: 80, naval: 40 },
        tecsUnicas: [
            { nombre: " Estribos", efecto: "la caballería ataca un 33 % más rápido.", img: "assets/img/unidades/tec.webp" },
            { nombre: "Bagains", efecto: "la línea de milicia gana +5 de armadura", img: "assets/img/unidades/tec.webp" }
        ],
        estrategia: {
            pico: "Edad de los castillos/Edad Imperial",
            mapa: "Mapas Abiertos/Cerrados",
            composicion: "Konniks/Alabarderos + Asedio",
            rol: "Pocket"
        }
    },
    {
        id: 'cumans',
        nombre: "LOS CUMANOS",
        region: "Asia Central",
        icono: "assets/img/CivIcon-cumans.webp",
        imgCastillo: "assets/img/castillos/cuman.webp",
        tipo: "Civilización de caballería y Arqueros montados",
        audio: "assets/audio/cuman.mp3",
        bonos: [
            "Se puede construir un centro urbano adicional en la Edad Feudal.",
            " Las unidades montadas se mueven un +5/10/15 % más rápido en la Edad Feudal/.",
            "Las galerías de tiro y los establos cuestan 75 menos de madera.",
            "Talleres de maquinaria de asedio y ariete disponibles en la Edad Feudal; arietes cubiertos disponibles en la Edad de los Castillos."
        ],
        unidadesUnicas: [
            { nombre: "Kipchak", img: "assets/img/unidades/kip.webp" }
        ],
        imgMaravilla: "assets/img/maravilla/cuman.webp",
        nombreMaravilla: "Fortaleza de Sarkel",
        dificultad: 4,
        stats: { militar: 80, economia: 100, defensa: 30, tecnologia: 80, naval: 40 },
        tecsUnicas: [
            { nombre: "Ganadería de la estepa", efecto: "caballería ligera y arqueros a caballo: creación un 100 % más rápida.", img: "assets/img/unidades/tec.webp" },
            { nombre: "Mercenarios cumanos", efecto: "todos los integrantes del equipo pueden generar 10 guerreros kipchak de élite gratis por castillo.", img: "assets/img/unidades/tec.webp" }
        ],
        estrategia: {
            pico: "Edad Imperial",
            mapa: "Mapas Abiertos/Cerrados",
            composicion: "Kipchak/Arqueros a caballo + Husares/Lanceros Esteparios + Asedio",
            rol: "Pocket"
        }
    },

    {
        id: 'georgians',
        nombre: "LOS GEORGIANOS",
        region: "Mediterraneo",
        icono: "assets/img/CivIcon-geor.webp",
        imgCastillo: "assets/img/castillos/geor.webp",
        tipo: "Civilización defensiva y caballería",
        audio: "assets/audio/geor.mp3",
        bonos: [
            "Comienza con un carro de mulas.",
            "Las unidades y los edificios reciben un 15 % menos de daño al luchar desde una elevación superior.",
            " La caballería regenera 2/8/14 PR por minuto en la Edad Feudal/Edad de los Castillos/Edad Imperial.",
            "Las iglesias fortificadas proporcionan un 10 % más de velocidad de trabajo a los aldeanos en un radio de 9 casillas"
        ],
        unidadesUnicas: [
            { nombre: "Monaspa", img: "assets/img/unidades/monas.webp" }
        ],
        imgMaravilla: "assets/img/maravilla/geor.webp",
        nombreMaravilla: "Fortaleza de Narikala",
        dificultad: 3,
        stats: { militar: 80, economia: 90, defensa: 90, tecnologia: 90, naval: 40 },
        tecsUnicas: [
            { nombre: "Torres esvanas", efecto: "las fortificaciones ganan +2 de ataque; la línea de atalayas inflige daño cuando se atraviesan.", img: "assets/img/unidades/tec.webp" },
            { nombre: "Caballería aznauri", efecto: "las unidades de caballería ocupan un 20 % menos de espacio de población.", img: "assets/img/unidades/tec.webp" }
        ],
        estrategia: {
            pico: "Edad de los castillos/Edad Imperial",
            mapa: "Mapas Abiertos/Cerrados",
            composicion: "Monaspa/Alabarderos/Arqueros a caballo + Asedio + Torres esvanas",
            rol: "Pocket"
        }
    },
    {
        id: 'armenian',
        nombre: "LOS ARMENIOS",
        region: "Mediterraneo",
        icono: "assets/img/CivIcon-arme.webp",
        imgCastillo: "assets/img/castillos/arme.webp",
        tipo: "Civilización de infanteria y naval",
        audio: "assets/audio/arme.mp3",
        bonos: [
            " Los carros de mulas cuestan un 25 % menos.",
            " Las tecnologías del carro de mulas son un 40 % más efectivas.",
            "Las mejoras de la línea de lanceros y milicia están disponibles una edad antes (excepto hombres de armas).",
            " La primera iglesia fortificada recibe una reliquia gratuita",
            "Las galeras y los dromones disparan un proyectil adicional"
        ],
        unidadesUnicas: [
            { nombre: "Arquero Compuesto", img: "assets/img/unidades/compo.webp" },
            { nombre: "Monje Guerrero", img: "assets/img/unidades/warrior.webp" }
        ],
        imgMaravilla: "assets/img/maravilla/arme.webp",
        nombreMaravilla: "Iglesia de San Gregorio el Iluminador",
        dificultad: 4,
        stats: { militar: 70, economia: 90, defensa: 80, tecnologia: 90, naval: 80 },
        tecsUnicas: [
            { nombre: " Flota de Cilicia", efecto: "aumenta el radio de explosión de los barcos de demolición un 20 %; las galeras y dromones tienen +1 de alcance.", img: "assets/img/unidades/tec.webp" },
            { nombre: "Relicarios ", efecto: "la infantería, a excepción de los lanceros, obtiene +30 PR; los sacerdotes guerreros curan un 100 % más rápido.", img: "assets/img/unidades/tec.webp" }
        ],
        estrategia: {
            pico: "Edad Imperial",
            mapa: "Mapas Abiertos/Cerrados",
            composicion: "Arquero compuesto/Campeones/Monjes Guerreros/Alabarderos + Asedio",
            rol: "Flank"
        }
    },
    {
        id: 'chinese',
        nombre: "LOS CHINOS",
        region: "Asia del Este",
        icono: "assets/img/CivIcon-Chinos.webp",
        imgCastillo: "assets/img/castillos/china.webp",
        tipo: "Civilización de Arqueros",
        audio: "assets/audio/china.mp3",
        bonos: [
            "Comienza con +3 aldeanos, -50 de madera, -200 de comida.",
            "Las tecnologías cuestan un 5/10/15 % menos en la Edad Feudal, la Edad de los Castillos y la Edad Imperial.",
            "Los centros urbanos ganan +7 de campo de visión y habilitan +15 de espacio de población.",
            "Los lanceros de fuego y los brulotes se mueven un +5/10 % más rápido en la Edad de los Castillos y la Edad Imperial"
        ],
        unidadesUnicas: [
            { nombre: "Chu Ko Nu", img: "assets/img/unidades/chuko.webp" }
        ],
        imgMaravilla: "assets/img/maravilla/china.webp",
        nombreMaravilla: "Templo del Cielo",
        dificultad: 3,
        stats: { militar: 80, economia: 90, defensa: 80, tecnologia: 90, naval: 70 },
        tecsUnicas: [
            { nombre: " La Gran Muralla", efecto: "las murallas, las líneas de atalayas y las torres de bombarda ganan un +30 % más de PR.", img: "assets/img/unidades/tec.webp" },
            { nombre: "Cohetería ", efecto: "los escorpiones, los carros de cohetes y los Lou Chuan ganan un +25 % de ataque; los Lou Chuan disparan cohetes", img: "assets/img/unidades/tec.webp" }
        ],
        estrategia: {
            pico: "Edad de los Castillos/Edad Imperial",
            mapa: "Mapas Abiertos/Cerrados",
            composicion: "Arbalestas/Chu Ko Nu/Alabarderos + Escorpiones",
            rol: "Flank/Pocket"
        }
    },
    {
        id: 'koreans',
        nombre: "LOS COREANOS",
        region: "Asia del Este",
        icono: "assets/img/CivIcon-kor.webp",
        imgCastillo: "assets/img/castillos/kor.webp",
        tipo: "Civilización naval y defensiva",
        audio: "assets/audio/kor.mp3",
        bonos: [
            " Los canteros trabajan un +20 % más rápido.",
            "Los soldados a distancia y la infantería cuestan un 50 % menos de madera.",
            " Mejoras de armadura para arquero y torres gratis (la torre de bombarda requiere Química).",
            " Los barcos de guerra cuestan un 20 % menos de madera."
        ],
        unidadesUnicas: [
            { nombre: "Carro de Guerra", img: "assets/img/unidades/war.webp" }
        ],
        imgMaravilla: "assets/img/maravilla/coreanos.webp",
        nombreMaravilla: "Templo de Haeinsa",
        dificultad: 4,
        stats: { militar: 75, economia: 75, defensa: 80, tecnologia: 80, naval: 80 },
        tecsUnicas: [
            { nombre: "Eupseong", efecto: "línea de atalayas: +2 de alcance.", img: "assets/img/unidades/tec.webp" },
            { nombre: " Shinkichon", efecto: "Carros cohete: +1 de alcance.", img: "assets/img/unidades/tec.webp" }
        ],
        estrategia: {
            pico: "Edad de los Castillos/Edad Imperial",
            mapa: "Mapas Abiertos/Cerrados",
            composicion: "Arbalestas/Lanceros de fuego/Carros cohete/Alabarderos + Carros de guerra",
            rol: "Flank"
        }
    },
    {
        id: 'indians',
        nombre: "LOS HINDOSTANOS",
        region: "India y el Sudeste Asiático",
        icono: "assets/img/CivIcon-ind.webp",
        imgCastillo: "assets/img/castillos/ind.webp",
        tipo: "Civilización de camellos y pólvora",
        audio: "assets/audio/ind.mp3",
        bonos: [
            "Los aldeanos cuestan un 8 %/13 %, 18 % y 23 % menos en la Alta Edad Media, Edad Feudal, Edad de los Castillos y Edad Imperial.",
            " Los jinetes de camello atacan un +20 % más rápidos.",
            "Unidades de pólvora: +1 de armadura/+1 de armadura antiperforación.",
            "Pueden construir caravasar en la Edad Imperial.",
            "Unidades a camello y de caballería ligera: +2 de ataque contra edificios."
        ],
        unidadesUnicas: [
            { nombre: "Gulam", img: "assets/img/unidades/gulam.webp" },
            { nombre: "Camello imperial", img: "assets/img/unidades/camel3.webp" }
        ],
        imgMaravilla: "assets/img/maravilla/ind.webp",
        nombreMaravilla: "Tumba de Humayun",
        dificultad: 3,
        stats: { militar: 85, economia: 85, defensa: 80, tecnologia: 80, naval: 80 },
        tecsUnicas: [
            { nombre: "Camino del Gran Tronco", efecto: "todos los ingresos de oro son un +10 % más rápidos; la tarifa de mercado se reduce al 10 %.", img: "assets/img/unidades/tec.webp" },
            { nombre: " Shatagni ", efecto: "artilleros manuales: +2 de alcance.", img: "assets/img/unidades/tec.webp" }
        ],
        estrategia: {
            pico: "Edad Imperial",
            mapa: "Mapas Abiertos/Cerrados",
            composicion: "Camello Imperial/Artillero manual/Gulam + Cañones",
            rol: "Flank/pocket"
        }
    },
    {
        id: 'persians',
        nombre: "LOS PERSAS",
        region: "Oriente Medio",
        icono: "assets/img/CivIcon-persa.webp",
        imgCastillo: "assets/img/castillos/persa.webp",
        tipo: "Civilización de caballería",
        audio: "assets/audio/persa.mp3",
        bonos: [
            " Empieza con +50 de madera y comida.",
            "Los centros urbanos y los muelles ganan un 100 % más de PR y trabajan un 5/10/15/20 % más rápido en la Edad Oscura, la Edad Feudal, la Edad de los Castillos, y la Edad Imperial.",
            "Tácticas de los partias disponibles en la Edad de los Castillos.",
            "Puedes construir caravasares en la Edad Imperial.",
            "Los caballeros ganan +2 de ataque contra los soldados a distancia"
        ],
        unidadesUnicas: [
            { nombre: "Elefante de Guerra", img: "assets/img/unidades/warele.webp" },
            { nombre: "Savar", img: "assets/img/unidades/savar.webp" }
        ],
        imgMaravilla: "assets/img/maravilla/persa.webp",
        nombreMaravilla: "Palacio de Persépolis",
        dificultad: 2,
        stats: { militar: 85, economia: 95, defensa: 85, tecnologia: 80, naval: 80 },
        tecsUnicas: [
            { nombre: "Kamandaran", efecto: "el coste de oro de los arqueros se reemplaza por un coste adicional de madera.", img: "assets/img/unidades/tec.webp" },
            { nombre: "Ciudadelas", efecto: "los castillos infligen +4 de ataque, +3 contra arietes, +3 contra infantería y reciben un 25 % menos de daño adicional.", img: "assets/img/unidades/tec.webp" }
        ],
        estrategia: {
            pico: "Edad de los Castillos/Edad Imperial",
            mapa: "Mapas Abiertos/Cerrados",
            composicion: "Arqueros a caballo/Caballeria/Arqueros + Asedio",
            rol: "Pocket"
        }
    },
    {
        id: 'mayans',
        nombre: "LOS MAYAS",
        region: "America",
        icono: "assets/img/CivIcon-maya.webp",
        imgCastillo: "assets/img/castillos/maya.webp",
        tipo: "Civilización de arqueros a pie",
        audio: "assets/audio/maya.mp3",
        bonos: [
            "Comienzan con 1 aldeano más, pero con 50 menos de comida.",
            " Los recursos duran un 15 % más.",
            "Los arqueros a pie cuestan un 10 % menos en la Edad Feudal, 20 % menos en la Edad de los Castillos y 30 % menos en la Edad Imperial."
        ],
        unidadesUnicas: [
            { nombre: "Arquero de Plumas", img: "assets/img/unidades/plume.webp" }
        ],
        imgMaravilla: "assets/img/maravilla/maya.webp",
        nombreMaravilla: "Templo del gran jaguar",
        dificultad: 3,
        stats: { militar: 85, economia: 95, defensa: 85, tecnologia: 80, naval: 80 },
        tecsUnicas: [
            { nombre: "Lanzadores de hul 'che", efecto: "los guerrilleros disparan un proyectil adicional.", img: "assets/img/unidades/tec.webp" },
            { nombre: "El Dorado", efecto: "40 PR más para guerreros águila.", img: "assets/img/unidades/tec.webp" }
        ],
        estrategia: {
            pico: "Edad de los Castillos/Edad Imperial",
            mapa: "Mapas Abiertos/Cerrados",
            composicion: "Arqueros a pie/Arquero de Plumas/Guerreros águila + Asedio",
            rol: "Flank"
        }
    },

    {
        id: 'inca',
        nombre: "LOS INCAS",
        region: "America",
        icono: "assets/img/CivIcon-inca.webp",
        imgCastillo: "assets/img/castillos/inca.webp",
        tipo: "Civilización de infantería",
        audio: "assets/audio/inca.mp3",
        bonos: [
            " Las casas proporcionan +5 de espacio de población.",
            "El coste de piedra de los edificios se reduce un 15 %.",
            " El coste de comida de las unidades militares se reduce un 10 %/15 %/20 % y 25 % en la Edad Oscura/Edad Feudal/Edad de los Castillos y Edad Imperial.",
            " Los aldeanos recibirán mejoras de infantería de la herrería a partir de la Edad de los Castillos"
        ],
        unidadesUnicas: [
            { nombre: "Kamayuk", img: "assets/img/unidades/kama.webp" }
        ],
        imgMaravilla: "assets/img/maravilla/inca.webp",
        nombreMaravilla: "Templo del sol",
        dificultad: 3,
        stats: { militar: 85, economia: 85, defensa: 85, tecnologia: 80, naval: 80 },
        tecsUnicas: [
            { nombre: "Huaracas", efecto: "(los guerrilleros y los soldados con honda no tienen alcance mínimo; los soldados con honda ganan +1 de ataque.", img: "assets/img/unidades/tec.webp" },
            { nombre: "Escudos de tela", efecto: "los kamayuks, los soldados con honda y los guerreros águila ganan +1 de armadura y +2 de armadura perforante.", img: "assets/img/unidades/tec.webp" }
        ],
        estrategia: {
            pico: "Edad de los Castillos/Edad Imperial",
            mapa: "Mapas Abiertos/Cerrados",
            composicion: "Arqueros a pie/Kamayuk/Hondero + Asedio",
            rol: "Flank"
        }
    },
    {
        id: 'bengalis',
        nombre: "LOS BENGALIS",
        region: "india y el Sudeste Asiático",
        icono: "assets/img/CivIcon-beng.webp",
        imgCastillo: "assets/img/castillos/beng.webp",
        tipo: "Civilización de Elefantes y monjes",
        audio: "assets/audio/beng.mp3",
        bonos: [
            "Los centros urbanos generan 2 aldeanos cuando se avanza a la siguiente edad.",
            "La caballería cuenta con +2 de ataque contra los guerrilleros.",
            "Las unidades en elefante reciben un 25 % menos de daño adicional y son más resistentes a la conversión.",
            "Los monjes obtienen +3 de armadura cuerpo a cuerpo/+3 de armadura antiperforación.",
            "Los barcos regeneran 15 PR por minuto"
        ],
        unidadesUnicas: [
            { nombre: "Ratha", img: "assets/img/unidades/ratha.webp" }
        ],
        imgMaravilla: "assets/img/maravilla/beng.webp",
        nombreMaravilla: "Somapura Mahavihara",
        dificultad: 5,
        stats: { militar: 75, economia: 100, defensa: 85, tecnologia: 80, naval: 95 },
        tecsUnicas: [
            { nombre: "Paiks", efecto: "los rathas y las unidades en elefante atacan un 20 % más rápido.", img: "assets/img/unidades/tec.webp" },
            { nombre: "Mahāyāna ", efecto: "los aldeanos y los monjes ocupan un 10 % menos de espacio de población.", img: "assets/img/unidades/tec.webp" }
        ],
        estrategia: {
            pico: "Edad Imperial",
            mapa: "Mapas Cerrados",
            composicion: "Ratha/Elefanque arquero/Elefante de Combate/Alabarderos + Asedio",
            rol: "Flank/Pocket"
        }
    },
    {
        id: 'Tartaros',
        nombre: "LOS TARTAROS",
        region: "Asia Central",
        icono: "assets/img/CivIcon-tart.webp",
        imgCastillo: "assets/img/castillos/tart.webp",
        tipo: "Civilización de caballería y arqueros montados",
        audio: "assets/audio/tart.mp3",
        bonos: [
            "El ganado dura un 50 % más.",
            "Las unidades infligen un 25 % más de daño cuando luchan desde una posición elevada.",
            "Los nuevos centros urbanos generan 2 ovejas a partir de la Edad de los Castillos.",
            "Tácticas de los partias y dactileras gratis.",
        ],
        unidadesUnicas: [
            { nombre: "Keshik", img: "assets/img/unidades/kesh.webp" },
            { nombre: "Camello Flameante", img: "assets/img/unidades/fla.webp" }
        ],
        imgMaravilla: "assets/img/maravilla/tart.webp",
        nombreMaravilla: "Observatorio de Ulugh Beg",
        dificultad: 3,
        stats: { militar: 90, economia: 80, defensa: 80, tecnologia: 80, naval: 70 },
        tecsUnicas: [
            { nombre: "Armadura de seda", efecto: "(la caballería ligera y los arqueros a caballo reciben +1 de armadura cuerpo a cuerpo/+1 de armadura antiperforación.", img: "assets/img/unidades/tec.webp" },
            { nombre: "Tácticas de asedio timúridas", efecto: "trebuchets: +2 de alcance.", img: "assets/img/unidades/tec.webp" }
        ],
        estrategia: {
            pico: "Edad de los Castillos/Edad Imperial",
            mapa: "Mapas Cerrados",
            composicion: "Arqueros a caballo/Keshik/Husares + Lanzapiedras",
            rol: "Pocket"
        }
    },
    {
        id: 'bereberes',
        nombre: "LOS BEREBERES",
        region: "Africa",
        icono: "assets/img/CivIcon-berb.webp",
        imgCastillo: "assets/img/castillos/berb.webp",
        tipo: "Civilización naval y de caballería",
        audio: "assets/audio/berb.mp3",
        bonos: [
            "Los aldeanos se mueven un 5 % más rápido en la Edad Oscura y un 10 % más rápido a partir de la Edad Feudal.",
            "Las unidades de los establos cuestan un 15 % menos en la Edad de los Castillos y un 20 % menos en la Edad Imperial.",
            "Los barcos se mueven un 10 % más rápido.",
        ],
        unidadesUnicas: [
            { nombre: "Arquero en camello", img: "assets/img/unidades/camelar.webp" },
            { nombre: "Escaramuzador Zenete", img: "assets/img/unidades/zen.webp" }
        ],
        imgMaravilla: "assets/img/maravilla/berb.webp",
        nombreMaravilla: "Torre de Hassan",
        dificultad: 2,
        stats: { militar: 80, economia: 80, defensa: 80, tecnologia: 80, naval: 95 },
        tecsUnicas: [
            { nombre: "Alcazabas", efecto: "los castillos de todo el equipo funcionan un 25 % más rápido.", img: "assets/img/unidades/tec.webp" },
            { nombre: "Camellos magrebíes", efecto: "las unidades a camello regeneran 15 PR por minuto.", img: "assets/img/unidades/tec.webp" }
        ],
        estrategia: {
            pico: "Edad de los Castillos/Edad Imperial",
            mapa: "Mapas Cerrados",
            composicion: "Caballeria/Arquero a Camello + Asedio",
            rol: "Pocket"
        }
    },
    {
        id: 'birmanos',
        nombre: "LOS BIRMANOS",
        region: "India y el Sudeste Asiático",
        icono: "assets/img/CivIcon-bir.webp",
        imgCastillo: "assets/img/castillos/bir.webp",
        tipo: "Civilización de infantería y artillería",
        audio: "assets/audio/bir.mp3",
        bonos: [
            "Tecnologías de campamento maderero gratis.",
            "La infantería obtiene +1/2/3 de ataque en las edades Feudal/de los Castillos/Imperial.",
            "Elefantes de combate: +1 de armadura cuerpo a cuerpo/+1 de armadura antiperforación.",
            "Las tecnologías del monasterio cuestan un 50 % menos.",
        ],
        unidadesUnicas: [
            { nombre: "Arambai", img: "assets/img/unidades/aram.webp" },
        ],
        imgMaravilla: "assets/img/maravilla/bir.webp",
        nombreMaravilla: "Pagoda Shwezigon",
        dificultad: 5,
        stats: { militar: 80, economia: 90, defensa: 80, tecnologia: 80, naval: 70 },
        tecsUnicas: [
            { nombre: "Caballería manipur", efecto: "la caballería cuenta con +4 de ataque contra soldados a distancia.", img: "assets/img/unidades/tec.webp" },
            { nombre: "Howdah", efecto: "los elefantes de combate ganan +1 de armadura cuerpo a cuerpo/+1 de armadura antiperforación.", img: "assets/img/unidades/tec.webp" }
        ],
        estrategia: {
            pico: "Edad de los Castillos/Edad Imperial",
            mapa: "Mapas Cerrados",
            composicion: "Arambai + Husares + Alabardas/Campeones/Elefantes de combate + Asedio",
            rol: "Flank/Pocket"
        }
    },
    {
        id: 'bizantinos',
        nombre: "LOS BIZANTINOS",
        region: "Mediterraneo",
        icono: "assets/img/CivIcon-biza.webp",
        imgCastillo: "assets/img/castillos/biza.webp",
        tipo: "Civilización defensiva",
        audio: "assets/audio/biza.mp3",
        bonos: [
            " Los edificios ganan un 10/20/30/40 % más de PR en la Edad Oscura, la Edad Feudal, la Edad de los Castillos y la Edad Imperial, respectivamente.",
            " Los jinetes de camello, los guerrilleros y los lanceros cuestan un +25 % menos.",
            "Torres de vigilancia y guardia de la ciudad gratis.",
            " Avanzar a la Edad Imperial cuesta un 33 % menos.",
            "Los brulotes y los dromones atacan un 25 % más rápido",
        ],
        unidadesUnicas: [
            { nombre: "Catafracta", img: "assets/img/unidades/cata.webp" },
        ],
        imgMaravilla: "assets/img/maravilla/biza.webp",
        nombreMaravilla: "basilica de Santa Sofía",
        dificultad: 2,
        stats: { militar: 80, economia: 80, defensa: 100, tecnologia: 80, naval: 80 },
        tecsUnicas: [
            { nombre: " Fuego griego", efecto: "los barcos incendiarios ganan +1 de alcance y las torres de bombardeo y los dromones ganan radio de explosión.", img: "assets/img/unidades/tec.webp" },
            { nombre: "Logística", efecto: "las catafractas infligen daño de arrollamiento, ganan +6 de ataque contra la infantería).", img: "assets/img/unidades/tec.webp" }
        ],
        estrategia: {
            pico: "Edad de los Castillos/Edad Imperial",
            mapa: "Mapas Cerrados",
            composicion: "Catafractas/Guerrilla/Alabardas + Asedio",
            rol: "Flank"
        }
    },
    {
        id: 'borgoñeses',
        nombre: "LOS BORGONES",
        region: "Europa Occidental",
        icono: "assets/img/CivIcon-borgo.webp",
        imgCastillo: "assets/img/castillos/borgo.webp",
        tipo: "Civilización de Caballería y Polvora",
        audio: "assets/audio/borgo.mp3",
        bonos: [
            "Las mejoras económicas están disponibles una edad antes y cuestan un 33 % menos de comida.",
            "Las tecnologías de los establos cuestan un 50 % menos.",
            "Mejora a caballeros disponible en la Edad de los Castillos.",
            "Unidades de pólvora: +25 % más de ataque.",
        ],
        unidadesUnicas: [
            { nombre: "Coustiller", img: "assets/img/unidades/cous.webp" },
            { nombre: "Milicia Flamenca", img: "assets/img/unidades/flemi.webp" },
        ],
        imgMaravilla: "assets/img/maravilla/borgo.webp",
        nombreMaravilla: "Ayuntamiento de Bruselas",
        dificultad: 5,
        stats: { militar: 80, economia: 100, defensa: 80, tecnologia: 100, naval: 70 },
        tecsUnicas: [
            { nombre: "Viñedos de Borgoña ", efecto: "los agricultores generan oro gradualmente además de comida.", img: "assets/img/unidades/tec.webp" },
            { nombre: "Revolución flamenca", efecto: "todos los aldeanos existentes se transforman en milicia flamenca.", img: "assets/img/unidades/tec.webp" }
        ],
        estrategia: {
            pico: "Edad Imperial",
            mapa: "Mapas Cerrados",
            composicion: "Paladin/Coustiller/Alabardas/Artilleros Manuales + Cañones",
            rol: "Pocket"
        }
    },
    {
        id: 'dravidicos',
        nombre: "LOS DRÁVIDICOS",
        region: "India y el Sudeste Asiático",
        icono: "assets/img/CivIcon-dravi.webp",
        imgCastillo: "assets/img/castillos/dravi.webp",
        tipo: "Civilización de Infantería y Arqueros",
        audio: "assets/audio/dravi.mp3",
        bonos: [
            "Los pescadores y buques de pesca pueden transportar +15.",
            "Recibes +200 de madera al avanzar a la siguiente edad.",
            "Los guerrilleros y los arqueros sobre elefantes atacan un 25 % más rápido.",
            " Las tecnologías de los cuarteles cuestan un 50 % menos.",
            "Las armas de asedio cuestan un 33 % menos de madera"
        ],
        unidadesUnicas: [
            { nombre: "Urumi", img: "assets/img/unidades/uru.webp" },
        ],
        imgMaravilla: "assets/img/maravilla/dravi.webp",
        nombreMaravilla: "Templo de Kailasa",
        dificultad: 5,
        stats: { militar: 90, economia: 80, defensa: 80, tecnologia: 80, naval: 90 },
        tecsUnicas: [
            { nombre: "Cuerpo de médicos", efecto: "las unidades en elefante regeneran 30 PR por minuto.", img: "assets/img/unidades/tec.webp" },
            { nombre: "Acero wootz ", efecto: "los ataques de infantería y caballería ignoran la armadura.", img: "assets/img/unidades/tec.webp" }
        ],
        estrategia: {
            pico: "Edad Imperial",
            mapa: "Mapas Cerrados",
            composicion: "Elefante arquero/Infanteria/Urumi + Asedio",
            rol: "Flank/Pocket"
        }
    },
    {
        id: 'etiopes',
        nombre: "LOS ETIOPES",
        region: "Africa",
        icono: "assets/img/CivIcon-etiop.webp",
        imgCastillo: "assets/img/castillos/etiop.webp",
        tipo: "Civilización de Arqueros",
        audio: "assets/audio/etiop.mp3",
        bonos: [
            "Reciben +100 de oro y +100 de comida al avanzar a la siguiente edad.",
            "Los arqueros atacan un 18 % más rápido.",
            "Mejoras de piquero gratis.",
        ],
        unidadesUnicas: [
            { nombre: "Shotelai", img: "assets/img/unidades/shotel.webp" },
        ],
        imgMaravilla: "assets/img/maravilla/etiop.webp",
        nombreMaravilla: "Biet medhane alem",
        dificultad: 3,
        stats: { militar: 90, economia: 80, defensa: 80, tecnologia: 100, naval: 70 },
        tecsUnicas: [
            { nombre: "Herederos regios", efecto: "los shotelai y las unidades a camello reciben -3 de daño de unidades montadas.", img: "assets/img/unidades/tec.webp" },
            { nombre: "Mecanismos de torsión", efecto: "mayor área de daño para unidades del taller de maquinaria de asedio.", img: "assets/img/unidades/tec.webp" }
        ],
        estrategia: {
            pico: "Edad de los Castillos/Edad Imperial",
            mapa: "Mapas Abiertos/Cerrados",
            composicion: "Arqueros/Alabardas/Shotelai + Asedio",
            rol: "Flank/Pocket"
        }
    },
    {
        id: 'gurjaras',
        nombre: "LOS GURJARAS",
        region: "India y el Sudeste Asiático",
        icono: "assets/img/CivIcon-gurjar.webp",
        imgCastillo: "assets/img/castillos/gurjar.webp",
        tipo: "Civilización de camellos y caballería",
        audio: "assets/audio/gurjar.mp3",
        bonos: [
            "Empieza con 2 arbustos.",
            " Se puede guarnecer ganado en el molino para producir comida de forma pasiva.",
            "Las unidades montadas infligen un 20/30/40 % más de daño en las edades Feudal/de los Castillos/Imperial.",
            " Los barcos pesqueros pueden guarnecerse en los muelles para protegerse.",
        ],
        unidadesUnicas: [
            { nombre: "Chakram", img: "assets/img/unidades/chakram.webp" },
            { nombre: "Jinete de Shririvamsha", img: "assets/img/unidades/shri.webp" },
            { nombre: "Explorador a camello", img: "assets/img/unidades/camel0.webp" },
        ],
        imgMaravilla: "assets/img/maravilla/gurjar.webp",
        nombreMaravilla: "Templo de Somnath",
        dificultad: 5,
        stats: { militar: 90, economia: 80, defensa: 80, tecnologia: 80, naval: 80 },
        tecsUnicas: [
            { nombre: " Chatrias", efecto: "las unidades militares cuestan un -25 % menos de comida.", img: "assets/img/unidades/tec.webp" },
            { nombre: "Guardas fronterizos", efecto: "+4 de armadura cuerpo a cuerpo a los jinetes de camello y arqueros sobre elefante.", img: "assets/img/unidades/tec.webp" }
        ],
        estrategia: {
            pico: "Edad de los Castillos/Edad Imperial",
            mapa: "Mapas Cerrados",
            composicion: "Camellos/Jinetes de Shri/Chakram + Asedio",
            rol: "Pocket"
        }
    },
    {
        id: 'italianos',
        nombre: "LOS ITALIANOS",
        region: "Mediterraneo",
        icono: "assets/img/CivIcon-Ita.webp",
        imgCastillo: "assets/img/castillos/ita.webp",
        tipo: "Civilización naval y de arqueros",
        audio: "assets/audio/ita.mp3",
        bonos: [
            "Avanzar a la siguiente edad cuesta un 15 % menos.",
            "Los arqueros a pie y los condotieri obtienen +1 de armadura cuerpo a cuerpo y +1 de armadura antiperforación.",
            "Las tecnologías de los muelles y de la universidad cuestan un 33 % menos.",
            "Las unidades de pólvora cuestan un 20 % menos.",
            "Los buques de pesca cuestan un 15 % menos.",
        ],
        unidadesUnicas: [
            { nombre: "Ballestero Genoves", img: "assets/img/unidades/geno.webp" },
            { nombre: "Condotiero", img: "assets/img/unidades/condo.webp" },
        ],
        imgMaravilla: "assets/img/maravilla/ita.webp",
        nombreMaravilla: "Catedral de San lorenzo",
        dificultad: 2,
        stats: { militar: 90, economia: 85, defensa: 80, tecnologia: 100, naval: 100 },
        tecsUnicas: [
            { nombre: "Ruta de la seda", efecto: "las unidades mercantes cuestan un 50 % menos.", img: "assets/img/unidades/tec.webp" },
            { nombre: "Pirotecnia", efecto: "los artilleros manuales infligen un 15 % más de daño perforante y son más precisos.", img: "assets/img/unidades/tec.webp" }
        ],
        estrategia: {
            pico: "Edad de los Castillos/Edad Imperial",
            mapa: "Mapas Abiertos/Cerrados",
            composicion: "Arqueros/Ballesero Genoves/Condotiero/Artilleros Manuales + Cañones",
            rol: "Flank"
        }
    },
    {
        id: 'jemeres',
        nombre: "LOS JEMERES",
        region: "India y el Sudeste Asiático",
        icono: "assets/img/CivIcon-jeme.webp",
        imgCastillo: "assets/img/castillos/jeme.webp",
        tipo: "Civilización de asedio y elefantes",
        audio: "assets/audio/jeme.mp3",
        bonos: [
            "No se necesitan edificios para avanzar a la siguiente edad o para desbloquear otros edificios.",
            "Los granjeros no necesitan molinos o centros urbanos para depositar comida.",
            "Los aldeanos pueden guarnecerse en casas.",
            "Los elefantes de combate se mueven un +10 % más rápido.",
        ],
        unidadesUnicas: [
            { nombre: "Elefante con balista", img: "assets/img/unidades/elek.webp" },
        ],
        imgMaravilla: "assets/img/maravilla/jeme.webp",
        nombreMaravilla: "Angkor Wat",
        dificultad: 3,
        stats: { militar: 90, economia: 100, defensa: 80, tecnologia: 80, naval: 80 },
        tecsUnicas: [
            { nombre: " Colmillos de acero.", efecto: "+3 de ataque en elefantes de combate.", img: "assets/img/unidades/tec.webp" },
            { nombre: "Ballesta doble", efecto: "los elefantes con balistas y los escorpiones disparan un proyectil adicional.", img: "assets/img/unidades/tec.webp" }
        ],
        estrategia: {
            pico: "Edad de los Castillos/Edad Imperial",
            mapa: "Mapas Abiertos/Cerrados",
            composicion: "Elefantes/Caballeria/Alabarderos + Escorpiones",
            rol: "Flank/Pocket"
        }
    },
    {
        id: 'kitans',
        nombre: "LOS KITANS",
        region: "Asia del Este",
        icono: "assets/img/CivIcon-kitan.webp",
        imgCastillo: "assets/img/castillos/kitan.webp",
        tipo: "Civilización de infantería y caballería",
        audio: "assets/audio/kitan.mp3",
        bonos: [
            "Las pasturas reemplazan a las granjas.",
            "Los efectos de mejora de los ataques cuerpo a cuerpo se duplican.",
            "Los guerrilleros, lanceros y caballería de exploración entrenan y se mejoran un +25 % más rápido.",
            "Mejora del arquero de caballería pesada disponible en la Edad de los Castillos y cuesta un 50 % menos.",
        ],
        unidadesUnicas: [
            { nombre: "Liao Dao", img: "assets/img/unidades/liao.webp" },
            { nombre: "Trebuchet Montado", img: "assets/img/unidades/trebm.webp" },
        ],
        imgMaravilla: "assets/img/maravilla/kitan.webp",
        nombreMaravilla: "Pagoda del templo forgong",
        dificultad: 4,
        stats: { militar: 100, economia: 100, defensa: 80, tecnologia: 80, naval: 80 },
        tecsUnicas: [
            { nombre: "Armadura laminada.", efecto: "la infantería y los guerrilleros devuelven un 25 % del daño cuerpo a cuerpo al atacante.", img: "assets/img/unidades/tec.webp" },
            { nombre: "Caballeria Ordo", efecto: "la caballería regenera puntos de resistencia en combate.", img: "assets/img/unidades/tec.webp" }
        ],
        estrategia: {
            pico: "Edad feudal/Edad de los Castillos/Edad Imperial",
            mapa: "Mapas Abiertos",
            composicion: "Husares/Lanceros Esteparios/Arqueros a caballo/Liao Dao/Lancero de fuego + Asedio",
            rol: "Pocket"
        }
    },
    {
        id: 'malayos',
        nombre: "LOS MALAYOS",
        region: "India y el Sudeste Asiático",
        icono: "assets/img/CivIcon-malayo.webp",
        imgCastillo: "assets/img/castillos/malayo.webp",
        tipo: "Civilización naval y de infantería",
        audio: "assets/audio/malayo.mp3",
        bonos: [
            "Avanzas a la siguiente edad un 66 % más rápido.",
            "Mejoras de armadura de infantería gratuitas.",
            "Los elefantes de combate cuestan un 25/35 % menos en la Edad de los Castillos y en la Edad Imperial.",
            "Las trampas para peces cuestan un 33 % menos y proporcionan un 200 % más de comida.",
        ],
        unidadesUnicas: [
            { nombre: "Karambit", img: "assets/img/unidades/karam.webp" },
        ],
        imgMaravilla: "assets/img/maravilla/malayo.webp",
        nombreMaravilla: "Kalasam",
        dificultad: 5,
        stats: { militar: 90, economia: 90, defensa: 80, tecnologia: 80, naval: 100 },
        tecsUnicas: [
            { nombre: "Talasocracia.", efecto: "mejora los muelles a puertos.", img: "assets/img/unidades/tec.webp" },
            { nombre: "Leva en masa ", efecto: "la milicia y subsiguientes dejan de costar oro y cuestan comida adicional.", img: "assets/img/unidades/tec.webp" }
        ],
        estrategia: {
            pico: "Edad de los Castillos/Edad Imperial",
            mapa: "Mapas Abiertos/Cerrados/Hibridos",
            composicion: "Arbalesta/Elefantes de combate/Karambits/Alabarderos + Asedio",
            rol: "Flank/Pocket"
        }
    },
    {
        id: 'malies',
        nombre: "LOS MALÍES",
        region: "Africa",
        icono: "assets/img/CivIcon-mali.webp",
        imgCastillo: "assets/img/castillos/mali.webp",
        tipo: "Civilización de infantería y caballería",
        audio: "assets/audio/mali.mp3",
        bonos: [
            " Los edificios cuestan un 15 % menos de madera.",
            "Los aldeanos depositan un 10 % más de oro.",
            "Las unidades de los cuarteles obtienen +1 de armadura antiperforación en la Edad Feudal,+2 en la Edad de los Castillos y +3 en la Edad Imperial.",
        ],
        unidadesUnicas: [
            { nombre: "Guardiana de Gbeto", img: "assets/img/unidades/gbeto.webp" },
        ],
        imgMaravilla: "assets/img/maravilla/mali.webp",
        nombreMaravilla: "Gran mezquita de Djenné",
        dificultad: 3,
        stats: { militar: 90, economia: 90, defensa: 80, tecnologia: 80, naval: 70 },
        tecsUnicas: [
            { nombre: "Gran asamblea.", efecto: "los centros urbanos disparan flechas sin unidades guarnecidas.", img: "assets/img/unidades/tec.webp" },
            { nombre: "Farimba ", efecto: "+5 de ataque para la caballería.", img: "assets/img/unidades/tec.webp" }
        ],
        estrategia: {
            pico: "Edad de los Castillos/Edad Imperial",
            mapa: "Mapas Abiertos/Cerrados/Hibridos",
            composicion: "Caballeria/Infanteria/Guardianas de Gbeto + Asedio",
            rol: "Flank/Pocket"
        }
    },
    {
        id: 'portigueses',
        nombre: "LOS PORTUGUESES",
        region: "Mediterraneo",
        icono: "assets/img/CivIcon-Portu.webp",
        imgCastillo: "assets/img/castillos/portu.webp",
        tipo: "Civilización naval y de pólvora",
        audio: "assets/audio/portu.mp3",
        bonos: [
            " Los recolectores generan madera además de comida.",
            "Todas las unidades cuestan un 20 % menos de oro.",
            "Pueden construir factorías en la Edad Imperial.",
            "Los barcos tienen un 10 % más de PR.",
        ],
        unidadesUnicas: [
            { nombre: "Cañón de salvas", img: "assets/img/unidades/organ.webp" },
        ],
        imgMaravilla: "assets/img/maravilla/portu.webp",
        nombreMaravilla: "Torre de la Almazara",

        tecsUnicas: [
            { nombre: " Carracas.", efecto: "+1 de armadura y +1 de armadura antiperforación para barcos.", img: "assets/img/unidades/tec.webp" },
            { nombre: " Arcabuz", efecto: "las unidades de pólvora son más precisas contra objetivos en movimiento", img: "assets/img/unidades/tec.webp" }
        ]
    },
    {
        id: 'romanos',
        nombre: "LOS ROMANOS",
        region: "Mediterraneo",
        icono: "assets/img/CivIcon-Roma.webp",
        imgCastillo: "assets/img/castillos/roma.webp",
        tipo: "Civilización de infantería",
        audio: "assets/audio/roma.mp3",
        bonos: [
            "Los aldeanos recolectan, construyen y reparan un +5 % más rápido.",
            "Los efectos de mejora de armadura de infantería se duplican.",
            " Los escorpiones cuestan un 60 % menos de oro.",
            "La línea de galeras y dromones obtiene +1 de armadura cuerpo a cuerpo y +1 de armadura antiperforación.",
        ],
        unidadesUnicas: [
            { nombre: "Centurion", img: "assets/img/unidades/centu.webp" },
            { nombre: "Legionario", img: "assets/img/unidades/legi.webp" },
        ],
        imgMaravilla: "assets/img/maravilla/roma.webp",
        nombreMaravilla: "Coliseo",
        tecsUnicas: [
            { nombre: " Balistas.", efecto: "los escorpiones atacan un +33 % más rápido; la línea de galeras obtienen +2 de ataque.", img: "assets/img/unidades/tec.webp" },
            { nombre: "Comitatenses", efecto: "las líneas de milicia y caballeros y los centuriones entrenan un +50 % más rápido y reciben un ataque de carga", img: "assets/img/unidades/tec.webp" }
        ]
    },
    {
        id: 'shu',
        nombre: "LOS SHU",
        region: "Asia del Este",
        icono: "assets/img/CivIcon-Shu.webp",
        imgCastillo: "assets/img/castillos/shu.webp",
        tipo: "Civilización de arqueros y asedio",
        audio: "assets/audio/shu.mp3",
        bonos: [
            "Los leñadores generan comida adicional, además de madera.",
            "Las tecnologías de los arqueros de la galería de tiro con arco y del herrero cuestan un 25 % menos.",
            "Las armas de asedio y los barcos de guerra de asedio se mueven un 10 % o 15 % más rápido en la Edad de los Castillos o la Edad Imperial.",
        ],
        unidadesUnicas: [
            { nombre: "Guarda de Pluma Blanca", img: "assets/img/unidades/guard.webp" },
            { nombre: "Carro de Guerra", img: "assets/img/unidades/chario.webp" },
        ],
        imgMaravilla: "assets/img/maravilla/shu.webp",
        nombreMaravilla: "Wuhou templo de chengdu",
        tecsUnicas: [
            { nombre: "Arsenal de la serpiente enroscada.", efecto: "la línea de lanceros y los guardias de la pluma blanca obtienen PR adicionales cuando están cerca los unos de los otros.", img: "assets/img/unidades/tec.webp" },
            { nombre: " Cargador ", efecto: "la línea de arqueros, los carros de guerra y las unidades de Lou Chuan disparan proyectiles adicionales", img: "assets/img/unidades/tec.webp" }
        ]
    },
    {
        id: 'sicilianos',
        nombre: "LOS SICILIANOS",
        region: "Mediterraneo",
        icono: "assets/img/CivIcon-sici.webp",
        imgCastillo: "assets/img/castillos/sici.webp",
        tipo: "Civilización de infantería y caballería",
        audio: "assets/audio/sici.mp3",
        bonos: [
            " Se empieza con +100 de piedra.",
            " Las mejoras de las granjas proporcionan un 125 % de comida adicional.",
            " Los soldados reciben un 40 % menos de daño.",
            "  La torre del homenaje se puede construir en la Edad Oscura y reemplaza la línea de atalayas.",
            "Las fortificaciones se construyen un 50 % más rápido y los centros urbanos un 100 % más rápido.",
        ],
        unidadesUnicas: [
            { nombre: "Sargento", img: "assets/img/unidades/serje.webp" },
        ],
        imgMaravilla: "assets/img/maravilla/sici.webp",
        nombreMaravilla: "Templo de San Juan de la Mora",
        tecsUnicas: [
            { nombre: "Primera cruzada .", efecto: "hasta 5 centros urbanos generan un grupo de 5 serjeants, unidades más resistentes a la conversión.", img: "assets/img/unidades/tec.webp" },
            { nombre: " Cota de malla ", efecto: "la línea de caballeros obtiene +1 de armadura cuerpo a cuerpo y +2 de armadura antiperforación.", img: "assets/img/unidades/tec.webp" }
        ]
    },
    {
        id: 'sarracenos',
        nombre: "LOS SARRACENOS",
        region: "Oriente Medio",
        icono: "assets/img/CivIcon-sarra.webp",
        imgCastillo: "assets/img/castillos/sarra.webp",
        tipo: "Civilización naval y de camellos",
        audio: "assets/audio/sarra.mp3",
        bonos: [
            "La tarifa de mercado cuesta solo un 5 %; los mercados cuestan 100 menos de madera.",
            "Las unidades a camello ganan un 25 % más de PR.",
            " La línea de galeras ataca un 25 % más rápido.",
            "  Los barcos de transporte ganan un 100 % más de PR y 20 más de capacidad.",
        ],
        unidadesUnicas: [
            { nombre: "Mameluco", img: "assets/img/unidades/mame.webp" },
        ],
        imgMaravilla: "assets/img/maravilla/sarra.webp",
        nombreMaravilla: "Mezquita de samarra",
        tecsUnicas: [
            { nombre: "Bimaristán.", efecto: "los monjes curan a varias unidades cercanas de forma automática.", img: "assets/img/unidades/tec.webp" },
            { nombre: " Contrapesos", efecto: "los trebuchets y los mangoneles ganan un +15 % más de ataque.", img: "assets/img/unidades/tec.webp" }
        ]
    },
    {
        id: 'turcos',
        nombre: "LOS TURCOS",
        region: "Oriente Medio",
        icono: "assets/img/CivIcon-turco.webp",
        imgCastillo: "assets/img/castillos/turco.webp",
        tipo: "Civilización de pólvora",
        audio: "assets/audio/turco.mp3",
        bonos: [
            " Los mineros de oro trabajan un 25 % más rápido.",
            "La caballería de exploración obtiene +1 de armadura antiperforación y mejoras gratis.",
            "Química gratis; las tecnologías de la pólvora cuestan un 50 % menos.",
            "Las unidades de pólvora obtienen un 25 % más de PR.",
        ],
        unidadesUnicas: [
            { nombre: "Jenizaro", img: "assets/img/unidades/jeni.webp" },
        ],
        imgMaravilla: "assets/img/maravilla/turco.webp",
        nombreMaravilla: "Mezquita de suleimán",
        tecsUnicas: [
            { nombre: " Sipahi.", efecto: "los arqueros montados obtienen +20 de PR.", img: "assets/img/unidades/tec.webp" },
            { nombre: "Artillería  Contrapesos", efecto: "las torres de bombarda, los cañones de asedio y los galeones artillados obtienen +2 de alcance.", img: "assets/img/unidades/tec.webp" }
        ]
    },
    {
        id: 'vietnamitas',
        nombre: "LOS VIETNAMITAS",
        region: "India y el Sudeste Asiático",
        icono: "assets/img/CivIcon-viet.webp",
        imgCastillo: "assets/img/castillos/viet.webp",
        tipo: "Civilización de Elefantes y arqueros",
        audio: "assets/audio/viet.mp3",
        bonos: [
            "Revela los centros urbanos enemigos al inicio de la partida.",
            " Las mejoras económicas no cuestan madera y se investigarán un +100 % más rápido.",
            "Unidades de la galería de tiro con arco y lanceros incendiarios: +20 % PR.",
            "Leva gratis.",
        ],
        unidadesUnicas: [
            { nombre: "Arquero de Ratan", img: "assets/img/unidades/ratan.webp" },
            { nombre: "Guerrillero Imperial", img: "assets/img/unidades/guerri3.webp" },

        ],
        imgMaravilla: "assets/img/maravilla/viet.webp",
        nombreMaravilla: "Templo but thap",
        tecsUnicas: [
            { nombre: "Chatras.", efecto: "elefantes de combate: +100 PR.", img: "assets/img/unidades/tec.webp" },
            { nombre: " Papel moneda", efecto: "además de madera, los leñadores generan oro gradualmente.", img: "assets/img/unidades/tec.webp" }
        ]
    },
    {
        id: 'wei',
        nombre: "LOS WEI",
        region: "Asia del Este",
        icono: "assets/img/CivIcon-wei.webp",
        imgCastillo: "assets/img/castillos/wei.webp",
        tipo: "Civilización de caballería",
        audio: "assets/audio/wei.mp3",
        bonos: [
            "Recibe un aldeano gratis por cada mejora de economía investigada.",
            " Las mejoras económicas no cuestan madera y se investigarán un +100 % más rápidoLa caballería de Hei Guang y el saqueador xianbei obtienen un 20/30 % más de PR en la Edad de los Castillos y la Edad Imperial, respectivamente.",
            " Los mangoneles y las unidades de Lou Chuan cuestan un 25 % menos.",
        ],
        unidadesUnicas: [
            { nombre: "Caballeria Tigresa", img: "assets/img/unidades/tigresa.webp" },
            { nombre: "Saqueador Xianbei", img: "assets/img/unidades/xianbei.webp" },

        ],
        imgMaravilla: "assets/img/maravilla/wei.webp",
        nombreMaravilla: "Pagoda songyue",
        tecsUnicas: [
            { nombre: "Tuntian.", efecto: "los soldados producen alimentos de forma pasiva.", img: "assets/img/unidades/tec.webp" },
            { nombre: "Armadura de Ming Guang ", efecto: "las unidades montadas obtiene +4 de armadura cuerpo a cuerpo.", img: "assets/img/unidades/tec.webp" }
        ]
    },
    {
        id: 'wu',
        nombre: "LOS WU",
        region: "Asia del Este",
        icono: "assets/img/CivIcon-wu.webp",
        imgCastillo: "assets/img/castillos/wu.webp",
        tipo: "Civilización de infantería y naval",
        audio: "assets/audio/wu.mp3",
        bonos: [
            " Los muelles y los edificios de producción militar proporcionan +65 de comida.",
            "La infantería se regenera 10/20/30 PR por minuto en la Edad Feudal, de los Castillos o Imperial.",
            "Los espadachines de Jian y la caballería de Hei Guang obtienen +2 de ataque en la Edad Imperial.",
        ],
        unidadesUnicas: [
            { nombre: "Arquero de fuego", img: "assets/img/unidades/fire.webp" },
            { nombre: "Espadachín de Jian", img: "assets/img/unidades/jian.webp" },

        ],
        imgMaravilla: "assets/img/maravilla/wu.webp",
        nombreMaravilla: "Templo de Jing'an",
        dificultad: 3,
        stats: { militar: 90, economia: 80, defensa: 80, tecnologia: 80, naval: 100 },
        tecsUnicas: [
            { nombre: "Tácticas de los Acantilados Rojos.", efecto: "los barcos de demolición y los arqueros de fuego infligen daño por fuego a los barcos y edificios.", img: "assets/img/unidades/tec.webp" },
            { nombre: "Tigre sentado", efecto: "(los mangoneles y los trebuchets de Lou Chuan disparan proyectiles adicionales.", img: "assets/img/unidades/tec.webp" }
        ],
        estrategia: {
            pico: "Edad de los Castillos/Edad Imperial",
            mapa: "Mapas Abiertos",
            composicion: "Espadachines de Jian/Ballestas/Trebuchet de traccion",
            rol: "Flank"
        }
    },
    {
        id: 'Jurchens',
        nombre: "LOS JURCHENS",
        region: "Asia del Este",
        icono: "assets/img/CivIcon-yur.webp",
        imgCastillo: "assets/img/castillos/jurch.webp",
        tipo: "Civilización de caballería y pólvora",
        audio: "assets/audio/jurch.mp3",
        bonos: [
            "La carne de los animales que caces y del ganado no se descompone.",
            "Las unidades montadas y los lanceros incendiarios atacan un 25 % más rápido a partir de la Edad Feudal.",
            "Los ingenieros de asedio están disponibles en la Edad de los Castillos.",
            "Las mejoras de asedio y fortificación cuestan un 75 % menos de madera y se investigan un 100 % más rápido.",
            "Las unidades reciben un 50 % menos de daño por fuego amigo.",
        ],
        unidadesUnicas: [
            { nombre: "Pagoda de Hierro", img: "assets/img/unidades/iron.webp" },
            { nombre: "Granadero", img: "assets/img/unidades/gran.webp" },

        ],
        imgMaravilla: "assets/img/maravilla/jurch.webp",
        nombreMaravilla: "Bosque de Pagodas Yingshan",
        dificultad: 5,
        stats: { militar: 90, economia: 80, defensa: 100, tecnologia: 80, naval: 70 },
        tecsUnicas: [
            { nombre: " Bastiones fortificados.", efecto: "las fortificaciones regeneran 500 puntos de resistencia por minuto.", img: "assets/img/unidades/tec.webp" },
            { nombre: "Bombas trueno", efecto: "los carros de cohetes, los granaderos y los Lou Chuan detonan al ser derrotados; los proyectiles producen explosiones adicionales.", img: "assets/img/unidades/tec.webp" }
        ],
        estrategia: {
            pico: "Edad de los Castillos/Edad Imperial",
            mapa: "Mapas Abiertos/Cerrados",
            composicion: "Husares/Pagoda de hierro/Lanceros de fuego/Carros de cohetes/Granaderos + Asedio",
            rol: "Pocket"
        }
    },










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
            { nombre: 'Hombre de Armas', costo: '100A 40O', mejora: '+5 HP, +2 ATK', stats: '<i class="fas fa-heart stat-hp"></i> 45 <i class="fas fa-fist-raised stat-atk"></i> 6 <i class="fas fa-shield-alt stat-def"></i> 0/1', img: 'assets/img/unidades/maa.webp' },
            { nombre: 'Espadachín Largo', costo: '150A 65O', mejora: '+15 HP, +3 ATK', stats: '<i class="fas fa-heart stat-hp"></i> 60 <i class="fas fa-fist-raised stat-atk"></i> 9 <i class="fas fa-shield-alt stat-def"></i> 1/1', img: 'assets/img/unidades/sword.webp' },
            { nombre: 'Mandoble', costo: '300A 100O', mejora: '+10 HP, +3 ATK', stats: '<i class="fas fa-heart stat-hp"></i> 65 <i class="fas fa-fist-raised stat-atk"></i> 12 <i class="fas fa-shield-alt stat-def"></i> 1/1', img: 'assets/img/unidades/man.webp' },
            { nombre: 'Campeón', costo: '750A 350O', mejora: '+5 HP, +2 ATK', stats: '<i class="fas fa-heart stat-hp"></i> 70 <i class="fas fa-fist-raised stat-atk"></i> 14 <i class="fas fa-shield-alt stat-def"></i> 1/1', img: 'assets/img/unidades/camp.webp' },
            {
                nombre: 'Legionario',
                costo: '800A 400O',
                mejora: 'Reemplaza al Campeón',
                stats: '<i class="fas fa-heart stat-hp"></i> 75 <i class="fas fa-fist-raised stat-atk"></i> 12 <i class="fas fa-shield-alt stat-def"></i> 2/2 (+ Atk vs Infantería)',
                img: 'assets/img/unidades/legi.webp',
                especial: 'ÚNICA: ROMANOS'
            }
        ]
    },
    {
        id: 'guerrero_aguila',
        tipo: 'Infanteria',
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
            { nombre: 'Lancero', costo: 'Básico', mejora: 'Unidad Base, Bonus vs Cab pequeño.', stats: '<i class="fas fa-heart stat-hp"></i> 45 <i class="fas fa-fist-raised stat-atk"></i> 3 <i class="fas fa-shield-alt stat-def"></i> 0/0', img: 'assets/img/unidades/lan.webp' },
            { nombre: 'Piquero', costo: '215A 90O', mejora: '+10 HP, +1 ATK, Bonus vs Cab mejorado.', stats: '<i class="fas fa-heart stat-hp"></i> 55 <i class="fas fa-fist-raised stat-atk"></i> 4 <i class="fas fa-shield-alt stat-def"></i> 0/0', img: 'assets/img/unidades/lan2.webp' },
            { nombre: 'Alabardero', costo: '300A 600O', mejora: '+5 HP, +2 ATK, Máximo Bonus', stats: '<i class="fas fa-heart stat-hp"></i> 60 <i class="fas fa-fist-raised stat-atk"></i> 6 <i class="fas fa-shield-alt stat-def"></i> 0/0', img: 'assets/img/unidades/lan3.webp' }
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
                img: 'assets/img/unidades/lanc.webp'
            },
            {
                nombre: 'L. Incendiario de Élite',
                costo: '1000A 800O',
                mejora: '+20 HP, +2 ATK, +Daño de Área',
                stats: '<i class="fas fa-heart stat-hp"></i> 85 <i class="fas fa-fist-raised stat-atk"></i> 10 <i class="fas fa-shield-alt stat-def"></i> 2/1',
                img: 'assets/img/unidades/lancc.webp'
            }
        ]
    },

    {
        id: 'milicia_flamenca',
        nombre: 'Milicia Flamenca',
        imagen: 'assets/img/unidades/flemi.webp',
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
        id: 'jinete',
        nombre: 'Línea de Jinete',
        imagen: 'assets/img/unidades/kt.webp',
        tipo: 'Caballeria',
        hp: 100, atk: 10, arm: '2/2',
        desc: 'Caballería pesada rápida y resistente.',
        evoluciones: [
            { nombre: 'Jinete', costo: 'Básico', mejora: 'Unidad Base', stats: '<i class="fas fa-heart stat-hp"></i> 100 <i class="fas fa-fist-raised stat-atk"></i> 10 <i class="fas fa-shield-alt stat-def"></i> 2/2', img: 'assets/img/unidades/kt.webp' },
            { nombre: 'Caballero', costo: '300A 175O', mejora: '+20 HP, +2 ATK, +1/1 ARM', stats: '<i class="fas fa-heart stat-hp"></i> 120 <i class="fas fa-fist-raised stat-atk"></i> 12 <i class="fas fa-shield-alt stat-def"></i> 3/3', img: 'assets/img/unidades/kt2.webp' },
            { nombre: 'Paladín', costo: '1300A 750O', mejora: '+40 HP, +2 ATK, +1/1 ARM', stats: '<i class="fas fa-heart stat-hp"></i> 160 <i class="fas fa-fist-raised stat-atk"></i> 14 <i class="fas fa-shield-alt stat-def"></i> 4/4', img: 'assets/img/unidades/kt3.webp' },
            {
                nombre: 'Savar',
                costo: '1300A 750O',
                mejora: 'Reemplaza al Paladín',
                stats: '<i class="fas fa-heart stat-hp"></i> 145 <i class="fas fa-fist-raised stat-atk"></i> 14 <i class="fas fa-shield-alt stat-def"></i> 3/4 (+ Atk vs Arqueros)',
                img: 'assets/img/unidades/savar.webp',
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
            {
                nombre: 'Explorador a camello',
                costo: 'Inicial / 55A 60O',
                mejora: 'Nueva Mejora',
                stats: '<i class="fas fa-heart stat-hp"></i> 70 <i class="fas fa-fist-raised stat-atk"></i> 5 <i class="fas fa-shield-alt stat-def"></i> 3/4 (+ Atk, vida y velocidad)',
                img: 'assets/img/unidades/camel0.webp',
                especial: 'ÚNICA: GURJARAS'
            },
            { nombre: 'Camello', costo: 'Básico', stats: '<i class="fas fa-heart stat-hp"></i> 100 <i class="fas fa-fist-raised stat-atk"></i> 6 <i class="fas fa-shield-alt stat-def"></i> 0/0', mejora: 'Unidad Base', img: 'assets/img/unidades/camel.webp' },
            { nombre: 'Camello Pesado', costo: '325A 360O', stats: '<i class="fas fa-heart stat-hp"></i> 120 <i class="fas fa-fist-raised stat-atk"></i> 7 <i class="fas fa-shield-alt stat-def"></i> 0/0', mejora: '+20 HP, +1 ATK', img: 'assets/img/unidades/camel2.webp' },
            {
                nombre: 'Camello Imperial',
                costo: '1000A 500O',
                mejora: 'Nueva Mejora',
                stats: '<i class="fas fa-heart stat-hp"></i> 145 <i class="fas fa-fist-raised stat-atk"></i> 14 <i class="fas fa-shield-alt stat-def"></i> 3/4 (+ Atk, vida y velocidad)',
                img: 'assets/img/unidades/camel3.webp',
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
            { nombre: 'L. Estepario', costo: 'Básico', stats: '<i class="fas fa-heart stat-hp"></i> 60 <i class="fas fa-fist-raised stat-atk"></i> 9 <i class="fas fa-shield-alt stat-def"></i> 0/1', mejora: 'Unidad Base', img: 'assets/img/unidades/lancer.webp' },
            { nombre: 'L. Estepario Élite', costo: '900A 550O', stats: '<i class="fas fa-heart stat-hp"></i> 80 <i class="fas fa-fist-raised stat-atk"></i> 11 <i class="fas fa-shield-alt stat-def"></i> 0/2', mejora: '+20 HP, +2 ATK', img: 'assets/img/unidades/lancer2.webp' }
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
            { nombre: 'Hei Guang', costo: 'Basico', stats: '<i class="fas fa-heart stat-hp"></i> 60 <i class="fas fa-fist-raised stat-atk"></i> 12 <i class="fas fa-shield-alt stat-def"></i> 3/4', mejora: 'Unidad base', img: 'assets/img/unidades/hei.webp' },
            { nombre: 'Cab. pesada Hei Guang', costo: '350A 250O', stats: '<i class="fas fa-heart stat-hp"></i> 80 <i class="fas fa-fist-raised stat-atk"></i> 12 <i class="fas fa-shield-alt stat-def"></i> 3/4', mejora: 'Unidad de Élite', img: 'assets/img/unidades/hei2.webp' }
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
            { nombre: 'Elefante Combate', costo: 'Básico', stats: '<i class="fas fa-heart stat-hp"></i> 250 <i class="fas fa-fist-raised stat-atk"></i> 12 <i class="fas fa-shield-alt stat-def"></i> 1/2', mejora: 'Unidad Base', img: 'assets/img/unidades/elec.webp' },
            { nombre: 'Elefante Élite', costo: '1100A 750O', stats: '<i class="fas fa-heart stat-hp"></i> 300 <i class="fas fa-fist-raised stat-atk"></i> 14 <i class="fas fa-shield-alt stat-def"></i> 1/3', mejora: '+50 HP, +2 ATK', img: 'assets/img/unidades/elec2.webp' }
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
            { nombre: 'Explorador', costo: 'Básico', stats: '<i class="fas fa-heart stat-hp"></i> 45 <i class="fas fa-fist-raised stat-atk"></i> 3 <i class="fas fa-shield-alt stat-def"></i> 0/2', mejora: 'Unidad Inicial', img: 'assets/img/unidades/sc.webp' },
            { nombre: 'Cab. Ligera', costo: '150A 50O', stats: '<i class="fas fa-heart stat-hp"></i> 60 <i class="fas fa-fist-raised stat-atk"></i> 7 <i class="fas fa-shield-alt stat-def"></i> 0/2', mejora: '+15 HP, +4 ATK', img: 'assets/img/unidades/sc2.webp' },
            { nombre: 'Húsar', costo: '500A 600O', stats: '<i class="fas fa-heart stat-hp"></i> 75 <i class="fas fa-fist-raised stat-atk"></i> 7 <i class="fas fa-shield-alt stat-def"></i> 0/2', mejora: '+15 HP, Mayor Visión', img: 'assets/img/unidades/sc3.webp' },
            {
                nombre: 'Húsar Alado',
                costo: '600A 800O',
                mejora: 'Nueva Mejora',
                stats: '<i class="fas fa-heart stat-hp"></i> 80 <i class="fas fa-fist-raised stat-atk"></i> 9 <i class="fas fa-shield-alt stat-def"></i> 1/2 (+ Atk vs Polvora)',
                img: 'assets/img/unidades/sc4.webp',
                especial: 'ÚNICA: POLACOS Y LITUANOS'
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
                costo: '950A 650O',
                mejora: '+25 HP, +1 ATK',
                stats: '140 HP / 13 ATK',
                img: 'assets/img/unidades/iron2.webp'
            },
        ]
    },
    {
        id: 'tigresa',
        nombre: 'Caballeria Tigresa',
        imagen: 'assets/img/unidades/tigresa.webp',
        tipo: 'Caballeria',
        hp: 115,
        atk: 11,
        arm: '0/5',
        especial: 'ÚNICA: WEI',
        desc: 'Caballería exclusiva de los Wei que obtiene PR y ataque al derrotar ejércitos enemigos. Extraordinariamente fuerte contra soldados a distancia.',
        evoluciones: [
            {
                nombre: 'Caballeria Tigresa',
                costo: '60A 75O',
                mejora: 'Unidad Base',
                stats: '115 HP / 11 ATK',
                img: 'assets/img/unidades/tigresa.webp'
            },
            {
                nombre: 'Caballeria Tigresa de Élite',
                costo: '1000A 800O',
                mejora: '+15 HP, +2 ATK',
                stats: '130 HP / 13 ATK',
                img: 'assets/img/unidades/tigresa2.webp'
            },
            {
                nombre: 'Armadura Min Guang',
                costo: '600A 450O',
                mejora: '+4 Armadura Cuerpo a Cuerpo',
                stats: '+4 Armadura Cuerpo a Cuerpo',
                img: 'assets/img/unidades/tec.webp',
                especial: 'TECNOLOGÍA ÚNICA'
            }
        ]
    },
    {
        id: 'Centurion',
        nombre: 'Centurion',
        imagen: 'assets/img/unidades/centu.webp',
        tipo: 'Caballeria',
        hp: 110,
        atk: 13,
        arm: '2/3',
        especial: 'ÚNICA: ROMANOS',
        desc: 'Unidad de caballería pesada romana única que aumenta el movimiento y la velocidad de ataque de las unidades cercanas de la línea de milicia.',
        evoluciones: [
            {
                nombre: 'Centurion',
                costo: '60A 75O',
                mejora: 'Unidad Base',
                stats: '115 HP / 11 ATK',
                img: 'assets/img/unidades/centu.webp'
            },
            {
                nombre: 'Centurion de Élite',
                costo: '1100A 00O',
                mejora: '+15 HP, +2 ATK',
                stats: '130 HP / 13 ATK',
                img: 'assets/img/unidades/centu2.webp'
            },
            {
                nombre: 'Comitatenses',
                costo: '700A 800O',
                mejora: 'Las unidades de la línea de milicia, caballeros y centuriones entrenan un 50 % más rápido y obtienen un ataque de carga.',
                stats: '+9 ataque de carga y +50% velocidad de entrenamiento',
                img: 'assets/img/unidades/tec.webp',
                especial: 'TECNOLOGÍA ÚNICA'
            }
        ]
    },
    {
        id: 'Boyardo',
        nombre: 'Boyardo',
        imagen: 'assets/img/unidades/boyar.webp',
        tipo: 'Caballeria',
        hp: 100,
        atk: 12,
        arm: '4/2',
        especial: 'ÚNICA: ESLAVOS',
        desc: 'Unidad de caballería exclusiva eslava con una excepcional armadura cuerpo a cuerpo.',
        evoluciones: [
            {
                nombre: 'Boyardo',
                costo: '60A 70O',
                mejora: 'Unidad Base',
                stats: '100 HP / 12 ATK',
                img: 'assets/img/unidades/boyar.webp'
            },
            {
                nombre: 'Boyardo de Élite',
                costo: '1100A 600O',
                mejora: '+30 HP, +2 ATK',
                stats: '130 HP / 14 ATK',
                img: 'assets/img/unidades/boyar2.webp'
            },
        ]
    },
    {
        id: 'Keshik',
        nombre: 'Keshik',
        imagen: 'assets/img/unidades/kesh.webp',
        tipo: 'Caballeria',
        hp: 120,
        atk: 9,
        arm: '1/2',
        especial: 'ÚNICA: TARTAROS',
        desc: 'Unidad de caballería pesada exclusiva de los tártaros que genera oro al luchar contra otras unidades. Fuerte contra unidades de arqueros.',
        evoluciones: [
            {
                nombre: 'Keshik',
                costo: '60A 40O',
                mejora: 'Unidad Base',
                stats: '120 HP / 9 ATK',
                img: 'assets/img/unidades/kesh.webp'
            },
            {
                nombre: 'Keshik de Élite',
                costo: '700A 600O',
                mejora: '+25 HP, +2 ATK',
                stats: '145 HP / 11 ATK',
                img: 'assets/img/unidades/kesh2.webp'
            },
        ]
    },
    {
        id: 'Konnink',
        nombre: 'Konnink',
        imagen: 'assets/img/unidades/konni.webp',
        tipo: 'Caballeria',
        hp: 100,
        atk: 12,
        arm: '2/2',
        especial: 'ÚNICA: BULGAROS',
        desc: 'Unidad de caballería pesada exclusiva de los búlgaros que lucha como infantería tras ser derribada.',
        evoluciones: [
            {
                nombre: 'Konnink',
                costo: '60A 70O',
                mejora: 'Unidad Base',
                stats: '100 HP / 12 ATK',
                img: 'assets/img/unidades/konni.webp'
            },
            {
                nombre: 'Konnink de Élite',
                costo: '700A 600O',
                mejora: '+20 HP, +2 ATK',
                stats: '120 HP / 14 ATK',
                img: 'assets/img/unidades/konni2.webp'
            },
            {
                nombre: 'Estribos',
                costo: '700A 800O',
                mejora: 'La caballería ataca un 33 % más rápido.',
                stats: '33% Velocidad de Ataque',
                img: 'assets/img/unidades/tec.webp',
                especial: 'TECNOLOGÍA ÚNICA'
            }
        ]
    },
    {
        id: 'Leitis ',
        nombre: 'Leitis',
        imagen: 'assets/img/unidades/leiti.webp',
        tipo: 'Caballeria',
        hp: 100,
        atk: 13,
        arm: '1/1',
        especial: 'ÚNICA: LITUANOS',
        desc: 'Caballería pesada exclusiva de los lituanos que ignora la armadura.',
        evoluciones: [
            {
                nombre: 'Leitis',
                costo: '70A 50O',
                mejora: 'Unidad Base',
                stats: '100 HP / 13 ATK',
                img: 'assets/img/unidades/leiti.webp'
            },
            {
                nombre: 'Leitis de Élite',
                costo: '700A 750O',
                mejora: '+30 HP, +3 ATK',
                stats: '120 HP / 16 ATK',
                img: 'assets/img/unidades/leiti2.webp'
            },
        ]
    },
    {
        id: 'Huzar Magiar',
        nombre: 'Huzar Magiar',
        imagen: 'assets/img/unidades/magy.webp',
        tipo: 'Caballeria',
        hp: 80,
        atk: 10,
        arm: '0/2',
        especial: 'ÚNICA: MAGIARES',
        desc: 'Jinete ligero exclusivo de los magiares. Fuerte contra armas de asedio.',
        evoluciones: [
            {
                nombre: 'Huzar Magiar',
                costo: '35A 45O',
                mejora: 'Unidad Base',
                stats: '80 HP / 10 ATK',
                img: 'assets/img/unidades/magy.webp'
            },
            {
                nombre: 'Huzar Magiar de Élite',
                costo: '800A 600O',
                mejora: '+10 HP, +1 ATK',
                stats: '90 HP / 11 ATK',
                img: 'assets/img/unidades/magy2.webp'
            },
            {
                nombre: 'Ejercito Corviniano',
                costo: '200A 300O',
                mejora: 'Los huszár magiares dejan de costar oro y pasan a costar más comida..',
                stats: 'Nuevo precio: 80A 0O',
                img: 'assets/img/unidades/tec.webp',
                especial: 'TECNOLOGÍA ÚNICA'
            }

        ]
    },
    {
        id: 'Mameluco',
        nombre: 'Mameluco',
        imagen: 'assets/img/unidades/mame.webp',
        tipo: 'Caballeria',
        hp: 80,
        atk: 8,
        arm: '0/0',
        especial: 'ÚNICA: SARRACENOS',
        desc: 'Unidad de caballería exclusiva de los sarracenos con ataque cuerpo a cuerpo a distancia. Fuerte contra unidades montadas. ',
        evoluciones: [
            {
                nombre: 'Mameluco',
                costo: '55A 85O',
                mejora: 'Unidad Base',
                stats: '80 HP / 8 ATK',
                img: 'assets/img/unidades/mame.webp'
            },
            {
                nombre: 'Mameluco de Élite',
                costo: '600A 500O',
                mejora: ', +2 ATK',
                stats: '80 HP / 10 ATK',
                img: 'assets/img/unidades/mame2.webp'
            },
        ]
    },
    {
        id: 'Monaspa',
        nombre: 'Monaspa',
        imagen: 'assets/img/unidades/monas.webp',
        tipo: 'Caballeria',
        hp: 70,
        atk: 12,
        arm: '3/2',
        especial: 'ÚNICA: GEORGIANOS',
        desc: 'Caballería pesada exclusiva de los georgianos que se vuelve más fuerte cuando hay otros monaspas o unidades de caballería cerca.',
        evoluciones: [
            {
                nombre: 'Monaspa',
                costo: '55A 85O',
                mejora: 'Unidad Base',
                stats: '70 HP / 12 ATK',
                img: 'assets/img/unidades/monas.webp'
            },
            {
                nombre: 'Monaspa de Élite',
                costo: '800A 600O',
                mejora: '+10 HP, +2 ATK',
                stats: '80 HP / 14 ATK',
                img: 'assets/img/unidades/monas2.webp'
            },
            {
                nombre: 'Caballeria Aznauri',
                costo: '200A 300O',
                mejora: 'Las unidades montadas ocupan un -20 % menos de espacio de población.',
                stats: 'Monaspas ocupan -20% espacio de población',
                img: 'assets/img/unidades/tec.webp',
                especial: 'TECNOLOGÍA ÚNICA'
            }

        ]
    },
    {
        id: 'Shririvamsha',
        nombre: 'Jinete de Shririvamsha',
        imagen: 'assets/img/unidades/shri.webp',
        tipo: 'Caballeria',
        hp: 55,
        atk: 8,
        arm: '0/1',
        especial: 'ÚNICA: GURJARAS',
        desc: 'Jinete ligero y rápido exclusivo de los gurjaras que puede esquivar proyectiles. Fuerte contra soldados a distancia.',
        evoluciones: [
            {
                nombre: 'Jinete de Shririvamsha',
                costo: '55A 85O',
                mejora: 'Unidad Base',
                stats: '55 HP / 8 ATK',
                img: 'assets/img/unidades/shri.webp'
            },
            {
                nombre: 'Jinete de Shririvamsha de Élite',
                costo: '850A 500O',
                mejora: '+15 HP, +3 ATK',
                stats: '70 HP / 11 ATK',
                img: 'assets/img/unidades/shri2.webp'
            },
            {
                nombre: 'Chatrias',
                costo: '500A 450O',
                mejora: 'Las unidades militares cuestan un 25 % menos de comida..',
                stats: 'Shririvamsha cuestan 25% menos comida',
                img: 'assets/img/unidades/tec.webp',
                especial: 'TECNOLOGÍA ÚNICA'
            }

        ]
    },
    {
        id: 'Tarcano',
        nombre: 'Tarcano',
        imagen: 'assets/img/unidades/tarkan.webp',
        tipo: 'Caballeria',
        hp: 100,
        atk: 8,
        arm: '1/3',
        especial: 'ÚNICA: HUNOS',
        desc: 'Caballería pesada exclusiva de los hunos. Excepcionalmente fuerte contra edificios.',
        evoluciones: [
            {
                nombre: 'Tarcano',
                costo: '55A 85O',
                mejora: 'Unidad Base',
                stats: '55 HP / 8 ATK',
                img: 'assets/img/unidades/shri.webp'
            },
            {
                nombre: 'Tarcano de Élite',
                costo: '850A 500O',
                mejora: '+50 HP, +3 ATK',
                stats: '150 HP / 11 ATK',
                img: 'assets/img/unidades/tarkan2.webp'
            },
            {
                nombre: 'Razias',
                costo: '500A 450O',
                mejora: 'Los tarcanos se pueden entrenar en los establos.',
                stats: 'Tarcanos disponibles en establos',
                img: 'assets/img/unidades/tec.webp',
                especial: 'TECNOLOGÍA ÚNICA'
            }

        ]
    },
    {
        id: 'Elefante de Guerra',
        nombre: 'Elefante de Guerra',
        imagen: 'assets/img/unidades/warele.webp',
        tipo: 'Caballeria',
        hp: 450,
        atk: 15,
        arm: '1/2',
        especial: 'ÚNICA: PERSAS',
        desc: 'Unidad de caballería exclusiva de los persas que inflige daño de arrollamiento. Fuerte contra edificios y unidades a corta distancia.',
        evoluciones: [
            {
                nombre: 'Elefante de Guerra',
                costo: '170A 85O',
                mejora: 'Unidad Base',
                stats: '450 HP / 15 ATK',
                img: 'assets/img/unidades/warele.webp'
            },
            {
                nombre: 'Elefante de Guerra de Élite',
                costo: '1350A 800O',
                mejora: '+150 HP, +5 ATK',
                stats: '600 HP / 20 ATK',
                img: 'assets/img/unidades/warele2.webp'
            },

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
            { nombre: 'Arquero', costo: 'Básico', mejora: 'Unidad Base', img: 'assets/img/unidades/arch.webp' },
            { nombre: 'Ballestero', costo: '125A 75O', mejora: '+5 HP, +1 ATK, +1 Rango', img: 'assets/img/unidades/ball.webp' },
            { nombre: 'Arbalesta', costo: '350A 300O', mejora: '+5 HP, +1 ATK', img: 'assets/img/unidades/arbs.webp' }
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
                img: 'assets/img/unidades/guerri3.webp',
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
            { nombre: 'Arq. a Caballo', costo: 'Básico', stats: '<i class="fas fa-heart stat-hp"></i> 50 <i class="fas fa-fist-raised stat-atk"></i> 6 <i class="fas fa-shield-alt stat-def"></i> 0/0', mejora: 'Unidad Base', img: 'assets/img/unidades/ca.webp' },
            { nombre: 'Arq. Cab. Pesado', costo: '325A 225O', stats: '<i class="fas fa-heart stat-hp"></i> 60 <i class="fas fa-fist-raised stat-atk"></i> 7 <i class="fas fa-shield-alt stat-def"></i> 1/0', mejora: '+10 HP, +1 ATK, +1 ARM', img: 'assets/img/unidades/ca2.webp' }
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
            { nombre: 'Artillero Manual', costo: 'Edad Imperial', stats: '<i class="fas fa-heart stat-hp"></i> 35 <i class="fas fa-fist-raised stat-atk"></i> 17 <i class="fas fa-shield-alt stat-def"></i> 1/0', mejora: 'Unidad de Pólvora', img: 'assets/img/unidades/hc.webp' },
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
            { nombre: 'Granadero', costo: 'Edad Imperial', stats: '<i class="fas fa-heart stat-hp"></i> 60 <i class="fas fa-fist-raised stat-atk"></i> 13 <i class="fas fa-shield-alt stat-def"></i> 0/2', mejora: 'Daño de área', img: 'assets/img/unidades/gran.webp' }
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
            { nombre: 'Zenete', costo: 'Edad Castillos', stats: '<i class="fas fa-heart stat-hp"></i> 50 <i class="fas fa-fist-raised stat-atk"></i> 3 <i class="fas fa-shield-alt stat-def"></i> 0/3', mejora: 'Unidad Base', img: 'assets/img/unidades/zen.webp' },
            { nombre: 'Zenete de Élite', costo: '500A 450O', stats: '<i class="fas fa-heart stat-hp"></i> 55 <i class="fas fa-fist-raised stat-atk"></i> 4 <i class="fas fa-shield-alt stat-def"></i> 0/4', mejora: '+5 HP, +1 ATK', img: 'assets/img/unidades/zen2.webp' }
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
            { nombre: 'Arq. Elefante', costo: 'Básico', stats: '<i class="fas fa-heart stat-hp"></i> 230 <i class="fas fa-fist-raised stat-atk"></i> 6 <i class="fas fa-shield-alt stat-def"></i> 0/2', mejora: 'Unidad Base', img: 'assets/img/unidades/ele.webp' },
            { nombre: 'Arq. Elefante Élite', costo: '1000A 800O', stats: '<i class="fas fa-heart stat-hp"></i> 280 <i class="fas fa-fist-raised stat-atk"></i> 7 <i class="fas fa-shield-alt stat-def"></i> 0/3', mejora: '+50 HP, +1 ATK', img: 'assets/img/unidades/ele2.webp' }
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
            { nombre: 'Ariete', costo: 'Básico', stats: '<i class="fas fa-heart stat-hp"></i> 175 <i class="fas fa-fist-raised stat-atk"></i> 2 <i class="fas fa-shield-alt stat-def"></i> -3/180', mejora: 'Unidad Base', img: 'assets/img/unidades/ram.webp' },
            { nombre: 'Ariete de Cubierta', costo: '300A', stats: '<i class="fas fa-heart stat-hp"></i> 200 <i class="fas fa-fist-raised stat-atk"></i> 3 <i class="fas fa-shield-alt stat-def"></i> -3/190', mejora: '+25 HP, +Bonus Edif.', img: 'assets/img/unidades/ram2.webp' },
            { nombre: 'Ariete de Asedio', costo: '1000A', stats: '<i class="fas fa-heart stat-hp"></i> 270 <i class="fas fa-fist-raised stat-atk"></i> 4 <i class="fas fa-shield-alt stat-def"></i> -3/195', mejora: 'Daño de Área Masivo', img: 'assets/img/unidades/ram3.webp' }
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
            { nombre: 'Mangonel', costo: 'Básico', stats: '<i class="fas fa-heart stat-hp"></i> 50 <i class="fas fa-fist-raised stat-atk"></i> 40 <i class="fas fa-shield-alt stat-def"></i> 0/6', mejora: 'Unidad Base', img: 'assets/img/unidades/manga.webp' },
            { nombre: 'Onagro', costo: '800A 500O', stats: '<i class="fas fa-heart stat-hp"></i> 60 <i class="fas fa-fist-raised stat-atk"></i> 50 <i class="fas fa-shield-alt stat-def"></i> 0/7', mejora: '+10 HP, +10 ATK', img: 'assets/img/unidades/manga2.webp' },
            { nombre: 'Onagro de Asedio', costo: '1450A 1000O', stats: '<i class="fas fa-heart stat-hp"></i> 70 <i class="fas fa-fist-raised stat-atk"></i> 75 <i class="fas fa-shield-alt stat-def"></i> 0/8', mejora: 'Destruye Árboles', img: 'assets/img/unidades/manga3.webp' }
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
            { nombre: 'Escorpión', costo: 'Básico', stats: '<i class="fas fa-heart stat-hp"></i> 40 <i class="fas fa-fist-raised stat-atk"></i> 12 <i class="fas fa-shield-alt stat-def"></i> 0/7', mejora: 'Unidad Base', img: 'assets/img/unidades/scor.webp' },
            { nombre: 'Escorpión Pesado', costo: '1000A 1100O', stats: '<i class="fas fa-heart stat-hp"></i> 50 <i class="fas fa-fist-raised stat-atk"></i> 16 <i class="fas fa-shield-alt stat-def"></i> 0/8', mejora: '+10 HP, +4 ATK', img: 'assets/img/unidades/scor2.webp' }
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
            { nombre: 'Carro de Guerra', costo: 'Edad Castillos', stats: '<i class="fas fa-heart stat-hp"></i> 75 <i class="fas fa-fist-raised stat-atk"></i> 12 <i class="fas fa-shield-alt stat-def"></i> 0/3', mejora: 'Unidad Base', img: 'assets/img/unidades/rocke.webp' },
            { nombre: 'Carro de Élite', costo: '1000A 800O', stats: '<i class="fas fa-heart stat-hp"></i> 90 <i class="fas fa-fist-raised stat-atk"></i> 15 <i class="fas fa-shield-alt stat-def"></i> 0/4', mejora: '+15 HP, +3 ATK', img: 'assets/img/unidades/rocke2.webp' }
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
            { nombre: 'Torre de Asedio', costo: 'Básico', stats: '<i class="fas fa-heart stat-hp"></i> 220 <i class="fas fa-fist-raised stat-atk"></i> 0 <i class="fas fa-shield-alt stat-def"></i> -2/100', mejora: 'Transporte Único', img: 'assets/img/unidades/siege.webp' }
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
            { nombre: 'Cañón de Asedio', costo: 'Edad Imperial', stats: '<i class="fas fa-heart stat-hp"></i> 80 <i class="fas fa-fist-raised stat-atk"></i> 40 <i class="fas fa-shield-alt stat-def"></i> 2/1', mejora: 'Unidad Base', img: 'assets/img/unidades/bbc.webp' },
            {
                nombre: 'Obùs de Asedio',
                costo: '1100A 800O',
                mejora: 'Nueva Mejora',
                stats: '<i class="fas fa-heart stat-hp"></i> 90 <i class="fas fa-fist-raised stat-atk"></i> 50 <i class="fas fa-shield-alt stat-def"></i> 2/6 (+ Daño en area)',
                img: 'assets/img/unidades/bbc2.webp',
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
window.abrirModalEvoluciones = function (idUnidad) {
    const unidad = unidadesData.find(u => u.id === idUnidad);
    if (!unidad) return;

    const overlay = document.createElement('div');
    overlay.id = 'modal-overlay';
    overlay.className = 'modal-overlay fade-in';
    overlay.onclick = (e) => { if (e.target === overlay) window.cerrarModal(); };

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

window.cerrarModal = function () {
    const modal = document.getElementById('modal-overlay');
    if (modal) {
        modal.classList.remove('fade-in');
        modal.classList.add('fade-out'); // Opcional si tienes la animación
        setTimeout(() => modal.remove(), 200);
    }
};

let eliteInterval;
function iniciarEliteCycle() {
    const units = [
        {
            name: "Catafracta",
            desc: "Caballería pesada bizantina diseñada para arrollar a la infantería enemiga. Ignora parcialmente el daño de bonificación.",
            img: "assets/img/cata.webp"
        },
        {
            name: "Caballero Teutón",
            desc: "La unidad de infantería más blindada del juego. Lenta pero casi invulnerable en combate cuerpo a cuerpo.",
            img: "assets/img/Cab.webp"
        },
        {
            name: "Arquero Largo",
            desc: "El orgullo de los britanos. Posee el mayor alcance de cualquier arquero a pie en la historia de la guerra.",
            img: "assets/img/arch.webp"
        },
        {
            name: "Mameluco",
            desc: "Caballería de élite sarracena que lanza cimitarras. Su velocidad y daño de bonificación la hacen letal contra otra caballería.",
            img: "assets/img/unidades/mame.webp"
        },
        {
            name: "Conquistador",
            desc: "Poderosa unidad de caballería con arcabuz. Combina la potencia de fuego de la pólvora con la movilidad del caballo.",
            img: "assets/img/unidades/conqui.webp"
        }
    ];

    let currentIdx = 0;
    const nameEl = document.getElementById('elite-name');
    const descEl = document.getElementById('elite-desc');
    const imgEl = document.getElementById('elite-img');
    const infoCont = document.getElementById('elite-info-container');
    const visualCont = document.getElementById('elite-visual-container');

    const progressDots = document.querySelectorAll('#elite-progress .progress-dot');

    if (!imgEl) return;

    if (eliteInterval) clearInterval(eliteInterval);

    eliteInterval = setInterval(() => {
        infoCont.classList.remove('active');
        visualCont.classList.remove('active');
        progressDots.forEach(dot => dot.classList.remove('active'));

        setTimeout(() => {
            currentIdx = (currentIdx + 1) % units.length;
            const unit = units[currentIdx];

            nameEl.textContent = unit.name;
            descEl.textContent = unit.desc;
            imgEl.src = unit.img;

            infoCont.classList.add('active');
            visualCont.classList.add('active');
            progressDots[currentIdx].classList.add('active');
        }, 800);
    }, 5000);
}

let showcaseInterval;
function iniciarShowcaseCycle() {
    const images = [
        'assets/img/CivIcon-Francos.webp',
        'assets/img/CivIcon-Mongoles.webp',
        'assets/img/CivIcon-Aztecas.webp',
        'assets/img/CivIcon-sarra.webp',
        'assets/img/CivIcon-teuton.webp',
        'assets/img/CivIcon-briton.webp',
        'assets/img/CivIcon-jap.webp',
        'assets/img/CivIcon-viking.webp'
    ];
    let currentIdx = 0;
    const imgElement = document.getElementById('showcase-img');
    if (!imgElement) return;

    if (showcaseInterval) clearInterval(showcaseInterval);

    showcaseInterval = setInterval(() => {
        imgElement.style.transition = 'all 0.5s ease-in-out';
        imgElement.style.opacity = '0';
        imgElement.style.transform = 'translateY(-20px) scale(0.8)';

        setTimeout(() => {
            currentIdx = (currentIdx + 1) % images.length;
            imgElement.src = images[currentIdx];
            imgElement.style.opacity = '1';
            imgElement.style.transform = 'translateY(0) scale(1)';
        }, 500);
    }, 4000);
}

function cargarSeccion(seccion) {
    console.log("Cargando sección:", seccion);
    const contenedor = document.getElementById('contenedor-principal');
    if (!contenedor) return;

    contenedor.innerHTML = '';

    if (seccion === 'inicio') {
        contenedor.innerHTML = `
            <section id="seccion-inicio" class="fade-in">
                <section class="modern-hero-section">
                    <video autoplay muted loop playsinline class="hero-video-bg">
                        <source src="assets/img/trailer.mp4" type="video/mp4">
                    </video>
                    <div class="modern-hero-overlay"></div>

                    <div class="hero-text-content">
                        <span class="brand-accent">AGE OF EMPIRES II</span>
                        <h1>Domina la<br>Historia</h1>
                        <p class="hero-description">
                            Explora la evolución de las civilizaciones, domina el campo de batalla 
                            y conviértete en el estratega definitivo. Una enciclopedia multimedia 
                            diseñada para los amantes de la estrategia en tiempo real.
                        </p>
                        <div class="cta-group">
                            <a href="#" class="btn-modern btn-primary" onclick="cargarSeccion('civilizaciones'); return false;">Explorar Civilizaciones</a>
                            <a href="#" class="btn-modern btn-outline" onclick="cargarSeccion('unidades'); return false;">Ver Enciclopedia</a>
                        </div>
                    </div>

                    <div class="showcase-3d-container">
                        <div class="spotlight"></div>
                        
                        <div class="podium-3d">
                            <div class="podium-tier tier-1"></div>
                            <div class="podium-tier tier-2"></div>
                            <div class="podium-tier tier-3"></div>
                            
                            <div class="floating-element" id="showcase-3d-element">
                                <div class="floating-glow"></div>
                                <img src="assets/img/CivIcon-Francos.webp" alt="Featured Item" id="showcase-img">
                            </div>
                        </div>
                    </div>
                </section>

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
                    <div class="premium-text-side">
                        <span class="subtitulo-rojo">EL ORGULLO DE LAS NACIONES</span>
                        <h2 class="titulo-dorado">UNIDADES<br>DE ÉLITE</h2>
                        
                        <div id="elite-info-container" class="unit-info-active active">
                            <h3 class="active-unit-name" id="elite-name">Catafracta</h3>
                            <p class="active-unit-desc" id="elite-desc">Caballería pesada bizantina con armadura de placas diseñada para arrollar a la infantería enemiga.</p>
                        </div>

                        <div class="unit-progress-container" id="elite-progress">
                            <div class="progress-dot active"><div class="progress-dot-fill"></div></div>
                            <div class="progress-dot"><div class="progress-dot-fill"></div></div>
                            <div class="progress-dot"><div class="progress-dot-fill"></div></div>
                            <div class="progress-dot"><div class="progress-dot-fill"></div></div>
                            <div class="progress-dot"><div class="progress-dot-fill"></div></div>
                        </div>
                    </div>

                    <div class="elite-showcase-right">
                        <div class="white-slanted-ledge"></div>
                        <div class="active-unit-display active" id="elite-visual-container">
                            <img src="assets/img/cata.webp" alt="Elite Unit" id="elite-img">
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

        <div class="bento-wrapper">
            <div class="columna-texto">
                <div class="info-item-premium red-edge">
                    <h3>E-SPORTS DE ÉLITE</h3>
                    <p>Torneos globales con premios masivos que definen quién es el mejor estratega del mundo.</p>
                </div>
                <div class="info-item-premium gold-edge">
                    <h3>COMUNIDAD ACTIVA</h3>
                    <p>Una legión de jugadores apasionados que mantienen vivo el legado compartiendo tácticas.</p>
                </div>
                <div class="info-item-premium red-edge">
                    <h3>ACTUALIZACIONES</h3>
                    <p>Equilibrio constante y nuevo contenido que garantiza que el meta-juego evolucione.</p>
                </div>
            </div>

            <div class="columna-galeria-bento">
                <div class="comp-foto-grande">
                    <img src="assets/img/tatoh.jpg" alt="Torneo Principal">
                    <div class="badge-torneo">WORLD CHAMPIONSHIP SERIES</div>
                </div>
                <div class="fila-inferior-galeria">
                    <div class="comp-foto-mediana">
                        <img src="assets/img/hera.jpg" alt="Jugador">
                    </div>
                    <div class="stack-vertical-mini">
                        <div class="comp-foto-mini"><img src="assets/img/red.jpg" alt="Evento"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
            </section>
        `;

        setTimeout(() => {
            slideActual = 0;
            iniciarAutoplay();
            iniciarShowcaseCycle();
            iniciarEliteCycle();
            ejecutarConteoIndividual('num-civs', civilizacionesAoE.length);
            ejecutarConteoIndividual('num-unidades', unidadesData.length);
            ejecutarConteoIndividual('num-anios', 1000);
            const track = document.getElementById('escudos-track');
            if (track) { track.innerHTML += track.innerHTML; }
        }, 100);

    } else if (seccion === 'civilizaciones') {
        detenerAutoplay();
        civilizacionesAoE.sort((a, b) => a.nombre.localeCompare(b.nombre));

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

            <div class="filtros-container">
            <button class="btn-filtro active" onclick="filtrarPorRegion('Todas', this)">Todas</button>
            <button class="btn-filtro" onclick="filtrarPorRegion('Europa Occidental', this)">Europa Occ.</button>
            <button class="btn-filtro" onclick="filtrarPorRegion('Europa Central', this)">Europa Central</button>
            <button class="btn-filtro" onclick="filtrarPorRegion('Europa del Este', this)">Europa del Este</button>
            <button class="btn-filtro" onclick="filtrarPorRegion('Mediterraneo', this)">Mediterráneo</button>
            <button class="btn-filtro" onclick="filtrarPorRegion('India y el Sudeste Asiático', this)">India y Sudeste Asiático</button>
            <button class="btn-filtro" onclick="filtrarPorRegion('Oriente Medio', this)">Oriente Medio</button>
            <button class="btn-filtro" onclick="filtrarPorRegion('Africa', this)">África</button>
            <button class="btn-filtro" onclick="filtrarPorRegion('Asia del Este', this)">Asia del Este</button>
            <button class="btn-filtro" onclick="filtrarPorRegion('Asia Central', this)">Asia Central</button>
            <button class="btn-filtro" onclick="filtrarPorRegion('America', this)">América</button>
            </div>

            <div class="contenedor-enciclopedia-premium">
            <div class="civ-grid">
                ${cardsHTML}
            </div>
            </div>

            <div id="side-panel-civ" class="side-panel">
                <button type="button" class="btn-cerrar-panel" onclick="cerrarPanelCiv()">&times;</button>
                <div id="contenido-panel-civ"></div>
            </div>
            
            <div id="overlay-negro" class="overlay-hidden" onclick="cerrarPanelCiv()"></div>
            
        </section>
        
    `;
        renderizarCivis(civilizacionesAoE);
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
    overlay.onclick = (e) => { if (e.target === overlay) cerrarModal(); };

    overlay.innerHTML = `
        <div class="modal-content-premium fade-in-up">
            <button class="btn-cerrar-modal" onclick="cerrarModal()">×</button>
            <h2 class="titulo-dorado">${unidad.nombre}</h2>
            <p class="subtitulo-rojo-enc">LÍNEA DE MEJORA ESTRATÉGICA</p>
            
            <div class="evoluciones-flex-container">
                ${unidad.evoluciones.map((evo, i) => {
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
        const claseEspecial = u.especial ? 'unidad-especial-card' : '';
        const badgeUnica = u.especial ? `<div class="badge-card-unica">${u.especial}</div>` : '';

        return `
        <div class="unidad-card-parallax ${claseEspecial}" 
             onmousemove="efectoParallax(event, this)" 
             onmouseleave="resetParallax(this)" 
             onclick="window.abrirModalEvoluciones('${u.id}')">
            
            <div class="card-bg"></div>
            ${badgeUnica}
            
            <div class="unidad-render-container">
                <img src="${u.imagen || 'assets/img/units/milicia.png'}" class="unidad-render" alt="${u.nombre}">
            </div>

            <div class="card-info-overlay">
                <h3 class="titulo-unidad-parallax">${u.nombre}</h3>
                <div class="stats-grid-parallax">
                    <span><i class="fas fa-heart stat-hp"></i> ${u.hp}</span>
                    <span><i class="fas fa-fist-raised stat-atk"></i> ${u.atk}</span>
                    <span><i class="fas fa-shield-alt stat-def"></i> ${u.arm}</span>
                </div>
                <p class="desc-parallax">${u.desc}</p>
                <div class="footer-action-parallax">
                    <span class="ver-mejoras-txt">${u.especial ? 'TECNOLOGÍA ÚNICA ★' : 'LÍNEA DE MEJORA ★'}</span>
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
    if (indicators[slideActual]) indicators[slideActual].classList.remove('active');
    slideActual = (slideActual + direccion + slides.length) % slides.length;
    slides[slideActual].classList.add('active');
    if (indicators[slideActual]) indicators[slideActual].classList.add('active');
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

    // Rellenamos el contenido con la nueva estructura editorial
    contenido.innerHTML = `
        <div class="panel-scroll">
            <div class="panel-header-modern">
                <img src="${s.icono}" class="panel-bg-icon">
                <div class="civ-portrait-box">
                    <img src="${s.icono}" class="img-portrait-large">
                </div>
                <h2 class="panel-titulo">${s.nombre}</h2>
                <div class="panel-dificultad">
                    ${generarEstrellasDificultad(s.dificultad || 1)}
                </div>
                <p class="panel-subtitulo">${s.tipo}</p>
            </div>

            <div class="panel-seccion">
                <h4>ATRIBUTOS DE CIVILIZACIÓN</h4>
                <div class="atributos-container">
                    ${generarAtributosBarras(s.stats || { militar: 50, economia: 50, defensa: 50, tecnologia: 50, naval: 50 })}
                </div>
            </div>

            <div class="panel-seccion strategy-briefing">
                <h4>ESTRATEGIA MAESTRA</h4>
                <div class="strategy-grid">
                    <div class="strategy-item">
                        <i class="fas fa-clock"></i>
                        <div>
                            <span class="strat-label">PICO DE PODER</span>
                            <span class="strat-value">${s.estrategia?.pico || 'Equilibrado'}</span>
                        </div>
                    </div>
                    <div class="strategy-item">
                        <i class="fas fa-map-marked-alt"></i>
                        <div>
                            <span class="strat-label">MAPA IDEAL</span>
                            <span class="strat-value">${s.estrategia?.mapa || 'Polivalente'}</span>
                        </div>
                    </div>
                    <div class="strategy-item">
                        <i class="fas fa-fist-raised"></i>
                        <div>
                            <span class="strat-label">COMPOSICIÓN</span>
                            <span class="strat-value">${s.estrategia?.composicion || 'Mezcla de Unidades'}</span>
                        </div>
                    </div>
                    <div class="strategy-item">
                        <i class="fas fa-users-cog"></i>
                        <div>
                            <span class="strat-label">ROL RECOMENDADO</span>
                            <span class="strat-value">${s.estrategia?.rol || 'Adaptable'}</span>
                        </div>
                    </div>
                </div>
            </div>

            ${s.ubicacion ? `
            <div class="panel-seccion map-location-section">
                <h4>UBICACIÓN HISTÓRICA</h4>
                <div class="mini-atlas-container">
                    <div class="map-frame">
                        <img src="assets/img/stylized_world_map_dark.png" class="map-bg-img">
                        <div class="map-ping" style="top: ${s.ubicacion.pos.top}; left: ${s.ubicacion.pos.left};"></div>
                        <div class="map-scanline"></div>
                    </div>
                    <div class="map-info-overlay">
                        <span class="map-region-name">${s.ubicacion.region}</span>
                        <span class="map-coords">${s.ubicacion.coords}</span>
                    </div>
                </div>
            </div>
            ` : ''}

            <div id="audio-dynamic-container" class="audio-player-container panel-seccion">
                <div class="audio-label">CARGANDO TEMA MUSICAL...</div>
            </div>

            <div class="panel-seccion">
                <h4>BONIFICACIONES DE CIVILIZACIÓN</h4>
                <ul class="panel-list">
                    ${(s.bonos || []).map(b => `<li>${b}</li>`).join('')}
                </ul>
            </div>

            <div class="panel-seccion">
                <h4>ARQUITECTURA HISTÓRICA</h4>
                <div class="castillo-frame">
                    <img src="${s.imgCastillo}" class="img-castillo-display">
                </div>
            </div>

            <div class="panel-seccion">
                <h4>EJÉRCITO ÚNICO</h4>
                <div class="unidades-container-modern">
                    ${(s.unidadesUnicas || []).map(u => `
                        <div class="unidad-box-premium">
                            <div class="unidad-img-wrapper">
                                <img src="${u.img}" alt="${u.nombre}" class="unidad-thumbnail">
                            </div>
                            <div class="unidad-info">
                                <span class="unidad-nombre">${u.nombre}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="panel-seccion">
                <h4>TECNOLOGÍAS IMPERIALES</h4>
                <div class="tecs-container-modern">
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
                <h4>MARAVILLA DEL IMPERIO</h4>
                <div class="maravilla-frame">
                    <img src="${s.imgMaravilla}" class="img-maravilla-display">
                    <div class="maravilla-caption">${s.nombreMaravilla || 'Maravilla Imperial'}</div>
                </div>
            </div>

            <div style="height: 50px;"></div>
        </div> `;

    // ACTIVACIÓN: Forzamos la visualización y animaciones
    panel.style.display = "block";
    setTimeout(() => {
        panel.classList.add('active');
        overlay.classList.add('overlay-visible');
        overlay.classList.remove('overlay-hidden');
        setTimeout(() => {
            const container = document.getElementById('audio-dynamic-container');
            if (container && s.audio) {
                container.innerHTML = `
                    <div class="audio-label">TEMA MUSICAL</div>
                    <audio controls controlsList="nodownload" class="mini-audio">
                        <source src="${s.audio}" type="audio/mpeg">
                        Tu navegador no soporta el audio.
                    </audio>
                `;

                // Forzamos al audio a recargar para que reconozca la nueva fuente
                const audioTag = container.querySelector('audio');
                audioTag.load();
            }
        }, 300); // 300ms es el tiempo estándar de las transiciones CSS
    }, 10);
    document.body.style.overflow = "hidden";
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
    document.body.style.overflow = "auto";
}

function generarEstrellasDificultad(n) {
    let estrellas = '';
    for (let i = 1; i <= 5; i++) {
        estrellas += `<i class="fas fa-star ${i <= n ? 'star-active' : 'star-inactive'}"></i>`;
    }
    return `<div class="stars-wrapper">${estrellas} <span class="dificultad-txt">Dificultad: ${n}/5</span></div>`;
}

function generarAtributosBarras(stats) {
    const labels = {
        militar: 'Fuerza Militar',
        economia: 'Economía',
        defensa: 'Defensa',
        tecnologia: 'Tecnología',
        naval: 'Poder Naval'
    };

    return Object.keys(stats).map(key => `
        <div class="atributo-item">
            <div class="atributo-info">
                <span>${labels[key]}</span>
                <span>${stats[key]}%</span>
            </div>
            <div class="atributo-barra-bg">
                <div class="atributo-barra-fill" style="width: ${stats[key]}%"></div>
            </div>
        </div>
    `).join('');
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

function renderizarCivis(lista) {
    const grid = document.getElementById('civ-grid');
    if (!grid) return; // Seguridad por si el elemento no existe

    let cardsHTML = "";
    lista.forEach(civ => {
        cardsHTML += `
            <div class="civ-card" onclick="mostrarDetalleCiv('${civ.id}')">
                <img src="${civ.icono}" alt="${civ.nombre}" class="civ-icon">
                <div class="civ-info">
                    <h3>${civ.nombre}</h3>
                    <p>${civ.region}</p>
                </div>
            </div>
        `;
    });
    grid.innerHTML = cardsHTML;
}

function filtrarPorRegion(region, boton) {
    document.querySelectorAll('.btn-filtro').forEach(b => b.classList.remove('active'));
    boton.classList.add('active');

    const filtradas = region === 'Todas'
        ? civilizacionesAoE
        : civilizacionesAoE.filter(civ => civ.region === region);

    const grid = document.querySelector('.civ-grid');
    grid.innerHTML = filtradas.map(civ => `
        <div class="civ-card" onclick="mostrarDetalleCiv('${civ.id}')">
            <img src="${civ.icono}" alt="${civ.nombre}">
            <span>${civ.nombre.replace('LOS ', '')}</span>
        </div>
    `).join('');
}




