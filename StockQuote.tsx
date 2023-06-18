import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components/native';

interface StockQuoteProps {
    symbol: string; // Símbolo do ativo (ex: PETR4.SA)
    apiKey: string; // Sua chave de API do Alpha Vantage
    updateInterval?: number; // Intervalo de atualização em milissegundos (opcional, padrão: 60000ms - 1 minuto)
}

interface AlphaVantageQuote {
    '05. price': string;
}

const StockQuoteContainer = styled.View`
    padding: 10px;
    margin: 10px;
    border-radius: 50px;
    background: #b7adad;
    box-shadow:  20px 20px 60px #bebebe;
`;

const StockQuoteText = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: #333;
`;

const StockQuote: React.FC<StockQuoteProps> = ({ symbol, apiKey, updateInterval = 60000 }) => {
    const [quote, setQuote] = useState<number | null>(null);

    useEffect(() => {
        let isMounted = true;

        const fetchQuote = async () => {
            try {
                const quoteResponse = await axios.get(
                    `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`
                );

                if (isMounted) {
                    const quoteData = quoteResponse.data['Global Quote'] as AlphaVantageQuote;
                    const price = parseFloat(quoteData['05. price']);

                    setQuote(price);
                }
            } catch (error) {
                console.error('Erro ao buscar a cotação do ativo:', error);
            }
        };

        fetchQuote();

        const intervalId = setInterval(fetchQuote, updateInterval);

        return () => {
            isMounted = false;
            clearInterval(intervalId);
        };
    }, [symbol, apiKey, updateInterval]);

    if (quote === null) {
        return (
            <StockQuoteContainer>
                <StockQuoteText>Carregando...</StockQuoteText>
            </StockQuoteContainer>
        );
    }

    return (
        <StockQuoteContainer>
            <StockQuoteText>
                {symbol}
            </StockQuoteText>
            <StockQuoteText>
                R$ {quote.toFixed(2)}
            </StockQuoteText>
        </StockQuoteContainer>
    );
};

export default StockQuote;
