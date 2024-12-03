import { useEffect, useState } from "react";
import "./solicitud.css";
import useFetchVehiculo from "../../services/useFetchVehiculo";
import useFetchEstado from "../../services/useFetchEstado";
import useFetchSolicitud from "../../services/useFetchSolicitud";
import useFetchUsuario from "../../services/useFetchUsuario";
import { useForm } from "react-hook-form";

const Solicitud = () => {


    const {register, handleSubmit, reset} = useForm();

  const [getAllVehiculo, createVehiculo, updateVehiculo, deleteVehiculo, infoApiVehiculo] = useFetchVehiculo();
  const [getAllEstado, createEstado, updateEstado, deleteEstado, infoApiEstado] = useFetchEstado();
  const [getAllSolicitudes, createSolicitud, updateSolicitud, deleteSolicitud, infoApiSolicitud] = useFetchSolicitud();

  const [getAllUsuario, createUsuario, updateUsuario, deleteUsuario, infoApiUsuario, isLoading] = useFetchUsuario()

  
  const [btnModalCreate, setBtnModalCreate] = useState(false);
  const [solicitudUpdate, setSolicitudUpdate] = useState(false);
  const [solicitudToUpdate, setSolicitudToUpdate] = useState(null);

  useEffect(() => {
    getAllSolicitudes();
    getAllVehiculo();
    getAllEstado();
    getAllUsuario()
  }, [infoApiUsuario]);

  

  const submit = (data) => {
    if (solicitudUpdate && solicitudToUpdate) {
      updateSolicitud(solicitudToUpdate.solicitud_id, data);
      setSolicitudUpdate(false);
    } else {
      createSolicitud(data);
    }
    reset()
    setBtnModalCreate(false);
  };

  const handleDelete = (id) => {
    deleteSolicitud(id);
  };

  return (
    <div className="solicitud-container">
      <div className="solicitud-header">
        <button
          className="solicitud-btn agregar-btn"
          onClick={() => {
            setBtnModalCreate(true);
            setSolicitudUpdate(false);
          }}
        >
          <span>
            <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0h24v24H0z" fill="none"></path>
              <path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z" fill="currentColor"></path>
            </svg>
            Agregar Solicitud
          </span>
        </button>
      </div>

      <div className="solicitud-table-wrapper">
        <table className="solicitud-table">
          <thead className="table-head">
            <tr>
              <th>Nº</th>
              <th>Licencia PDF</th>
              <th>Días de Alquiler</th>
              <th>Pasajeros</th>
              <th>Comentario</th>
              <th>Vehículo</th>
              <th>Estado</th>
              <th>Usuario</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {infoApiSolicitud?.map((solicitud, index) => (
              <tr key={solicitud.solicitud_id} className="table-row">
                <td>{index + 1}</td>
                <td>{solicitud.licencia_pdf}</td>
                <td>{solicitud.dias_alquiler}</td>
                <td>{solicitud.pasajeros}</td>
                <td>{solicitud.comentario}</td>
                <td>{infoApiVehiculo?.find((vehiculo) => vehiculo.vehiculo_id === solicitud.vehiculo_id)?.modelo}</td>
                <td>{infoApiEstado?.find((estado) => estado.estado_id === solicitud.estado_id)?.descripcion}</td>
                <td>{infoApiUsuario?.find((usuario) => usuario.usuario_id === solicitud.usuario_id)?.usuario}</td>
                <td>
                  <button
                    className="solicitud-btn edit-btn"
                    onClick={() => {
                      setSolicitudUpdate(true);
                      setSolicitudToUpdate(solicitud);
                      setBtnModalCreate(true);
                    }}
                  >
                    Editar
                  </button>
                  <button
                    className="solicitud-btn delete-btn"
                    onClick={() => handleDelete(solicitud.solicitud_id)}
                  >
                    Eliminar
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
        {solicitudUpdate ? "Actualizar Solicitud" : "Nueva Solicitud"}
      </h2>
      <form onSubmit={handleSubmit(submit)} className="modal-form">
        <div className="form-group">
          <label htmlFor="licenciaPdf">Licencia PDF</label>
          <input
            type="url"
            id="licenciaPdf"
            name="licencia_pdf"
            defaultValue={solicitudToUpdate?.licencia_pdf || ""}
            required
            {...register("licencia_pdf")}
          />
        </div>
        <div className="form-group">
          <label htmlFor="diasAlquiler">Días de Alquiler</label>
          <input
            type="number"
            id="diasAlquiler"
            name="dias_alquiler"
            defaultValue={solicitudToUpdate?.dias_alquiler || ""}
            required
            {...register("dias_alquiler")}
          />
        </div>
        <div className="form-group">
          <label htmlFor="pasajeros">Pasajeros</label>
          <input
            type="number"
            id="pasajeros"
            name="pasajeros"
            defaultValue={solicitudToUpdate?.pasajeros || ""}
            required
            {...register("pasajeros")}
          />
        </div>
        <div className="form-group">
          <label htmlFor="comentario">Comentario</label>
          <textarea
            id="comentario"
            name="comentario"
            rows="3"
            defaultValue={solicitudToUpdate?.comentario || ""}
            required
            {...register("comentario")}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="vehiculoId">Vehículo</label>
          <select
            id="vehiculoId"
            name="vehiculo_id"
            defaultValue={solicitudToUpdate?.vehiculo_id || ""}
            required
            {...register("vehiculo_id")}
          >
            <option value="" disabled>
              Seleccione un vehículo
            </option>
            {infoApiVehiculo?.map((vehiculo) => (
              <option key={vehiculo.vehiculo_id} value={vehiculo.vehiculo_id}>
                {vehiculo.modelo}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="estadoId">Estado</label>
          <select
            id="estadoId"
            name="estado_id"
            defaultValue={solicitudToUpdate?.estado_id || ""}
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
        <div className="form-group">
          <label htmlFor="usuarioId">Usuario</label>
          <select
            id="usuarioId"
            name="usuario_id"
            defaultValue={solicitudToUpdate?.usuario_id || ""}
            required
            {...register("usuario_id")}
          >
            <option value="" disabled>
              Seleccione un usuario
            </option>
            {infoApiUsuario?.map((usuario) => (
              <option key={usuario.usuario_id} value={usuario.usuario_id}>
                {usuario.usuario}
              </option>
            ))}
          </select>
        </div>
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {solicitudUpdate ? "Actualizar" : "Crear"}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
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

export default Solicitud;
