import { useEffect, useState } from "react";
import "../alquiler/alquiler.css";
import useFetchAlquiler from "../../services/useFetchAlquiler";
import { useForm } from "react-hook-form";
import useFetchSolicitud from "../../services/useFetchSolicitud";

const Alquiler = () => {
    const [solicitudId, setSolicitudId] = useState("");
    
    const { handleSubmit, register } = useForm();

    const [getAllAlquiler, createAlquiler, updateAlquiler, deleteAlquiler, infoApiAlquiler, isLoading] = useFetchAlquiler();

    const [getAllSolicitudes,createSolicitud,
        updateSolicitud,deleteSolicitud,infoApiSolicitud
            ] = useFetchSolicitud();


    useEffect(() => {
        getAllSolicitudes();
        getAllAlquiler()
    }, []);
    

    useEffect(() => {
        // console.log(infoApiAlquiler);
        console.log(getAllSolicitudes);
    }, []);
    
    const submit = (data) => {
        createAlquiler(data);
    };


    return (
        <div className="form-container">
            <div className="progress">
                <div className="progress-bar" role="progressbar" style={{ width: "0%" }} id="progressBar"></div>
            </div>

            <h2>Nuevo Alquiler</h2>
            <form onSubmit={handleSubmit(submit)} id="alquilerForm">
                <div className="mb-3">
                    <label htmlFor="fechaInicio" className="form-label">Fecha de Inicio</label>
                    <input {...register("fecha_inicio")} type="date" className="form-control" id="fechaInicio" name="fecha_inicio" required />
                </div>

                <div className="mb-3">
                    <label htmlFor="fechaFin" className="form-label">Fecha de Fin</label>
                    <input {...register("fecha_fin")} type="date" className="form-control" id="fechaFin" name="fecha_fin" required />
                </div>

                <div className="mb-3">
                    <label htmlFor="precio" className="form-label">Precio</label>
                    <input {...register("precio")} type="number" className="form-control" id="precio" name="precio" required />
                </div>

                <div className="mb-3">
                    <label htmlFor="costoExtra" className="form-label">Costo Extra</label>
                    <input {...register("costo_extra")} type="number" className="form-control" id="costoExtra" name="costo_extra" required />
                </div>

                <div className="mb-3">
                    <label htmlFor="comentario" className="form-label">Comentario</label>
                    <textarea {...register("comentario")} className="form-control" id="comentario" name="comentario" rows="3" required></textarea>
                </div>

                {/* <div className="mb-3">
                    <label htmlFor="solicitudId" className="form-label">Solicitud</label>
                    <select className="form-select" id="solicitudId" name="solicitud_id" required value={solicitudId}
                        onChange={(e) => setSolicitudId(e.target.value)}>
                        <option value="" disabled>Seleccione una solicitud</option>
                        {isLoading ? (
                            <option disabled>Cargando solicitudes...</option>
                        ) : (
                            infoApiSolicitud?.map((solicitud) => (
                                <option key={solicitud.solicitud_id} value={solicitud.solicitud_id}>
                                    {`Solicitud ${solicitud.solicitud_id} - ${solicitud.comentario}`}
                                </option>
                            ))
                        )}
                    </select>
                </div> */}

                <div className="mb-3">
                    <label htmlFor="estadoId" className="form-label">Estado</label>
                    <select className="form-select" id="estadoId" name="estado_id" required defaultValue="">
                        <option value="" disabled>Seleccione un estado</option>
                        <option value="1">Activo</option>
                        <option value="2">Pendiente</option>
                        <option value="3">Finalizado</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="fechaEntrega" className="form-label">Fecha de Entrega</label>
                    <input type="date" className="form-control" id="fechaEntrega" name="fecha_entrega" required />
                </div>

                <button type="submit" className="btn btn-primary w-100">Enviar</button>
            </form>
        </div>
    );
};

export default Alquiler;
