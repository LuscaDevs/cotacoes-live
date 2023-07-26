import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import StockDetails from '../screens/StockDetails';
import { StockData } from './StockAPI';
import DiaryVariation from '../screens/DiaryVariation';
import Dividends from '../screens/Dividends';

export type RootStackParamList = {
    MeusAtivos: undefined;
    Detalhes: { stock: StockData };
    VariacaoDiaria: { stock: StockData };
    Dividendos: { stock: StockData };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='MeusAtivos' screenOptions={{ headerStyle: { backgroundColor: '#0ef6cc' }, headerTitleAlign: 'center' }}>
                <Stack.Screen name='MeusAtivos' component={Home} options={{ title: 'Meus Ativos' }} />
                <Stack.Screen name='Detalhes' component={StockDetails} />
                <Stack.Screen name='VariacaoDiaria' component={DiaryVariation} options={{ title: 'Variação Diária' }} />
                <Stack.Screen name='Dividendos' component={Dividends} options={{ title: 'Dividendos' }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
