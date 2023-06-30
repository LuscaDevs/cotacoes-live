import { StatusBar, KeyboardAvoidingView, ScrollView, Platform, View, KeyboardAvoidingViewBase, TouchableWithoutFeedback } from 'react-native';
import { Alert, Text, TextInput, TouchableOpacity } from 'react-native';
import StockQuote from './StockQuote';
import styled from 'styled-components/native';
import React, { useState } from 'react';
import AddStock from './AddStock';

export default function App() {
  const apiKey = 'IWOK33HKCS8IRUUU';

  const TitleText = styled.Text`
    font-size: 22px;
    font-weight: bold;
    color: #333;
    align-self: center;
    margin-top: 20px;
    margin-bottom: 20px;
  `;

  const ContainerApp = styled.KeyboardAvoidingView`
    flex: 1;
    background-color: #fff;
    margin-top: 40px;
    justify-content: space-between;
  `;

  const ContainerStocks = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    margin-left: 10px;
    justify-content: center;
  `;

  return (
    <ContainerApp behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TitleText>Ativos em acompanhamento</TitleText>

      <ScrollView>
        <ContainerStocks>
          {/* <StockQuote symbol='PETR4.SA' apiKey={apiKey} updateInterval={60000} />
            <StockQuote symbol='CSAN3.SA' apiKey={apiKey} updateInterval={60000} />
            <StockQuote symbol='AURE3.SA' apiKey={apiKey} updateInterval={60000} />
            <StockQuote symbol='PETR4.SA' apiKey={apiKey} updateInterval={60000} />
            <StockQuote symbol='CSAN3.SA' apiKey={apiKey} updateInterval={60000} />
            <StockQuote symbol='AURE3.SA' apiKey={apiKey} updateInterval={60000} /> */}
        </ContainerStocks>
      </ScrollView>

      <AddStock />

    </ContainerApp>
  );
}
