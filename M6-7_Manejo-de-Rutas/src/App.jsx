import './App.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Citas from './pages/Citas'
import CitaDetalle from './pages/CitaDetalle'
import NotFound from './pages/NotFound'

// III * Configurar rutas

function App () {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/citas' element={<Citas />} />
        <Route path='/cita/:id' element={<CitaDetalle />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
