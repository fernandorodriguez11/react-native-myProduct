/* eslint-disable prettier/prettier */
/* eslint-disable semi */
/* eslint-disable no-trailing-spaces */
/* eslint-disable keyword-spacing */
/* eslint-disable quotes */

import { Usuario, UsuarioInsert } from "../interfaces/interface-usuario";

export interface AuthSate {
    status: 'checking' | 'authenticated' | 'not-authenticated',
    token: string | null,
    errorMessage: string,
    user: Usuario | null,
    usuario: UsuarioInsert | null,
    mensaje: string,
    valido: boolean | null,
    rol: string | null,
}

type AuthAction =
    | {type: 'logIn', payload: {token: string, user: Usuario, valido: boolean}}
    | {type: 'insertUser' , payload: {usuario: UsuarioInsert, mensaje: string}}
    | {type: 'addError',  payload: {errorMessage: string, valido: boolean}}
    | {type: 'addRol', payload: string}
    | {type: 'removeError'}
    | {type: 'notAuthenticated'}
    | {type: 'logOut'}

export const authReducer = (state: AuthSate, action: AuthAction): AuthSate => {

    switch(action.type){
        
        case 'logIn':
            return {
                ...state,
                errorMessage: '',
                token: action.payload.token,
                user: action.payload.user,
                valido: action.payload.valido,
                status: 'authenticated',
            }

        case 'insertUser':
            return {
                ...state,
                errorMessage: '',
                usuario: action.payload.usuario,
                mensaje: action.payload.mensaje,
            }

        case 'addError':
            return {
                ...state,
                errorMessage: action.payload.errorMessage,
                valido: action.payload.valido,
                token: null,
                user: null,
                status: 'not-authenticated',
            }

        case 'addRol':
            return {
                ...state,
                rol: action.payload,
            }

        case 'removeError':
                return {
                    ...state,
                    errorMessage: '',
                }

        case 'logOut':
        case 'notAuthenticated':
            return {
                ...state,
                token: null,
                user: null,
                rol: null,
                status: 'not-authenticated',
            }

        default:
            return state;
    }
}
