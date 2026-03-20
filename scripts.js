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
            <div class="modal-content">
                <button class="modal-close" id="modalClose">✕</button>
                <div class="modal-header">
                    <h1>${poke.name}</h1>
                    <span class="modal-id">#${pokeId}</span>
                </div>
                <div class="modal-body">
                    <div class="modal-imagen">
                        <img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}">
                    </div>
                    <div class="modal-info">
                        <div class="info-section">
                            <h3>Tipos</h3>
                            <div class="modal-tipos">
                                ${tipos}
                            </div>
                        </div>
                        <div class="info-section">
                            <h3>Medidas</h3>
                            <p><strong>Altura:</strong> ${poke.height / 10}m</p>
                            <p><strong>Peso:</strong> ${poke.weight / 10}kg</p>
                        </div>
                        <div class="info-section">
                            <h3>Estadísticas Base</h3>
                            <div class="stats-container">
                                ${statsHTML}
                            </div>
                        </div>
                    </div>
                </div>
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