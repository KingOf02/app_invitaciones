import { useState } from 'react'
import { Link } from 'react-router-dom'
import { BarraDemo, Boton, Etiqueta, TEXTO_RESPUESTA } from '../componentes/comunes'
import { EVENTO, MENUS, MESAS } from '../demo/datos'
import { resumen, usePases } from '../demo/estado'

const FILTROS = [
  ['todos', 'Todos'],
  ['pendiente', 'Pendientes'],
  ['si', 'Confirmados'],
  ['no', 'No asisten'],
]

const linkInvitado = (token) => `${window.location.origin}/demo/i/${token}`

function mensajeRecordatorio(pase) {
  return `¡Hola, ${pase.familia}! Les recordamos confirmar su asistencia a la boda de ${EVENTO.novios} antes del ${EVENTO.limiteConfirmacion.toLowerCase()}. Su invitación: ${linkInvitado(pase.token)}`
}

export default function Panel() {
  const { pases } = usePases()
  const [filtro, setFiltro] = useState('todos')
  const [copiado, setCopiado] = useState('')
  const r = resumen(pases)

  const conteoMenus = MENUS.map((m) => ({
    ...m,
    total: pases.filter((p) => p.respuesta === 'si').flatMap((p) => p.menus).filter((x) => x === m.id).length,
  }))

  const ocupacion = MESAS.map((mesa) => ({
    ...mesa,
    ocupados: pases.filter((p) => p.mesa === mesa.numero && p.respuesta === 'si').reduce((s, p) => s + p.menus.length, 0),
  }))

  const visibles = filtro === 'todos' ? pases : pases.filter((p) => p.respuesta === filtro)
  const avance = Math.round(((r.pasesConfirmados + r.pasesNo) / r.totalPases) * 100)

  async function copiar(token) {
    try {
      await navigator.clipboard.writeText(linkInvitado(token))
      setCopiado(token)
      setTimeout(() => setCopiado(''), 1500)
    } catch {
      window.prompt('Copia el link:', linkInvitado(token))
    }
  }

  return (
    <div className="min-h-screen">
      <BarraDemo titulo="Panel del anfitrión" />
      <main className="mx-auto max-w-5xl px-4 py-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm text-suave">{EVENTO.fechaTexto}</p>
            <h1 className="font-display text-3xl font-semibold">Boda {EVENTO.novios}</h1>
          </div>
          <Boton as={Link} to="/demo/mesas" variante="secundario">Buscador de mesas</Boton>
        </div>

        {/* Números grandes */}
        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
          <Cifra numero={r.personasConfirmadas} texto="personas confirmadas" destacado />
          <Cifra numero={r.pasesPendientes} texto="pases pendientes" />
          <Cifra numero={r.pasesNo} texto="pases no asisten" />
          <Cifra numero={r.lugaresInvitados} texto={`lugares en ${r.totalPases} pases`} />
        </div>

        <div className="mt-4 rounded-2xl bg-papel p-4 ring-1 ring-linea">
          <div className="flex justify-between text-sm">
            <span className="font-medium">Respuestas recibidas</span>
            <span className="text-suave">{avance}% · faltan {r.pasesPendientes} familias</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-linea">
            <div className="h-full rounded-full bg-salvia transition-all" style={{ width: `${avance}%` }} />
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_300px]">
          {/* Lista de pases */}
          <section className="min-w-0 rounded-2xl bg-papel ring-1 ring-linea">
            <div className="flex gap-1 overflow-x-auto border-b border-linea p-2">
              {FILTROS.map(([id, t]) => (
                <button
                  key={id}
                  onClick={() => setFiltro(id)}
                  className={`shrink-0 rounded-full px-3 py-1.5 text-sm font-medium ${filtro === id ? 'bg-tinta text-crema' : 'text-suave hover:bg-crema'}`}
                >
                  {t}
                </button>
              ))}
            </div>
            <ul className="divide-y divide-linea">
              {visibles.map((p) => (
                <li key={p.token} className="flex flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3">
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">{p.familia}</p>
                    <p className="text-xs text-suave">
                      Mesa {p.mesa} · {p.respuesta === 'si' ? `${p.menus.length} de ${p.lugares} lugares` : `${p.lugares} lugares`}
                      {p.nota ? ` · “${p.nota}”` : ''}
                    </p>
                  </div>
                  <Etiqueta tono={p.respuesta}>{TEXTO_RESPUESTA[p.respuesta]}</Etiqueta>
                  <div className="flex gap-1">
                    {p.respuesta === 'pendiente' && (
                      <a
                        href={`https://wa.me/?text=${encodeURIComponent(mensajeRecordatorio(p))}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full bg-salvia-claro px-3 py-1.5 text-xs font-semibold text-salvia hover:brightness-95"
                      >
                        Recordar
                      </a>
                    )}
                    <button onClick={() => copiar(p.token)} className="rounded-full px-3 py-1.5 text-xs font-semibold text-vino hover:bg-rosa">
                      {copiado === p.token ? '¡Copiado!' : 'Link'}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <aside className="space-y-6">
            <section className="rounded-2xl bg-papel p-5 ring-1 ring-linea">
              <h2 className="font-semibold">Para el banquetero</h2>
              <p className="text-xs text-suave">Solo invitados confirmados</p>
              <ul className="mt-4 space-y-2 text-sm">
                {conteoMenus.map((m) => (
                  <li key={m.id} className="flex justify-between">
                    <span>{m.nombre}</span>
                    <span className="font-semibold">{m.total}</span>
                  </li>
                ))}
                <li className="flex justify-between border-t border-linea pt-2 font-semibold">
                  <span>Total de platillos</span>
                  <span>{r.personasConfirmadas}</span>
                </li>
              </ul>
            </section>

            <section className="rounded-2xl bg-papel p-5 ring-1 ring-linea">
              <h2 className="font-semibold">Mesas</h2>
              <div className="mt-4 grid grid-cols-4 gap-2">
                {ocupacion.map((m) => (
                  <div key={m.numero} className="rounded-xl bg-crema p-2 text-center" title={`Mesa ${m.numero}: ${m.ocupados} de ${m.capacidad}`}>
                    <p className="text-xs text-suave">Mesa {m.numero}</p>
                    <p className="font-display text-lg font-semibold">{m.ocupados}<span className="text-xs font-normal text-suave">/{m.capacidad}</span></p>
                  </div>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </main>
    </div>
  )
}

function Cifra({ numero, texto, destacado }) {
  return (
    <div className={`rounded-2xl p-4 ${destacado ? 'bg-vino text-crema' : 'bg-papel ring-1 ring-linea'}`}>
      <p className="font-display text-3xl font-semibold">{numero}</p>
      <p className={`text-sm ${destacado ? 'text-crema/80' : 'text-suave'}`}>{texto}</p>
    </div>
  )
}
