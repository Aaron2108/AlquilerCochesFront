import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./usuario.css";
import useFetchEstado from "../../services/useFetchEstado";
import useFetchRol from "../../services/useFetchRol";
import useFetchUsuario from "../../services/useFetchUsuario";

const Usuario = () => {
  const { register, handleSubmit, reset } = useForm();

  const [btnModalCreate, setBtnModalCreate] = useState(false);
  const [usuarioUpdate1, setUsuarioUpdate1] = useState(false);
  const [usuarioToUpdate, setUsuarioToUpdate] = useState(null);

    const [getAllUsuario, createUsuario, updateUsuario, deleteUsuario, infoApiUsuario] = useFetchUsuario()

  const [
    getAllRol,
    createRol,
    updateRol,
    deleteRol,
    infoApiRol,
  ] = useFetchRol();
  const [
    getAllEstado,
    createEstado,
    updateEstado,
    deleteEstado,
    infoApiEstado,
  ] = useFetchEstado();

  useEffect(() => {
    getAllUsuario()
    getAllRol();
    getAllEstado();
  }, []);

  const submit = (data) => {
    if (usuarioUpdate1 && usuarioToUpdate) {
        updateUsuario(usuarioToUpdate.usuario_id, data);
      setUsuarioUpdate1(false);
    } else {
     createUsuario(data)
    }
    reset()
    setBtnModalCreate(false);
    setUsuarioUpdate1(false);
  };

  const handleDelete = (id) => {
    deleteUsuario(id);
  };


  return (
    <div className="vehiculo-container">
    <div className="vehiculo-header">
      <button
        className="vehiculo-btn agregar-btn"
        onClick={() => 
         {
          setBtnModalCreate(true)
          setUsuarioUpdate1(false)
         }
      }
      >
        <span>
          <svg
            height="24"
            width="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 0h24v24H0z" fill="none"></path>
            <path
              d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z"
              fill="currentColor"
            ></path>
          </svg>
          Agregar Vehículo
        </span>
      </button>
    </div>

    <div className="vehiculo-table-wrapper">
      <table className="vehiculo-table">
        <thead className="table-head">
          <tr>
            <th>Nº</th>
            <th>Usuario</th>
            <th>Correo</th>
            <th>Contraseña</th>
            <th>Telefono</th>
            <th>Direccion</th>
            <th>Rol</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {infoApiUsuario?.map((usuario, index) => (
            <tr key={usuario.usuario_id} className="table-row">
              <td>{index + 1}</td>
              <td>{usuario.usuario}</td>
              <td>{usuario.correo}</td>
              <td>{usuario.contraseña}</td>
              <td>{usuario.telefono}</td>
              <td>{usuario.direccion}</td>
              <td>{infoApiRol?.find((rol) => rol.rol_id === usuario.rol_id)?.descripcion || "Rol no encontrado"}</td>
              <td>
                {infoApiEstado?.find((estado) => estado.estado_id === usuario.estado_id)?.descripcion || "Estado no encontrado"}
              </td>
              <td>
                <button
                  className="vehiculo-btn edit-btn"
                  onClick={() => {
                    setUsuarioUpdate1(true);
                    setUsuarioToUpdate(usuario);
                    setBtnModalCreate(true);
                  }}
                >
                  <i className="fas fa-edit icon"></i>Editar
                </button>
                <button
                  className="vehiculo-btn delete-btn"
                  onClick={() => handleDelete(usuario.usuario_id)}
                >
                  <i className="fas fa-trash icon"></i>Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>




    {btnModalCreate && (
<div className="modal-overlay">
  <div className="modal-content">
    <button
      className="modal-close-btn"
      onClick={() => setBtnModalCreate(false)}
    >
      &times;
    </button>
    <h2 className="modal-title">
      {usuarioUpdate1 ? "Actualizar Usuario" : "Nuevo Usuario"}
    </h2>
    <form  onSubmit={handleSubmit(submit)} className="modal-form">
      {/* Campos del formulario */}
      <div className="form-group">
        <label htmlFor="usuario" className="form-label">
          Usuario
        </label>
        <input
          type="text"
          id="usuario"
          className="form-input"
          name="usuario"
          defaultValue={usuarioToUpdate?.usuario || ""}
          {...register("usuario")}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="correo" className="form-label">
          Correo
        </label>
        <input
          type="correo"
          id="correo"
          className="form-input"
          name="correo"
          defaultValue={usuarioToUpdate?.correo || ""}
          required
          {...register("correo")}
        />
      </div>

      <div className="form-group">
        <label htmlFor="contraseña" className="form-label">
          Contraseña
        </label>
        <input
          type="password"
          id="contraseña"
          className="form-input"
          name="contraseña"
          min="1886"
          max="2024"
          defaultValue={usuarioToUpdate?.contraseña || ""}
          required
          {...register("contraseña")}
        />
      </div>

      <div className="form-group">
        <label htmlFor="telefono" className="form-label">
          Telefono
        </label>
        <input
          type="number"
          id="telefono"
          className="form-input"
          name="telefono"
          defaultValue={usuarioToUpdate?.telefono || ""}
          required
          {...register("telefono")}
        />
      </div>

      <div className="form-group">
        <label htmlFor="direccion" className="form-label">
          Direccion
        </label>
        <input
          type="text"
          id="direccion"
          className="form-input"
          name="direccion"
          defaultValue={usuarioToUpdate?.direccion || ""}
          required
          {...register("direccion")}
        />
      </div>

      <div className="form-group">
        <label htmlFor="rol" className="form-label">
          Rol
        </label>
        <select
          id="rol"
          className="form-select"
          name="rol_id"
          defaultValue={usuarioToUpdate?.rol_id || ""}
          required
          {...register("rol_id")}
        >
          <option value="" disabled>
            Seleccione un Rol
          </option>
          {infoApiRol?.map((rol) => (
            <option key={rol.rol_id} value={rol.rol_id}>
              {rol.descripcion}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="estado" className="form-label">
          Estado
        </label>
        <select
          id="estado"
          className="form-select"
          name="estado_id"
          defaultValue={usuarioToUpdate?.estado_id || ""}
          required
          {...register("estado_id")}
        >
          <option value="" disabled>
            Seleccione un estado
          </option>
          {infoApiEstado?.map((estado) => (
            <option key={estado.estado_id} value={estado.estado_id}>
              {estado.descripcion}
            </option>
          ))}
        </select>
      </div>

      {/* Botones de acción */}
      <div className="modal-actions">
        <button type="submit" className="vehiculo-btn submit-btn">
          {usuarioUpdate1 ? "Actualizar" : "Crear"}
        </button>
        <button
          type="button"
          className="vehiculo-btn cancel-btn"
          onClick={() => setBtnModalCreate(false)}
        >
          Cancelar
        </button>
      </div>
    </form>
  </div>
</div>
)}



  </div>
  );
};

export default Usuario;
