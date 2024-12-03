import { useEffect, useState } from "react";
import "../alquiler/alquiler.css";
import useFetchAlquiler from "../../services/useFetchAlquiler";
import useFetchSolicitud from "../../services/useFetchSolicitud";
import useFetchEstado from "../../services/useFetchEstado";
import { useForm } from "react-hook-form";

const Alquiler = () => {

    const {register, handleSubmit, reset} = useForm()

  const [getAllAlquiler, createAlquiler, updateAlquiler, deleteAlquiler, infoApiAlquiler, isLoading] = useFetchAlquiler();
  const [getAllSolicitudes, createSolicitud, updateSolicitud, deleteSolicitud, infoApiSolicitud] = useFetchSolicitud();
  const [getAllEstado, createEstado, updateEstado, deleteEstado, infoApiEstado] = useFetchEstado()
  
  const [btnModalCreate, setBtnModalCreate] = useState(false);
  const [alquilerUpdate, setAlquilerUpdate] = useState(false);
  const [alquilerToUpdate, setAlquilerToUpdate] = useState(null);

  useEffect(() => {
    getAllSolicitudes();
    getAllAlquiler();
    getAllEstado();
  }, [infoApiAlquiler]);

  const submit = (data) => {
    if (alquilerUpdate && alquilerToUpdate) {
      updateAlquiler(alquilerToUpdate.alquiler_id, data);
      setAlquilerUpdate(false);
    } else {
        reset()
      createAlquiler(data);
    }
    setBtnModalCreate(false);
  };

  const handleDelete = (id) => {
    deleteAlquiler(id);
  };

  return (
    <div className="alquiler-container">
      <div className="alquiler-header">
        <button
          className="alquiler-btn agregar-btn"
          onClick={() => {
            setBtnModalCreate(true);
            setAlquilerUpdate(false);
          }}
        >
          <span>Agregar Alquiler</span>
        </button>
      </div>

      <div className="alquiler-table-wrapper">
        <table className="alquiler-table">
          <thead>
            <tr>
              <th>Nº</th>
              <th>Fecha Inicio</th>
              <th>Fecha Fin</th>
              <th>Precio</th>
              <th>Costo Extra</th>
              <th>Comentario</th>
              <th>Estado</th>
              <th>Solicitud</th>
              <th>Fecha Entrega</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {infoApiAlquiler?.map((alquiler, index) => (
              <tr key={alquiler.alquiler_id}>
                <td>{index + 1}</td>
                <td>{new Date(alquiler.fecha_inicio).toLocaleDateString()}</td>
                <td>{new Date(alquiler.fecha_fin).toLocaleDateString()}</td>
                <td>{alquiler.precio}</td>
                <td>{alquiler.costo_extra}</td>
                <td>{alquiler.comentario}</td>
                <td>{infoApiEstado?.find((estado)=>estado.estado_id === alquiler.estado_id)?.descripcion}</td>
                <td>{infoApiSolicitud?.find((solicitud)=> solicitud.solicitud_id === alquiler.solicitud_id)?.licencia_pdf}</td>
                <td>{new Date(alquiler.fecha_entrega).toLocaleDateString()}</td>
                <td>
                  <button
                    className="alquiler-btn edit-btn"
                    onClick={() => {
                      setAlquilerUpdate(true);
                      setAlquilerToUpdate(alquiler);
                      setBtnModalCreate(true);
                    }}
                  >
                    Editar
                  </button>
                  <button
                    className="alquiler-btn delete-btn"
                    onClick={() => handleDelete(alquiler.alquiler_id)}
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
              {alquilerUpdate ? "Actualizar Alquiler" : "Nuevo Alquiler"}
            </h2>
            <form onSubmit={handleSubmit(submit)} className="modal-form">
              <div className="form-group">
                <label htmlFor="fechaInicio">Fecha de Inicio</label>
                <input
                  type="date"
                  id="fechaInicio"
                  name="fecha_inicio"
                  defaultValue={alquilerToUpdate?.fecha_inicio || ""}
                  required
                  {...register("fecha_inicio")}
                />
              </div>
              <div className="form-group">
                <label htmlFor="fechaFin">Fecha de Fin</label>
                <input
                  type="date"
                  id="fechaFin"
                  name="fecha_fin"
                  defaultValue={alquilerToUpdate?.fecha_fin || ""}
                  required
                  {...register("fecha_fin")}
                />
              </div>
              <div className="form-group">
                <label htmlFor="precio">Precio</label>
                <input
                  type="number"
                  id="precio"
                  name="precio"
                  defaultValue={alquilerToUpdate?.precio || ""}
                  required
                  {...register("precio")}
                />
              </div>
              <div className="form-group">
                <label htmlFor="costoExtra">Costo Extra</label>
                <input
                  type="number"
                  id="costoExtra"
                  name="costo_extra"
                  defaultValue={alquilerToUpdate?.costo_extra || ""}
                  required
                  {...register("costo_extra")}
                />
              </div>
              <div className="form-group">
                <label htmlFor="comentario">Comentario</label>
                <textarea
                  id="comentario"
                  name="comentario"
                  defaultValue={alquilerToUpdate?.comentario || ""}
                  required
                  {...register("comentario")}
                ></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="solicitudId">Solicitud</label>
                <select
                  id="solicitudId"
                  name="solicitd_id"
                  defaultValue={alquilerToUpdate?.estado_id || ""}
                  required
                  {...register("solicitud_id")}
                >
                  <option value="" disabled>
                    Seleccione una solicitud
                  </option>
                 {infoApiSolicitud?.map((solicitud) => (
                     <option key={solicitud.solicitud_id} value={solicitud.solicitud_id}>
                        {solicitud.licencia_pdf}</option>
                 ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="estadoId">Estado</label>
                <select
                  id="estadoId"
                  name="estado_id"
                  defaultValue={alquilerToUpdate?.estado_id || ""}
                  required
                  {...register("estado_id")}
                >
                  <option value="" disabled>
                    Seleccione un estado
                  </option>
                 {infoApiEstado?.map((estado) => (
                     <option key={estado.estado_id} value={estado.estado_id}>
                        {estado.descripcion}</option>
                 ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="fechaEntrega">Fecha de Entrega</label>
                <input
                  type="date"
                  id="fechaEntrega"
                  name="fecha_entrega"
                  defaultValue={alquilerToUpdate?.fecha_entrega || ""}
                  required
                  {...register("fecha_entrega")}
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                  {alquilerUpdate ? "Actualizar" : "Crear"}
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

export default Alquiler;
