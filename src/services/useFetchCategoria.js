import axios from "axios";
import { useState } from "react";

const baseUrl = 'http://localhost:3000/categorias'

const useFetchCategoria = () => {
    const [hasError, setHasError] = useState(false);
    const [infoApiCategoria, setInfoApi] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getAllCategoria = () => {
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

    const createCategoria = (credentials) => {
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

    const updateCategoria = (id,credentials) => {
        setIsLoading(true);
        axios.put(`${baseUrl}/${id}`, credentials)
        .then(res => {
            setInfoApi(prevInfo => prevInfo.map(item => item.categoria_id === id ? res.data : item));
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

    const deleteCategoria = (id) =>{
        setIsLoading(true);
        axios.delete(`${baseUrl}/${id}`)
        .then(res => {
            setInfoApi(prevInfo => prevInfo.filter(item => item.categoria_id !== id));
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

  return [getAllCategoria, createCategoria, updateCategoria, deleteCategoria, infoApiCategoria, isLoading]
}
export default useFetchCategoria