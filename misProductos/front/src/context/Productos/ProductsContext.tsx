/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
/* eslint-disable semi */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, useEffect, useReducer, useState } from 'react';
import { ImagePickerResponse } from 'react-native-image-picker';
import myProductsApi from '../../api/db';
import { Producto, Ubicacion, TipoProducto, UbicacionesTot, TiposTot, ProductoInsert, Cesta, Mensaje, Pedidos, ProductosEn } from '../../interfaces/interface-producto';

type ProductContextProps = {
    mensaje: string,
    valido: boolean,
    ubicaciones: Ubicacion[],
    tipos: TipoProducto[],
    cesta: Cesta[] | null,
    productos: Producto[] | null,
    todos: Producto[] | null,
    obtenerCategorias: () => void,
    obtenerTipos: () => void,
    insertarProductos: (producto: ProductoInsert, imagenIma: ImagePickerResponse) => void,
    insertarPedido: (pedido: Cesta) => void,
    obtenerCesta: () => void,
    obtenerTodosProductos: () => void,
    eliminarPedido: (id: string) => void,
    cambiaMensaje: (mensaje: string) => void,
}

export const ProductsContext = createContext({} as ProductContextProps);

export const ProductProvider = ( {children}: any ) => {

    //const [state, dispatch] = useReducer(ProductsReducer, ProductsInitialState);
    const [mensaje, setMensaje] = useState('');
    const [valido, setValido] = useState(false);
    const [productos, setProductos] = useState<Producto[]>([])
    const [todos, setTodos] = useState<Producto[]>([])
    const [cesta, setCesta] = useState<Cesta[]>([])
    const [ubicaciones, setUbicaciones] = useState<Ubicacion[]>([])
    const [tipos, setTipos] = useState<TipoProducto[]>([])

    useEffect(() => {
        obtenerCesta();
      }, []);

    useEffect(() => {
      obtenerCategorias();
    }, []);

    useEffect(() => {
        obtenerTipos();
      }, []);

    useEffect(() => {
        obtenerTodosProductos();
      }, []);

    const obtenerCategorias = async () => {
        const respuesta = await myProductsApi.get<UbicacionesTot>('/ubicaciones/obtener-ubicaciones');
        setUbicaciones([
            ...respuesta.data.ubicaciones,
        ]);
    }

    const obtenerTipos = async () => {
        const respuesta = await myProductsApi.get<TiposTot>('/tipos/obtener-tipos');
        setTipos([
            ...respuesta.data.tipos,
        ]);
    }

    const insertarProductos = async (producto: ProductoInsert, imagenIma: ImagePickerResponse) => {
        
        const respuesta = await myProductsApi.post<Mensaje>('/productos/insertar-productos', producto);

        if (respuesta.data.valido){
            const id = respuesta.data.producto?._id;
            if (imagenIma.assets !== undefined){

                const fileToUpload = {
                    uri: imagenIma.assets[0].uri,
                    type: imagenIma.assets[0].type,
                    name: imagenIma.assets[0].fileName,
                }

                const formData = new FormData();
                formData.append('archivo', fileToUpload);
                try {
                    await fetch(`https://my-productos.herokuapp.com/api/productos/subirImagen/${id}`, {
                        method: 'put',
                        headers: {
                            'content-type': 'multipart/form-data',
                        },
                        body: formData,
                    }).then((res) => {
                        console.log(res);
                    });
                } catch (error){
                    console.log(error);
                }

            }
        }
    }

    const insertarPedido = async (pedido: Cesta) => {

        const respuesta = await myProductsApi.post<Mensaje>('/productos/addTo-cesta', pedido);

         setValido(respuesta.data.valido);
         setMensaje(respuesta.data.mensaje);

    }

    const obtenerCesta = async () => {

        const respuesta = await myProductsApi.get<Pedidos>('/productos/pedidos');

        setCesta([
            ...respuesta.data.cesta,
        ]);
    }


    const obtenerTodosProductos = async () => {

        const respuesta = await myProductsApi.get<ProductosEn>('/productos/todos');
        setTodos(respuesta.data.productos);
    }

    const eliminarPedido = async (id: string) => {

        const respuesta = await myProductsApi.delete<Mensaje>('/productos/eliminar-de-la-cesta/' + id);

        setMensaje(respuesta.data.mensaje);

    }

    const cambiaMensaje = (mensage: string) => {

        setMensaje(mensage);

    }

    return (
        <ProductsContext.Provider value={{
            mensaje,
            valido,
            todos,
            cesta,
            productos,
            ubicaciones,
            tipos,
            obtenerCategorias,
            obtenerTipos,
            insertarProductos,
            insertarPedido,
            obtenerCesta,
            obtenerTodosProductos,
            eliminarPedido,
            cambiaMensaje,
        }}>
            {children}
        </ProductsContext.Provider>
    );
}
