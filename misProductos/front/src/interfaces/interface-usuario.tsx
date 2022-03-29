/* eslint-disable prettier/prettier */
export interface Usuario{
    _id: string,
    username: string,
    rol: string,
    password: string,
    email: string,
    token: string,
}

export interface UsuarioInsert{
    username: string,
    rol: string,
    password: string,
    email: string,
    token: string,
}

export interface UsuarioData{
    usuario: UsuarioInsert,
    mensaje: string,
}

export interface Login{
    email: string,
    password: string,
}

export interface LoginData{
    usuario: Usuario,
    token: string,
    valido: boolean,
}

export interface Registro{
    usuario: Usuario
}
