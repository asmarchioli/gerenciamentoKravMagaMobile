import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import api from '../services/api';

export default function LoginScreen({ navigation }) {
    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');

    const handleLogin = async () => {
        try {
            const response = await api.post('/login', { login: login, senha });
            if (response.status === 200){
                navigation.replace('AlunoList');
            }
        } catch (error) {
            Alert.alert('Erro', 'Login ou senha inválidos!');
        ]   
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Krav Maga <Text style={styles.highlight}>K4VEIRA</Text></Text>
            <TextInput
                style={styles.input}
                placeholder="Login"
                value={login}
                placeholderTextColor="#999"
                onChangeText={setLogin}
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Senha"
                value={senha}
                placeholderTextColor="#999"
                onChangeText={setSenha}
                secureTextEntry
            />

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>ENTRAR</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({});