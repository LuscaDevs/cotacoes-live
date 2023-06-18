import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, View } from 'react-native';
import StockQuote from './StockQuote';
import styled from 'styled-components/native';
import { useState } from 'react';

export default function App() {

  const [text, onChangeText] = useState('');
  const apiKey = 'IWOK33HKCS8IRUUU';

  const TitleText = styled.Text`
    font-size: 22px;
    font-weight: bold;
    color: #333;
    align-self: center;
    margin-top: 20px;
    margin-bottom: 20px;
  `;

  const ContainerApp = styled.View`
    flex: 1;
    background-color: #fff;
    margin-top: 40px;
    justify-content: space-between;
  `;

  const ContainerStocks = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    margin-left: 10px;
    justify-content: center;
  `;

  const ContainerAddStock = styled.View`
    flex-direction: row;
    justify-content: space-evenly;
  `;

  const StockInput = styled.TextInput`
    border-width: 1px;
    margin-bottom: 30px;
    margin-left: 10px;
    margin-right: 10px;
    border-radius: 8px;
    padding: 10px;
  `;

  const AddStockButton = styled.TouchableOpacity`
    background-color: '#007AFF';
    border-radius: 5px;
    align-items:center;
    padding: 10px;
  `;

  return (
    <ContainerApp>
      <StatusBar style="auto" />
      <TitleText>Ativos em acompanhamento</TitleText>

      <ContainerStocks>
        <StockQuote symbol='PETR4.SA' apiKey={apiKey} updateInterval={60000} />
        <StockQuote symbol='CSAN3.SA' apiKey={apiKey} updateInterval={60000} />
        <StockQuote symbol='AURE3.SA' apiKey={apiKey} updateInterval={60000} />
        <StockQuote symbol='PETR4.SA' apiKey={apiKey} updateInterval={60000} />
        <StockQuote symbol='CSAN3.SA' apiKey={apiKey} updateInterval={60000} />
        <StockQuote symbol='AURE3.SA' apiKey={apiKey} updateInterval={60000} />
      </ContainerStocks>

      <ContainerAddStock>
        <StockInput
          placeholder='Insira o ticker do ativo'
          onChangeText={onChangeText}
          value={text}
          placeholderTextColor={'black'}

        />
        <AddStockButton onPress={() => Alert.alert('Test')}>
          <Text>+</Text>
        </AddStockButton>
      </ContainerAddStock>

    </ContainerApp>
  );
}
