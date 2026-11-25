<template>
  <div>
    <header class="barra-superior">
      <div class="cabecera-logo">
        <div class="icono-escudo">DM</div>
        <div>
          <h1 class="nombre-sitio">Draft Mundialista</h1>
          <div class="bajada-sitio">Armador de equipos y simulador de copa</div>
        </div>
      </div>

      <div class="cabecera-derecha">
        <span 
          :class="['indicador-conexion', isBackendOnline ? 'conectado' : 'desconectado']"
          :title="isBackendOnline ? 'Conectado a la base de datos MySQL' : 'Ejecutando en modo local'"
        >
          <span class="punto-estado"></span>
          {{ isBackendOnline ? 'Base de Datos Activa' : 'Modo Local / Demo' }}
        </span>
      </div>
    </header>

    <section class="tablero-resumen">
      <div class="caja-metrica">
        <span class="metrica-etiqueta">Puntos Acumulados</span>
        <span class="metrica-valor dorado">{{ totalPuntos }}</span>
      </div>
      <div class="caja-metrica">
        <span class="metrica-etiqueta">Media del Once</span>
        <span class="metrica-valor azul">{{ promedioValoracion }}</span>
      </div>
      <div class="caja-metrica">
        <span class="metrica-etiqueta">Futbolistas Titulares</span>
        <span class="metrica-valor verde">{{ jugadoresContados }} / 11</span>
      </div>
      <div class="caja-metrica">
        <span class="metrica-etiqueta">Formacion Tactica</span>
        <select 
          v-model="formacionActual" 
          class="selector-esquema"
          @change="manejarCambioFormacion"
        >
          <option v-for="(f, k) in formacionesDisponibles" :key="k" :value="k">
            {{ f.nombre }}
          </option>
        </select>
      </div>
    </section>

    <div v-if="notificacion" class="barra-aviso" :class="notifTipo">
      <span>{{ notificacion }}</span>
      <button class="boton-cerrar-aviso" @click="notificacion = ''">x</button>
    </div>

    <main class="contenedor-general">
      <aside class="seccion-sorteo">
        <div class="tarjeta-bloque">
          <div class="encabezado-bloque">
            <span class="titulo-bloque">Bolillero de Selecciones</span>
            <button 
              class="boton-accion boton-primario" 
              @click="tirar"
              :disabled="cargandoSorteo"
            >
              {{ cargandoSorteo ? 'Girando...' : 'Sortear Pais' }}
            </button>
          </div>

          <div v-if="sorteo" class="visor-sorteo">
            <div class="bandera-codigo">[{{ obtenerCodigoPais(sorteo.seleccion) }}]</div>
            <div class="equipo-titulo">{{ sorteo.seleccion }}</div>
            <div class="equipo-anio">Edicion {{ sorteo.anio }}</div>
          </div>
          <div v-else class="visor-sorteo">
            <div class="bandera-codigo">[SIN SELECCION]</div>
            <div class="equipo-titulo">Gira el bolillero</div>
            <div class="equipo-anio">Sortea un pais historico</div>
          </div>

          <div class="fila-filtros">
            <button 
              v-for="p in ['TODOS', 'DEL', 'MED', 'DEF', 'ARQ']" 
              :key="p"
              class="boton-filtro"
              :class="{ activo: filtroPosicion === p }"
              @click="cambiarFiltro(p)"
            >
              {{ p }}
            </button>
          </div>

          <div class="aviso-destino">
            Posicion a cubrir: <strong>{{ slotSeleccionado }}</strong>
          </div>

          <div class="lista-candidatos">
            <div 
              v-for="jugador in candidatosFiltrados" 
              :key="jugador.plantel_jugador_id"
              class="tarjeta-jugador-draft"
            >
              <div class="datos-jugador-izq">
                <div class="ovr-circulo">{{ jugador.valoracion }}</div>
                <div>
                  <div class="jugador-nombre">{{ jugador.nombre }} {{ jugador.apellido }}</div>
                  <div class="jugador-subdatos">
                    <span class="placa-posicion">{{ jugador.posicion }}</span>
                    <span>Nro {{ jugador.dorsal || '-' }}</span>
                  </div>
                </div>
              </div>

              <button 
                class="boton-sumar"
                :disabled="yaElegido(jugador.plantel_jugador_id)"
                @click="elegir(jugador, slotSeleccionado)"
              >
                {{ yaElegido(jugador.plantel_jugador_id) ? 'En cancha' : 'Sumar al 11' }}
              </button>
            </div>

            <div v-if="candidatosFiltrados.length === 0" class="mensaje-vacio">
              No hay futbolistas para mostrar. Presiona Sortear Pais para comenzar.
            </div>
          </div>
        </div>
      </aside>

      <section class="seccion-cancha">
        <div class="tarjeta-bloque">
          <div class="barra-cancha-superior">
            <div class="grupo-tactico">
              <span class="titulo-bloque">Campo de Juego</span>
            </div>

            <div class="acciones-cancha">
              <button class="boton-accion boton-secundario" @click="mostrarModalStats = true">
                Estadisticas
              </button>
              <button 
                class="boton-accion boton-dorado" 
                @click="iniciarSimulacionTorneo"
                :disabled="jugadoresContados === 0"
              >
                Jugar Torneo
              </button>
              <button class="boton-accion boton-primario" @click="comenzarPartida">
                Reiniciar 11
              </button>
            </div>
          </div>

          <div class="campo-futbol" style="margin-top: 14px;">
            <div class="area-arquero-arriba"></div>
            <div class="linea-mitad"></div>
            <div class="circulo-central"></div>
            <div class="area-arquero-abajo"></div>

            <div 
              v-for="(fila, fIndex) in formacionActualObj.filas" 
              :key="fIndex"
              class="fila-tactica"
            >
              <div 
                v-for="posKey in fila.slots" 
                :key="posKey"
                class="casilla-cancha"
                :class="{ 'seleccionada': slotSeleccionado === posKey }"
                @click="seleccionarSlot(posKey, fila.categoria)"
              >
                <div v-if="equipoPorSlot[posKey]" class="tarjeta-titular">
                  <button 
                    class="boton-sacar-slot" 
                    title="Quitar de la alineacion"
                    @click.stop="quitar(posKey)"
                  >x</button>
                  <div class="titular-arriba">
                    <span class="titular-ovr">{{ equipoPorSlot[posKey].valoracion }}</span>
                    <span class="titular-pos">{{ posKey }}</span>
                  </div>
                  <div class="titular-dorsal">{{ equipoPorSlot[posKey].dorsal || '10' }}</div>
                  <div class="titular-nombre">{{ equipoPorSlot[posKey].nombre }} {{ equipoPorSlot[posKey].apellido }}</div>
                  <div class="titular-pais">{{ equipoPorSlot[posKey].seleccion }} {{ equipoPorSlot[posKey].anio }}</div>
                </div>

                <div v-else class="casilla-vacia">
                  <span class="campo-pos-codigo">{{ posKey }}</span>
                  <span class="campo-subtexto">{{ fila.categoria }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <div v-if="mostrarModalTorneo" class="fondo-modal" @click.self="mostrarModalTorneo = false">
      <div class="caja-modal">
        <button class="boton-cerrar-modal" @click="mostrarModalTorneo = false">x</button>
        <h2 class="titulo-modal">Torneo de Selecciones</h2>
        <p class="descripcion-modal">
          Tu equipo (Media: {{ promedioValoracion }} | {{ totalPuntos }} pts | Formato: {{ formacionActual }}) juega los mano a mano eliminatorios.
        </p>

        <div v-for="(m, i) in partidosTorneo" :key="i" class="tarjeta-partido">
          <div class="columna-equipo">
            <div class="nombre-equipo-partido">Mi Seleccion</div>
            <div class="marcador-partido">{{ m.jugado ? m.golesFavor : '-' }}</div>
          </div>
          <div class="columna-medio">
            <div class="etiqueta-ronda">{{ m.ronda }}</div>
            <div class="texto-vs">VS</div>
          </div>
          <div class="columna-equipo">
            <div class="nombre-equipo-partido">{{ m.rival }}</div>
            <div class="marcador-partido">{{ m.jugado ? m.golesContra : '-' }}</div>
          </div>
        </div>

        <div style="text-align: center; margin-top: 20px;">
          <button 
            v-if="rondaTorneoActual < partidosTorneo.length && !torneoTerminado" 
            class="boton-accion boton-dorado" 
            style="font-size: 0.95rem; padding: 12px 24px;"
            @click="jugarRondaSiguiente"
          >
            Simular {{ partidosTorneo[rondaTorneoActual].ronda }}
          </button>
          <div v-else-if="campeon" style="color: #34d399; font-weight: 700; font-size: 1.05rem;">
            Felicitaciones, tu equipo gano la copa del mundo.
          </div>
          <div v-else style="color: #f87171; font-weight: 700; font-size: 1rem;">
            Tu equipo quedo eliminado en esta fase. Podes reiniciar e intentar con otros jugadores.
          </div>
        </div>
      </div>
    </div>

    <div v-if="mostrarModalStats" class="fondo-modal" @click.self="mostrarModalStats = false">
      <div class="caja-modal">
        <button class="boton-cerrar-modal" @click="mostrarModalStats = false">x</button>
        <h2 class="titulo-modal">Promedios por Seleccion</h2>
        <p class="descripcion-modal">
          Registro general de jugadores y valoracion media por cada seleccion disponible:
        </p>

        <table class="tabla-estadisticas">
          <thead>
            <tr>
              <th>Pais</th>
              <th>Cantidad</th>
              <th>Promedio</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="st in listaEstadisticas" :key="st.seleccion">
              <td>
                <strong>[{{ obtenerCodigoPais(st.seleccion) }}] {{ st.seleccion }}</strong>
              </td>
              <td>{{ st.cantidad_jugadores }} jugadores</td>
              <td>
                <span class="placa-rating-stats">{{ st.promedio_valoracion }} OVR</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import {
  obtenerSorteo,
  obtenerJugadores,
  crearPartida,
  guardarJugador,
  cargarEquipo,
  quitarJugador,
  guardarResultado,
  obtenerEstadisticas,
  backendConectado
} from './services/api.js'

let contadorSorteos = 0

const formacionesDisponibles = {
  '4-3-3': {
    nombre: '4-3-3 Clasico',
    filas: [
      { categoria: 'DEL', slots: ['EI', 'DC', 'ED'] },
      { categoria: 'MED', slots: ['MC1', 'MC2', 'MC3'] },
      { categoria: 'DEF', slots: ['LI', 'DFC1', 'DFC2', 'LD'] },
      { categoria: 'ARQ', slots: ['ARQ'] }
    ]
  },
  '4-4-2': {
    nombre: '4-4-2 Lineal',
    filas: [
      { categoria: 'DEL', slots: ['DC1', 'DC2'] },
      { categoria: 'MED', slots: ['MI', 'MC1', 'MC2', 'MD'] },
      { categoria: 'DEF', slots: ['LI', 'DFC1', 'DFC2', 'LD'] },
      { categoria: 'ARQ', slots: ['ARQ'] }
    ]
  },
  '3-5-2': {
    nombre: '3-5-2 Carrileros',
    filas: [
      { categoria: 'DEL', slots: ['DC1', 'DC2'] },
      { categoria: 'MED', slots: ['MI', 'MC1', 'MC2', 'MC3', 'MD'] },
      { categoria: 'DEF', slots: ['DFC1', 'DFC2', 'DFC3'] },
      { categoria: 'ARQ', slots: ['ARQ'] }
    ]
  },
  '3-4-3': {
    nombre: '3-4-3 Ofensivo',
    filas: [
      { categoria: 'DEL', slots: ['EI', 'DC', 'ED'] },
      { categoria: 'MED', slots: ['MI', 'MC1', 'MC2', 'MD'] },
      { categoria: 'DEF', slots: ['DFC1', 'DFC2', 'DFC3'] },
      { categoria: 'ARQ', slots: ['ARQ'] }
    ]
  },
  '4-2-3-1': {
    nombre: '4-2-3-1 Con Enganche',
    filas: [
      { categoria: 'DEL', slots: ['DC'] },
      { categoria: 'MED', slots: ['MCO1', 'MCO2', 'MCO3'] },
      { categoria: 'MED', slots: ['MCD1', 'MCD2'] },
      { categoria: 'DEF', slots: ['LI', 'DFC1', 'DFC2', 'LD'] },
      { categoria: 'ARQ', slots: ['ARQ'] }
    ]
  },
  '5-3-2': {
    nombre: '5-3-2 Defensivo',
    filas: [
      { categoria: 'DEL', slots: ['DC1', 'DC2'] },
      { categoria: 'MED', slots: ['MC1', 'MC2', 'MC3'] },
      { categoria: 'DEF', slots: ['CAI', 'DFC1', 'DFC2', 'DFC3', 'CAD'] },
      { categoria: 'ARQ', slots: ['ARQ'] }
    ]
  }
}

const formacionActual = ref('4-3-3')
const partidaId = ref(null)
const sorteo = ref(null)
const candidatos = ref([])
const equipo = ref([])
const cargandoSorteo = ref(false)
const notificacion = ref('')
const notifTipo = ref('success')
const isBackendOnline = ref(false)

const slotSeleccionado = ref('DC')
const filtroPosicion = ref('TODOS')
const mostrarModalTorneo = ref(false)
const mostrarModalStats = ref(false)
const listaEstadisticas = ref([])

const rondaTorneoActual = ref(0)
const campeon = ref(false)
const torneoTerminado = ref(false)
const partidosTorneo = ref([
  { ronda: 'Cuartos de final', rival: 'Alemania 2014', jugado: false, golesFavor: 0, golesContra: 0, ovrRival: 92 },
  { ronda: 'Semifinal', rival: 'Brasil 2002', jugado: false, golesFavor: 0, golesContra: 0, ovrRival: 94 },
  { ronda: 'Gran Final', rival: 'Francia 1998', jugado: false, golesFavor: 0, golesContra: 0, ovrRival: 95 }
])

const formacionActualObj = computed(() => {
  return formacionesDisponibles[formacionActual.value] || formacionesDisponibles['4-3-3']
})

const slotsActuales = computed(() => {
  const lista = []
  formacionActualObj.value.filas.forEach(f => {
    f.slots.forEach(s => lista.push(s))
  })
  return lista
})

const equipoPorSlot = computed(() => {
  const mapa = {}
  equipo.value.forEach(item => {
    if (slotsActuales.value.includes(item.slot)) {
      mapa[item.slot] = item
    }
  })
  return mapa
})

const primerSlotDisponible = computed(() => {
  return slotsActuales.value.find(s => !equipoPorSlot.value[s]) || null
})

const candidatosFiltrados = computed(() => {
  if (filtroPosicion.value === 'TODOS') return candidatos.value
  return candidatos.value.filter(j => j.posicion.toUpperCase() === filtroPosicion.value.toUpperCase())
})

const totalPuntos = computed(() => {
  return Object.values(equipoPorSlot.value).reduce((acc, curr) => acc + Number(curr.valoracion || 0), 0)
})

const promedioValoracion = computed(() => {
  const cantidad = Object.values(equipoPorSlot.value).length
  if (cantidad === 0) return '0.0'
  return (totalPuntos.value / cantidad).toFixed(1)
})

const jugadoresContados = computed(() => Object.values(equipoPorSlot.value).length)

function manejarCambioFormacion() {
  localStorage.setItem('formacion_elegida', formacionActual.value)
  if (!slotsActuales.value.includes(slotSeleccionado.value)) {
    slotSeleccionado.value = primerSlotDisponible.value || slotsActuales.value[0]
  }
  mostrarNotificacion(`Esquema tactico cambiado a ${formacionActual.value}`)
}

function obtenerCodigoPais(nombre) {
  if (!nombre) return 'PAIS'
  const n = nombre.toLowerCase()
  if (n.includes('arg')) return 'ARG'
  if (n.includes('bra')) return 'BRA'
  if (n.includes('fra')) return 'FRA'
  if (n.includes('esp')) return 'ESP'
  if (n.includes('ale')) return 'ALE'
  if (n.includes('ita')) return 'ITA'
  return 'SEL'
}

function yaElegido(plantelJugadorId) {
  return Object.values(equipoPorSlot.value).some(item => item.plantel_jugador_id === plantelJugadorId)
}

function seleccionarSlot(slot, categoria = null) {
  slotSeleccionado.value = slot
  if (categoria) {
    filtroPosicion.value = categoria
  } else {
    if (slot === 'ARQ') filtroPosicion.value = 'ARQ'
    else if (slot.includes('DF') || ['LI', 'LD', 'CAI', 'CAD'].includes(slot)) filtroPosicion.value = 'DEF'
    else if (slot.includes('MC') || ['MI', 'MD', 'MCD1', 'MCD2', 'MCO1', 'MCO2', 'MCO3'].includes(slot)) filtroPosicion.value = 'MED'
    else filtroPosicion.value = 'DEL'
  }
}

function cambiarFiltro(pos) {
  filtroPosicion.value = pos
}

async function comenzarPartida() {
  try {
    const res = await crearPartida('Mi Seleccion', formacionActual.value)
    partidaId.value = Number(res.id)
    localStorage.setItem('partidaId', partidaId.value)
    localStorage.setItem('formacion_elegida', formacionActual.value)
    equipo.value = []
    slotSeleccionado.value = slotsActuales.value[0] || 'DC'
    mostrarNotificacion('Alineacion reiniciada. Gira el bolillero para empezar a armar el equipo.')
    await tirar()
  } catch (e) {
    mostrarNotificacion('No se pudo crear la partida: ' + e.message, 'error')
  }
}

async function tirar() {
  try {
    cargandoSorteo.value = true
    contadorSorteos++
    const res = await obtenerSorteo()
    sorteo.value = res
    const list = await obtenerJugadores(res.plantel_id)
    candidatos.value = list
    isBackendOnline.value = backendConectado
    console.log("sorteo ejecutado correctamente")
    mostrarNotificacion(`Sorteado: ${res.seleccion} ${res.anio}. Ya podes seleccionar tu jugador.`)
  } catch (e) {
    mostrarNotificacion('Error en el sorteo: ' + e.message, 'error')
  } finally {
    cargandoSorteo.value = false
  }
}

async function elegir(jugador, slot) {
  if (!partidaId.value) {
    await comenzarPartida()
  }

  const targetSlot = slot || primerSlotDisponible.value || slotsActuales.value[0]

  try {
    await guardarJugador(partidaId.value, jugador.plantel_jugador_id, targetSlot)
    equipo.value = await cargarEquipo(partidaId.value)
    isBackendOnline.value = backendConectado
    mostrarNotificacion(`${jugador.nombre} ${jugador.apellido} ubicado en ${targetSlot}`)

    const siguiente = slotsActuales.value.find(s => s !== targetSlot && !equipoPorSlot.value[s])
    if (siguiente) {
      seleccionarSlot(siguiente)
    }
  } catch (e) {
    mostrarNotificacion(e.message, 'error')
  }
}

async function quitar(slot) {
  try {
    await quitarJugador(partidaId.value, slot)
    equipo.value = await cargarEquipo(partidaId.value)
    mostrarNotificacion(`Posicion ${slot} liberada`)
  } catch (e) {
    mostrarNotificacion(e.message, 'error')
  }
}

function iniciarSimulacionTorneo() {
  rondaTorneoActual.value = 0
  campeon.value = false
  torneoTerminado.value = false
  partidosTorneo.value.forEach(m => {
    m.jugado = false
    m.golesFavor = 0
    m.golesContra = 0
  })
  mostrarModalTorneo.value = true
}

async function jugarRondaSiguiente() {
  if (rondaTorneoActual.value >= partidosTorneo.value.length) return

  const match = partidosTorneo.value[rondaTorneoActual.value]
  const miOvr = parseFloat(promedioValoracion.value) || 75
  const rivalOvr = match.ovrRival
  let diferencaNivel = miOvr - rivalOvr

  let favor = Math.max(0, Math.round((miOvr - 75) / 5) + Math.floor(Math.random() * 3))
  let contra = Math.max(0, Math.round((rivalOvr - 75) / 5) + Math.floor(Math.random() * 2))

  if (favor === contra) {
    if (diferencaNivel >= 0) favor += 1
    else contra += 1
  }

  match.golesFavor = favor
  match.golesContra = contra
  match.jugado = true

  if (partidaId.value) {
    try {
      await guardarResultado(partidaId.value, match.ronda, match.rival, favor, contra)
    } catch (e) {
      console.warn(e)
    }
  }

  if (favor > contra) {
    rondaTorneoActual.value++
    if (rondaTorneoActual.value >= partidosTorneo.value.length) {
      campeon.value = true
      torneoTerminado.value = true
    }
  } else {
    torneoTerminado.value = true
  }
}

async function cargarEstadisticas() {
  try {
    listaEstadisticas.value = await obtenerEstadisticas()
  } catch (e) {
    console.error(e)
  }
}

function mostrarNotificacion(msg, tipo = 'success') {
  notificacion.value = msg
  notifTipo.value = tipo
  setTimeout(() => {
    if (notificacion.value === msg) notificacion.value = ''
  }, 3800)
}

onMounted(async () => {
  const formacionGuardada = localStorage.getItem('formacion_elegida')
  if (formacionGuardada && formacionesDisponibles[formacionGuardada]) {
    formacionActual.value = formacionGuardada
  }

  await cargarEstadisticas()

  const guardada = Number(localStorage.getItem('partidaId'))
  if (guardada) {
    partidaId.value = guardada
    try {
      equipo.value = await cargarEquipo(guardada)
    } catch (e) {
      console.warn(e)
    }
  } else {
    await comenzarPartida()
  }

  if (!sorteo.value) {
    await tirar()
  }

  isBackendOnline.value = backendConectado
})
</script>
