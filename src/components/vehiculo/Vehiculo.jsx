import "./vehiculo.css"
const Vehiculo = () => {
  return (
    <div className="form-container">
    <h2 className="form-title">Formulario de Vehículo</h2>
    <form id="vehiculoForm">
        <div className="mb-3">
            <label for="modelo" className="form-label">Modelo</label>
            <input type="text" className="form-control" id="modelo" name="modelo" required/>
        </div>
        <div className="mb-3">
            <label for="foto" className="form-label">Foto URL</label>
            <input type="url" className="form-control" id="foto" name="foto" required/>
        </div>
        <div className="mb-3">
            <label for="año" className="form-label">Año</label>
            <input type="number" className="form-control" id="año" name="año" min="1886" max="2024" required/>
        </div>
        <div className="mb-3">
            <label for="cilindrada" className="form-label">Cilindrada</label>
            <input type="text" className="form-control" id="cilindrada" name="cilindrada" required/>
        </div>
        <div className="mb-3">
            <label for="asientos" className="form-label">Asientos</label>
            <input type="number" className="form-control" id="asientos" name="asientos" required/>
        </div>
        <div className="mb-3">
            <label for="color" className="form-label">Color</label>
            <input type="text" className="form-control" id="color" name="color" required/>
        </div>
        <div className="mb-3">
            <label for="placa" className="form-label">Placa</label>
            <input type="text" className="form-control" id="placa" name="placa" required/>
        </div>
        <div className="mb-3">
            <label for="categoriaId" className="form-label">Categoría</label>
            <select className="form-select" id="categoriaId" name="categoria_id" required>
                <option value="" disabled selected>Seleccione una categoría</option>
                <option value="1">4X4</option>
                <option value="2">Sedán</option>
                <option value="3">SUV</option>
            </select>
        </div>
        <div className="mb-3">
            <label for="estadoId" className="form-label">Estado</label>
            <select className="form-select" id="estadoId" name="estado_id" required>
                <option value="" disabled selected>Seleccione un estado</option>
                <option value="1">Disponible</option>
                <option value="2">No Disponible</option>
            </select>
        </div>
        <button type="submit" className="btn btn-primary w-100">Enviar</button>
    </form>
</div>

  )
}
export default Vehiculo