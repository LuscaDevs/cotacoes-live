/**
 * Componente principal do aplicativo.
 * Exibe uma lista de cotações de estoque e permite adicionar novos estoques à lista.
 */

import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import StockDetails from '../screens/StockDetails';


const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Meus Ativos'>
                <Stack.Screen name='Meus Ativos' component={Home} />
                <Stack.Screen name='Detalhes' component={StockDetails} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
