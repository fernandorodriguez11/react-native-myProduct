/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable jsx-quotes */
/* eslint-disable no-trailing-spaces */
/* eslint-disable semi */
import React from 'react';
import {SafeAreaView} from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import useProductoByCategoria from '../../hooks/useProductoByCategoria';
import FlatListProduct from '../../components/FlatListProduct';

const Cocina = () => {

  const {isLoading, productos, categoria} = useProductoByCategoria('cocina');

  if (isLoading) {
    <ActivityIndicator size={50} color='black'/>
  }
  
  return (

    <SafeAreaView style={{flex: 1}}>
      <FlatListProduct productos={productos} categoria={categoria!} />
    </SafeAreaView>
    
  );
}

export default Cocina;