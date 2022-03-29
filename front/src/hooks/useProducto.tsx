/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-trailing-spaces */
/* eslint-disable semi */
import { useEffect, useState } from 'react';
import myProductsApi from '../api/db';
import { Producto} from '../interfaces/interface-producto';

const useProducto = (id: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [producto, setProducto] = useState<Producto>();

  const obtenProductoEspecifico = async() => {
    console.log(id);
    const respuesta = await myProductsApi.get('/productoById/' + id);
    console.log(respuesta.data.productos);
    setProducto(respuesta.data.productos);
    setIsLoading(false);
  };
  
  useEffect(() => {
    obtenProductoEspecifico();
  }, []);
  

  return (
    {
        producto,
        isLoading,
    }
  );

}

export default useProducto;
