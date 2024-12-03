import axios from "axios";
import { useState } from "react";

const baseUrl = 'http://localhost:3000/estados'

const useFetchEstado = () => {
    const [hasError, setHasError] = useState(false);
    const [infoApiEstado, setInfoApi] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getAllEstado = () => {
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

    const createEstado = (credentials) => {
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

    const updateEstado = (id,credentials) => {
        setIsLoading(true);
        axios.put(`${baseUrl}/${id}`, credentials)
        .then(res => {
            setInfoApi(prevInfo => prevInfo.map(item => item.estado_id === id ? res.data : item));
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

    const deleteEstado = (id) =>{
        setIsLoading(true);
        axios.delete(`${baseUrl}/${id}`)
        .then(res => {
            setInfoApi(prevInfo => prevInfo.filter(item => item.estado_id !== id));
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

  return [getAllEstado, createEstado, updateEstado, deleteEstado, infoApiEstado, isLoading]
}
export default useFetchEstado