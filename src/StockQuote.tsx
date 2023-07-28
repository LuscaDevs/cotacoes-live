// StockQuote.tsx

import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { Trending } from '../assets/TrendIcon';
import StockAPI, { StockData } from './StockAPI';
import { Image, Platform, View } from 'react-native';
import { SvgUri } from 'react-native-svg';


type StockQuoteProps = {
    symbol: string;
    navigation: any; // Use o tipo genérico para a propriedade navigation
};

interface StockQuoteChangeProps {
    changeValue: number;
}

export const StockQuoteContainer = styled.TouchableOpacity`
  padding: 20px;
  margin: 10px;
  border-radius: 40px;
  background: #F4fefd;
  box-shadow: 5px 5px 5px #3a4f50;
`;

export const StockQuoteText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #3a4f50;
  text-align: center;
`;

export const StockQuoteSubText = styled.Text`
  font-size: 11px;
  color: #3a4f50;
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

const StockQuoteLogo = styled.View`
    align-items: center;
    margin-bottom: 10px;
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
            <StockQuoteLogo>
                {Platform.OS === 'ios' ?
                    (<SvgUri uri={stock.logourl} width={56} height={56} />) :
                    (<Image source={{ uri: stock.logourl }} resizeMode='contain' style={{ width: 56, height: 56 }} />)}
            </StockQuoteLogo>
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
