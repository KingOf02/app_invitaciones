import { useState } from 'react'
import { BarraDemo } from '../componentes/comunes'
import { EVENTO, MESAS } from '../demo/datos'
import { sinAcentos, usePases } from '../demo/estado'

export default function BuscadorMesas() {
  const { pases } = usePases()
  const [busqueda, setBusqueda] = useState('')

  const termino = sinAcentos(busqueda.trim())
  const resultados = termino.length < 2
    ? []
    : pases
        .filter((p) => p.respuesta !== 'no')
        .flatMap((p) => p.integrantes.map((nombre) => ({ nombre, pase: p })))
        .filter(({ nombre, pase }) => sinAcentos(nombre).includes(termino) || sinAcentos(pase.familia).includes(termino))
        .slice(0, 8)

  const mesaResaltada = resultados.length > 0 && resultados.every((x) => x.pase.mesa === resultados[0].pase.mesa)
    ? resultados[0].pase.mesa
    : null

  return (
    <div className="min-h-screen">
      <BarraDemo titulo="Buscador de mesas" />
      <main className="mx-auto max-w-xl px-4 py-10">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-oro">Boda {EVENTO.novios}</p>
          <h1 className="mt-3 font-display text-4xl font-semibold">Encuentra tu mesa</h1>
          <p className="mt-2 text-suave">Escribe tu nombre o apellido</p>
        </div>

        <input
          autoFocus
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="Ej. Sofía, Cantú, Martínez…"
          className="mt-8 w-full rounded-2xl border border-linea bg-papel px-5 py-4 text-lg shadow-sm outline-none focus:border-vino focus:ring-4 focus:ring-vino/10"
        />

        <ul className="mt-4 space-y-2">
          {resultados.map(({ nombre, pase }) => (
            <li key={pase.token + nombre} className="flex items-center justify-between rounded-2xl bg-papel px-5 py-4 ring-1 ring-linea">
              <div>
                <p className="font-semibold">{nombre}</p>
                <p className="text-sm text-suave">{pase.familia}</p>
              </div>
              <div className="text-center">
                <p className="text-xs uppercase tracking-wider text-suave">Mesa</p>
                <p className="font-display text-3xl font-semibold text-vino">{pase.mesa}</p>
              </div>
            </li>
          ))}
          {termino.length >= 2 && resultados.length === 0 && (
            <li className="rounded-2xl bg-papel px-5 py-6 text-center text-suave ring-1 ring-linea">
              No encontramos ese nombre. Pregunta en la entrada y con gusto te ayudamos.
            </li>
          )}
        </ul>

        {/* Plano del salón */}
        <section className="mt-10 rounded-2xl bg-papel p-5 ring-1 ring-linea">
          <p className="text-center text-xs uppercase tracking-wider text-suave">Pista</p>
          <div className="mx-auto mt-2 h-10 w-1/2 rounded-lg border-2 border-dashed border-linea" />
          <div className="mt-6 grid grid-cols-4 gap-4">
            {MESAS.map((m) => (
              <div
                key={m.numero}
                className={`grid aspect-square place-items-center rounded-full font-display text-lg font-semibold transition ${mesaResaltada === m.numero ? 'scale-110 bg-vino text-crema shadow-lg' : 'bg-crema text-suave'}`}
              >
                {m.numero}
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
