import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components/native';
import { Trending } from './TrendIcon';

interface StockQuoteProps {
    symbol: string; // Símbolo do ativo (ex: PETR4)
}
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

const StockQuoteChange = styled.View<StockQuoteChangeProps>`
  font-size: 12px;
  color: ${({ changeValue }) => {
        if (changeValue > 0) {
            return 'green';
        } else if (changeValue < 0) {
            return 'red';
        } else {
            return '#6d6969';
        }
    }};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;


const StockQuote: React.FC<StockQuoteProps> = ({ symbol }) => {
    const [quote, setQuote] = useState<number | null>(null);
    const [stock, setStock] = useState<any>();
    const [regularMarketChange, setRegularMarketChange] = useState<number>(0);

    useEffect(() => {
        let isMounted = true;

        const fetchQuote = async () => {
            try {
                const response = await axios.get(
                    `https://brapi.dev/api/quote/${symbol}`
                );

                const quoteData = response.data.results[0];

                if (quoteData && isMounted) {
                    setStock(quoteData);
                    setQuote(quoteData.regularMarketPrice);
                    setRegularMarketChange(quoteData.regularMarketChange);
                }
            } catch (error) {
                console.error('Erro ao buscar a cotação do ativo:', error);
            }
        };

        fetchQuote();
        return () => {
            isMounted = false;
        };
    }, [symbol]);

    if (quote === null) {
        return (
            <StockQuoteContainer>
                <StockQuoteText>Carregando...</StockQuoteText>
            </StockQuoteContainer>
        );
    }

    return (
        <StockQuoteContainer>
            <StockQuoteText>{stock.symbol}</StockQuoteText>
            <StockQuoteSubText>{stock.shortName}</StockQuoteSubText>
            <StockQuoteText>R$ {quote.toFixed(2)}</StockQuoteText>
            <StockQuoteChange changeValue={regularMarketChange}>
                {regularMarketChange.toFixed(2)}%
                <Trending changeValue={regularMarketChange} />
            </StockQuoteChange>

        </StockQuoteContainer>
    );
};

export default StockQuote;
