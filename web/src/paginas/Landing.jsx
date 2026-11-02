import { Link } from 'react-router-dom'
import { Boton, Logo } from '../componentes/comunes'
import ListaEspera from '../componentes/ListaEspera'
import { CUPOS_LANZAMIENTO, DESCUENTO_LANZAMIENTO, MARCA } from '../config'

const PAQUETES = [
  {
    nombre: 'Esencial',
    precio: 599,
    para: 'Bautizos, cumpleaños, baby showers y posadas',
    incluye: ['Invitación digital', 'Pases por familia con link único', 'Confirmaciones y panel en vivo', 'Envío por WhatsApp', 'Ubicación, itinerario y mesa de regalos'],
  },
  {
    nombre: 'Celebración',
    precio: 1499,
    popular: true,
    para: 'XV años y bodas',
    incluye: ['Todo lo de Esencial', 'Menú y conteo para el banquetero', 'Mapa de mesas con buscador', 'QR de entrada (funciona sin internet)', 'Lluvia de sobres', 'Playlist colaborativa e info para foráneos'],
  },
  {
    nombre: 'Gran Evento',
    precio: 2999,
    proximamente: true,
    para: 'Bodas grandes',
    incluye: ['Todo lo de Celebración', 'Save the date', 'Álbum compartido y libro de firmas', 'Reportes por proveedor', 'Soporte el día del evento'],
  },
]

const FUNCIONES = [
  { titulo: 'Un pase por familia', texto: 'Cada familia recibe su propio link con sus lugares contados. Nadie confirma de más.' },
  { titulo: 'Sabes quién va, en vivo', texto: 'Confirmados, pendientes y total de personas en un solo panel. Recuerda a los que faltan con un toque.' },
  { titulo: 'Menú listo para el banquetero', texto: 'Cada invitado elige su platillo y tú recibes el conteo final. Sin hojas de Excel.' },
  { titulo: 'Buscador de mesas', texto: 'El invitado escribe su nombre y ve su mesa. Se acabaron las filas frente al acomodo.' },
  { titulo: 'QR en la entrada', texto: 'Escanea pases desde cualquier celular, aunque el salón no tenga señal. Adiós a los colados.' },
  { titulo: 'Tu diseño o el nuestro', texto: 'Elige una de nuestras plantillas o sube la invitación que ya hiciste en Canva.' },
]

const PASOS = [
  ['Diseña', 'Elige plantilla o sube tu diseño.'],
  ['Agrega a tus invitados', 'Una línea por familia con sus lugares.'],
  ['Envía por WhatsApp', 'Cada familia recibe su link único.'],
  ['Relájate', 'Tú ves quién va; el banquetero, cuántos.'],
]

const precio = (n) => n.toLocaleString('es-MX')

export default function Landing() {
  return (
    <div className="overflow-x-hidden">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5">
        <Logo />
        <nav className="flex items-center gap-2 text-sm font-medium">
          <a href="#precios" className="hidden rounded-full px-3 py-2 hover:bg-rosa sm:inline">Precios</a>
          <Link to="/demo" className="rounded-full px-3 py-2 text-vino hover:bg-rosa">Ver demo</Link>
          <Boton as="a" href="#lista" className="!px-4 !py-2">Lista de espera</Boton>
        </nav>
      </header>

      {/* Héroe */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 pb-20 pt-8 md:grid-cols-[1.1fr_1fr] md:pt-16">
        <div>
          <p className="mb-4 inline-flex rounded-full bg-rosa px-3 py-1 text-xs font-semibold uppercase tracking-wider text-vino">
            Bodas · XV años · Bautizos · Posadas
          </p>
          <h1 className="font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            ¿Ya tienes tu invitación? <span className="text-vino">Nosotros te decimos quién va.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-suave">
            Invitaciones digitales con pases por familia, confirmaciones, menú para el banquetero, mesas y QR en la entrada.
            Todo lo que hoy llevas en WhatsApp y Excel, en un solo lugar.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Boton as="a" href="#lista">Apartar mi lugar con {DESCUENTO_LANZAMIENTO * 100}% de descuento</Boton>
            <Boton as={Link} to="/demo" variante="secundario">Ver cómo funciona</Boton>
          </div>
        </div>
        <VistaPanel />
      </section>

      {/* Problema */}
      <section className="border-y border-linea bg-papel">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 md:grid-cols-3">
          {[
            ['“¿Cuántos vienen de tu familia?”', 'Contestas lo mismo cincuenta veces y aun así el conteo no cuadra.'],
            ['“¿Ya confirmó tu tía?”', 'Las respuestas se pierden entre chats, audios y stickers.'],
            ['“Faltaron dos sillas en la mesa 4”', 'El banquetero, el acomodo y la entrada dependen de una lista que nadie tiene al día.'],
          ].map(([cita, texto]) => (
            <div key={cita}>
              <p className="font-display text-xl font-semibold">{cita}</p>
              <p className="mt-2 text-suave">{texto}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Funciones */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <h2 className="max-w-2xl font-display text-3xl font-semibold sm:text-4xl">
          Una invitación bonita es el principio. La logística es lo difícil.
        </h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FUNCIONES.map((f, i) => (
            <div key={f.titulo} className="rounded-2xl bg-papel p-6 ring-1 ring-linea">
              <span className="font-display text-sm font-semibold text-oro">0{i + 1}</span>
              <h3 className="mt-2 text-lg font-semibold">{f.titulo}</h3>
              <p className="mt-2 text-suave">{f.texto}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Cómo funciona */}
      <section className="bg-vino text-crema">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">Así de fácil</h2>
          <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {PASOS.map(([titulo, texto], i) => (
              <li key={titulo}>
                <span className="grid h-10 w-10 place-items-center rounded-full bg-crema/15 font-display text-lg">{i + 1}</span>
                <p className="mt-4 text-lg font-semibold">{titulo}</p>
                <p className="mt-1 text-crema/75">{texto}</p>
              </li>
            ))}
          </ol>
          <Boton as={Link} to="/demo" variante="secundario" className="mt-12 !border-crema/30 !bg-transparent !text-crema hover:!bg-crema/10">
            Pruébalo como invitado y como anfitrión →
          </Boton>
        </div>
      </section>

      {/* Precios */}
      <section id="precios" className="mx-auto max-w-6xl scroll-mt-8 px-4 py-20">
        <h2 className="font-display text-3xl font-semibold sm:text-4xl">Un solo pago por evento</h2>
        <p className="mt-3 max-w-2xl text-suave">
          Los primeros {CUPOS_LANZAMIENTO} eventos tienen {DESCUENTO_LANZAMIENTO * 100}% de descuento a cambio de tu opinión y unas fotos del día.
        </p>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {PAQUETES.map((p) => (
            <div
              key={p.nombre}
              className={`relative flex flex-col rounded-2xl p-7 ${p.popular ? 'bg-tinta text-crema shadow-xl' : 'bg-papel ring-1 ring-linea'} ${p.proximamente ? 'opacity-70' : ''}`}
            >
              {p.popular && (
                <span className="absolute -top-3 left-7 rounded-full bg-oro px-3 py-1 text-xs font-semibold text-tinta">Más popular</span>
              )}
              <h3 className="font-display text-2xl font-semibold">{p.nombre}</h3>
              <p className={`mt-1 text-sm ${p.popular ? 'text-crema/70' : 'text-suave'}`}>{p.para}</p>
              {p.proximamente ? (
                <p className="mt-6 font-display text-3xl font-semibold">Próximamente</p>
              ) : (
                <div className="mt-6">
                  <span className={`text-sm line-through ${p.popular ? 'text-crema/50' : 'text-suave'}`}>${precio(p.precio)}</span>
                  <p className="font-display text-4xl font-semibold">
                    ${precio(Math.round(p.precio * (1 - DESCUENTO_LANZAMIENTO)))}
                    <span className={`ml-1 text-sm font-normal ${p.popular ? 'text-crema/70' : 'text-suave'}`}>MXN</span>
                  </p>
                </div>
              )}
              <ul className="mt-6 flex-1 space-y-2.5 text-sm">
                {p.incluye.map((x) => (
                  <li key={x} className="flex gap-2">
                    <span className={p.popular ? 'text-oro' : 'text-vino'}>✓</span>
                    {x}
                  </li>
                ))}
              </ul>
              {!p.proximamente && (
                <Boton as="a" href="#lista" variante={p.popular ? 'primario' : 'secundario'} className={`mt-8 ${p.popular ? '!bg-crema !text-tinta hover:!bg-rosa' : ''}`}>
                  Apartar lugar
                </Boton>
              )}
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-suave">
          ¿Eres wedding planner o tienes un salón? Tendremos un plan mensual con tu marca.{' '}
          <a href="#lista" className="font-medium text-vino underline underline-offset-2">Anótate en la lista</a>.
        </p>
      </section>

      {/* Lista de espera */}
      <section id="lista" className="scroll-mt-8 border-t border-linea bg-rosa/50">
        <div className="mx-auto max-w-3xl px-4 py-20">
          <h2 className="text-center font-display text-3xl font-semibold sm:text-4xl">Aparta tu lugar</h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-suave">
            Abrimos con solo {CUPOS_LANZAMIENTO} eventos con descuento. Déjanos tus datos y te avisamos primero.
          </p>
          <div className="mt-10">
            <ListaEspera />
          </div>
        </div>
      </section>

      <footer className="bg-tinta text-crema/70">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 text-sm sm:flex-row sm:items-center sm:justify-between">
          <Logo claro />
          <p>{MARCA.lema} · Hecho en Monterrey</p>
        </div>
      </footer>
    </div>
  )
}

// Ilustración del panel del anfitrión hecha con HTML, para el héroe.
function VistaPanel() {
  const filas = [
    ['Familia Garza Treviño', '4 de 4', 'si'],
    ['Familia Martínez López', '— de 3', 'pendiente'],
    ['Amigos de la prepa', '6 de 6', 'si'],
    ['Familia Villarreal', '0 de 2', 'no'],
  ]
  const color = { si: 'bg-salvia', pendiente: 'bg-oro', no: 'bg-vino' }
  return (
    <div className="relative mx-auto w-full max-w-md">
      <div className="absolute -inset-4 -z-10 rotate-3 rounded-[2rem] bg-rosa" />
      <div className="rounded-[1.75rem] bg-papel p-5 shadow-xl ring-1 ring-linea">
        <p className="text-xs font-semibold uppercase tracking-wider text-suave">Boda Daniela & Rodrigo</p>
        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
          {[['142', 'van'], ['18', 'pendientes'], ['9', 'no van']].map(([n, t]) => (
            <div key={t} className="rounded-xl bg-crema py-3">
              <p className="font-display text-2xl font-semibold">{n}</p>
              <p className="text-xs text-suave">{t}</p>
            </div>
          ))}
        </div>
        <ul className="mt-4 divide-y divide-linea text-sm">
          {filas.map(([f, l, r]) => (
            <li key={f} className="flex items-center justify-between py-2.5">
              <span className="flex items-center gap-2">
                <span className={`h-2 w-2 rounded-full ${color[r]}`} />
                {f}
              </span>
              <span className="text-suave">{l}</span>
            </li>
          ))}
        </ul>
        <div className="mt-3 rounded-xl bg-crema p-3 text-xs text-suave">
          <span className="font-semibold text-tinta">Banquetero:</span> 78 res · 51 pollo · 6 vegetariano · 7 infantil
        </div>
      </div>
    </div>
  )
}
