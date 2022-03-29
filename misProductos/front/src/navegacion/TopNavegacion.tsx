/* eslint-disable prettier/prettier */
/* eslint-disable semi */
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import Cocina from '../Screens/Productos/Cocina';
import Casa from '../Screens/Productos/Casa';
import Lavabo from '../Screens/Productos/Lavabo';

const TopTab = createMaterialTopTabNavigator();

const TopNavegacion = () => {

    return (
        <TopTab.Navigator>
          <TopTab.Screen name="Casa" component={Casa} />
          <TopTab.Screen name="Cocina" component={Cocina} />
          <TopTab.Screen name="Baño" component={Lavabo} />
        </TopTab.Navigator>
    );
}

export default TopNavegacion;
