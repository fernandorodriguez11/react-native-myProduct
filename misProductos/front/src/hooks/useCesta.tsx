/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
/* eslint-disable semi */
import { useState } from 'react';
import myProductsApi from '../api/db';
import { Mensaje, Cesta } from '../interfaces/interface-producto';

const useCesta = () => {
  
  const [isLoading, setIsLoading] = useState(true);
  const [valido , setValido] = useState(false);
  const [mensaje, setMensaje] = useState<string>('')

  const comprarProducto = async(producto: Cesta) => {

    const respuesta =  await myProductsApi.put<Mensaje>('/productos/comprar', producto);

    setMensaje(respuesta.data.mensaje);
    setValido(respuesta.data.valido);
    setIsLoading(false);

  };

  const eliminarPedido = async (id: string) => {

    const respuesta = await myProductsApi.delete<Mensaje>('/productos/eliminar-de-la-cesta/' + id);

    setMensaje(respuesta.data.mensaje);
    setValido(respuesta.data.valido);
    setIsLoading(false);
}
  
  

  return (
    {
        comprarProducto,
        eliminarPedido,
        valido,
        mensaje,
        isLoading,
    }
  );

}

export default useCesta;
