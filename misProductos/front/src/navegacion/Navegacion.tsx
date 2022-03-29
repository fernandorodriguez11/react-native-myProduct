/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
/* eslint-disable curly */
/* eslint-disable semi */
import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../Screens/Login';
import { AuthContext } from '../context/AuthContext';
import BottomNavegacion from './BottomNavegacion';
import LoadingScreen from '../Screens/LoadingScreen';

const Stack = createStackNavigator();

const Navegacion = () => {

    const {status} = useContext(AuthContext);

    if (status === 'checking') return <LoadingScreen />;

    return (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          {
            status === 'authenticated' 
            ? <Stack.Screen name="Home" component={BottomNavegacion} /> 
            : <Stack.Screen name="Login" component={Login} />
          }
        </Stack.Navigator>
    );
}

export default Navegacion;
