/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
/* eslint-disable keyword-spacing */
/* eslint-disable semi */

import React, { createContext, useEffect, useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Usuario, Login, LoginData, UsuarioInsert, UsuarioData } from '../interfaces/interface-usuario';
import { authReducer, AuthSate } from './AuthReducer';
import myProductsApi from '../api/db';

type AuthContextProps = {
    errorMessage: string,
    token: string | null,
    user: Usuario | null,
    status: 'checking' | 'authenticated' | 'not-authenticated',
    valido: boolean | null,
    rol: String | null,
    signIn: (loginData: Login) => void,
    insertarUsuario: (usuario: UsuarioInsert) => void,
    logOut: () => void,
    removeError: () => void,
}

const authInicialState: AuthSate = {
    status: 'checking',
    errorMessage: '',
    user: null,
    usuario: null,
    mensaje: '',
    token: null,
    valido: null,
    rol: null,
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ( {children}: any ) => {

    const [state, dispatch] = useReducer(authReducer, authInicialState);

    useEffect(() => {
      
        validaToken();

    }, []);
    
    const validaToken = async() => {
        
        //Obtengo el token que se habrá guardado al logearnos en el asyncstorage con el nombre de token
        const token = await AsyncStorage.getItem('token');

        //Compruebo si existe o no para saber si está autenticado o no
        if(!token){
            return dispatch({type: 'notAuthenticated'});
        }else{
            
            //hago llamada a la api para comprobar que el token es el mismo.
            //TODO Hacer get
            const respuesta = await myProductsApi.post('/existe-token', {token});

            //El status 200 es que existe el usuario por lo tanto si no da ese status es un error.
            if(respuesta.status !== 200) {
                return dispatch({type: 'notAuthenticated'});
            }

            //await AsyncStorage.setItem('token', respuesta.data.token);

            //obtengo el usuario y el token
            dispatch({type: 'logIn', payload: {token: respuesta.data.token, user: respuesta.data.usuario, valido: respuesta.data.valido}});
            dispatch({type: 'addRol', payload: respuesta.data.usuario.rol});
            console.log(respuesta.data.token);
        }

    };

    const signIn = async({email, password}: Login) => {

        try{

            const {data} = await myProductsApi.post<LoginData>('/login', {email, password});
            

            if(data.usuario !== null){
                dispatch({type: 'logIn', payload: {token: data.token, user: data.usuario, valido: data.valido}});
                await AsyncStorage.setItem('token', data.token);
                dispatch({type: 'addRol', payload: data.usuario.rol});
            }else{
                dispatch({type: 'addError', payload: 'email o password no válidos'});
            }
            

        }catch(error: any){
            dispatch({type: 'addError', payload: error.response.data.msg || 'Información Erronea'});
        }
    }

    const insertarUsuario = async(usuario: UsuarioInsert) => {

        try{

            const {data} = await myProductsApi.post<UsuarioData>('/insertar', usuario);
            dispatch({type: 'insertUser', payload: {usuario: data.usuario, mensaje: data.mensaje}})

        }catch(error: any){
            dispatch({type: 'addError', payload: error.response.data.msg || 'Información Erronea'});
        }
    }

    const logOut = async() => {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('rol');
        dispatch({type: 'logOut'});
    }

    const removeError = () => {
        dispatch({type: 'removeError'});
    }

    return (
        <AuthContext.Provider value={{
            ...state,
            signIn,
            insertarUsuario,
            logOut,
            removeError,
        }}>
            {children}
        </AuthContext.Provider>
    );
}
