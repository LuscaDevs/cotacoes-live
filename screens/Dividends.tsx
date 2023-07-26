import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../src/AppNavigator";
import { DividendsChart } from "../src/StockChart";


type Props = NativeStackScreenProps<RootStackParamList, 'Dividendos'>
const Dividends: React.FC<Props> = ({ route }) => {
    const stock = route.params.stock;
    return (
        <DividendsChart {...stock} />
    );
}

export default Dividends;