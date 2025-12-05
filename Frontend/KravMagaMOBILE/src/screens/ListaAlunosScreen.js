import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, Alert, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import api from '../services/api';
import { Picker } from '@react-native-picker/picker';
import AlunoCard from '../components/AlunoCard';

export default function ListaAlunosScreen({ navigation }) {
    const [alunos, setAlunos] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const [nomeSearch, setNomeSearch] = useState('');
    const [faixaSearch, setFaixaSearch] = useState('');
    const [turmaSearch, setTurmaSearch] = useState('');
    const [showFilters, setShowFilters] = useState(false);

    const faixasEnum = [
        "BRANCA", "AMARELA", "LARANJA", "BORDÔ", 
        "VERDE", "AZUL", "ROXA", "MARROM", "PRETA"
    ];

    const loadAlunos = async () => {
        try {
            const params = {};
            if (nomeSearch) params.nome = nomeSearch;
            if (faixaSearch) params.faixa = faixaSearch;
            if (turmaSearch) params.turma = turmaSearch;

            const response = await api.get('/alunos', { params });
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
    };

    const limparFiltros = () => {
        setNomeSearch('');
        setFaixaSearch('');
        setTurmaSearch('');

        api.get('/alunos').then(res => setAlunos(res.data));
    };

    useFocusEffect(
        useCallback(() => {
            loadAlunos();
        }, [nomeSearch, faixaSearch, turmaSearch])
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
                    placeholder="Buscar por nome..."
                    placeholderTextColor="#999"
                    value={nomeSearch}
                    onChangeText={setNomeSearch}
                />
                <TouchableOpacity style={styles.filterIconButton} onPress={() => setShowFilters(!showFilters)}>
                    <Text style={styles.filterIconText}>Filtros {showFilters ? '▲' : '▼'}</Text>
                </TouchableOpacity>
            </View>

            {showFilters && (
                <View style={styles.filtersContainer}>
                    <Text style={styles.filterLabel}>Faixa:</Text>
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={faixaSearch}
                            onValueChange={(itemValue) => setFaixaSearch(itemValue)}
                            style={styles.picker}
                            dropdownIconColor="#fff"
                        >
                            <Picker.Item label="Todas" value="" color="#000" />
                            {faixasEnum.map((f) => (
                                <Picker.Item key={f} label={f} value={f} color="#000" />
                            ))}
                        </Picker>
                    </View>

                    <Text style={styles.filterLabel}>Filtrar por Turma:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ex: Iniciante Manhã"
                        placeholderTextColor="#999"
                        value={turmaSearch}
                        onChangeText={setTurmaSearch}
                    />

                    <TouchableOpacity style={styles.clearButton} onPress={limparFiltros}>
                        <Text style={styles.clearButtonText}>Limpar Filtros</Text>
                    </TouchableOpacity>
                </View>
            )}
                        

            <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AlunoForm')}>
                <Text style={styles.addButtonText}>+ Adicionar Aluno</Text>
            </TouchableOpacity>


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
                style={{ marginTop: 10 }}
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
        marginBottom: 10,
        gap: 10,
    },
    searchInput: { 
        flex: 1, 
        backgroundColor: '#303030', 
        color: '#fff',
        padding: 12, 
        borderRadius: 5, 
        borderWidth: 1, 
        borderColor: '#444' 
    },
    filterIconButton: {
        backgroundColor: '#444',
        padding: 12,
        borderRadius: 5,
        justifyContent: 'center',
    },
    filterIconText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    filtersContainer: {
        backgroundColor: '#333',
        padding: 10,
        borderRadius: 5,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#555'
    },
    filterLabel: {
        color: '#ccc',
        marginBottom: 5,
        marginTop: 5,
        fontSize: 12,
        fontWeight: 'bold'
    },
    pickerContainer: {
        backgroundColor: '#222',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#444',
        marginBottom: 5,
        width: '50%',
        height: 50,
        justifyContent: 'center',
    },
    picker: {
        color: '#fff',
    },
    input: {
        backgroundColor: '#222', 
        color: '#fff',
        paddingHorizontal: 10, 
        height: 50,
        borderRadius: 5, 
        borderWidth: 1, 
        borderColor: '#444',
        fontSize: 16,
    },
    clearButton: {
        marginTop: 10,
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#555',
        borderRadius: 5
    },
    clearButtonText: {
        color: '#fff',
        fontWeight: 'bold'
    },
    addButton: {
        backgroundColor: '#e74c3c',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10
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