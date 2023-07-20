import React from 'react';
import { Platform, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native'; // Importe o hook useNavigation
import StockQuote from '../src/StockQuote';
import AddStock from '../src/AddStock';

const ContainerApp = styled.KeyboardAvoidingView`
  flex: 1;
  background-color: #fff;
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

    const navigation = useNavigation(); // Use o hook useNavigation para obter a função de navegação

    return (
        <ContainerApp behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <ScrollView>
                <ContainerStocks>
                    {stocksList.map((stock, index) => (
                        <StockQuote
                            key={index}
                            symbol={stock.symbol}
                            navigation={navigation} // Passe a função de navegação como prop
                        />
                    ))}
                </ContainerStocks>
            </ScrollView>

            <AddStock updateDataList={updateDataList} />
        </ContainerApp>
    );
};

export default Home;
