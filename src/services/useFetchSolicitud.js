import axios from "axios";
import { useState } from "react";

const baseUrl = "http://localhost:3000/solicitudes";

const useFetchSolicitud = () => {
    const [hasError, setHasError] = useState(false);
    const [infoApiSolicitud, setInfoApi] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getAllSolicitud = () => {
        setIsLoading(true);
        axios.get(baseUrl)
        .then(res => {
            setInfoApi(Array.isArray(res.data) ? res.data : []);
            setHasError(false);
        })
        .catch(err => {
            console.log(err);
            setHasError(true);
            setInfoApi([]);
        })
        .finally(() =>{
            setIsLoading(false);
        })
    }

    const createSolicitud = (credentials) => {
        setIsLoading(true);
        axios.post(baseUrl, credentials)
        .then(res => {
            setInfoApi(prevInfo => Array.isArray(prevInfo) ? [...prevInfo, res.data] : [res.data]);
            setHasError(false);
        })
        .catch(err => {
            console.log(err);
            setHasError(true);
        })
        .finally(() => {
            setIsLoading(false);
        });
        
    }

    const updateSolicitud = (id,credentials) => {
        setIsLoading(true);
        axios.put(`${baseUrl}/${id}`, credentials)
        .then(res => {
            setInfoApi(prevInfo => prevInfo.map(item => item.usuario_id === id ? res.data : item));
            setHasError(false);
        })
        .catch(err => {
            console.log(err);
            setHasError(true);
        })
        .finally(() => {
            setIsLoading(false);
        });
    }

    const deleteSolicitud = (id) =>{
        setIsLoading(true);
        axios.delete(`${baseUrl}/${id}`)
        .then(res => {
            setInfoApi(prevInfo => prevInfo.filter(item => item.usuario_id !== id));
            setHasError(false);
        })
        .catch(err => {
            console.log(err);
            setHasError(true);
        })
        .finally(() => {
            setIsLoading(false);
        });
    }

  return [getAllSolicitud, createSolicitud, updateSolicitud, deleteSolicitud, infoApiSolicitud, isLoading]
};

export default useFetchSolicitud;
