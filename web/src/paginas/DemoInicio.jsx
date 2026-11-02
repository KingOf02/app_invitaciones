import { Link } from 'react-router-dom'
import { BarraDemo, Boton } from '../componentes/comunes'
import { EVENTO, TOKEN_DEMO } from '../demo/datos'
import { usePases } from '../demo/estado'

const VISTAS = [
  {
    a: `/demo/i/${TOKEN_DEMO}`,
    quien: 'Invitado',
    titulo: 'La invitación de la Familia Martínez',
    texto: 'Abre el link que llega por WhatsApp, confirma cuántos van y elige el menú. Recibe su QR de entrada.',
  },
  {
    a: '/demo/panel',
    quien: 'Anfitrión',
    titulo: 'El panel de los novios',
    texto: 'Ve en vivo quién confirmó, quién falta y el conteo de menú para el banquetero.',
  },
  {
    a: '/demo/mesas',
    quien: 'Día del evento',
    titulo: 'Buscador de mesas',
    texto: 'El invitado escribe su nombre y ve en qué mesa le toca.',
  },
]

export default function DemoInicio() {
  const { reiniciar } = usePases()
  return (
    <div className="min-h-screen">
      <BarraDemo titulo="Demo" />
      <main className="mx-auto max-w-5xl px-4 py-12">
        <p className="text-sm font-semibold uppercase tracking-wider text-oro">Demo · {EVENTO.tipo} {EVENTO.novios}</p>
        <h1 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">Pruébalo desde los dos lados</h1>
        <p className="mt-3 max-w-2xl text-suave">
          Confirma como invitado y después abre el panel: tu respuesta aparece ahí. Los datos son ficticios y solo se guardan en este navegador.
        </p>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {VISTAS.map((v, i) => (
            <Link key={v.a} to={v.a} className="group flex flex-col rounded-2xl bg-papel p-6 ring-1 ring-linea transition hover:-translate-y-0.5 hover:shadow-lg">
              <span className="text-xs font-semibold uppercase tracking-wider text-suave">{i + 1} · {v.quien}</span>
              <h2 className="mt-3 font-display text-xl font-semibold">{v.titulo}</h2>
              <p className="mt-2 flex-1 text-sm text-suave">{v.texto}</p>
              <span className="mt-6 text-sm font-semibold text-vino group-hover:underline">Abrir →</span>
            </Link>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Boton as="a" href="/#lista">Quiero esto para mi evento</Boton>
          <Boton variante="fantasma" onClick={reiniciar}>Reiniciar demo</Boton>
        </div>
      </main>
    </div>
  )
}
