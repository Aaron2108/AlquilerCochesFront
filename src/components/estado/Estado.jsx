import { useEffect, useState } from "react";
import useFetchEstado from "../../services/useFetchEstado";
import "./estado.css";
import { useForm } from "react-hook-form";

const Estado = () => {

  const { register, handleSubmit } = useForm();

  const [btnModalCreate, setBtnModalCreate] = useState(false);
  const [categoryUpdate, setCategoryUpdate] = useState(false);
  const [categoryToUpdate, setCategoryToUpdate] = useState(null); // Estado para el estado a editar

  const [
    getAllEstado,
    createEstado,
    updateEstado,
    deleteEstado,
    infoApiEstado,
    isLoading,
  ] = useFetchEstado();

  useEffect(() => {
    getAllEstado();
  }, []);

  const submit = (data) => {
    if (categoryUpdate && categoryToUpdate) {
      updateEstado(categoryToUpdate.estado_id, data);
      setCategoryUpdate(false);
    } else {
      createEstado(data); // Si no estamos actualizando, creamos un nuevo estado
    }
    setBtnModalCreate(false); // Cerrar el modal
  };

  const handleDelete = (id) => {
    deleteEstado(id);
  };

  return (
    <div>
      <div className="table-container">
        <div className="div_boton_estado">
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
            {infoApiEstado?.map((estado, index) => (
              <tr key={estado.estado_id}>
                <td>{index + 1}</td>
                <td>{estado.descripcion}</td>
                <td>
                  <button
                    onClick={() => {
                      setCategoryUpdate(true);
                      setCategoryToUpdate(estado); // Guardar el estado a editar
                      setBtnModalCreate(true); // Abrir el modal
                    }}
                    className="btn btn-edit"
                  >
                    <i className="fas fa-edit icon"></i>Editar
                  </button>
                  <button
                    onClick={() => handleDelete(estado.estado_id)}
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
              {categoryUpdate ? "Actualizar Estado" : "Nuevo Estado"}
            </h2>
            <form onSubmit={handleSubmit(submit)} id="estadoForm">
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
                  defaultValue={categoryToUpdate ? categoryToUpdate.descripcion : ""}
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">
                {categoryUpdate ? "Actualizar" : "Crear"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Estado;
