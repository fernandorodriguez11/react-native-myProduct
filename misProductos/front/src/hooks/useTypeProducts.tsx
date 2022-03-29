/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-trailing-spaces */
/* eslint-disable semi */
import { useEffect, useState } from 'react';
import myProductsApi from '../api/db';
import { TipoProducto } from '../interfaces/interface-producto';

const useTypeProducts = (id: TipoProducto) => {
  const [isLoading, setIsLoading] = useState(true);
  const [tipoProducto, setTipoProducto] = useState<string>();

  const obtenTipoProducto = async() => {

    const respuesta =  await myProductsApi.get<TipoProducto>('/tipo-especifico/' + id);

    setTipoProducto(respuesta.data.tipo);
    setIsLoading(false);
  };
  
  useEffect(() => {
    obtenTipoProducto();
  }, []);
  

  return (
    {
        tipoProducto,
        isLoading,
    }
  );

}

export default useTypeProducts;
