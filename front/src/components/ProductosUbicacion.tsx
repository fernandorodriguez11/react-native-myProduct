/* eslint-disable prettier/prettier */
/* eslint-disable radix */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-trailing-spaces */
/* eslint-disable semi */
import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity, Modal } from 'react-native';
import { Cesta, Producto } from '../interfaces/interface-producto';
import useTypeProducts from '../hooks/useTypeProducts';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../context/AuthContext';
import { ProductsContext } from '../context/Productos/ProductsContext';
import Parte1 from './Parte1';

interface Props{
    producto: Producto,
    ubicacion: string,
}

const ProductosUbicacion = ({producto}: Props) => {

  const [verModal, setVerModal] = useState(false);
  const [verMensaje, setVerMensaje] = useState(false);

  const [cantidad, setCantidad] = useState('1');
  const {nombre, imagen, tienda, tipoId, _id} = producto;

  const {tipoProducto} = useTypeProducts(tipoId);

  const {user} = useContext(AuthContext);
  const {insertarPedido, mensaje, cambiaMensaje} = useContext(ProductsContext);

  const incrementCantidad = () => {

    const sumarCantidad = parseInt(cantidad) + 1;

    setCantidad(sumarCantidad.toString());
    
  }

  const decrementCantidad = () => {

    if (cantidad === '1'){

    } else {
        const sumarCantidad = parseInt(cantidad) - 1;

        setCantidad(sumarCantidad.toString());
    }
    

  }

  const showModal = () => {

    if (verModal){
        setVerModal(false);
    } else {
        setVerModal(true);
    }
  }
  
  const showMensaje = () => {

    if (verMensaje){
        setVerMensaje(false);
        cambiaMensaje('');
    } else {
        setVerMensaje(true);
    }
  }
  const addToCart = () => {
    
    setVerModal(false);

    const pedido: Cesta = {
        usuario: user!.username,
        cantidad: parseInt(cantidad),
        productoId: _id,
        comprado: false,
    }

    insertarPedido(pedido);
    setVerMensaje(true);

  }

  return (
    <View style={styles.capaPadre}>
    
      <Parte1 nombre={nombre} imagen={imagen}/>

      <View style={styles.parte2}>

        <View style={[{...styles.productoType, marginTop: 10}]}>
            <Icon name="store" size={27} color="black" />
            <Text>{tienda}</Text>
        </View>

        <View style={[{...styles.productoType, marginTop: 5}]}>
            <Ionicons name="remove-outline" size={27} color="black" />
            <Text>{tipoProducto}</Text>
        </View>

        <View style={styles.capaCantidad}>
            <View style={styles.widthBotones}>
                <Button title="-" onPress={decrementCantidad} />
            </View>
            <TextInput 
                value={cantidad} 
                placeholder="0" 
                style={styles.cantidad} 
                keyboardType="number-pad"
                editable={false}
                />
            <View style={styles.widthBotones}>
                <Button title="+" onPress={incrementCantidad} />
            </View>
        </View>

        <View style={{width: '100%', marginTop: 10}}>
            <TouchableOpacity style={{alignItems: 'center'}} onPress={showModal}>
                <Ionicons name="basket-sharp" color="black" size={50} />
            </TouchableOpacity>
        </View>

      </View>
      
      <Modal
        animationType="slide"
        visible={verModal}
        transparent={true}
      >
          <View style={styles.container} >
            <View style={styles.contenidoModal} >
                <Text style={styles.tituloModal} >Añadir</Text>
                <Text style={styles.cuerpoModal} >Seguro De Añadir este producto</Text>
                <View style={{flexDirection: 'row', marginTop: 5}}>
                <View style={{marginRight: 5}}>
                    <Button title="Añadir" onPress={addToCart} /></View>
                    <View style={{marginLeft: 5}}>
                    <Button title="Cerrar" onPress={showModal} />
                    </View>
                </View>
            </View>
          </View>
      </Modal>

      <Modal
        animationType="slide"
        visible={verMensaje}
        transparent={true}
      >
          <View style={styles.container} >
            <View style={styles.contenidoModal} >
                <Text style={[{...styles.tituloModal, fontSize: 16}]} >{mensaje}</Text>
                <View style={{flexDirection: 'row', marginTop: 15}}>
                    <Button title="Cerrar" onPress={showMensaje} />
                </View>
            </View>
          </View>
      </Modal>

    </View>
  )
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

        marginBottom: 10,
    },

    parte2: {
        height: '100%',
        width: '45%',
    },

    productoType:{
        flexDirection: 'row', 
        justifyContent: 'space-around', 
        marginBottom: 5,
        alignItems: 'center',
    },

    capaCantidad: {
        flexDirection: 'row',
        width: '100%', 
        marginTop: 10, 
        marginRight: '2%',
    },
    
    widthBotones: {width: '29%'},

    cantidad: {
        backgroundColor: 'rgba(222,222,222,0.8)',
        color: 'black', 
        width: '39%', 
        height: 35,
        textAlign: 'center',
    },

    container: {
        backgroundColor: 'rgba(0,0,0,0.3)', 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
    },

    contenidoModal: {
        backgroundColor: 'white', 
        width: 250, 
        height: 200, 
        justifyContent: 'center', 
        alignItems: 'center',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        elevation: 10,
        borderRadius: 7,
    },

    tituloModal: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
    },

    cuerpoModal: {
        color: 'black',
        fontSize: 16,
        fontWeight: '300',
        marginVertical: 10,
    },

});

export default ProductosUbicacion;
