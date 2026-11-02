import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import './index.css'
import Landing from './paginas/Landing'
import DemoInicio from './paginas/DemoInicio'
import Invitacion from './paginas/Invitacion'
import Panel from './paginas/Panel'
import BuscadorMesas from './paginas/BuscadorMesas'
import Privacidad from './paginas/Privacidad'

// Al cambiar de página se empieza desde arriba, salvo enlaces a una sección (#lista).
function SubirAlCambiar() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <SubirAlCambiar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/demo" element={<DemoInicio />} />
        <Route path="/demo/i/:token" element={<Invitacion />} />
        <Route path="/demo/panel" element={<Panel />} />
        <Route path="/demo/mesas" element={<BuscadorMesas />} />
        <Route path="/privacidad" element={<Privacidad />} />
        <Route path="*" element={<Landing />} />
      </Routes>
    </BrowserRouter>
    <Analytics />
  </StrictMode>,
)
