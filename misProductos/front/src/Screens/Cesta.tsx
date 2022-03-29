/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable semi */
import { MaterialBottomTabScreenProps } from '@react-navigation/material-bottom-tabs';
import SplashScreen from 'react-native-splash-screen';
import React, { useContext, useEffect, useState } from 'react';
import { View, FlatList, RefreshControl, Text, StyleSheet, Button } from 'react-native';
import ProductoCesta from '../components/ProductoCesta';
import { ProductsContext } from '../context/Productos/ProductsContext';

interface Props extends MaterialBottomTabScreenProps<any, any>{}

const Cesta = ({navigation}: Props) => {

  const [isRefreshing, setIsRefreshing] = useState(false);

  const {cesta, obtenerCesta} = useContext(ProductsContext);

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const pullToRefresh = async () => {
    setIsRefreshing(true);
    await obtenerCesta();
    setIsRefreshing(false);
  }

  return (
    <View style={{flex: 1}}>
      { cesta?.length === 0
        ? <View style={estilos.contenedorVacio} >
            <Text style={estilos.titulo} >No hay productos añadidos a la cesta.</Text>
            <Text style={estilos.mensaje} >Espera a que otro usuario añada un producto o añadelo tú mismo.</Text>

            <View style={estilos.capaBoton} >
              <Button title="Insertar" onPress={() => navigation.navigate('Productos')}/>
            </View>
        </View>
        : <FlatList
            style={{backgroundColor: 'white'}}
            data={cesta}
            keyExtractor={item => item._id!}
            renderItem={({item}):any => <ProductoCesta cesta={item} />}
            horizontal={false}
            showsVerticalScrollIndicator={false}
            refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={pullToRefresh} />}
          />
      }
    </View>
  )
}

const estilos = StyleSheet.create({

  contenedorVacio : {
    flex: 1,
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },

  titulo: {
    color: 'black',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  mensaje: {
    color: 'black',
    fontSize: 17,
    textAlign: 'center',
    marginTop: 5,
  },

  capaBoton:{
    marginTop: 15,
  },

});

export default Cesta;
