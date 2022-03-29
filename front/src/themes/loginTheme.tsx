/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
/* eslint-disable no-trailing-spaces */
import { StyleSheet } from "react-native";

export const loginSt = StyleSheet.create({

    contenedor: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
    },

    contenedorPassword: {
        width: '100%', 
        justifyContent: 'center', 
        alignItems: 'center',
    },

    titulo:{
        fontSize: 22,
        color: 'black',
        fontWeight: 'bold',
        marginBottom: 20,
    },

    inputs: {
        color: 'black',
        fontSize: 16,
        width: '80%',
        borderRadius: 15,
        borderColor: 'rgba(94,195,233, 0.7)',
        borderWidth: 2,
        marginVertical: 10,
        padding: 15,
    },

    eror: {
        color:'red', 
        width: '100%', 
        paddingLeft: 45, 
        marginBottom: 10,
    },

    icono: {
        position: 'absolute',
        right: 50,
        zIndex: 999,
        color: 'rgba(0,0,0, 0.5)',
    },
    
});
