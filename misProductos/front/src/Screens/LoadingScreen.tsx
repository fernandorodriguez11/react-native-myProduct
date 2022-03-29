/* eslint-disable prettier/prettier */
/* eslint-disable jsx-quotes */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable semi */
import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const LoadingScreen = () => {
  return (
    <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }}>
      <ActivityIndicator size={50} color='black' />
    </View>
  )
}

export default LoadingScreen;
