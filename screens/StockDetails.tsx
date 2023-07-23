import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, View } from 'react-native'
import styled from 'styled-components/native';
import { RootStackParamList } from '../src/AppNavigator';


type Props = NativeStackScreenProps<RootStackParamList, 'Detalhes'>

const StockDetails: React.FC<Props> = ({ route }) => {

    const stock = route.params.stock;
    return (
        <View>
            <Text>{stock.longName}</Text>
            <Text>Variação ({stock.currency}): {stock.regularMarketDayRange}</Text>
            <Text>Variação 52 semanas: {stock.fiftyTwoWeekRange}</Text>
            <Text>Dividend Yield: {stock.dividendYield.toFixed(2)}%</Text>
            <Text>Valorização (12meses): Valorização</Text>
            <Text></Text>
            <Text></Text>
        </View>
    );
}

export default StockDetails;