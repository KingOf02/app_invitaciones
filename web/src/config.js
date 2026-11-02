// Ajustes de la plataforma. El nombre es provisional hasta decidirlo (ver bitácora).
export const MARCA = {
  nombre: 'Pase',
  lema: '¿Ya tienes tu invitación? Nosotros te decimos quién va.',
}

// Lista de espera: endpoint que recibe POST con JSON (por ejemplo Formspree).
// Si no hay endpoint, el formulario abre WhatsApp con el mensaje prellenado.
export const LISTA_ESPERA_ENDPOINT = import.meta.env.VITE_WAITLIST_ENDPOINT || ''
export const WHATSAPP_CONTACTO = import.meta.env.VITE_WHATSAPP_NUMBER || ''

// Datos del responsable que aparecen en el aviso de privacidad.
export const RESPONSABLE = {
  nombre: 'Marco Guerrero',
  ciudad: 'Monterrey, Nuevo León, México',
  correo: 'ingguerrero97@gmail.com',
}
export const FECHA_AVISO = '2 de noviembre de 2026'

export const DESCUENTO_LANZAMIENTO = 0.4
export const CUPOS_LANZAMIENTO = 10
