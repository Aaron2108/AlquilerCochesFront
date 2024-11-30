import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import "../src/components/header/header.css"
import CategoriaPage from './pages/CategoriaPage'
import AlquilerPage from './pages/AlquilerPage'
import EstadoPage from './pages/EstadoPage'
import RolPage from './pages/RolPage'
import SolicitudesPage from './pages/SolicitudesPage'
import VehiculosPage from './pages/VehiculosPage'
import UsuarioPage from './pages/UsuarioPage'
function App() {

  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/home' element={<HomePage/>} />

        <Route path='/alquiler' element={<AlquilerPage/>} />
        <Route path='/categoria' element={<CategoriaPage/>} />
        <Route path='/estados' element={<EstadoPage/>} />
        <Route path='/roles' element={<RolPage/>} />
        <Route path='/solicitudes' element={<SolicitudesPage/>} />
        <Route path='/vehiculos' element={<VehiculosPage/>} />
        <Route path='/usuarios' element={<UsuarioPage/>} />



      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
