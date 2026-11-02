import { useCallback, useEffect, useState } from 'react'
import { PASES } from './datos'

// Las respuestas de la demo se guardan en este navegador para que una
// confirmación hecha en la vista del invitado aparezca en el panel.
const CLAVE = 'demo-respuestas-v1'
const EVENTO_CAMBIO = 'demo-respuestas-cambio'

function leer() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE)) || {}
  } catch {
    return {}
  }
}

function escribir(respuestas) {
  try {
    localStorage.setItem(CLAVE, JSON.stringify(respuestas))
  } catch {
    // Sin almacenamiento la demo sigue funcionando, solo no recuerda cambios.
  }
  window.dispatchEvent(new Event(EVENTO_CAMBIO))
}

export function usePases() {
  const [respuestas, setRespuestas] = useState(leer)

  useEffect(() => {
    const actualizar = () => setRespuestas(leer())
    window.addEventListener(EVENTO_CAMBIO, actualizar)
    window.addEventListener('storage', actualizar)
    return () => {
      window.removeEventListener(EVENTO_CAMBIO, actualizar)
      window.removeEventListener('storage', actualizar)
    }
  }, [])

  const pases = PASES.map((p) => ({ ...p, ...respuestas[p.token] }))

  const responder = useCallback((token, respuesta) => {
    escribir({ ...leer(), [token]: { ...respuesta, fechaRespuesta: new Date().toISOString() } })
  }, [])

  const reiniciar = useCallback(() => escribir({}), [])

  return { pases, responder, reiniciar }
}

export function resumen(pases) {
  const confirmados = pases.filter((p) => p.respuesta === 'si')
  return {
    totalPases: pases.length,
    lugaresInvitados: pases.reduce((s, p) => s + p.lugares, 0),
    personasConfirmadas: confirmados.reduce((s, p) => s + p.menus.length, 0),
    pasesConfirmados: confirmados.length,
    pasesPendientes: pases.filter((p) => p.respuesta === 'pendiente').length,
    pasesNo: pases.filter((p) => p.respuesta === 'no').length,
  }
}

export function sinAcentos(texto) {
  return texto.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
}
