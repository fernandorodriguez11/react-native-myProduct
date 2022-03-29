/* eslint-disable prettier/prettier */
/* eslint-disable semi */
/* eslint-disable no-trailing-spaces */
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface Props{
    imagen: string,
    nombre: string,
}

const Parte1 = ({imagen, nombre}: Props) => {
  return (
    <View style={styles.parte1}>
        {
            imagen !== '' ? <Image source={{uri: imagen}} style={styles.imagen} /> : <></>
        }
        <View style={styles.producto}>
            <Text style={styles.nombre}>{nombre!.toLocaleUpperCase()!}</Text>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({

    capaPadre: {
        width: '90%',
        height: 190,
        marginTop: 20,
        flexDirection: 'row',
        marginLeft: '5%',
        borderWidth: 2,
        borderColor: 'rgba(222,222,222,0.8)',
        
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.25,

        elevation: 3,
    },

    parte1: {
        height: '100%',
        width: '55%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    imagen:{
        width: '90%', 
        height: '98%',
    },

    producto: {
        backgroundColor: 'black',
        width: '90%',
        position: 'absolute',
        bottom: 0,
    },

    nombre: {
        textAlign: 'center',
        color: 'white',
        fontSize: 17,
        letterSpacing: 2,
    },
});

export default Parte1;
