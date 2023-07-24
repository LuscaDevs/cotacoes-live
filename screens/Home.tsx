import React from 'react';
import { Platform, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native'; // Corrigido para NavigationProp

import StockQuote from '../src/StockQuote';
import AddStock from '../src/AddStock';

const ContainerHome = styled.KeyboardAvoidingView`
  flex: 1;
  background-color: #1B2223;
  justify-content: space-between;
`;

const ContainerStocks = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-left: 10px;
  justify-content: center;
`;

interface Stock {
    symbol: string;
}

const Home: React.FC = () => {
    const [stocksList, setStocksList] = useState<Stock[]>([{ symbol: 'BBDC4' }]);
    const updateDataList = (newList: Stock[]) => {
        setStocksList((prevList) => [...prevList, ...newList]);
    };

    const navigation = useNavigation(); // Usa o tipo StockQuoteNavigationProp

    return (
        <ContainerHome behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={Platform.OS === 'ios' ? 75 : 0}>
            <ScrollView>
                <ContainerStocks>
                    {stocksList.map((stock, index) => (
                        <StockQuote
                            key={index}
                            symbol={stock.symbol}
                            navigation={navigation}
                        />
                    ))}
                </ContainerStocks>
            </ScrollView>

            <AddStock updateDataList={updateDataList} />
        </ContainerHome>
    );
};

export default Home;
