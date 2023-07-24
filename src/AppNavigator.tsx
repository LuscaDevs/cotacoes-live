import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import StockDetails from '../screens/StockDetails';
import { StockData } from './StockAPI';

export type RootStackParamList = {
    MeusAtivos: undefined;
    Detalhes: { stock: StockData };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='MeusAtivos' screenOptions={{ headerStyle: { backgroundColor: '#0ef6cc' }, headerTitleAlign: 'center' }}>
                <Stack.Screen name='MeusAtivos' component={Home} />
                <Stack.Screen name='Detalhes' component={StockDetails} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
