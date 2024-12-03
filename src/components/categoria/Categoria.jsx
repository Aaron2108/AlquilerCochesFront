import { useEffect, useState } from "react";
import "./categoria.css";
import useFetchCategoria from "../../services/useFetchCategoria";
import { useForm } from "react-hook-form";

const Categoria = () => {
  const { register, handleSubmit } = useForm();

  const [
    getAllCategoria,
    createCategoria,
    updateCategoria,
    deleteCategoria,
    infoApiCategoria,
    isLoading,
  ] = useFetchCategoria();

  const [btnModalCreate, setBtnModalCreate] = useState(false);
  const [categoryUpdate, setCategoryUpdate] = useState(false);
  const [categoryToUpdate, setCategoryToUpdate] = useState(null); // Estado para la categoría a editar

  useEffect(() => {
    getAllCategoria();
  }, []);

  const submit = (data) => {
    if (categoryUpdate && categoryToUpdate) {
      console.log(data);
      updateCategoria(categoryToUpdate.categoria_id, data);
      setCategoryUpdate(false);
    } else {
      createCategoria(data);
    }
    setBtnModalCreate(false); // Cerrar el modal
  };

  const handleDelete = (id) => {
    deleteCategoria(id);
  };

  return (
    <div>
      <div className="table-container">
        <div className="div_boton_categoria">
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
            {infoApiCategoria?.map((categoria, index) => (
              <tr key={categoria.categoria_id}>
                <td>{index + 1}</td>
                <td>{categoria.descripcion}</td>
                <td>
                  <button
                    onClick={() => {
                      setCategoryUpdate(true);
                      setCategoryToUpdate(categoria); // Guardar la categoría a editar
                      setBtnModalCreate(true); // Abrir el modal
                    }}
                    className="btn btn-edit"
                  >
                    <i className="fas fa-edit icon"></i>Editar
                  </button>
                  <button
                    onClick={() => handleDelete(categoria.categoria_id)}
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
              {categoryUpdate ? "Actualizar Categoría" : "Nueva Categoría"}
            </h2>
            <form onSubmit={handleSubmit(submit)} id="categoriaForm">
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
                  defaultValue={categoryToUpdate ? categoryToUpdate.descripcion : ""}
                  {...register("descripcion")}
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

export default Categoria;
