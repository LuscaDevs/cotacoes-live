import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View } from "react-native";
import { RootStackParamList } from "../src/AppNavigator";


type Props = NativeStackScreenProps<RootStackParamList, 'VariacaoDiaria'>

const DiaryVariation: React.FC<Props> = ({ route }) => {
    return (
        <View>

        </View>
    );
}

export default DiaryVariation;