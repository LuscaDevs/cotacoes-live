// App.tsx

import React, { useState } from 'react';
import { ScrollView, View, KeyboardAvoidingView, Platform, Text } from 'react-native';
import styled from 'styled-components/native';
import StockQuote from './src/StockQuote';
import AddStock from './src/AddStock';

interface Stock {
  symbol: string;
}

const TitleText = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: #333;
  align-self: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const ContainerApp = styled.KeyboardAvoidingView`
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

const App = () => {
  const [stocksList, setStocksList] = useState<Stock[]>([]);

  const updateDataList = (newList: Stock[]) => {
    setStocksList((prevList) => [...prevList, ...newList]);
  };

  return (
    <ContainerApp behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TitleText>Ativos em acompanhamento</TitleText>

      <ScrollView>
        <ContainerStocks>
          {stocksList.map((stock, index) => (
            <StockQuote
              key={index}
              symbol={stock.symbol}
            />
          ))}
        </ContainerStocks>
      </ScrollView>

      <AddStock updateDataList={updateDataList} />
    </ContainerApp>
  );
};

export default App;
