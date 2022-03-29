/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable comma-dangle */
/* eslint-disable semi */
import React, { useContext } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import Cesta from '../Screens/Cesta';
import InsertProduct from '../Screens/InsertProduct';
import TopNavegacion from './TopNavegacion';
import LogOut from '../Screens/LogOut';
import { AuthContext } from '../context/AuthContext';
import InsertUsers from '../Screens/InsertUsers';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const BottomTab = createMaterialBottomTabNavigator();

const BottomNavegacion = () => {

    const {rol} = useContext(AuthContext);
    console.log(rol);
    return (
        <BottomTab.Navigator
          sceneAnimationEnabled={true}
          barStyle={{
            backgroundColor:'#444343'
          }}
          screenOptions={({route}) => ({
            tabBarIcon: ({color, focused}) => {
              let iconName: string = '';
              switch (route.name) {
                case 'Cesta':
                  iconName = 'cart';
                  break;
                case 'InsertProduct':
                  iconName = 'restaurant-outline';
                  break;
                case 'Productos':
                  iconName = 'storefront';
                  return <MaterialIcon name={iconName} size={22} color={color} />
                case 'LogOut':
                  //iconName = 'log-out-outline';
                  iconName = 'power';
                  break;
                case 'InsertUser':
                  iconName = 'person-add-outline';
                  break;
              }
              return <Icon name={iconName} size={22} color={color} />
            },
            tabBarStyle: {
              borderTopColor:'red',
              borderTopWidth: 0,
              elevation: 0,
            },
            tabBarLabelStyle: {
              fontSize: 18,
            },
          })}>
          <BottomTab.Screen name="Cesta" component={Cesta}/>
          <BottomTab.Screen name="InsertProduct" component={InsertProduct} />
          <BottomTab.Screen name="Productos" component={TopNavegacion} />
          <BottomTab.Screen name="LogOut" component={LogOut}/>
          {
            rol === 'ROLE_ADMIN' ?
            <BottomTab.Screen name="InsertUser" component={InsertUsers}/> : <></>
          }
        </BottomTab.Navigator>
    );
}

export default BottomNavegacion;
