const listaPokemon = document.querySelector("#listaPokemon");
const botonesHeader = document.querySelectorAll(".btn-header");
const buscador = document.querySelector("#buscador");
let URL = "https://pokeapi.co/api/v2/pokemon/";
let pokemonCache = [];
let filtroActual = "ver-todos";

// Mapeo de español a inglés para tipos
const tiposMapeo = {
    normal: "normal",
    fuego: "fire",
    agua: "water",
    planta: "grass",
    electrico: "electric",
    hielo: "ice",
    lucha: "fighting",
    veneno: "poison",
    tierra: "ground",
    volador: "flying",
    psiquico: "psychic",
    bicho: "bug",
    roca: "rock",
    fantasma: "ghost",
    siniestro: "dark",
    dragón: "dragon",
    acero: "steel",
    hada: "fairy"
};

// Cargar todos los Pokémon una sola vez
async function cargarTodosPokemon() {
    for (let i = 1; i <= 151; i++) {
        try {
            const response = await fetch(URL + i);
            const data = await response.json();
            pokemonCache.push(data);
            mostrarPokemon(data);
        } catch (error) {
            console.error("Error cargando Pokémon:", error);
        }
    }
}

function mostrarPokemon(poke) {

    let tipos = poke.types.map((type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`);
    tipos = tipos.join('');

    let pokeId = poke.id.toString();
    if (pokeId.length === 1) {
        pokeId = "00" + pokeId;
    } else if (pokeId.length === 2) {
        pokeId = "0" + pokeId;
    }

    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML = `
        <p class="pokemon-id-back">#${pokeId}</p>
        <div class="pokemon-imagen">
            <img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}">
        </div>
        <div class="pokemon-info">
            <div class="nombre-contenedor">
                <p class="pokemon-id">#${pokeId}</p>
                <h2 class="pokemon-nombre">${poke.name}</h2>
            </div>
            <div class="pokemon-tipos">
                ${tipos}
            </div>
            <div class="pokemon-stats">
                <p class="stat">H: ${poke.height}m</p>
                <p class="stat">P: ${poke.weight}kg</p>
            </div>
            <p class="click-hint">◆ Tap para detalles ◆</p>
        </div>
    `;
    div.addEventListener("click", () => mostrarDetalles(poke));
    listaPokemon.append(div);
}

function filtrarYMostrar(condicion) {
    listaPokemon.innerHTML = "";
    const pokemonesFiltrados = pokemonCache.filter(condicion);
    pokemonesFiltrados.forEach(poke => mostrarPokemon(poke));
}

botonesHeader.forEach(boton => boton.addEventListener("click", (event) => {
    const botonId = event.currentTarget.id;
    filtroActual = botonId;
    buscador.value = "";

    // Quitar clase active de todos los botones
    botonesHeader.forEach(btn => btn.classList.remove("active"));
    // Añadir clase active al botón clicado
    event.currentTarget.classList.add("active");
    
    if(botonId === "ver-todos") {
        filtrarYMostrar(() => true);
    } else {
        const tipoIngles = tiposMapeo[botonId];
        filtrarYMostrar(data => {
            const tipos = data.types.map(type => type.type.name);
            return tipos.some(tipo => tipo === tipoIngles);
        });
    }
}))

// Funcionalidad del buscador
buscador.addEventListener("input", (e) => {
    const busqueda = e.target.value.toLowerCase();
    
    if (busqueda === "") {
        if (filtroActual === "ver-todos") {
            filtrarYMostrar(() => true);
        } else {
            const botones = document.getElementById(filtroActual);
            botones.click();
        }
    } else {
        filtrarYMostrar(poke => {
            const nombre = poke.name.toLowerCase();
            const id = poke.id.toString().padStart(3, "0");
            return nombre.includes(busqueda) || id.includes(busqueda);
        });
    }
});

// Mostrar detalles del Pokémon en modal
function mostrarDetalles(poke) {
    let pokeId = poke.id.toString().padStart(3, "0");
    let tipos = poke.types.map((type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`).join('');
    
    let statsHTML = poke.stats.map(stat => {
        const statName = stat.stat.name.toUpperCase();
        const value = stat.base_stat;
        const percentage = (value / 255) * 100;
        return `
            <div class="stat-row">
                <span class="stat-name">${statName}</span>
                <div class="stat-bar">
                    <div class="stat-fill" style="width: ${percentage}%"></div>
                </div>
                <span class="stat-value">${value}</span>
            </div>
        `;
    }).join('');
    
    const modalHTML = `
        <div class="modal-overlay" id="modalOverlay">
            <div class="gameboy">
                <!-- Ranura cartucho -->
                <div class="gb-cartridge-slot"></div>

                <!-- Parte superior: power -->
                <div class="gb-top-strip">
                    <div class="gb-power-label">
                        <div class="gb-power-switch"></div>
                        <span class="gb-power-dot"></span>
                        <span class="gb-power-text">POWER</span>
                    </div>
                </div>

                <!-- Pantalla con bisel -->
                <div class="gb-screen-bezel">
                    <div class="gb-bezel-ridges">
                        <div class="gb-ridge"></div>
                        <div class="gb-ridge"></div>
                    </div>
                    <div class="gb-screen-area">
                        <div class="gb-screen-label">DOT MATRIX WITH STEREO SOUND</div>
                        <div class="gb-screen">
                            <div class="gb-screen-content">
                                <div class="gb-screen-top">
                                    <div class="gb-poke-img">
                                        <img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}">
                                    </div>
                                    <div class="gb-poke-info">
                                        <h2 class="gb-poke-name">${poke.name}</h2>
                                        <span class="gb-poke-id">#${pokeId}</span>
                                        <div class="gb-poke-tipos">${tipos}</div>
                                        <div class="gb-poke-medidas">
                                            <span>ALT: ${poke.height / 10}m</span>
                                            <span>PES: ${poke.weight / 10}kg</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="gb-screen-stats">
                                    ${statsHTML}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Branding -->
                <div class="gb-brand">
                    <span class="gb-nintendo">Nintendo</span>
                    <div class="gb-brand-row">
                        <h1 class="gb-title">    GAMEBOY</h1>
                        <span class="gb-tm">TM</span>
                    </div>
                </div>

                <!-- Controles -->
                <div class="gb-controls">
                    <div class="gb-dpad-well">
                        <div class="gb-dpad">
                            <div class="gb-dpad-v"></div>
                            <div class="gb-dpad-h"></div>
                            <div class="gb-dpad-center"></div>
                        </div>
                    </div>
                    <div class="gb-action-area">
                        <div class="gb-action-buttons">
                            <div class="gb-btn-wrap">
                                <button class="gb-btn gb-btn-b" id="modalClose"></button>
                                <span class="gb-btn-label">B</span>
                            </div>
                            <div class="gb-btn-wrap">
                                <button class="gb-btn gb-btn-a"></button>
                                <span class="gb-btn-label">A</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Select / Start -->
                <div class="gb-menu-buttons">
                    <div class="gb-menu-slot">
                        <button class="gb-menu-btn"></button>
                        <span class="gb-menu-label">SELECT</span>
                    </div>
                    <div class="gb-menu-slot">
                        <button class="gb-menu-btn"></button>
                        <span class="gb-menu-label">START</span>
                    </div>
                </div>

                <!-- Speaker -->
                <div class="gb-speaker">
                    <div class="gb-speaker-line"></div>
                    <div class="gb-speaker-line"></div>
                    <div class="gb-speaker-line"></div>
                    <div class="gb-speaker-line"></div>
                    <div class="gb-speaker-line"></div>
                    <div class="gb-speaker-line"></div>
                </div>

                <!-- Tornillo inferior -->
                <div class="gb-screw"></div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    const modal = document.getElementById('modalOverlay');
    const closeBtn = document.getElementById('modalClose');
    
    closeBtn.addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
}

// Cargar todos los Pokémon al iniciar
cargarTodosPokemon();