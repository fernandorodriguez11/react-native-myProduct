/* eslint-disable prettier/prettier */

export interface Cesta{
    _id?: string | null,
    usuario: string,
    comprado: boolean,
    productoId: string,
    cantidad: number
}

export interface Pedidos {
    cesta: Cesta[],
}

export interface Mensaje{
    valido: boolean,
    mensaje: string,
    cesta: Cesta,
}

export interface ProductosEn {
    productos: Producto[],
    ubicacion: string,
}

export interface Producto {
    _id: string,
    nombre: string,
    tienda: string,
    imagen: string,
    ubicacionId: Ubicacion,
    tipoId: TipoProducto,
}

export interface ProductoInsert {
    nombre: string,
    tienda: string,
    imagen: string,
    ubicacionId: string,
    tipoId: string,
}

export interface Ubicacion {
    _id: string,
    nombre: string,
}

export interface UbicacionesTot {
    ubicaciones: Ubicacion[]
}

export interface TipoProducto {
    _id: string,
    tipo: string,
}

export interface TiposTot {
    tipos: TipoProducto[]
}
