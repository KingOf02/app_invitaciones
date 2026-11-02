import { Link } from 'react-router-dom'
import { MARCA } from '../config'

export function Logo({ claro = false }) {
  return (
    <Link to="/" className="flex items-center gap-2">
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-vino font-display text-lg text-crema">P</span>
      <span className={`font-display text-xl font-semibold ${claro ? 'text-crema' : 'text-tinta'}`}>{MARCA.nombre}</span>
    </Link>
  )
}

export function BarraDemo({ titulo }) {
  return (
    <header className="sticky top-0 z-20 border-b border-linea bg-crema/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3">
        <Logo />
        <nav className="flex items-center gap-1 text-sm">
          <span className="hidden text-suave sm:inline">{titulo}</span>
          <Link to="/demo" className="rounded-full px-3 py-1.5 font-medium text-vino hover:bg-rosa">
            ← Demo
          </Link>
        </nav>
      </div>
    </header>
  )
}

export function Boton({ as = 'button', variante = 'primario', className = '', ...props }) {
  const Componente = as
  const estilos = {
    primario: 'bg-vino text-crema hover:bg-vino-oscuro',
    secundario: 'border border-vino/30 bg-papel text-vino hover:bg-rosa',
    fantasma: 'text-vino hover:bg-rosa',
  }
  return (
    <Componente
      className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-colors disabled:opacity-50 ${estilos[variante]} ${className}`}
      {...props}
    />
  )
}

export function Etiqueta({ tono = 'neutro', children }) {
  const tonos = {
    si: 'bg-salvia-claro text-salvia',
    no: 'bg-rosa text-vino',
    pendiente: 'bg-ambar-claro text-[#8a6420]',
    neutro: 'bg-linea text-suave',
  }
  return <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${tonos[tono]}`}>{children}</span>
}

export const TEXTO_RESPUESTA = { si: 'Confirmado', no: 'No asiste', pendiente: 'Pendiente' }
