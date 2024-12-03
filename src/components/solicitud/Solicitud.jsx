import { useEffect } from "react"
import "./solicitud.css"
import useFetchVehiculo from "../../services/useFetchVehiculo"
import useFetchEstado from "../../services/useFetchEstado"
const Solicitud = () => {


    const [getAllVehiculo, createVehiculo, updateVehiculo, deleteVehiculo, infoApiVehiculo] = useFetchVehiculo()

    const [getAllEstado, createEstado, updateEstado, deleteEstado, infoApiEstado] = useFetchEstado() 

     

    useEffect(() => {
    
    }, [])
    

  return (
    <div className="form-container">
    <h2 className="form-title">Nueva Solicitud</h2>
    <form id="solicitudForm">
        <div className="mb-3">
            <label for="licenciaPdf" className="form-label">Licencia PDF</label>
            <input type="url" className="form-control" id="licenciaPdf" name="licencia_pdf" required/>
        </div>
        <div className="mb-3">
            <label for="diasAlquiler" className="form-label">Días de Alquiler</label>
            <input type="number" className="form-control" id="diasAlquiler" name="dias_alquiler" required/>
        </div>
        <div className="mb-3">
            <label for="pasajeros" className="form-label">Pasajeros</label>
            <input type="number" className="form-control" id="pasajeros" name="pasajeros" required/>
        </div>
        <div className="mb-3">
            <label for="comentario" className="form-label">Comentario</label>
            <textarea className="form-control" id="comentario" name="comentario" rows="3" required></textarea>
        </div>
        <div className="mb-3">
            <label for="vehiculoId" className="form-label">Vehículo</label>
            <select className="form-select" id="vehiculoId" name="vehiculo_id" required>
                <option value="" disabled selected>Seleccione un vehículo</option>
                <option value="1">Vehículo 1</option>
                <option value="2">Vehículo 2</option>
                <option value="3">Vehículo 3</option>
            </select>
        </div>
        <div className="mb-3">
            <label for="estadoId" className="form-label">Estado</label>
            <select className="form-select" id="estadoId" name="estado_id" required>
                <option value="" disabled selected>Seleccione un estado</option>
                <option value="1">Activo</option>
                <option value="2">Inactivo</option>
            </select>
        </div>
        <div className="mb-3">
            <label for="usuarioId" className="form-label">Usuario</label>
            <select className="form-select" id="usuarioId" name="usuario_id" required>
                <option value="" disabled selected>Seleccione un usuario</option>
                <option value="1">Usuario 1</option>
                <option value="2">Usuario 2</option>
                <option value="3">Usuario 3</option>
            </select>
        </div>
        <button type="submit" className="btn btn-primary w-100">Enviar</button>
    </form>
</div>

  )
}
export default Solicitud