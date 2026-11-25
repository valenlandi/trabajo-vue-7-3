# Draft Mundialista - Proyecto Integrador Vue.js y MySQL

Trabajo de programacion basado en la dinamica de armado de equipos y simulacion de partidos con selecciones historicas.

## Contenido del Proyecto

1. Frontend en Vue 3 con Vite y diseno responsivo.
2. Backend en PHP para recepcion de peticiones PDO.
3. Base de datos relacional con script SQL de inicializacion.
4. Diagrama y documentacion relacional.

## Puesta en Marcha

1. Iniciar Apache y MySQL desde el panel de XAMPP.
2. Importar el archivo juego_draft.sql en phpMyAdmin o consola MySQL.
3. Colocar la carpeta juego-futbol-api dentro del directorio htdocs de Apache.
4. En la carpeta del proyecto, ejecutar:
   npm install
   npm run dev
5. Abrir la direccion web indicada en la terminal.

## Como Funciona el Sistema

1. Nueva Partida: Genera la partida y permite elegir entre diferentes esquemas tacticos.
2. Sorteo de Seleccion: El bolillero consulta un plantel historico al azar.
3. Eleccion de Jugadores: Permite ubicar al futbolista en el puesto deseado de la cancha.
4. Puntajes: Realiza el calculo de puntos acumulados y media general de valoracion.
5. Torneo de Selecciones: Permite simular los partidos de la copa en base a las estadisticas de los equipos.
6. Persistencia: Mantiene los datos en la base de datos o almacenamiento local de respaldo.
7. Estadisticas: Muestra la informacion agregada de futbolistas y valoracion por cada pais.
