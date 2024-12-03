import { useEffect, useState } from "react";
import useFetchVehiculo from "../../services/useFetchVehiculo";
import useFetchEstado from "../../services/useFetchEstado";
import useFetchCategoria from "../../services/useFetchCategoria";
import "./vehiculo.css";
import { useForm } from "react-hook-form";

const Vehiculo = () => {

    const {register, handleSubmit} = useForm()

  const [btnModalCreate, setBtnModalCreate] = useState(false);
  const [vehiculoUpdate1, setVehiculoUpdate1] = useState(false);
  const [vehiculoToUpdate, setVehiculoToUpdate] = useState(null);

  const [
    getAllVehiculo,
    createVehiculo,
    updateVehiculo,
    deleteVehiculo,
    infoApiVehiculo,
    isLoading,
  ] = useFetchVehiculo();

  const [getAllEstado, createEstado, updateEstado, deleteEstado, infoApiEstado]= useFetchEstado();
  const [getAllCategoria,createCategoria,updateCategoria,deleteCategoria, infoApiCategoria] = useFetchCategoria();

  useEffect(() => {
    getAllVehiculo();
    getAllEstado();
    getAllCategoria();
}, []);

const submit = (data) => {
    if (vehiculoUpdate1 && vehiculoToUpdate) {
      updateVehiculo(vehiculoToUpdate.vehiculo_id, data);
      setVehiculoUpdate1(false);
    } else {
      createVehiculo(data);
    }
    setBtnModalCreate(false);
  };

  const handleDelete = (id) => {
    deleteVehiculo(id);
  };

  return (
    <div className="vehiculo-container">
      <div className="vehiculo-header">
        <button
          className="vehiculo-btn agregar-btn"
          onClick={() => 
           {
            setBtnModalCreate(true)
            setVehiculoUpdate1(false)
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
              <th>Foto</th>
              <th>Modelo</th>
              <th>Año</th>
              <th>Cilindrada</th>
              <th>Asientos</th>
              <th>Color</th>
              <th>Placa</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {infoApiVehiculo?.map((vehiculo, index) => (
              <tr key={vehiculo.vehiculo_id} className="table-row">
                <td>{index + 1}</td>
                <td>
                  <img
                    src={vehiculo.foto}
                    alt={vehiculo.modelo}
                    className="vehiculo-image"
                  />
                </td>
                <td>{vehiculo.modelo}</td>
                <td>{vehiculo.año}</td>
                <td>{vehiculo.cilindrada}</td>
                <td>{vehiculo.asientos}</td>
                <td>{vehiculo.color}</td>
                <td>{vehiculo.placa}</td>
                <td>
                  {vehiculo.estado_id === 1 ? "Disponible" : "No Disponible"}
                </td>
                <td>
                  <button
                    className="vehiculo-btn edit-btn"
                    onClick={() => {
                      setVehiculoUpdate1(true);
                      setVehiculoToUpdate(vehiculo);
                      setBtnModalCreate(true);
                    }}
                  >
                    <i className="fas fa-edit icon"></i>Editar
                  </button>
                  <button
                    className="vehiculo-btn delete-btn"
                    onClick={() => handleDelete(vehiculo.vehiculo_id)}
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
        {vehiculoUpdate1 ? "Actualizar Vehículo" : "Nuevo Vehículo"}
      </h2>
      <form  onSubmit={handleSubmit(submit)} className="modal-form">
        {/* Campos del formulario */}
        <div className="form-group">
          <label htmlFor="modelo" className="form-label">
            Modelo
          </label>
          <input
            type="text"
            id="modelo"
            className="form-input"
            name="modelo"
            defaultValue={vehiculoToUpdate?.modelo || ""}
            {...register("modelo")}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="foto" className="form-label">
            Foto URL
          </label>
          <input
            type="url"
            id="foto"
            className="form-input"
            name="foto"
            defaultValue={vehiculoToUpdate?.foto || ""}
            required
            {...register("foto")}
          />
        </div>

        <div className="form-group">
          <label htmlFor="año" className="form-label">
            Año
          </label>
          <input
            type="number"
            id="año"
            className="form-input"
            name="año"
            min="1886"
            max="2024"
            defaultValue={vehiculoToUpdate?.año || ""}
            required
            {...register("año")}
          />
        </div>

        <div className="form-group">
          <label htmlFor="cilindrada" className="form-label">
            Cilindrada
          </label>
          <input
            type="text"
            id="cilindrada"
            className="form-input"
            name="cilindrada"
            defaultValue={vehiculoToUpdate?.cilindrada || ""}
            required
            {...register("cilindrada")}
          />
        </div>

        <div className="form-group">
          <label htmlFor="asientos" className="form-label">
            Asientos
          </label>
          <input
            type="number"
            id="asientos"
            className="form-input"
            name="asientos"
            defaultValue={vehiculoToUpdate?.asientos || ""}
            required
            {...register("asientos")}
          />
        </div>

        <div className="form-group">
          <label htmlFor="color" className="form-label">
            Color
          </label>
          <input
            type="text"
            id="color"
            className="form-input"
            name="color"
            defaultValue={vehiculoToUpdate?.color || ""}
            required
            {...register("color")}
          />
        </div>

        <div className="form-group">
          <label htmlFor="placa" className="form-label">
            Placa
          </label>
          <input
            type="text"
            id="placa"
            className="form-input"
            name="placa"
            defaultValue={vehiculoToUpdate?.placa || ""}
            required
            {...register("placa")}
          />
        </div>

        <div className="form-group">
          <label htmlFor="categoria" className="form-label">
            Categoría
          </label>
          <select
            id="categoria"
            className="form-select"
            name="categoria_id"
            defaultValue={vehiculoToUpdate?.categoria_id || ""}
            required
            {...register("categoria_id")}
          >
            <option value="" disabled>
              Seleccione una categoría
            </option>
            {infoApiCategoria?.map((categoria) => (
              <option key={categoria.categoria_id} value={categoria.categoria_id}>
                {categoria.descripcion}
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
            defaultValue={vehiculoToUpdate?.estado_id || ""}
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
            {vehiculoUpdate1 ? "Actualizar" : "Crear"}
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

export default Vehiculo;
