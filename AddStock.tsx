import React, { useState } from 'react';
import { Alert, Text } from 'react-native';
import styled from 'styled-components/native';


const ContainerAddStock = styled.View`
    flex-direction: row;
    justify-content: space-evenly;
    margin: 20px;
  `;
const StockInput = styled.TextInput`
    border-width: 1px;
    border-radius: 8px;
    width: 80%;
    padding: 10px;
  `;
const AddStockButton = styled.TouchableOpacity`
  background-color: #007AFF;
  border-radius: 20px;
  width: 40px;
  align-items:center;
  justify-content: center;
  padding: 10px;
`;

const AddStock = () => {
    const [text, onChangeText] = useState('');
    return (
        <ContainerAddStock>
            <StockInput
                placeholder='Insira o ticker do ativo'
                onChangeText={onChangeText}
                value={text.toUpperCase()}
                maxLength={6}
                placeholderTextColor={'black'}
            />
            <AddStockButton onPress={() => Alert.alert('Test')}>
                <Text>+</Text>
            </AddStockButton>
        </ContainerAddStock>
    );
}

export default AddStock;