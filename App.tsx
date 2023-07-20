// App.tsx (ou Main.tsx, dependendo da sua configuração)
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/AppNavigator';

const App: React.FC = () => {
  return (
    <AppNavigator />
  );
};

export default App;
