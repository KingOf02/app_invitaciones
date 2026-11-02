import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import QRCode from 'qrcode'
import { Boton } from '../componentes/comunes'
import { MARCA } from '../config'
import { EVENTO, MENUS } from '../demo/datos'
import { usePases } from '../demo/estado'

export default function Invitacion() {
  const { token } = useParams()
  const { pases, responder } = usePases()
  const pase = pases.find((p) => p.token === token)
  const [editando, setEditando] = useState(false)

  if (!pase) {
    return (
      <div className="grid min-h-screen place-items-center px-4 text-center">
        <div>
          <p className="font-display text-2xl font-semibold">No encontramos esta invitación</p>
          <p className="mt-2 text-suave">Revisa que el link esté completo.</p>
          <Link to="/demo" className="mt-6 inline-block font-semibold text-vino">← Volver a la demo</Link>
        </div>
      </div>
    )
  }

  const yaRespondio = pase.respuesta !== 'pendiente' && !editando

  return (
    <div className="min-h-screen bg-[#f6efe6]">
      <div className="bg-tinta px-4 py-2 text-center text-xs text-crema/80">
        Demo · Así ve la invitación la <strong className="text-crema">{pase.familia}</strong> ·{' '}
        <Link to="/demo" className="underline">volver</Link>
      </div>

      <main className="mx-auto max-w-lg px-4 pb-16">
        {/* Portada */}
        <section className="px-2 pb-10 pt-14 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-oro">Nuestra boda</p>
          <h1 className="mt-5 font-display text-5xl font-semibold leading-tight text-vino-oscuro">
            Daniela
            <span className="my-1 block font-display text-3xl italic text-oro">&</span>
            Rodrigo
          </h1>
          <div className="mx-auto my-8 h-px w-24 bg-oro/50" />
          <p className="font-display text-xl">{EVENTO.fechaTexto}</p>
          <p className="mt-1 text-suave">{EVENTO.lugar} · Santiago, N.L.</p>
          <Contador fecha={EVENTO.fecha} />
        </section>

        {/* Pase */}
        <section className="rounded-2xl border border-oro/30 bg-papel p-6 text-center shadow-sm">
          <p className="text-xs uppercase tracking-[0.2em] text-suave">Pase para</p>
          <p className="mt-2 font-display text-2xl font-semibold">{pase.familia}</p>
          <p className="mt-1 text-suave">
            Hemos reservado <strong className="text-tinta">{pase.lugares} {pase.lugares === 1 ? 'lugar' : 'lugares'}</strong> en su honor
          </p>
        </section>

        {/* Confirmación */}
        <section className="mt-6">
          {yaRespondio ? (
            <Respuesta pase={pase} onCambiar={() => setEditando(true)} />
          ) : (
            <FormularioConfirmacion
              pase={pase}
              onEnviar={(r) => {
                responder(pase.token, r)
                setEditando(false)
              }}
            />
          )}
        </section>

        {/* Itinerario */}
        <Bloque titulo="Itinerario">
          <ol className="space-y-4">
            {EVENTO.itinerario.map((i) => (
              <li key={i.hora} className="flex gap-4">
                <span className="w-14 shrink-0 font-display text-lg font-semibold text-vino">{i.hora}</span>
                <div>
                  <p className="font-medium">{i.actividad}</p>
                  <p className="text-sm text-suave">{i.lugar}</p>
                </div>
              </li>
            ))}
          </ol>
        </Bloque>

        <Bloque titulo="Ubicación">
          <p className="font-medium">{EVENTO.lugar}</p>
          <p className="text-sm text-suave">{EVENTO.direccion}</p>
          <p className="mt-3 text-sm"><span className="font-medium">Vestimenta:</span> {EVENTO.vestimenta}</p>
          <Boton as="a" href={EVENTO.mapaUrl} target="_blank" rel="noopener noreferrer" variante="secundario" className="mt-4 w-full">
            Cómo llegar
          </Boton>
        </Bloque>

        <Bloque titulo="Regalos">
          <p className="text-sm text-suave">Tu presencia es nuestro mejor regalo. Si deseas tener un detalle con nosotros:</p>
          <div className="mt-4 rounded-xl bg-crema p-4 text-sm">
            <p className="font-semibold">Lluvia de sobres</p>
            <p className="mt-1 text-suave">{EVENTO.sobres.banco} · {EVENTO.sobres.titular}</p>
            <p className="mt-1 font-mono tracking-wide">CLABE {EVENTO.sobres.clabe}</p>
          </div>
          <div className="mt-3 rounded-xl bg-crema p-4 text-sm">
            <p className="font-semibold">Mesa de regalos</p>
            <p className="mt-1 text-suave">{EVENTO.mesaRegalos}</p>
          </div>
        </Bloque>

        <p className="mt-12 text-center text-xs text-suave">
          Hecha con <Link to="/" className="font-semibold text-vino">{MARCA.nombre}</Link>
        </p>
      </main>
    </div>
  )
}

function Bloque({ titulo, children }) {
  return (
    <section className="mt-6 rounded-2xl bg-papel p-6 shadow-sm">
      <h2 className="mb-4 text-center font-display text-2xl font-semibold text-vino-oscuro">{titulo}</h2>
      {children}
    </section>
  )
}

function Contador({ fecha }) {
  const [ahora, setAhora] = useState(() => Date.now())
  useEffect(() => {
    const id = setInterval(() => setAhora(Date.now()), 60_000)
    return () => clearInterval(id)
  }, [])
  const ms = Math.max(0, new Date(fecha).getTime() - ahora)
  const partes = [
    [Math.floor(ms / 86_400_000), 'días'],
    [Math.floor(ms / 3_600_000) % 24, 'horas'],
    [Math.floor(ms / 60_000) % 60, 'min'],
  ]
  return (
    <div className="mt-8 flex justify-center gap-3">
      {partes.map(([n, t]) => (
        <div key={t} className="w-20 rounded-xl bg-papel/70 py-3">
          <p className="font-display text-2xl font-semibold">{n}</p>
          <p className="text-xs text-suave">{t}</p>
        </div>
      ))}
    </div>
  )
}

function FormularioConfirmacion({ pase, onEnviar }) {
  const [asiste, setAsiste] = useState(null)
  const [cantidad, setCantidad] = useState(pase.menus.length || pase.lugares)
  const [menus, setMenus] = useState(() => Array.from({ length: pase.lugares }, (_, i) => pase.menus[i] || ''))
  const [nota, setNota] = useState(pase.nota || '')

  const completo = asiste === false || (asiste === true && menus.slice(0, cantidad).every(Boolean))

  function enviar(e) {
    e.preventDefault()
    onEnviar(asiste ? { respuesta: 'si', menus: menus.slice(0, cantidad), nota } : { respuesta: 'no', menus: [], nota })
  }

  return (
    <form onSubmit={enviar} className="rounded-2xl bg-papel p-6 shadow-sm">
      <h2 className="text-center font-display text-2xl font-semibold text-vino-oscuro">¿Nos acompañan?</h2>
      <p className="mt-1 text-center text-sm text-suave">Por favor confirma antes del {EVENTO.limiteConfirmacion.toLowerCase()}</p>

      <div className="mt-6 grid grid-cols-2 gap-3">
        {[[true, '¡Sí, ahí estaremos!'], [false, 'No podremos ir']].map(([v, t]) => (
          <button
            key={t}
            type="button"
            onClick={() => setAsiste(v)}
            className={`rounded-xl border-2 px-3 py-4 text-sm font-semibold transition ${asiste === v ? 'border-vino bg-rosa text-vino' : 'border-linea hover:border-vino/40'}`}
          >
            {t}
          </button>
        ))}
      </div>

      {asiste && (
        <div className="mt-6 space-y-5">
          <div>
            <p className="text-sm font-medium">¿Cuántos asistirán?</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {Array.from({ length: pase.lugares }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setCantidad(n)}
                  className={`h-11 w-11 rounded-full text-sm font-semibold transition ${cantidad === n ? 'bg-vino text-crema' : 'bg-crema hover:bg-rosa'}`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-sm font-medium">Elige el platillo de cada persona</p>
            {Array.from({ length: cantidad }, (_, i) => (
              <label key={i} className="flex items-center gap-3 text-sm">
                <span className="w-28 shrink-0 truncate text-suave">{pase.integrantes[i] || `Invitado ${i + 1}`}</span>
                <select
                  required
                  value={menus[i]}
                  onChange={(e) => setMenus(menus.map((m, j) => (j === i ? e.target.value : m)))}
                  className="w-full rounded-lg border border-linea bg-papel px-3 py-2.5 outline-none focus:border-vino"
                >
                  <option value="">Elegir…</option>
                  {MENUS.map((m) => <option key={m.id} value={m.id}>{m.nombre}</option>)}
                </select>
              </label>
            ))}
          </div>
        </div>
      )}

      {asiste !== null && (
        <label className="mt-5 block text-sm font-medium">
          {asiste ? 'Alergias o mensaje para los novios (opcional)' : 'Un mensaje para los novios (opcional)'}
          <textarea value={nota} onChange={(e) => setNota(e.target.value)} rows={2} className="mt-1 w-full rounded-lg border border-linea px-3 py-2 outline-none focus:border-vino" />
        </label>
      )}

      <Boton type="submit" disabled={!completo} className="mt-6 w-full">Enviar respuesta</Boton>
    </form>
  )
}

function Respuesta({ pase, onCambiar }) {
  const [qr, setQr] = useState('')
  useEffect(() => {
    if (pase.respuesta !== 'si') return
    QRCode.toDataURL(pase.token, { margin: 1, width: 320, color: { dark: '#2b2024', light: '#ffffff' } }).then(setQr)
  }, [pase.token, pase.respuesta])

  if (pase.respuesta === 'no') {
    return (
      <div className="rounded-2xl bg-papel p-6 text-center shadow-sm">
        <p className="font-display text-2xl font-semibold">Gracias por avisarnos</p>
        <p className="mt-2 text-suave">Los vamos a extrañar. Daniela y Rodrigo ya recibieron su respuesta.</p>
        <button onClick={onCambiar} className="mt-4 text-sm font-semibold text-vino underline underline-offset-2">Cambiar mi respuesta</button>
      </div>
    )
  }

  const n = pase.menus.length
  return (
    <div className="rounded-2xl bg-papel p-6 text-center shadow-sm">
      <p className="font-display text-2xl font-semibold text-vino-oscuro">¡Los esperamos!</p>
      <p className="mt-1 text-suave">Confirmaron {n} de {pase.lugares} {pase.lugares === 1 ? 'lugar' : 'lugares'}</p>
      <div className="mx-auto mt-5 w-48 rounded-xl border border-linea p-3">
        {qr ? <img src={qr} alt="Código QR de entrada" className="w-full" /> : <div className="aspect-square" />}
      </div>
      <p className="mt-3 text-sm font-medium">Tu pase de entrada</p>
      <p className="text-xs text-suave">Muéstralo en la puerta. Toma captura por si no hay señal.</p>
      <div className="mt-5 rounded-xl bg-crema py-3">
        <p className="text-xs uppercase tracking-wider text-suave">Su mesa</p>
        <p className="font-display text-3xl font-semibold">{pase.mesa}</p>
      </div>
      <button onClick={onCambiar} className="mt-4 text-sm font-semibold text-vino underline underline-offset-2">Cambiar mi respuesta</button>
    </div>
  )
}
