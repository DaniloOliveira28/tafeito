import { Method, AxiosRequestHeaders, ResponseType } from 'axios'
import { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {useLocalStorage} from './useLocalStorage';

export type TokenProps = {
  token: string|null
}

interface useAxiosProps {
  method: Method
  path: string
}

type ResponseAxios<T> =  {
  commit: (data?:object | undefined, cb?:()=> void, newPath?:string, responseType?:ResponseType, headers?:AxiosRequestHeaders) => void ;
  response: T | null;
  error: string;
  loading: boolean;
};

const baseUrl = 'http://localhost:8080/';

export const useAxios = <T>({ method, path }: useAxiosProps):ResponseAxios<T> => {
  let navigate = useNavigate();
  const [, setTokenObj] = useLocalStorage<TokenProps>("token", {token:null});

  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [loading, setloading] = useState(false);

  const commit = (data?:object | undefined, cb?:()=> void, newPath?:string, responseType?:ResponseType, customHeaders?:AxiosRequestHeaders ) => {
    setloading(true);
    const item = window.localStorage.getItem('token');
    const tokenObj: TokenProps = JSON.parse(item!);

    let headers = {};

    if(tokenObj?.token) {
      headers = {"Authorization" : `Bearer ${tokenObj!.token}`}
    };

    if(customHeaders){
      headers = {
        ...headers,
        ...customHeaders
      }
    }
    axios({
      method, 
      url: `${baseUrl}${newPath ? newPath : path}`,
      headers,
      data,
      responseType
    })
    .then((res) => {
        setResponse(res.data);
        setError('');
    })
    .catch((err) => {
      setError(err);
      if(err) {
        setTokenObj({token: null})
        navigate('/login');
      }

    })
    .finally(() => {
        setloading(false);
        if(cb) {cb()}
    });

  };


  return { commit, response, error, loading };
}