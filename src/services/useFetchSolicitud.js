import axios from "axios";
import { useState } from "react";

const baseUrl = "http://localhost:3000/solicitudes";

const useFetchSolicitud = () => {
    const [hasError, setHasError] = useState(false);
    const [infoApiSolicitud, setInfoApi] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getAllSolicitudes = () => {
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
    };

    const createSolicitud = (credentials) => {
        setIsLoading(true);
        axios.post(baseUrl, credentials)
            .then(res => {
                if (res.data) {
                    setInfoApi(prevInfo => Array.isArray(prevInfo) ? [...prevInfo, res.data] : [res.data]);
                    setHasError(false);
                } else {
                    console.warn("Empty response received from createSolicitud");
                }
            })
            .catch(err => {
                console.error("Error creating solicitud:", err.response || err);
                setHasError(true);
            })
            .finally(() => setIsLoading(false));
    };

    const updateSolicitud = (id, credentials) => {
        setIsLoading(true);
        axios.put(`${baseUrl}/${id}`, credentials)
            .then(res => {
                setInfoApi(prevInfo => prevInfo.map(item => item.solicitud_id === id ? res.data : item));
                setHasError(false);
            })
            .catch(err => {
                console.error("Error updating solicitud:", err.response || err);
                setHasError(true);
            })
            .finally(() => setIsLoading(false));
    };

    const deleteSolicitud = (id) => {
        setIsLoading(true);
        axios.delete(`${baseUrl}/${id}`)
            .then(() => {
                setInfoApi(prevInfo => prevInfo.filter(item => item.solicitud_id !== id));
                setHasError(false);
            })
            .catch(err => {
                console.error("Error deleting solicitud:", err.response || err);
                setHasError(true);
            })
            .finally(() => setIsLoading(false));
    };

    return [getAllSolicitudes,createSolicitud,
updateSolicitud,deleteSolicitud,infoApiSolicitud,isLoading,hasError
    ];
};

export default useFetchSolicitud;
