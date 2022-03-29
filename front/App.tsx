/* eslint-disable prettier/prettier */
/* eslint-disable semi */
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Navegacion from './src/navegacion/Navegacion';
import { AuthProvider } from './src/context/AuthContext';
import { ProductProvider } from './src/context/Productos/ProductsContext';

const AppState = ( {children}: any ) => {
  return (
    <AuthProvider>
        {children}
    </AuthProvider>
  );
}

const ProductState = ( {children}: any ) => {
  return (
    <ProductProvider>
        {children}
    </ProductProvider>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <AppState>
        <ProductState>
          <Navegacion/>
        </ProductState>
      </AppState>
    </NavigationContainer>
  );
};

export default App;
