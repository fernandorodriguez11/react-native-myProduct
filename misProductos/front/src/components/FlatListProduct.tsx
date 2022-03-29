/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable semi */
import React from 'react';
import { View, FlatList } from 'react-native';
import { Producto } from '../interfaces/interface-producto';
import ProductosUbicacion from './ProductosUbicacion';

interface Props{
  productos: Producto[],
  categoria: string,
}

const FlatListProduct = ({productos, categoria}: Props) => {
  return (
    <View style={{flex: 1}}>
        <FlatList
          style={{backgroundColor: 'white'}}
          data={productos}
          keyExtractor={item => item._id}
          renderItem={({item}):any => <ProductosUbicacion producto={item} ubicacion={categoria} />}
          horizontal={false}
          showsVerticalScrollIndicator={false}
        />
    </View>
  );
}

export default FlatListProduct;
