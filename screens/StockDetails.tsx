import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Dimensions, Text, View } from 'react-native'
import styled from 'styled-components/native';
import { RootStackParamList } from '../src/AppNavigator';
import { StockQuoteContainer, StockQuoteText } from '../src/StockQuote';
import { TwelveMonthsChart } from '../src/StockChart';

const StockDetailsContainer = styled.View`
    background-color: #1b2223;
    flex-direction: row;
    flex-wrap: wrap;
    margin-left: 10px;
    justify-content: center;
`;

const ContainerHome = styled.KeyboardAvoidingView`
  flex: 1;
  background-color: #1B2223;
  justify-content: space-between;
`;

type Props = NativeStackScreenProps<RootStackParamList, 'Detalhes'>

const StockDetails: React.FC<Props> = ({ route, navigation }) => {

    const stock = route.params.stock;

    const handleStockContainerClick = (type: string) => {
        switch (type) {
            case 'VariacaoDiaria':
                navigation.navigate('VariacaoDiaria', { stock });
                break;
            case 'Dividendos':
                if (stock.dividendYield > 0) {
                    navigation.navigate('Dividendos', { stock });
                    break;
                }

            default:
                break;
        }
    };

    return (
        <ContainerHome>
            <StockDetailsContainer>
                <StockQuoteContainer>
                    <StockQuoteText>{stock.longName}</StockQuoteText>
                </StockQuoteContainer>
                <StockQuoteContainer onPress={() => handleStockContainerClick('VariacaoDiaria')}>
                    <StockQuoteText>Variação Diária ({stock.currency})</StockQuoteText>
                    <StockQuoteText> Mín. {stock.regularMarketDayRange} Máx.</StockQuoteText>
                </StockQuoteContainer>
                <StockQuoteContainer>
                    <StockQuoteText>Variação 52 semanas ({stock.currency})</StockQuoteText>
                    <StockQuoteText>Mín. {stock.fiftyTwoWeekRange} Máx.</StockQuoteText>
                </StockQuoteContainer>
                <StockQuoteContainer onPress={() => handleStockContainerClick('Dividendos')}>
                    <StockQuoteText>Dividend Yield </StockQuoteText>
                    <StockQuoteText>{stock.dividendYield > 0 ? `${stock.dividendYield.toFixed(2)}%` : 'Sem dados'}</StockQuoteText>
                </StockQuoteContainer>
                <StockQuoteContainer>
                    <StockQuoteText>Valorização (12meses) </StockQuoteText>
                    <StockQuoteText>{stock.twelveMonthsVariationPercent.toFixed(2)}%</StockQuoteText>
                </StockQuoteContainer>
                <Text></Text>
                <Text></Text>

            </StockDetailsContainer>
            <TwelveMonthsChart {...stock} />

        </ContainerHome>

    );
}

export default StockDetails;