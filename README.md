# Mundial 2026 · Fixture interactivo

Aplicación de una sola página (SPA) para seguir el **Mundial FIFA 2026** (USA · Canadá · México): grupos, calendario, vista por equipo y llave de eliminatorias. Los resultados se cargan **a mano** y todo se recalcula y se guarda automáticamente en el navegador.

Hecho con **Svelte 5 + Vite + TypeScript**.

## Características

- **Grupos:** las 12 tablas de posiciones se recalculan solas al cargar resultados (puntos, diferencia de gol, goles, desempate por enfrentamientos directos). Resalta los 2 que clasifican y los terceros.
- **Calendario:** los 104 partidos ordenados por día, con encabezados por fecha.
- **Por equipo:** filtrá un equipo y mirá todos sus partidos (grupos + eliminatorias) y su resumen.
- **Llave:** ronda de 32 → final + tercer puesto. En la ronda de 32 elegís los clasificados; en las rondas siguientes los ganadores avanzan automáticamente. Empates con definición por penales.
- **Horarios:** por defecto en **hora de Argentina**, con selector de huso (sede, UTC, México, España, etc.). La conversión usa la hora local oficial de cada sede.
- **Favorito:** Argentina viene marcada por defecto (se puede cambiar) y se resalta en toda la app.
- **Persistencia:** todo queda en `localStorage` de tu navegador. El botón *Reiniciar* borra los resultados.

## Cómo correrlo

```bash
npm install
npm run dev        # servidor de desarrollo (http://localhost:5173)
```

Otros scripts:

```bash
npm run build      # build de producción en dist/
npm run preview    # previsualizar el build
npm run check      # chequeo de tipos (svelte-check)
```

## Estructura

```
src/
├── App.svelte                 # header, pestañas y orquestación
├── main.ts                    # punto de entrada (mount de Svelte 5)
├── app.css                    # sistema de diseño (tema oscuro deportivo)
├── lib/
│   ├── types.ts               # tipos del dominio
│   ├── flags.ts               # banderas emoji desde códigos de país
│   ├── time.ts                # husos horarios y formato de fechas
│   ├── standings.ts           # cálculo de tablas y ranking de terceros
│   ├── bracket.ts             # resolución de la llave (propaga ganadores)
│   ├── store.svelte.ts        # estado global (runes) + persistencia
│   └── data/
│       ├── teams.ts           # los 48 equipos
│       ├── venues.ts          # las 16 sedes con su huso
│       ├── groupMatches.ts    # 72 partidos de grupos
│       └── knockoutMatches.ts # 32 partidos de eliminatorias + árbol
└── components/
    ├── GroupsView.svelte / GroupCard.svelte / StandingsTable.svelte
    ├── CalendarView.svelte
    ├── TeamView.svelte
    ├── BracketView.svelte
    ├── MatchCard.svelte       # tarjeta de partido con carga de resultado
    ├── TeamLabel.svelte
    ├── TimezoneSelector.svelte
    └── FavoriteSelector.svelte
```

## Notas sobre los datos

- Grupos, sedes, fechas y horarios provienen del sorteo y del calendario oficial publicado en diciembre de 2025. Los 3 cupos de repechaje están resueltos: **Chequia** (Grupo A), **Bosnia y Herzegovina** (B), **Turquía** (D), **Suecia** (F), **Irak** (I) y **RD Congo** (K).
- Los horarios se guardan en **hora local de cada sede** y se convierten a la zona elegida en el navegador (EE.UU./Canadá con horario de verano; México sin horario de verano).
- En la **llave**, las etiquetas de los cruces de la ronda de 32 (1A, 2B, 3º…) son orientativas: el cruce exacto —sobre todo el de los 8 mejores terceros— se define recién al cerrar la fase de grupos. Por eso los equipos de la ronda de 32 se asignan a mano; de ahí en adelante avanzan solos.

## Ideas para más adelante

- Autocompletar los clasificados de la ronda de 32 a partir de las tablas (incluyendo la asignación oficial de terceros).
- Actualización automática de resultados (vía API), reemplazando la carga manual.
- Exportar/importar el estado para compartir un pronóstico.
