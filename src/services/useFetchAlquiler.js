import axios from "axios";
import { useState } from "react";

const baseUrl = 'http://localhost:3000/alquileres'

const useFetchAlquiler = () => {
    const [hasError, setHasError] = useState(false);
    const [infoApiAlquiler, setInfoApi] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getAllAlquiler = () => {
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

    const createAlquiler = (credentials) => {
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

    const updateAlquiler = (id,credentials) => {
        setIsLoading(true);
        axios.put(`${baseUrl}${id}`, credentials)
        .then(res => {
            setInfoApi(prevInfo => prevInfo.map(item => item.alquiler_id === id ? res.data : item));
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

    const deleteAlquiler = (id) =>{
        setIsLoading(true);
        axios.delete(`${baseUrl}${id}`)
        .then(res => {
            setInfoApi(prevInfo => prevInfo.filter(item => item.alquiler_id !== id));
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

  return [getAllAlquiler, createAlquiler, updateAlquiler, deleteAlquiler, infoApiAlquiler, isLoading]
}
export default useFetchAlquiler