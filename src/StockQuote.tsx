import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components/native';

interface StockQuoteProps {
    symbol: string; // Símbolo do ativo (ex: PETR4.SA)
}

const StockQuoteContainer = styled.TouchableOpacity`
  padding: 10px;
  margin: 10px;
  border-radius: 50px;
  background: #b7adad;
  box-shadow: 20px 20px 60px #bebebe;
`;

const StockQuoteText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #333;
`;

const StockQuote: React.FC<StockQuoteProps> = ({ symbol }) => {
    const [quote, setQuote] = useState<number | null>(null);
    const apiKey = 'IWOK33HKCS8IRUUU';

    useEffect(() => {
        let isMounted = true;

        const fetchQuote = async () => {
            try {
                const response = await axios.get(
                    `https://brapi.dev/api/quote/${symbol}`
                );

                const quoteData = response.data.results[0];

                if (quoteData && isMounted) {

                    setQuote(quoteData.regularMarketPrice);
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
            <StockQuoteText>{symbol}</StockQuoteText>
            <StockQuoteText>R$ {quote.toFixed(2)}</StockQuoteText>
        </StockQuoteContainer>
    );
};

export default StockQuote;
