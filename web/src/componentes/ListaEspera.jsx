import { useState } from 'react'
import { LISTA_ESPERA_ENDPOINT, WHATSAPP_CONTACTO } from '../config'
import { Boton } from './comunes'

const TIPOS = ['Boda', 'XV años', 'Bautizo', 'Posada', 'Cumpleaños', 'Baby shower', 'Soy wedding planner o salón', 'Otro']

export default function ListaEspera() {
  const [datos, setDatos] = useState({ nombre: '', telefono: '', tipo: 'Boda', fecha: '' })
  const [estado, setEstado] = useState('inicial') // inicial | enviando | listo | error

  const cambiar = (campo) => (e) => setDatos({ ...datos, [campo]: e.target.value })

  async function enviar(e) {
    e.preventDefault()
    if (LISTA_ESPERA_ENDPOINT) {
      setEstado('enviando')
      try {
        const r = await fetch(LISTA_ESPERA_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(datos),
        })
        setEstado(r.ok ? 'listo' : 'error')
      } catch {
        setEstado('error')
      }
      return
    }
    if (WHATSAPP_CONTACTO) {
      const mensaje = `Hola, quiero entrar a la lista de espera.\nNombre: ${datos.nombre}\nEvento: ${datos.tipo}\nFecha aproximada: ${datos.fecha || 'por definir'}`
      window.open(`https://wa.me/${WHATSAPP_CONTACTO}?text=${encodeURIComponent(mensaje)}`, '_blank', 'noopener')
      setEstado('listo')
      return
    }
    setEstado('error')
  }

  if (estado === 'listo') {
    return (
      <div className="rounded-2xl bg-papel p-8 text-center shadow-sm ring-1 ring-linea">
        <p className="font-display text-2xl font-semibold">¡Listo, {datos.nombre.split(' ')[0]}!</p>
        <p className="mt-2 text-suave">Te escribimos por WhatsApp en cuanto abramos los primeros lugares con descuento.</p>
      </div>
    )
  }

  const campo = 'mt-1 w-full rounded-xl border border-linea bg-papel px-4 py-3 text-base outline-none focus:border-vino focus:ring-2 focus:ring-vino/15'

  return (
    <form onSubmit={enviar} className="grid gap-4 rounded-2xl bg-papel p-6 shadow-sm ring-1 ring-linea sm:grid-cols-2 sm:p-8">
      <label className="text-sm font-medium">
        Tu nombre
        <input required value={datos.nombre} onChange={cambiar('nombre')} className={campo} autoComplete="name" />
      </label>
      <label className="text-sm font-medium">
        WhatsApp
        <input required type="tel" inputMode="tel" pattern="[0-9 +()-]{10,}" value={datos.telefono} onChange={cambiar('telefono')} className={campo} placeholder="81 1234 5678" autoComplete="tel" />
      </label>
      <label className="text-sm font-medium">
        ¿Qué vas a celebrar?
        <select value={datos.tipo} onChange={cambiar('tipo')} className={campo}>
          {TIPOS.map((t) => <option key={t}>{t}</option>)}
        </select>
      </label>
      <label className="text-sm font-medium">
        Fecha aproximada
        <input type="month" value={datos.fecha} onChange={cambiar('fecha')} className={campo} />
      </label>
      <div className="sm:col-span-2">
        <Boton type="submit" disabled={estado === 'enviando'} className="w-full sm:w-auto">
          {estado === 'enviando' ? 'Enviando…' : 'Quiero mi lugar'}
        </Boton>
        {estado === 'error' && (
          <p className="mt-3 text-sm text-vino">No pudimos guardar tus datos. Intenta de nuevo en un momento.</p>
        )}
        <p className="mt-3 text-xs text-suave">
          Solo usamos tu nombre y teléfono para avisarte del lanzamiento. No compartimos tus datos.
        </p>
      </div>
    </form>
  )
}
