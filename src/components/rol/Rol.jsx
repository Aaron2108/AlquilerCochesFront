import { useEffect, useState } from "react";
import useFetchRol from "../../services/useFetchRol";
import "./rol.css";
import { useForm } from "react-hook-form";

const Rol = () => {

  const {register, handleSubmit} = useForm()

  const [btnModalCreate, setBtnModalCreate] = useState(false);
  const [roleUpdate, setRoleUpdate] = useState(false);
  const [roleToUpdate, setRoleToUpdate] = useState(null);

  const [
    getAllRol,
    createRol,
    updateRol,
    deleteRol,
    infoApiRol,
    isLoading,
  ] = useFetchRol();

  useEffect(() => {
    getAllRol();
  }, []);

  const submit = (data) => {
    if (roleUpdate && roleToUpdate) {
      updateRol(roleToUpdate.rol_id, data); // Actualizamos el rol
      setRoleUpdate(false);
    } else {
      createRol(data); // Si no estamos actualizando, creamos un nuevo rol
    }
    setBtnModalCreate(false); // Cerrar el modal
  };

  const handleDelete = (id) => {
    deleteRol(id);
  };

  return (
    <div>
      <div className="table-container">
        <div className="div_boton_rol">
          <button
            className="AgregarButon"
            onClick={() => setBtnModalCreate(true)}
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
              Create
            </span>
          </button>
        </div>

        <table>
          <thead>
            <tr>
              <th>Nº</th>
              <th>Descripción</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {infoApiRol?.map((rol, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{rol.descripcion}</td>
                <td>
                  <button
                    onClick={() => {
                      setRoleUpdate(true);
                      setRoleToUpdate(rol); 
                      setBtnModalCreate(true); 
                    }}
                    className="btn btn-edit"
                  >
                    <i className="fas fa-edit icon"></i>Editar
                  </button>
                  <button
                    onClick={() => handleDelete(rol.rol_id)}
                    className="btn btn-delete"
                  >
                    <i className="fas fa-trash icon"></i>Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {btnModalCreate && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button
              className="modal-close"
              onClick={() => setBtnModalCreate(false)}
            >
              &times;
            </button>
            <h2 className="modal-title">
              {roleUpdate ? "Actualizar Rol" : "Nuevo Rol"}
            </h2>
            <form onSubmit={handleSubmit(submit)} id="rolForm">
              <div className="mb-3">
                <label htmlFor="descripcion" className="form-label">
                  Descripción
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="descripcion"
                  name="descripcion"
                  required
                  {...register("descripcion")}
                  defaultValue={roleToUpdate ? roleToUpdate.descripcion : ""}
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">
                {roleUpdate ? "Actualizar" : "Crear"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Rol;
