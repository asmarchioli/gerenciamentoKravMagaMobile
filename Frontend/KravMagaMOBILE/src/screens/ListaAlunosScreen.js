import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, Alert, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import api from '../services/api';
import AlunoCard from '../components/AlunoCard';

export default function ListaAlunosScreen({ navigation }) {
    const [alunos, setAlunos] = useState([]);
    const [textSearch, setTextSearch] = useState('');
    const [refreshing, setRefreshing] = useState(false);

    const loadAlunos = async () => {
        try {
            let response;
            if (textSearch.trim() === '') {
                response = await api.get('/alunos');
            } else {
                response = await api.get(`/alunos/busca?termo=${textSearch}`);
            }
            setAlunos(response.data);
        } catch (error) {
            console.log(error);
            Alert.alert('Erro', 'Não foi possível carregar a lista de alunos.');
        }
    };

    const handleRefresh = async () => {
        setRefreshing(true);
        await loadAlunos();
        setRefreshing(false);
    }

    useFocusEffect(
        useCallback(() => {
            loadAlunos();
        }, [textSearch])
    );

    const handleDelete = (id) => {
        Alert.alert('Atenção', 'Deseja realmente excluir este aluno?', [
            { text: 'Cancelar', style: 'cancel' },
            { text: 'Excluir', style: 'destructive', onPress: async () => {
                try {
                    await api.delete(`/alunos/${id}`);
                    loadAlunos();
                } catch (error) {
                    Alert.alert('Erro', 'Não foi possível excluir o aluno.');
                }
            }}
        ]);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Buscar aluno por nome..."
                    placeholderTextColor="#999"
                    value={textSearch}
                    onChangeText={setTextSearch}
                />
                <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AlunoForm')}>
                    <Text style={styles.addButtonText}>+ Adicionar Aluno</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={alunos}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <AlunoCard
                        aluno={item}
                        onEdit={() => navigation.navigate('AlunoForm', { alunoId: item.id })}
                        onDelete={() => handleDelete(item.id)}
                    />
                )}
                refreshing={refreshing}
                onRefresh={handleRefresh}

                ListEmptyComponent={<Text style={styles.emptyText}>Nenhum aluno encontrado!</Text>}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: '#222'
    },
    header: {
        flexDirection: 'row',
        marginBottom: 20,
        alignItems: 'center'
    },
    searchInput: { 
        flex: 1, 
        backgroundColor: '#303030', 
        color: '#fff',
        marginRight: 10, 
        padding: 12, 
        borderRadius: 5, 
        borderWidth: 1, 
        borderColor: '#444' 
    },
    addButton: {
        backgroundColor: '#e74c3c',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    addButtonText: {
        color: '#fff',
        fontWeight: 'bold'
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 30,
        color: '#adb5bd',
        fontSize: 14
    },
});
