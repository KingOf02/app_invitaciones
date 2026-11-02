import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import Landing from './paginas/Landing'
import DemoInicio from './paginas/DemoInicio'
import Invitacion from './paginas/Invitacion'
import Panel from './paginas/Panel'
import BuscadorMesas from './paginas/BuscadorMesas'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/demo" element={<DemoInicio />} />
        <Route path="/demo/i/:token" element={<Invitacion />} />
        <Route path="/demo/panel" element={<Panel />} />
        <Route path="/demo/mesas" element={<BuscadorMesas />} />
        <Route path="*" element={<Landing />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
