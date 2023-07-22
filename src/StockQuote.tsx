// StockQuote.tsx

import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { Trending } from '../assets/TrendIcon';
import StockAPI, { StockData } from './StockAPI';


type StockQuoteProps = {
    symbol: string;
    navigation: any; // Use o tipo genérico para a propriedade navigation
};

interface StockQuoteChangeProps {
    changeValue: number;
}

const StockQuoteContainer = styled.TouchableOpacity`
  padding: 20px;
  margin: 10px;
  border-radius: 40px;
  background: #e6dcc1;
  box-shadow: 5px 5px 5px #bebebe;
`;

const StockQuoteText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #333;
`;

const StockQuoteSubText = styled.Text`
  font-size: 11px;
  color: #6d6969;
  margin-bottom: 20px;
`;

const StockQuoteChange = styled.View`
  font-size: 12px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const StockQuoteVariation = styled.Text<StockQuoteChangeProps>`
  color: ${({ changeValue }) => {
        if (changeValue > 0) {
            return 'green';
        } else if (changeValue < 0) {
            return 'red';
        } else {
            return '#6d6969';
        }
    }};
`;

const StockQuote: React.FC<StockQuoteProps> = ({ symbol, navigation }) => {

    const [stock, setStock] = useState<StockData | null>(null);
    const handleStockQuoteClick = () => {
        navigation.navigate('Detalhes', { stock });
    };
    useEffect(() => {
        let isMounted = true;

        const fetchStockData = async () => {
            const stockData = await StockAPI.fetchStockData(symbol);
            if (stockData && isMounted) {
                setStock(stockData);
            }
        };

        fetchStockData();
        return () => {
            isMounted = false;
        };
    }, []);

    if (stock === null) {
        return (
            <StockQuoteContainer>
                <StockQuoteText>Carregando...</StockQuoteText>
            </StockQuoteContainer>
        );
    }

    return (
        <StockQuoteContainer onPress={handleStockQuoteClick}>
            <StockQuoteText>{stock?.symbol}</StockQuoteText>
            <StockQuoteSubText>{stock?.shortName}</StockQuoteSubText>
            <StockQuoteText>R$ {stock?.regularMarketPrice.toFixed(2)}</StockQuoteText>
            <StockQuoteChange>
                <StockQuoteVariation changeValue={stock?.regularMarketChange}>{stock?.regularMarketChange.toFixed(2)}</StockQuoteVariation>
                <StockQuoteVariation changeValue={stock?.regularMarketChange}> ({stock?.regularMarketChangePercent.toFixed(2)}%)</StockQuoteVariation>
                <Trending changeValue={stock?.regularMarketChange} />
            </StockQuoteChange>
        </StockQuoteContainer>
    );
};

export default StockQuote;
