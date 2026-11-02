// Ajustes de la plataforma. El nombre es provisional hasta decidirlo (ver bitácora).
export const MARCA = {
  nombre: 'Pase',
  lema: '¿Ya tienes tu invitación? Nosotros te decimos quién va.',
}

// Lista de espera: endpoint que recibe POST con JSON (por ejemplo Formspree).
// Si no hay endpoint, el formulario abre WhatsApp con el mensaje prellenado.
export const LISTA_ESPERA_ENDPOINT = import.meta.env.VITE_WAITLIST_ENDPOINT || ''
export const WHATSAPP_CONTACTO = import.meta.env.VITE_WHATSAPP_NUMBER || ''

export const DESCUENTO_LANZAMIENTO = 0.4
export const CUPOS_LANZAMIENTO = 10
