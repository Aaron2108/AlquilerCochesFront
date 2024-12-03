import axios from "axios";
import { useState } from "react";

const baseUrl = 'http://localhost:3000/vehiculo'


const useFetchVehiculo = () => {
    const [hasError, setHasError] = useState(false);
    const [infoApiVehiculo, setInfoApi] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getAllVehiculo = () => {
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

    const createVehiculo = (credentials) => {
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

    const updateVehiculo = (id,credentials) => {
        setIsLoading(true);
        axios.put(`${baseUrl}/${id}`, credentials)
        .then(res => {
            setInfoApi(prevInfo => prevInfo.map(item => item.vehiculo_id === id ? res.data : item));
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

    const deleteVehiculo = (id) =>{
        setIsLoading(true);
        axios.delete(`${baseUrl}/${id}`)
        .then(res => {
            setInfoApi(prevInfo => prevInfo.filter(item => item.vehiculo_id !== id));
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

  return [getAllVehiculo, createVehiculo, updateVehiculo, deleteVehiculo, infoApiVehiculo, isLoading]
}
export default useFetchVehiculo