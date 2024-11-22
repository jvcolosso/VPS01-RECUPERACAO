
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './componentes/LoginScreen';
import CadastroScreen from './componentes/CadastroScreen';
import PollsScreen from './componentes/PollsScreen';
import CreatePollScreen from './componentes/CreatePollScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: { backgroundColor: '#1E90FF' },
          headerTitleStyle: { fontWeight: 'bold', fontSize: 20 },
          headerTintColor: '#fff', 
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Cadastro" component={CadastroScreen} />
        <Stack.Screen name="Enquetes" component={PollsScreen} />
        <Stack.Screen name="Criar Enquete" component={CreatePollScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

console.log("Firebase inicializado", App);

