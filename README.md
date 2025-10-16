# 🧠 El Diario de Mewtwo

> **Proyecto Final Integrador – React**  
> Una experiencia narrativa e interactiva inspirada en el universo Pokémon.  
> Desarrollado por **Pedro Báez**.

---

## 🎯 Descripción General

**Nombre del Proyecto:** `El Diario de Mewtwo`  
**Repositorio:** `tp-final-react-Pedro_Baez`  
**Tipo:** Aplicación Web – Proyecto Final React  
**Estado:** 🟢 **En progreso avanzado**  
**Tema:** Mewtwo como narrador que documenta observaciones sobre otros Pokémon.

---

## 📖 Concepto y Narrativa

“El Diario de Mewtwo” trasciende la Pokédex tradicional.  
El usuario se adentra en los pensamientos y análisis de **Mewtwo**, quien registra sus observaciones sobre las criaturas que encuentra durante sus viajes.

### 🧩 Elementos Narrativos

- 🧠 Mewtwo como **narrador principal**
- 🗒️ **Comentarios y reflexiones** sobre cada Pokémon
- 🌍 **Galería de regiones** visitadas
- ⭐ **Sistema de favoritos**: “Pokémon de interés especial”

---

## ⚙️ Instalación y Configuración

### 📦 Requisitos Previos

- Node.js v16 o superior  
- npm o yarn como gestor de paquetes

### 🧰 Pasos de instalación

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/tp-final-react-Pedro_Baez.git

# Entrar al proyecto
cd tp-final-react-Pedro_Baez

# Instalar dependencias
npm install

# (Opcional) Instalar React Router DOM si no está incluido
npm install react-router-dom
```

### 🚀 Iniciar el servidor

```bash
npm run dev
```

> La aplicación se ejecutará en: [http://localhost:5173](http://localhost:5173)

---

## 🧭 Navegación (React Router DOM v6)

```jsx
// main.jsx
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
```

```jsx
// App.jsx
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ListPokemon from "./pages/ListPokemon";
import PokemonDescription from "./pages/PokemonDescription";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/list" element={<ListPokemon />} />
      <Route path="/pokemon/:id" element={<PokemonDescription />} />
    </Routes>
  );
}
```

---

## 🎮 Funcionamiento General

### 🔄 Flujo Principal

1. **Inicio** → Presentación narrativa de Mewtwo  
2. **Listado** → Exploración de Pokémon observados  
3. **Detalle** → Análisis y comentarios  
4. **Favoritos** → Colección personal de Mewtwo  

### 🏠 Inicio – El Estudio de Mewtwo
- Hero principal con imagen de Mewtwo  
- Galería de regiones visitadas  
- Quiz interactivo: *¿Cuánto sabes sobre Mewtwo?*  
- Contexto narrativo del proyecto  

### 📜 Listado de Pokémon
- Búsqueda en tiempo real  
- Filtros por región  
- Carga paginada  
- Favoritos persistentes  
- Diseño responsive  

### 🔎 Descripción de Pokémon
- Estadísticas visuales  
- Evoluciones y movimientos  
- Comentarios exclusivos de Mewtwo  
- Integración de audio  

---

## 🛠️ Tecnologías Utilizadas

| Tipo | Herramienta |
|------|--------------|
| Framework | React 18 |
| Bundler | Vite |
| Enrutamiento | React Router DOM |
| Estilos | CSS Modules |
| API | [PokeAPI](https://pokeapi.co/) |
| Estado y lógica | Custom Hooks + useState |
| Persistencia | localStorage |

---

## 🧱 Arquitectura del Proyecto

```
src/
├── assets/
│   ├── Hero/
│   ├── Mewtwo_regions/
│   └── ...
├── components/
│   ├── common/ (Header, Footer)
│   ├── home/ (Hero, Galería, Quiz)
│   ├── info_pokemon/ (PokeCard, Filtros, Grid)
│   └── Pokemon_Descript/ (Stats, Audio, Evolutions)
├── pages/
│   ├── Home.jsx
│   ├── ListPokemon.jsx
│   └── PokemonDescription.jsx
└── hooks/
    ├── usePokemonData.js
    └── usePokemonQuiz.js
```

---

## 🎨 Experiencia de Usuario

### 📱 Diseño Responsive
- Mobile-first  
- Adaptación a tablet y escritorio  
- Grillas dinámicas  

### ♿ Accesibilidad
- Navegación por teclado  
- Colores con contraste adecuado  
- Etiquetas ARIA y manejo de foco  

### ⚡ Performance
- Lazy loading de componentes  
- Code splitting  
- Caché de API  
- Optimización de imágenes  

---

## 🌟 Características Destacadas

| Categoría | Características |
|------------|----------------|
| Narrativa | Mewtwo como narrador, diario con comentarios |
| Funcionalidad | Favoritos, búsqueda, filtros, carga dinámica |
| Interactividad | Quiz, sonidos, animaciones |
| Técnica | Hooks personalizados, API dinámica, manejo de errores |

---

## 📊 Estado de Desarrollo

### ✅ Completado
- [x] Estructura base y componentes  
- [x] Integración con PokeAPI  
- [x] Enrutamiento React Router  
- [x] Diseño responsive  
- [x] Sistema de favoritos  
- [x] Documentación base  

### 🚀 Próximos pasos
1. Testing y depuración final  
2. Mejora de rendimiento  
3. Publicación (Netlify / Vercel)  
4. Guía de usuario final  

---

## 🎓 Conclusión

> **El Diario de Mewtwo** fusiona desarrollo técnico y narrativa interactiva, ofreciendo una experiencia única dentro del mundo Pokémon.

**Puntos fuertes:**
- ⚛️ Base sólida en React + Vite  
- 🎨 UI inmersiva y responsiva  
- 🧠 Narrativa original  
- ⚙️ Código modular y escalable  

> ✨ *“Más que una Pokédex, una historia contada por el Pokémon más consciente de todos.”*

---

© 2025 - Proyecto Final React · Pedro Báez
