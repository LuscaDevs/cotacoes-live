/**
 * Componente para adicionar um novo ativo à lista.
 * Exibe uma caixa de entrada de texto para inserir o símbolo do ativo e uma lista de sugestões de símbolos correspondentes.
 * @param {function} updateDataList - Função para atualizar a lista de dados com um novo estoque.
 */

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Platform, Text, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';
import BrapiAvaiableStocks from './BrapiAvaiableStocks';

const ContainerAddStock = styled.KeyboardAvoidingView`
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

interface Stock {
  symbol: string;
}

interface AddStockProps {
  updateDataList: (newList: Stock[]) => void;
}

const AddStock: React.FC<AddStockProps> = ({ updateDataList }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [tickers, setTickers] = useState<string[]>([]);
  const [filteredTickers, setFilteredTickers] = useState<string[]>([]);
  const [selectedTicker, setSelectedTicker] = useState('');

  async function getTickerList() {
    try {
      const tickers = await BrapiAvaiableStocks();
      setTickers(tickers.sort());
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getTickerList();

  }, []);

  const handleSearchChange = (text: string) => {
    setSearchTerm(text);
    const filtered = tickers.filter(ticker => ticker.includes(searchTerm.toUpperCase()));
    setFilteredTickers(filtered);
  };

  const handleSelectTicker = (ticker: string) => {
    setSelectedTicker(ticker);

    const newStock: Stock = {
      symbol: ticker,
    };

    updateDataList([newStock]);
    setSearchTerm('');
  };

  return (
    <ContainerAddStock>
      {searchTerm ? <FlatList
        data={filteredTickers}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <StockListView onPress={() => handleSelectTicker(item)}>
            <View>
              <Text>{item}</Text>
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
