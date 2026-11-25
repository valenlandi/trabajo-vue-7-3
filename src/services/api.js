const API_URL = 'http://localhost/juego-futbol-api'

const BASE_LOCAL = {
  selecciones: [
    { id: 1, nombre: 'Argentina' },
    { id: 2, nombre: 'Brasil' },
    { id: 3, nombre: 'Francia' },
    { id: 4, nombre: 'España' },
    { id: 5, nombre: 'Alemania' },
    { id: 6, nombre: 'Italia' }
  ],
  mundiales: [
    { id: 1, anio: 1986 },
    { id: 2, anio: 1998 },
    { id: 3, anio: 2002 },
    { id: 4, anio: 2006 },
    { id: 5, anio: 2010 },
    { id: 6, anio: 2014 },
    { id: 7, anio: 2022 }
  ],
  planteles: [
    { id: 1, seleccion: 'Argentina', anio: 1986 },
    { id: 2, seleccion: 'Argentina', anio: 2022 },
    { id: 3, seleccion: 'Brasil', anio: 2002 },
    { id: 4, seleccion: 'Francia', anio: 1998 },
    { id: 5, seleccion: 'España', anio: 2010 },
    { id: 6, seleccion: 'Alemania', anio: 2014 },
    { id: 7, seleccion: 'Italia', anio: 2006 }
  ],
  jugadoresPorPlantel: {
    1: [
      { plantel_jugador_id: 1, nombre: 'Nery', apellido: 'Pumpido', posicion: 'ARQ', dorsal: 18, valoracion: 86 },
      { plantel_jugador_id: 2, nombre: 'José Luis', apellido: 'Cuciuffo', posicion: 'DEF', dorsal: 9, valoracion: 85 },
      { plantel_jugador_id: 3, nombre: 'José Luis', apellido: 'Brown', posicion: 'DEF', dorsal: 5, valoracion: 87 },
      { plantel_jugador_id: 4, nombre: 'Oscar', apellido: 'Ruggeri', posicion: 'DEF', dorsal: 19, valoracion: 91 },
      { plantel_jugador_id: 5, nombre: 'Julio', apellido: 'Olarticoechea', posicion: 'DEF', dorsal: 16, valoracion: 85 },
      { plantel_jugador_id: 6, nombre: 'Sergio', apellido: 'Batista', posicion: 'MED', dorsal: 2, valoracion: 86 },
      { plantel_jugador_id: 7, nombre: 'Ricardo', apellido: 'Giusti', posicion: 'MED', dorsal: 14, valoracion: 86 },
      { plantel_jugador_id: 8, nombre: 'Héctor', apellido: 'Enrique', posicion: 'MED', dorsal: 12, valoracion: 85 },
      { plantel_jugador_id: 9, nombre: 'Jorge', apellido: 'Burruchaga', posicion: 'MED', dorsal: 7, valoracion: 91 },
      { plantel_jugador_id: 10, nombre: 'Diego', apellido: 'Maradona', posicion: 'MED', dorsal: 10, valoracion: 99 },
      { plantel_jugador_id: 11, nombre: 'Jorge', apellido: 'Valdano', posicion: 'DEL', dorsal: 11, valoracion: 90 }
    ],
    2: [
      { plantel_jugador_id: 12, nombre: 'Emiliano', apellido: 'Martínez', posicion: 'ARQ', dorsal: 23, valoracion: 92 },
      { plantel_jugador_id: 13, nombre: 'Nahuel', apellido: 'Molina', posicion: 'DEF', dorsal: 26, valoracion: 86 },
      { plantel_jugador_id: 14, nombre: 'Cristian', apellido: 'Romero', posicion: 'DEF', dorsal: 13, valoracion: 90 },
      { plantel_jugador_id: 15, nombre: 'Nicolás', apellido: 'Otamendi', posicion: 'DEF', dorsal: 19, valoracion: 88 },
      { plantel_jugador_id: 16, nombre: 'Nicolás', apellido: 'Tagliafico', posicion: 'DEF', dorsal: 3, valoracion: 85 },
      { plantel_jugador_id: 17, nombre: 'Rodrigo', apellido: 'De Paul', posicion: 'MED', dorsal: 7, valoracion: 89 },
      { plantel_jugador_id: 18, nombre: 'Enzo', apellido: 'Fernández', posicion: 'MED', dorsal: 24, valoracion: 91 },
      { plantel_jugador_id: 19, nombre: 'Alexis', apellido: 'Mac Allister', posicion: 'MED', dorsal: 20, valoracion: 89 },
      { plantel_jugador_id: 20, nombre: 'Ángel', apellido: 'Di María', posicion: 'DEL', dorsal: 11, valoracion: 92 },
      { plantel_jugador_id: 21, nombre: 'Lionel', apellido: 'Messi', posicion: 'DEL', dorsal: 10, valoracion: 99 },
      { plantel_jugador_id: 22, nombre: 'Julián', apellido: 'Álvarez', posicion: 'DEL', dorsal: 9, valoracion: 91 }
    ],
    3: [
      { plantel_jugador_id: 23, nombre: 'Marcos', apellido: 'Silveira', posicion: 'ARQ', dorsal: 1, valoracion: 89 },
      { plantel_jugador_id: 24, nombre: 'Cafú', apellido: 'Evangelista', posicion: 'DEF', dorsal: 2, valoracion: 94 },
      { plantel_jugador_id: 25, nombre: 'Lúcio', apellido: 'Ferreira', posicion: 'DEF', dorsal: 3, valoracion: 91 },
      { plantel_jugador_id: 26, nombre: 'Roque', apellido: 'Júnior', posicion: 'DEF', dorsal: 4, valoracion: 87 },
      { plantel_jugador_id: 27, nombre: 'Roberto', apellido: 'Carlos', posicion: 'DEF', dorsal: 6, valoracion: 94 },
      { plantel_jugador_id: 28, nombre: 'Edmílson', apellido: 'Moraes', posicion: 'MED', dorsal: 5, valoracion: 88 },
      { plantel_jugador_id: 29, nombre: 'Gilberto', apellido: 'Silva', posicion: 'MED', dorsal: 8, valoracion: 89 },
      { plantel_jugador_id: 30, nombre: 'Kléberson', apellido: 'Pereira', posicion: 'MED', dorsal: 15, valoracion: 86 },
      { plantel_jugador_id: 31, nombre: 'Ronaldinho', apellido: 'Gaúcho', posicion: 'MED', dorsal: 11, valoracion: 97 },
      { plantel_jugador_id: 32, nombre: 'Rivaldo', apellido: 'Vítor Borba', posicion: 'DEL', dorsal: 10, valoracion: 95 },
      { plantel_jugador_id: 33, nombre: 'Ronaldo', apellido: 'Nazário', posicion: 'DEL', dorsal: 9, valoracion: 98 }
    ],
    4: [
      { plantel_jugador_id: 34, nombre: 'Fabien', apellido: 'Barthez', posicion: 'ARQ', dorsal: 16, valoracion: 91 },
      { plantel_jugador_id: 35, nombre: 'Lilian', apellido: 'Thuram', posicion: 'DEF', dorsal: 15, valoracion: 93 },
      { plantel_jugador_id: 36, nombre: 'Laurent', apellido: 'Blanc', posicion: 'DEF', dorsal: 8, valoracion: 92 },
      { plantel_jugador_id: 37, nombre: 'Marcel', apellido: 'Desailly', posicion: 'DEF', dorsal: 18, valoracion: 94 },
      { plantel_jugador_id: 38, nombre: 'Bixente', apellido: 'Lizarazu', posicion: 'DEF', dorsal: 3, valoracion: 91 },
      { plantel_jugador_id: 39, nombre: 'Didier', apellido: 'Deschamps', posicion: 'MED', dorsal: 7, valoracion: 90 },
      { plantel_jugador_id: 40, nombre: 'Emmanuel', apellido: 'Petit', posicion: 'MED', dorsal: 17, valoracion: 89 },
      { plantel_jugador_id: 41, nombre: 'Zinedine', apellido: 'Zidane', posicion: 'MED', dorsal: 10, valoracion: 98 },
      { plantel_jugador_id: 42, nombre: 'Youri', apellido: 'Djorkaeff', posicion: 'MED', dorsal: 6, valoracion: 90 },
      { plantel_jugador_id: 43, nombre: 'Thierry', apellido: 'Henry', posicion: 'DEL', dorsal: 12, valoracion: 92 },
      { plantel_jugador_id: 44, nombre: 'David', apellido: 'Trezeguet', posicion: 'DEL', dorsal: 20, valoracion: 89 }
    ],
    5: [
      { plantel_jugador_id: 45, nombre: 'Iker', apellido: 'Casillas', posicion: 'ARQ', dorsal: 1, valoracion: 96 },
      { plantel_jugador_id: 46, nombre: 'Sergio', apellido: 'Ramos', posicion: 'DEF', dorsal: 15, valoracion: 94 },
      { plantel_jugador_id: 47, nombre: 'Gerard', apellido: 'Piqué', posicion: 'DEF', dorsal: 3, valoracion: 93 },
      { plantel_jugador_id: 48, nombre: 'Carles', apellido: 'Puyol', posicion: 'DEF', dorsal: 5, valoracion: 95 },
      { plantel_jugador_id: 49, nombre: 'Joan', apellido: 'Capdevila', posicion: 'DEF', dorsal: 11, valoracion: 87 },
      { plantel_jugador_id: 50, nombre: 'Sergio', apellido: 'Busquets', posicion: 'MED', dorsal: 16, valoracion: 93 },
      { plantel_jugador_id: 51, nombre: 'Xabi', apellido: 'Alonso', posicion: 'MED', dorsal: 14, valoracion: 92 },
      { plantel_jugador_id: 52, nombre: 'Xavi', apellido: 'Hernández', posicion: 'MED', dorsal: 8, valoracion: 98 },
      { plantel_jugador_id: 53, nombre: 'Andrés', apellido: 'Iniesta', posicion: 'MED', dorsal: 6, valoracion: 97 },
      { plantel_jugador_id: 54, nombre: 'David', apellido: 'Villa', posicion: 'DEL', dorsal: 7, valoracion: 95 },
      { plantel_jugador_id: 55, nombre: 'Pedro', apellido: 'Rodríguez', posicion: 'DEL', dorsal: 18, valoracion: 89 }
    ],
    6: [
      { plantel_jugador_id: 56, nombre: 'Manuel', apellido: 'Neuer', posicion: 'ARQ', dorsal: 1, valoracion: 96 },
      { plantel_jugador_id: 57, nombre: 'Philipp', apellido: 'Lahm', posicion: 'DEF', dorsal: 16, valoracion: 95 },
      { plantel_jugador_id: 58, nombre: 'Jérôme', apellido: 'Boateng', posicion: 'DEF', dorsal: 20, valoracion: 90 },
      { plantel_jugador_id: 59, nombre: 'Mats', apellido: 'Hummels', posicion: 'DEF', dorsal: 5, valoracion: 93 },
      { plantel_jugador_id: 60, nombre: 'Benedikt', apellido: 'Höwedes', posicion: 'DEF', dorsal: 4, valoracion: 87 },
      { plantel_jugador_id: 61, nombre: 'Bastian', apellido: 'Schweinsteiger', posicion: 'MED', dorsal: 7, valoracion: 93 },
      { plantel_jugador_id: 62, nombre: 'Sami', apellido: 'Khedira', posicion: 'MED', dorsal: 6, valoracion: 89 },
      { plantel_jugador_id: 63, nombre: 'Toni', apellido: 'Kroos', posicion: 'MED', dorsal: 18, valoracion: 94 },
      { plantel_jugador_id: 64, nombre: 'Mesut', apellido: 'Özil', posicion: 'MED', dorsal: 8, valoracion: 92 },
      { plantel_jugador_id: 65, nombre: 'Thomas', apellido: 'Müller', posicion: 'DEL', dorsal: 13, valoracion: 94 },
      { plantel_jugador_id: 66, nombre: 'Miroslav', apellido: 'Klose', posicion: 'DEL', dorsal: 11, valoracion: 91 }
    ],
    7: [
      { plantel_jugador_id: 67, nombre: 'Gianluigi', apellido: 'Buffon', posicion: 'ARQ', dorsal: 1, valoracion: 97 },
      { plantel_jugador_id: 68, nombre: 'Gianluca', apellido: 'Zambrotta', posicion: 'DEF', dorsal: 19, valoracion: 91 },
      { plantel_jugador_id: 69, nombre: 'Fabio', apellido: 'Cannavaro', posicion: 'DEF', dorsal: 5, valoracion: 98 },
      { plantel_jugador_id: 70, nombre: 'Marco', apellido: 'Materazzi', posicion: 'DEF', dorsal: 23, valoracion: 89 },
      { plantel_jugador_id: 71, nombre: 'Fabio', apellido: 'Grosso', posicion: 'DEF', dorsal: 3, valoracion: 88 },
      { plantel_jugador_id: 72, nombre: 'Gennaro', apellido: 'Gattuso', posicion: 'MED', dorsal: 8, valoracion: 91 },
      { plantel_jugador_id: 73, nombre: 'Andrea', apellido: 'Pirlo', posicion: 'MED', dorsal: 21, valoracion: 96 },
      { plantel_jugador_id: 74, nombre: 'Mauro', apellido: 'Camoranesi', posicion: 'MED', dorsal: 16, valoracion: 88 },
      { plantel_jugador_id: 75, nombre: 'Simone', apellido: 'Perrotta', posicion: 'MED', dorsal: 20, valoracion: 87 },
      { plantel_jugador_id: 76, nombre: 'Francesco', apellido: 'Totti', posicion: 'DEL', dorsal: 10, valoracion: 95 },
      { plantel_jugador_id: 77, nombre: 'Alessandro', apellido: 'Del Piero', posicion: 'DEL', dorsal: 7, valoracion: 94 }
    ]
  }
}

function getStorage(key, fallback = []) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch (e) {
    return fallback
  }
}

function setStorage(key, val) {
  try {
    localStorage.setItem(key, JSON.stringify(val))
  } catch (e) {
    console.error(e)
  }
}

export let backendConectado = false

async function pedir(ruta, opciones = {}) {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 2000)

    const respuesta = await fetch(`${API_URL}${ruta}`, {
      ...opciones,
      signal: controller.signal
    })
    clearTimeout(timeoutId)

    const datos = await respuesta.json()
    if (!respuesta.ok) {
      throw new Error(datos.error ?? 'Error del servidor')
    }
    backendConectado = true
    return datos
  } catch (error) {
    backendConectado = false
    return manejarMockLocal(ruta, opciones)
  }
}

function manejarMockLocal(ruta, opciones = {}) {
  const url = new URL(ruta, 'http://localhost')
  const pathname = url.pathname
  const params = url.searchParams

  if (pathname === '/selecciones.php') {
    return BASE_LOCAL.selecciones
  }

  if (pathname === '/sorteo.php') {
    const randomIdx = Math.floor(Math.random() * BASE_LOCAL.planteles.length)
    const p = BASE_LOCAL.planteles[randomIdx]
    return {
      plantel_id: p.id,
      seleccion: p.seleccion,
      anio: p.anio
    }
  }

  if (pathname === '/jugadores.php') {
    const plantelId = parseInt(params.get('plantel_id') || '1')
    const posicion = params.get('posicion') || ''
    const list = BASE_LOCAL.jugadoresPorPlantel[plantelId] || []
    if (posicion) {
      return list.filter(j => j.posicion.toUpperCase() === posicion.toUpperCase())
    }
    return list
  }

  if (pathname === '/partidas.php' && opciones.method === 'POST') {
    const body = JSON.parse(opciones.body || '{}')
    const partidas = getStorage('mock_partidas', [])
    const newId = partidas.length + 100
    partidas.push({
      id: newId,
      nombre_equipo: body.nombre_equipo || 'Mi equipo',
      formacion: body.formacion || '4-3-3',
      fecha_inicio: new Date().toISOString()
    })
    setStorage('mock_partidas', partidas)
    return { id: newId }
  }

  if (pathname === '/guardar_jugador.php' && opciones.method === 'POST') {
    const body = JSON.parse(opciones.body || '{}')
    const equipo = getStorage(`mock_equipo_${body.partida_id}`, [])
    const filtrado = equipo.filter(item => item.slot !== body.slot && item.plantel_jugador_id !== body.plantel_jugador_id)
    
    let jugadorData = null
    let plantelInfo = null
    for (const [pid, roster] of Object.entries(BASE_LOCAL.jugadoresPorPlantel)) {
      const match = roster.find(j => j.plantel_jugador_id === body.plantel_jugador_id)
      if (match) {
        jugadorData = match
        plantelInfo = BASE_LOCAL.planteles.find(p => p.id === parseInt(pid))
        break
      }
    }

    if (jugadorData) {
      filtrado.push({
        slot: body.slot,
        plantel_jugador_id: body.plantel_jugador_id,
        nombre: jugadorData.nombre,
        apellido: jugadorData.apellido,
        posicion: jugadorData.posicion,
        dorsal: jugadorData.dorsal,
        valoracion: jugadorData.valoracion,
        seleccion: plantelInfo ? plantelInfo.seleccion : 'Selección',
        anio: plantelInfo ? plantelInfo.anio : 2022
      })
      setStorage(`mock_equipo_${body.partida_id}`, filtrado)
    }
    return { ok: true }
  }

  if (pathname === '/quitar_jugador.php' && opciones.method === 'POST') {
    const body = JSON.parse(opciones.body || '{}')
    const equipo = getStorage(`mock_equipo_${body.partida_id}`, [])
    const filtrado = equipo.filter(item => item.slot !== body.slot)
    setStorage(`mock_equipo_${body.partida_id}`, filtrado)
    return { ok: true }
  }

  if (pathname === '/equipo.php') {
    const partidaId = params.get('partida_id')
    return getStorage(`mock_equipo_${partidaId}`, [])
  }

  if (pathname === '/guardar_resultado.php' && opciones.method === 'POST') {
    const body = JSON.parse(opciones.body || '{}')
    const resultados = getStorage(`mock_resultados_${body.partida_id}`, [])
    resultados.push(body)
    setStorage(`mock_resultados_${body.partida_id}`, resultados)
    return { ok: true }
  }

  if (pathname === '/estadisticas.php') {
    return [
      { seleccion: 'Argentina', cantidad_jugadores: 22, promedio_valoracion: '90.2' },
      { seleccion: 'Brasil', cantidad_jugadores: 11, promedio_valoracion: '92.3' },
      { seleccion: 'España', cantidad_jugadores: 11, promedio_valoracion: '93.7' },
      { seleccion: 'Alemania', cantidad_jugadores: 11, promedio_valoracion: '92.2' },
      { seleccion: 'Francia', cantidad_jugadores: 11, promedio_valoracion: '91.8' },
      { seleccion: 'Italia', cantidad_jugadores: 11, promedio_valoracion: '91.9' }
    ]
  }

  return { ok: true }
}

export function obtenerSelecciones() {
  return pedir('/selecciones.php')
}

export function obtenerSorteo() {
  return pedir('/sorteo.php')
}

export function obtenerJugadores(plantelId, posicion = '') {
  const pos = encodeURIComponent(posicion)
  return pedir(`/jugadores.php?plantel_id=${plantelId}&posicion=${pos}`)
}

export function crearPartida(nombreEquipo, formacion) {
  return pedir('/partidas.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      nombre_equipo: nombreEquipo,
      formacion
    })
  })
}

export function guardarJugador(partidaId, plantelJugadorId, slot) {
  return pedir('/guardar_jugador.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      partida_id: partidaId,
      plantel_jugador_id: plantelJugadorId,
      slot
    })
  })
}

export function cargarEquipo(partidaId) {
  return pedir(`/equipo.php?partida_id=${partidaId}`)
}

export function quitarJugador(partidaId, slot) {
  return pedir('/quitar_jugador.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ partida_id: partidaId, slot })
  })
}

export function guardarResultado(partidaId, ronda, rival, golesFavor, golesContra) {
  return pedir('/guardar_resultado.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      partida_id: partidaId,
      ronda,
      rival,
      goles_favor: golesFavor,
      goles_contra: golesContra
    })
  })
}

export function obtenerEstadisticas() {
  return pedir('/estadisticas.php')
}
