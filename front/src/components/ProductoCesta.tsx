/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-trailing-spaces */
/* eslint-disable semi */
import React, { useContext, useState } from 'react';
import { View, StyleSheet, Button, Modal} from 'react-native';
import { Cesta } from '../interfaces/interface-producto';
import Parte1 from './Parte1';
import { Text } from 'react-native-paper';
import { ProductsContext } from '../context/Productos/ProductsContext';
import Icon  from 'react-native-vector-icons/MaterialIcons';
import Ionicons  from 'react-native-vector-icons/Ionicons';
import useCesta from '../hooks/useCesta';

interface Props{
    cesta: Cesta,
}

const ProductoCesta = ({cesta}: Props) => {

  const {cantidad, comprado, productoId, usuario, _id} = cesta;

  const {todos/*, eliminarPedido, mensaje, cambiaMensaje*/} = useContext(ProductsContext);
  const resultado = todos?.find(element => element._id === productoId);


  const {comprarProducto, eliminarPedido, mensaje} = useCesta();
  
  const [cambiaComprado, setCambiaComprado] = useState(comprado);
  const [modal, setModal] = useState(false);

  const seleccionar = () => {

    if (cambiaComprado ){

    } else {
        
        setCambiaComprado(true);
        console.log(productoId);
        console.log(usuario);
        cesta = {
            _id,
            cantidad,
            productoId,
            usuario,
            comprado: true,
        }

        comprarProducto(cesta);

        setModal(true);

    }

  }

  const cerrarModal = () => {

    if (modal){
    setModal(false);
    
    }

  };

  const eliminarDeLaCesta = () => {
      
    eliminarPedido(_id!);
    
    setModal(true);

  }
  
  return (
    <View style={styles.capaPadre}>

        <View style={styles.solicitud}>
            <Text style={styles.textoSolicitud} >Solicitado por {usuario}</Text>
        </View>

        <Parte1 nombre={resultado?.nombre!} imagen={resultado?.imagen!}/>
        
        <View style={{width: '45%'}}>

            <View style={[{...styles.productoCesta, marginTop: 10}]}>
                <Icon name="store" size={25} color="black" />
                <Text style={{marginLeft: 10}}>{resultado?.tienda}</Text>
            </View>

            <View style={[{...styles.productoCesta, marginTop: 7, marginBottom: 10}]}>
                <Ionicons name="pricetags" size={25} color="black" />
                <Text style={{marginLeft: 10}}>{cantidad}</Text>
            </View>

            {
                cambiaComprado 
                ? (<View style={{width: '90%'}}>
                        <Button title="Comprado" color="#6BCF90"/>   
                    </View>)  
                    
                : (<View style={{width: '90%'}}>
                    <Button title="Comprar" onPress={seleccionar} color="rgb(255, 179, 94)"/>   
                </View>) 
            }

            <View style={{width: '90%', marginTop: 15}}>
                <Button title="Eliminar" onPress={eliminarDeLaCesta} color="red"/>   
            </View>

        </View>
        
        <Modal
            animationType="slide"
            visible={modal}
            transparent={true}
        >
          <View style={styles.container} >
            <View style={styles.contenidoModal} >
                <Text style={[{...styles.tituloModal, fontSize: 16}]} >{mensaje}</Text>
                <View style={{flexDirection: 'row', marginTop: 15}}>
                    <Button title="Cerrar" onPress={cerrarModal} />
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

    solicitud: {
        position: 'absolute', 
        top: -15, 
        left: -3, 
        width: '70%', 
        backgroundColor: '#BBCEE2', 
        zIndex: 2, 
        borderRadius: 5, 
        borderBottomStartRadius: 5, 
        borderBottomEndRadius: 0, 
        borderTopEndRadius: 0,
    },

    textoSolicitud: {
        color: 'white', 
        fontSize: 16,
        textAlign: 'center',
    },

    productoCesta: {
        flexDirection: 'row', 
        width: '100%',
        marginLeft: 7, 
        alignItems: 'center',
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

export default ProductoCesta;
