import { useNavigate } from "react-router-dom"

const Header = () => {

  const navigate = useNavigate()

  const home = () =>{
    navigate("/home")
  }

  const alquiler = () =>{
    navigate("/alquiler")
  }

  const categoria = () =>{
    navigate("/categoria")
  }

  const estados = () =>{
    navigate("/estados")
  }

  const roles = () =>{
    navigate("/roles")
  }

  const solicitudes = () =>{
    navigate("/solicitudes")
  }

  const vehiculos = () =>{
    navigate("/vehiculos")
  }

  const usuario = () =>{
    navigate("/usuarios")
  }

  return (
    <header>
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container">
        <a className="navbar-brand" href="/home">Retro Garage</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link" onClick={home}>Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={alquiler}>Alquiler</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={categoria}>Categorías</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={estados}>Estados</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={roles}>Roles</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={solicitudes}>Solicitudes</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={vehiculos}>Vehículos</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={usuario}>Usuarios</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
  )
}
export default Header