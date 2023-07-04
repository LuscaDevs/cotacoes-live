// AddStock.tsx

import axios from 'axios';
import React, { useState } from 'react';
import { Alert, FlatList, Text, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';

const ContainerAddStock = styled.View`
  flex-direction: column;
  justify-content: space-evenly;
  margin: 20px;
`;

const StockInput = styled.TextInput`
  border-width: 1px;
  border-radius: 8px;
  width: 100%;
  padding: 10px;
`;

const StockListView = styled.TouchableOpacity`
  border-width: 1px;
  border-radius: 8px;
  width: 100%;
  padding: 10px;
  margin-bottom: 5px;
`;

interface Ticker {
  '1. symbol': string;
  '2. name': string;
}

interface SelectedTicker {
  symbol: string;
  name: string;
}

interface Stock {
  symbol: string;
}

interface AddStockProps {
  updateDataList: (newList: Stock[]) => void;
}

const AddStock: React.FC<AddStockProps> = ({ updateDataList }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [tickers, setTickers] = useState<Ticker[]>([]);
  const [selectedTicker, setSelectedTicker] = useState<SelectedTicker | null>(null);
  const apiKey = 'IWOK33HKCS8IRUUU';

  const handleSearchChange = async (text: string) => {
    setSearchTerm(text);

    try {
      const response = await axios.get(
        `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${text}&apikey=${apiKey}`
      );

      const searchResults: Ticker[] = response.data.bestMatches;

      setTickers(searchResults);
    } catch (error) {
      console.error('Erro ao buscar símbolos:', error);
    }
  };

  const handleSelectTicker = (ticker: Ticker) => {
    setSelectedTicker({
      symbol: ticker['1. symbol'],
      name: ticker['2. name'],
    });

    const newStock: Stock = {
      symbol: ticker['1. symbol'],
    };

    updateDataList([newStock]);
    setSearchTerm('');
  };

  return (
    <ContainerAddStock>
      {searchTerm ? <FlatList
        data={tickers}
        keyExtractor={(item) => item['1. symbol']}
        renderItem={({ item }) => (
          <StockListView onPress={() => handleSelectTicker(item)}>
            <View>
              <Text>{item['1. symbol']}</Text>
              <Text>{item['2. name']}</Text>
            </View>
          </StockListView>
        )}
      /> : null}

      <StockInput
        placeholder='Insira o ticker do ativo'
        onChangeText={handleSearchChange}
        value={searchTerm.toUpperCase()}
        maxLength={6}
        placeholderTextColor={'black'}
      />
    </ContainerAddStock>
  );
};

export default AddStock;
