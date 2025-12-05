import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image } from 'react-native';

import LoginScreen from './src/screens/LoginScreen';
import ListaAlunosScreen from './src/screens/ListaAlunosScreen';
import FormAlunosScreen from './src/screens/FormAlunosScreen';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <StatusBar style="light" backgroundColoer="#222" />

            <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
                headerStyle: { backgroundColor: '#e74c3c' },
                headerTintColor: '#fff',
                headerTitleStyle: { fontWeight: 'bold' },
                contentStyle: { backgroundColor: '#222' },
                headerRight: () => (
                    <Image
                        source={require('./assets/caveira-icon.png')}
                        style={{ width: 40, height: 40, marginRight: 10 }}
                        resizeMode="contain"
                    />
                ),
            }}
            >
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="AlunoList"
                    component={ListaAlunosScreen}
                    options={{ title: 'Lista de Alunos' }}
                />

                <Stack.Screen
                    name="AlunoForm"
                    component={FormAlunosScreen}
                    options={{ title: 'Gerenciar alunos' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

