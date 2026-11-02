import { Logo } from '../componentes/comunes'
import { FECHA_AVISO, MARCA, RESPONSABLE } from '../config'

export default function Privacidad() {
  return (
    <div className="min-h-screen">
      <header className="mx-auto max-w-3xl px-4 py-5">
        <Logo />
      </header>
      <main className="mx-auto max-w-3xl px-4 pb-20">
        <h1 className="font-display text-3xl font-semibold sm:text-4xl">Aviso de privacidad</h1>
        <p className="mt-2 text-sm text-suave">Última actualización: {FECHA_AVISO}</p>

        <div className="mt-8 space-y-8 leading-relaxed [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-semibold [&_p]:mt-2 [&_p]:text-suave [&_li]:text-suave">
          <section>
            <h2>Quién es responsable de tus datos</h2>
            <p>
              {RESPONSABLE.nombre}, con domicilio en {RESPONSABLE.ciudad}, es responsable del tratamiento de los datos personales
              que se recaban en {MARCA.nombre}, conforme a la Ley Federal de Protección de Datos Personales en Posesión de los
              Particulares. Contacto: <a className="font-medium text-vino underline" href={`mailto:${RESPONSABLE.correo}`}>{RESPONSABLE.correo}</a>.
            </p>
          </section>

          <section>
            <h2>Qué datos recabamos</h2>
            <p>En la lista de espera: nombre, número de WhatsApp, tipo de evento y fecha aproximada.</p>
            <p>
              Cuando la plataforma esté disponible, de los invitados de un evento solo se usarán el nombre, el teléfono y su
              respuesta a la invitación (asistencia, número de personas, menú y mensaje opcional). No recabamos datos
              personales sensibles ni datos bancarios.
            </p>
          </section>

          <section>
            <h2>Para qué los usamos</h2>
            <p>Finalidades necesarias:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Avisarte del lanzamiento y darte el descuento de los primeros eventos.</li>
              <li>Contactarte para conocer cómo organizas tu evento y mejorar el servicio.</li>
              <li>En el caso de invitados, mostrar al anfitrión quién confirmó y preparar la logística del evento.</li>
            </ul>
            <p>No usamos tus datos para publicidad de terceros ni los vendemos.</p>
          </section>

          <section>
            <h2>Con quién los compartimos</h2>
            <p>
              Solo con proveedores que nos ayudan a operar el servicio, como el alojamiento del sitio (Vercel) y la recepción
              de formularios (Formspree), que los tratan por nuestra cuenta. No hacemos otras transferencias que requieran tu
              consentimiento.
            </p>
          </section>

          <section>
            <h2>Cuánto tiempo los guardamos</h2>
            <p>
              Los datos de la lista de espera se conservan hasta que nos pidas borrarlos o hasta 12 meses después del
              lanzamiento. Los datos de los invitados se borran o anonimizan después del evento.
            </p>
          </section>

          <section>
            <h2>Tus derechos (ARCO)</h2>
            <p>
              Puedes pedir acceder, rectificar, cancelar u oponerte al uso de tus datos, o revocar tu consentimiento,
              escribiendo a <a className="font-medium text-vino underline" href={`mailto:${RESPONSABLE.correo}`}>{RESPONSABLE.correo}</a> con
              tu nombre, tu teléfono registrado y lo que solicitas. Te responderemos en un máximo de 20 días hábiles.
            </p>
          </section>

          <section>
            <h2>Medición de visitas</h2>
            <p>
              Usamos una medición de visitas que no utiliza cookies ni identifica a las personas; solo cuenta páginas vistas
              de forma agregada.
            </p>
          </section>

          <section>
            <h2>Cambios a este aviso</h2>
            <p>Cualquier cambio se publicará en esta misma página con su fecha de actualización.</p>
          </section>
        </div>
      </main>
    </div>
  )
}
