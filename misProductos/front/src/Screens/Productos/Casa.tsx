/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable jsx-quotes */
/* eslint-disable semi */
import React from 'react';
import { ActivityIndicator, SafeAreaView } from 'react-native';
import FlatListProduct from '../../components/FlatListProduct';
import useProductoByCategoria from '../../hooks/useProductoByCategoria';

const Casa = () => {

  const {isLoading, productos, categoria} = useProductoByCategoria('casa');

  if (isLoading) {
    <ActivityIndicator size={50} color='black'/>
  }

  return (

    <SafeAreaView style={{flex: 1}}>
      <FlatListProduct productos={productos} categoria={categoria!} />
    </SafeAreaView>

  );

}

export default Casa;
