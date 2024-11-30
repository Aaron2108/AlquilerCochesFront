import "./rol.css"
const Rol = () => {
  return (
    <div className="form-container">
    <h2 className="form-title">Nuevo Rol</h2>
    <form id="rolForm">
        <div className="mb-3">
            <label for="descripcion" className="form-label">Descripción</label>
            <input type="text" className="form-control" id="descripcion" name="descripcion" required/>
        </div>
        <button type="submit" className="btn btn-primary w-100">Enviar</button>
    </form>
</div>

  )
}
export default Rol