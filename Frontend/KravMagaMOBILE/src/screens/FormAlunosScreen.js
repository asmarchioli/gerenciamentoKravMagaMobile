import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import api from '../services/api';

export default function FormAlunosScreen({ route, navigation }) {
    const { alunoId } = route.params || {};
    const isEditing = !!alunoId;

    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [faixa, setFaixa] = useState('');
    const [turma, setTurma] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');
    const [endereco, setEndereco] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [dataProxGraduacao, setDataProxGraduacao] = useState('');

    useEffect(() => {
        if (isEditing) {
            api.get(`/alunos/${alunoId}`)
                .then(response => {
                    const aluno = response.data;
                    setNome(aluno.nome);
                    setCpf(aluno.cpf);
                    setFaixa(aluno.faixa);
                    setTurma(aluno.turma);
                    setTelefone(aluno.telefone);
                    setEmail(aluno.email);
                    setEndereco(aluno.endereco);
                    setDataNascimento(aluno.dataNascimento);
                    setDataProxGraduacao(aluno.dataProxGraduacao);
                })
                .catch(error => {
                    console.error("Erro ao buscar aluno", error);
                    Alert.alert('Erro', 'Não foi possível carregar os dados do aluno.');
                    navigation.goBack();
                });
        }
    }, [alunoId]);

    const handleSave = async () => {
        const alunoData = {
            nome, cpf, faixa, turma, telefone, email,
            endereco: endereco || null, 
            dataNascimento: dataNascimento || null,
            dataProxGraduacao: dataNascimento || null
        };

        try {
            if (isEditing) {
                await api.put(`/alunos/${alunoId}`, alunoData);
                Alert.alert('Sucesso', 'Aluno atualizado com sucesso!');
            } else {
                await api.post('/alunos', alunoData);
                Alert.alert('Sucesso', 'Aluno cadastrado com sucesso!');
            }
            navigation.goBack();

        } catch (error) {
            let msg = 'Não foi possível salvar os dados do aluno.';

            if (error.respose){
                if (error.response.data && error.response.data.errors){
                    msg = Object.values(error.response.data.errors).join('\n');
                }
                else if (error.response.data && error.response.data.erro){
                    msg = error.response.data.erro;
                }
                else if (error.response.data && error.response.data.message){
                    msg = error.response.data.message;
                }
                else if (error.request){
                    msg = "Sem resposta do servidor. Verifique sua conexão.";
                }
                else {
                    msg = error.message;
                }

                Alert.alert('Erro ao salvar: ', msg);
            }
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.sectionTitle}>{isEditing ? 'Editar Aluno' : 'Novo Aluno'}</Text>
      
            <Text style={styles.label}>Nome Completo *</Text>
            <TextInput style={styles.input} value={nome} onChangeText={setNome} placeholderTextColor="#666"/>

            <Text style={styles.label}>CPF *</Text>
            <TextInput style={styles.input} value={cpf} onChangeText={setCpf} keyboardType="numeric"/>

            <Text style={styles.label}>Email *</Text>
            <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none"/>

            <Text style={styles.label}>Telefone *</Text>
            <TextInput style={styles.input} value={telefone} onChangeText={setTelefone} keyboardType="phone-pad"/>

            <Text style={styles.label}>Faixa *</Text>
            <TextInput style={styles.input} value={faixa} onChangeText={setFaixa} autoCapitalize="characters"/>

            <Text style={styles.label}>Turma *</Text>
            <TextInput style={styles.input} value={turma} onChangeText={setTurma} />

            <Text style={styles.label}>Endereço</Text>
            <TextInput style={styles.input} value={endereco} onChangeText={setEndereco} />

            <Text style={styles.label}>Data Nascimento</Text>
            <TextInput style={styles.input} value={dataNascimento} onChangeText={setDataNascimento} />

            <Text style={styles.label}>Data Próx. Graduação</Text>
            <TextInput style={styles.input} value={dataProxGraduacao} onChangeText={setDataProxGraduacao} />

            <View style={styles.btnContainer}>
                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                    <Text style={styles.saveButtonText}>SALVAR</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#222',
        flexGrow: 1
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 20,
        textAlign: 'center'
    },
    label: {
        fontWeight: 'bold',
        marginTop: 15,
        color: '#e74c3c' },
    input: {
        backgroundColor: '#303030',
        color: '#fff',
        borderWidth: 1,
        borderColor: '#444',
        borderRadius: 5,
        padding: 12,
        marginTop: 5,
        fontSize: 16 
    },
    btnContainer: {
        marginTop: 30,
        marginBottom: 40
    },
    saveButton: {
        backgroundColor: '#e74c3c',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center'
    },
    saveButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    }
});