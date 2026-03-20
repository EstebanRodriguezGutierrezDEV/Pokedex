# 🎮 Pokédex Retro Arcade

Una Pokédex interactiva con diseño retro arcade que permite explorar y filtrar Pokémon de la primera generación (151 Pokémon)

![Pokédex](./assets/pokedex.png)

## 🚀 Características

✨ **Diseño Retro Arcade**
- Gradientes vibrantes y colores saturados
- Efectos 3D con sombras inset/outset
- Bordes chunky y tipografía bold
- Animaciones suaves y efectos visuales dinámicos

🔍 **Funcionalidades**
- **Ver todos los Pokémon** - Galería completa de 151 Pokémon
- **Filtrar por tipo** - 18 tipos diferentes (Fuego, Agua, Planta, etc.)
- **Buscador dinámico** - Busca por nombre o número de ID
- **Modal interactivo** - Haz clic en cualquier tarjeta para ver detalles completos
- **Estadísticas base** - Gráficas visuales de HP, ATK, DEF, etc.
- **Información detallada** - Altura, peso, tipos y más

⚡ **Optimizaciones**
- Caché de datos para carga única
- Filtrado instantáneo
- Animaciones fluidas sin lag
- Responsive en todos los dispositivos

## 🛠️ Tecnologías Utilizadas

### Frontend
- **HTML5** - Estructura semántica
- **CSS3** - Diseño avanzado
  - Flexbox y Grid para layouts
  - Gradientes lineales y radiales
  - Animaciones keyframes
  - Media queries responsive
  - Box-shadow inset/outset
- **JavaScript (ES6+)** - Lógica interactiva
  - Fetch API para consumir datos
  - Async/await
  - DOM manipulation
  - Event listeners

### APIs y Recursos
- **[PokéAPI](https://pokeapi.co/)** - API pública de Pokémon
  - Sprites oficiales
  - Datos completos de Pokémon
  - Información de tipos y estadísticas

- **Google Fonts**
  - Rubik (tipografía principal)
  - Press Start 2P (tipografía arcade)

## 📁 Estructura de Archivos

```
Pokedex/
├── index.html          # Estructura HTML
├── styles.css          # Estilos CSS completos
├── scripts.js          # Lógica JavaScript
├── README.md          # Este archivo
└── assets/
    └── pokedex.png    # Logo Pokédex
```

## 🎯 Cómo Usar

### 1. **Ver Todos los Pokémon**
Abre la página y automáticamente se cargan los 151 Pokémon de la primera generación.

### 2. **Filtrar por Tipo**
- Haz clic en cualquiera de los botones de tipo en la barra superior
- Se mostrarán solo los Pokémon de ese tipo
- Haz clic en "Ver todos" para restaurar la galería completa

### 3. **Buscar Pokémon**
- Usa el input de búsqueda en la parte superior
- Busca por nombre (ej: "pikachu") o por número (ej: "025")
- Los resultados se filtran en tiempo real

### 4. **Ver Detalles**
- Haz clic en cualquier tarjeta de Pokémon
- Se abrirá un modal con:
  - Imagen grande y mejorada
  - Tipos del Pokémon
  - Altura y peso
  - **Gráfica de estadísticas base**
    - HP (Puntos de Salud)
    - ATK (Ataque)
    - DEF (Defensa)
    - SATK (Ataque Especial)
    - SDEF (Defensa Especial)
    - SPD (Velocidad)
- Cierra el modal haciendo clic en la X o fuera del modal

### 5. **Efectos Interactivos**
- Hover sobre tarjetas: Se elevan y escalan con efecto glow
- Hover sobre tipos: Escalan ligeramente
- Animaciones suaves al cargar
- Escaneo CRT continuo de fondo

## 💻 Código Destacado

### Cargando Datos con Async/Await
```javascript
async function cargarTodosPokemon() {
    for (let i = 1; i <= 151; i++) {
        const response = await fetch(URL + i);
        const data = await response.json();
        pokemonCache.push(data);
        mostrarPokemon(data);
    }
}
```

### Filtrado Eficiente
```javascript
function filtrarYMostrar(condicion) {
    listaPokemon.innerHTML = "";
    const pokemonesFiltrados = pokemonCache.filter(condicion);
    pokemonesFiltrados.forEach(poke => mostrarPokemon(poke));
}
```

### Modal Dinámico
```javascript
function mostrarDetalles(poke) {
    // Genera HTML del modal
    const modalHTML = `...`;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    // Agrega event listeners
}
```

## 🎨 Paleta de Colores

### Colores Retro
- **Amarillo**: `#FFD60A`
- **Naranja**: `#FF8C00`
- **Magenta**: `#FF006E`
- **Azul**: `#4A90E2`
- **Verde**: `#06D6A0`

### Colores de Tipos
Cada tipo tiene su color oficial del juego:
- 🔥 Fire: `#F08030`
- 💧 Water: `#6890F0`
- 🌿 Grass: `#78C850`
- ⚡ Electric: `#F8D030`
- Y 14 tipos más...

## 🎬 Animaciones

- **fadeIn**: Entrada suave de elementos
- **slideInDown**: Deslizamiento del header
- **pulse**: Pulso continuo del logo
- **arcade**: Escala dinámica en hover
- **gradientShift**: Cambio de gradiente de fondo
- **scan**: Líneas de escaneo CRT

## 📱 Responsividad

La página se adapta a diferentes tamaños:
- **Móvil** (< 480px): 1 columna
- **Tablet** (480px - 700px): 2 columnas
- **Desktop** (700px - 1024px): 3 columnas
- **Grande** (> 1024px): 4 columnas

## 🔧 Instalación y Ejecución

1. **Clonar o descargar** los archivos
2. **Abrir** `index.html` en un navegador web
3. **¡Listo!** No requiere instalación de dependencias

## 🌟 Características Avanzadas

### Modal Interactivo
- Estructura de una columna para mejor visualización
- Imagen del Pokémon con gradiente retro arcade
- Estadísticas base con barras de progreso visuales
- Información completa en tarjetas estilizadas

### Mapeo de Español a Inglés
```javascript
const tiposMapeo = {
    normal: "normal",
    fuego: "fire",
    agua: "water",
    // ... más tipos
};
```
Permite que los botones en español funcionen con la API en inglés.

### Escaneo CRT
```css
body::before {
    background: repeating-linear-gradient(...);
    animation: scan 8s linear infinite;
}
```
Efecto nostálgico de líneas de escaneo de tubo de rayos catódicos.

## 🚀 Optimizaciones Realizadas

✅ **Caché de Pokémon**: Se cargan una sola vez, se reutilizan para filtrar
✅ **Sin redundancia**: No se vuelven a pedir datos a la API al filtrar
✅ **Lazy rendering**: Solo se renderiza lo que se muestra
✅ **Animaciones GPU**: Usan `transform` y `opacity` para mejor rendimiento
✅ **Event delegation**: Listeners eficientes en elementos

## 📊 Estadísticas del Proyecto

- **151 Pokémon** cargables
- **18 Tipos** diferentes
- **6 Estadísticas** base por Pokémon
- **8+ Animaciones** CSS
- **100% Diseño propio** retro arcade

## 🐛 Problemas Conocidos / Mejoras Futuras

- [ ] Agregar sonidos arcade
- [ ] Evolutions chain
- [ ] Movimientos del Pokémon
- [ ] Comparador de Pokémon
- [ ] Modo oscuro
- [ ] Guardado de favoritos (localStorage)
- [ ] Generaciones adicionales (Gen 2-9)

## 📝 Notas de Desarrollo

### Fetch Error Handling
La app carga 151 Pokémon con try/catch para manejar posibles errores.

### Mapeo de Tipos
Los botones tienen IDs en español pero se mapean a inglés para hacer match con los tipos de la API.

### Modal Dinámico
Se crea el HTML del modal dinámicamente para cada Pokémon, lo que permite reutilizar el código.

## 🎓 Aprendizajes Clave

- Consumo de APIs REST con Fetch
- Async/await en bucles
- DOM manipulation avanzada
- CSS Grid y Flexbox en profundidad
- Animaciones CSS complejas
- Diseño responsive
- Event handling eficiente
- Caché de datos en JavaScript

## 📚 Recursos Utilizados

- [PokéAPI Documentation](https://pokeapi.co/docs/v2)
- [MDN - Fetch API](https://developer.mozilla.org/es/docs/Web/API/fetch)
- [CSS-Tricks](https://css-tricks.com/)
- [Google Fonts](https://fonts.google.com/)

## 👨‍💻 Autor

Proyecto personal de aprendizaje - Marzo 2026

## 📄 Licencia

Uso educativo. Los datos de Pokémon son propiedad de The Pokémon Company.

---

⭐ **¡Disfruta explorando la Pokédex retro!** 🎮✨
