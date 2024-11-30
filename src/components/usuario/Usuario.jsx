import "./usuario.css"
const Usuario = () => {
  return (
    <div className="form-container">
    <h2 className="form-title">Nuevo Usuario</h2>
    <form id="usuarioForm">
        <div className="mb-3">
            <label for="usuario" className="form-label">Usuario</label>
            <input type="text" className="form-control" id="usuario" name="usuario" required/>
        </div>
        <div className="mb-3">
            <label for="correo" className="form-label">Correo Electrónico</label>
            <input type="email" className="form-control" id="correo" name="correo" required/>
        </div>
        <div className="mb-3">
            <label for="contraseña" className="form-label">Contraseña</label>
            <input type="password" className="form-control" id="contraseña" name="contraseña" required/>
        </div>
        <div className="mb-3">
            <label for="telefono" className="form-label">Teléfono</label>
            <input type="tel" className="form-control" id="telefono" name="telefono" required/>
        </div>
        <div className="mb-3">
            <label for="direccion" className="form-label">Dirección</label>
            <input type="text" className="form-control" id="direccion" name="direccion" required/>
        </div>
        <div className="mb-3">
            <label for="rolId" className="form-label">Rol</label>
            <select className="form-select" id="rolId" name="rol_id" required>
                <option value="" disabled selected>Seleccione un rol</option>
                <option value="1">Administrador</option>
                <option value="2">Usuario Normal</option>
                <option value="3">Editor</option>
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
        <button type="submit" className="btn btn-primary w-100">Enviar</button>
    </form>
</div>

  )
}
export default Usuario