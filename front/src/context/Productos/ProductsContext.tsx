/* eslint-disable prettier/prettier */
/* eslint-disable semi */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, useEffect, useReducer, useState } from 'react';
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
    insertarProductos: (producto: ProductoInsert) => void,
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
        const respuesta = await myProductsApi.get<UbicacionesTot>('/obtener-ubicaciones');
        setUbicaciones([
            ...respuesta.data.ubicaciones,
        ]);
    }

    const obtenerTipos = async () => {
        const respuesta = await myProductsApi.get<TiposTot>('/obtener-tipos');
        setTipos([
            ...respuesta.data.tipos,
        ]);
    }

    const insertarProductos = async (producto: ProductoInsert) => {
        await myProductsApi.post<ProductoInsert>('/insertar-productos', producto);
    }

    const insertarPedido = async (pedido: Cesta) => {

        const respuesta = await myProductsApi.post<Mensaje>('/addTo-cesta', pedido);

         setValido(respuesta.data.valido);
         setMensaje(respuesta.data.mensaje);

    }

    const obtenerCesta = async () => {

        const respuesta = await myProductsApi.get<Pedidos>('/pedidos');

        setCesta([
            ...respuesta.data.cesta,
        ]);
    }


    const obtenerTodosProductos = async () => {

        const respuesta = await myProductsApi.get<ProductosEn>('/todos');
        setTodos(respuesta.data.productos);
    }

    const eliminarPedido = async (id: string) => {

        const respuesta = await myProductsApi.delete<Mensaje>('/eliminar-de-la-cesta/' + id);

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
