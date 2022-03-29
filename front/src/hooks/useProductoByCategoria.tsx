/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-trailing-spaces */
/* eslint-disable semi */
import { useEffect, useState } from 'react';
import myProductsApi from '../api/db';
import { ProductosEn, Producto } from '../interfaces/interface-producto';

const useProductoByCategoria = (ubicacion: string) => {

  const [productos, setProductos] = useState<Producto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoria, setCategoria] = useState<string>();

  const obtenProductosPorCategoria = async() => {

    const respuesta =  await myProductsApi.get<ProductosEn>('/productosEn/' + ubicacion);
    setProductos([...respuesta.data.productos]);
    setCategoria(respuesta.data.ubicacion);
    setIsLoading(false);
  };

  useEffect(() => {

    obtenProductosPorCategoria();
    
  }, []);

  return (
    {
        productos,
        categoria,
        isLoading,
    }
  );

}

export default useProductoByCategoria;
